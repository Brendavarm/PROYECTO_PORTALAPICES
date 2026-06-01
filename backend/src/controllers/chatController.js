import { resolveChatMessage } from '../lib/chatKnowledge.js';
import { runChatAgent, isAgentEnabled, getAgentStatus } from '../lib/chatAgent.js';

const MAX_MESSAGE_LEN = 500;
const MAX_HISTORY = 12;

function sanitizeHistory(history) {
  return Array.isArray(history)
    ? history
        .filter(
          (m) =>
            m &&
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string'
        )
        .slice(-MAX_HISTORY)
    : [];
}

function formatResponse(result) {
  return {
    reply: result.text,
    suggestions: result.suggestions ?? [],
    action: result.action ?? null,
    intent: result.intent,
    engine: result.engine ?? 'rules',
    toolsUsed: result.toolsUsed ?? [],
    orderCreated: result.orderCreated ?? null,
  };
}

export function getChatStatus(req, res) {
  res.json(getAgentStatus());
}

export async function postChatMessage(req, res) {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Escribe un mensaje para que el asistente pueda responderte.',
      });
    }

    if (message.length > MAX_MESSAGE_LEN) {
      return res.status(400).json({
        error: `El mensaje es muy largo (máximo ${MAX_MESSAGE_LEN} caracteres).`,
      });
    }

    const safeHistory = sanitizeHistory(history);

    if (isAgentEnabled()) {
      try {
        const agentResult = await runChatAgent(message.trim(), safeHistory);
        return res.json(formatResponse(agentResult));
      } catch (agentError) {
        console.error('[chat-agent]', agentError.message);
        const fallback = resolveChatMessage(message, safeHistory);
        return res.json({
          ...formatResponse(fallback),
          engine: 'rules',
          agentError: 'El agente IA no respondió; usamos respuestas locales.',
        });
      }
    }

    const result = resolveChatMessage(message, safeHistory);
    res.json(formatResponse(result));
  } catch (error) {
    res.status(500).json({
      error: 'No pudimos procesar tu mensaje. Intenta de nuevo en unos segundos.',
    });
  }
}
