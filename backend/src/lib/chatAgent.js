import { TOOL_DEFINITIONS, executeChatTool, TOOL_LABELS } from './chatTools.js';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const MAX_TOOL_ROUNDS = 6;

const SYSTEM_PROMPT = `Eres el Agente GoalDesk, asistente autónomo del emprendimiento GoalDesk Smart 2026 (UNIFRANZ · Ingeniería de Sistemas).

PRODUCTO: GoalDesk Portalapicero — organizador de escritorio impreso en 3D, forma de balón, soporte celular, temática Mundial FIFA 2026.
Precio base: Bs 50. Moneda: bolivianos (Bs).

CAPACIDADES (usa herramientas, no inventes datos):
- Consultar producto, colores, extras, Mundial 2026
- Calcular precios con calcular_precio
- Buscar selecciones con buscar_seleccion
- CREAR PEDIDOS REALES con crear_pedido cuando el usuario lo pida y tengas todos los datos
- Consultar pedidos previos con consultar_pedidos si dan su correo

REGLAS PARA CREAR PEDIDOS:
1. Necesitas: nombre, correo, color (id: dorado|azul|blanco|negro|verde), seleccion_favorita (nombre oficial)
2. Pregunta lo que falte antes de llamar crear_pedido
3. Confirma resumen y precio antes de crear
4. Tras crear_pedido exitoso, felicita e indica número de pedido y precio

ESTILO: Español claro, amigable, conciso. Usa **negritas** para datos clave. Máximo 3 párrafos cortos.
No menciones OpenAI ni APIs. Si no puedes hacer algo, sugiere /personalizar en la web.`;

export function isAgentEnabled() {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

async function callOpenAI(messages) {
  const model = process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';

  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      tools: TOOL_DEFINITIONS,
      tool_choice: 'auto',
      temperature: 0.4,
      max_tokens: 800,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`OpenAI ${response.status}: ${errBody.slice(0, 200)}`);
  }

  return response.json();
}

function buildOpenAIMessages(history, userMessage) {
  const msgs = [{ role: 'system', content: SYSTEM_PROMPT }];

  for (const m of history) {
    if (m.role === 'user' || m.role === 'assistant') {
      msgs.push({ role: m.role, content: m.content });
    }
  }

  msgs.push({ role: 'user', content: userMessage });
  return msgs;
}

function extractSuggestions(text, orderCreated) {
  if (orderCreated) {
    return ['Consultar otro pedido', '¿Qué extras hay?', 'Ver Mundial 2026'];
  }
  if (/precio|cuesta|bs/i.test(text)) {
    return ['Armar mi pedido aquí', '¿Qué colores hay?', 'Ver catálogo'];
  }
  if (/pedido|personaliz/i.test(text)) {
    return ['Quiero hacer un pedido', '¿Cuánto cuesta con grabado?'];
  }
  return ['¿Cuánto cuesta?', 'Quiero hacer un pedido', '¿Qué es GoalDesk?'];
}

function extractAction(text, orderCreated) {
  if (orderCreated) {
    return { type: 'link', href: '/personalizar', label: 'Ver personalizador' };
  }
  if (/personaliz|pedido|confirmar/i.test(text)) {
    return { type: 'link', href: '/personalizar', label: 'Ir a Personalizar' };
  }
  if (/mundial|copa|fifa/i.test(text)) {
    return { type: 'link', href: '/mundial', label: 'Hub Mundial 2026' };
  }
  return null;
}

export async function runChatAgent(userMessage, history = []) {
  const messages = buildOpenAIMessages(history, userMessage);
  const toolsUsed = [];
  let orderCreated = null;

  for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
    const data = await callOpenAI(messages);
    const choice = data.choices?.[0];
    if (!choice) {
      throw new Error('Respuesta vacía del modelo');
    }

    const assistantMsg = choice.message;
    messages.push(assistantMsg);

    const toolCalls = assistantMsg.tool_calls;
    if (!toolCalls?.length) {
      const reply = assistantMsg.content?.trim() || 'Listo. ¿En qué más te ayudo?';
      return {
        text: reply,
        suggestions: extractSuggestions(reply, orderCreated),
        action: extractAction(reply, orderCreated),
        intent: orderCreated ? 'pedido_creado' : 'agent',
        engine: 'openai',
        toolsUsed: [...new Set(toolsUsed)],
        orderCreated,
      };
    }

    for (const call of toolCalls) {
      const fnName = call.function.name;
      let fnArgs = {};
      try {
        fnArgs = JSON.parse(call.function.arguments || '{}');
      } catch {
        fnArgs = {};
      }

      toolsUsed.push(fnName);
      const result = await executeChatTool(fnName, fnArgs);

      if (fnName === 'crear_pedido' && result.ok) {
        orderCreated = {
          pedidoId: result.pedido_id,
          precio: result.precio,
          estado: result.estado,
          cliente: result.cliente,
          seleccion: result.seleccion,
          color: result.color,
        };
      }

      messages.push({
        role: 'tool',
        tool_call_id: call.id,
        content: JSON.stringify(result),
      });
    }
  }

  return {
    text: 'Procesé varias consultas. ¿Puedes reformular tu pregunta?',
    suggestions: ['¿Cuánto cuesta?', 'Quiero hacer un pedido'],
    action: { type: 'link', href: '/personalizar', label: 'Personalizar' },
    intent: 'agent',
    engine: 'openai',
    toolsUsed: [...new Set(toolsUsed)],
    orderCreated,
  };
}

export function getAgentStatus() {
  return {
    enabled: isAgentEnabled(),
    model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
    tools: Object.entries(TOOL_LABELS).map(([id, label]) => ({ id, label })),
  };
}
