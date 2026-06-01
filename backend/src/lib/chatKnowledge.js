const PRECIO_BASE = 50;
const EXTRAS = [
  { id: 'compartimiento_extra', label: '+1 compartimiento', price: 10 },
  { id: 'dos_compartimientos_extra', label: '+2 compartimentos', price: 18 },
  { id: 'grabado_destacado', label: 'Grabado destacado en base', price: 8 },
  { id: 'soporte_celular_ancho', label: 'Soporte celular ancho', price: 6 },
];

const COLORES = ['Dorado Premium', 'Azul Profundo', 'Blanco Clásico', 'Negro Elite', 'Verde Cancha'];

function formatBs(n) {
  return `Bs ${n}`;
}

function extrasListText() {
  return EXTRAS.map((e) => `• ${e.label}: +${formatBs(e.price)}`).join('\n');
}

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^\w\sáéíóúñü?]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const INTENTS = [
  {
    id: 'saludo',
    weight: 1,
    patterns: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'hey', 'que tal', 'saludos'],
    reply: () => ({
      text: 'Hola. Soy el asistente de GoalDesk Smart 2026. Puedo ayudarte con el portalapicero, precios, personalización, el Mundial 2026 o cómo hacer tu pedido.',
      suggestions: ['¿Cuánto cuesta?', '¿Cómo personalizar?', '¿Qué es GoalDesk?'],
      action: null,
    }),
  },
  {
    id: 'despedida',
    weight: 1,
    patterns: ['gracias', 'chau', 'adios', 'hasta luego', 'nos vemos', 'bye'],
    reply: () => ({
      text: 'Gracias por escribir. Cuando quieras armar tu GoalDesk, entra a Personalizar y confirma tu pedido. ¡Nos vemos!',
      suggestions: ['Ir a personalizar', 'Ver catálogo'],
      action: null,
    }),
  },
  {
    id: 'producto',
    weight: 2,
    patterns: [
      'que es goaldesk',
      'que es',
      'producto',
      'portalapicero',
      'portal lapicero',
      'organizador',
      'para que sirve',
      'que incluye',
    ],
    reply: () => ({
      text: `GoalDesk Portalapicero es un organizador de escritorio impreso en 3D con forma de balón:\n\n• Soporte integrado para celular\n• Compartimentos para lapiceros\n• Base con marca UNIFRANZ · Ingeniería de Sistemas\n• Temática Copa Mundial FIFA 2026\n\nEs un solo modelo; puedes sumar extras plus al personalizarlo.`,
      suggestions: ['¿Cuánto cuesta?', '¿Qué extras hay?', 'Personalizar ahora'],
      action: { type: 'link', href: '/catalogo', label: 'Ver catálogo' },
    }),
  },
  {
    id: 'precio',
    weight: 3,
    patterns: ['precio', 'cuesta', 'costo', 'cuanto', 'cuanto sale', 'valor', 'bs', 'bolivianos', 'pagar'],
    reply: () => ({
      text: `El portalapicero base cuesta ${formatBs(PRECIO_BASE)}.\n\nExtras opcionales:\n${extrasListText()}\n\nEjemplo: base + grabado destacado = ${formatBs(PRECIO_BASE + 8)}.\n\nEl total exacto lo ves al confirmar en Personalizar.`,
      suggestions: ['¿Qué extras hay?', '¿Cómo hago el pedido?', 'Personalizar'],
      action: { type: 'link', href: '/personalizar', label: 'Armar mi GoalDesk' },
    }),
  },
  {
    id: 'extras',
    weight: 2,
    patterns: ['extra', 'extras', 'plus', 'compartimiento', 'grabado', 'soporte ancho', 'opciones'],
    reply: () => ({
      text: `Extras plus disponibles (sobre el mismo portalapicero):\n\n${extrasListText()}\n\nPuedes combinar varios. El precio se suma al base de ${formatBs(PRECIO_BASE)}.`,
      suggestions: ['¿Cuánto cuesta?', 'Personalizar'],
      action: { type: 'link', href: '/personalizar', label: 'Elegir extras' },
    }),
  },
  {
    id: 'personalizar',
    weight: 3,
    patterns: [
      'personalizar',
      'personalizacion',
      'pedido',
      'comprar',
      'ordenar',
      'encargar',
      'como pido',
      'hacer pedido',
      'confirmar',
    ],
    reply: () => ({
      text: `Para armar tu GoalDesk:\n\n1. Entra a **Personalizar**\n2. Completa nombre, correo y carrera\n3. Elige color de filamento (${COLORES.slice(0, 3).join(', ')}…)\n4. Selecciona tu equipo del Mundial 2026 (48 selecciones)\n5. Marca extras plus si quieres\n6. Confirma el pedido\n\nVerás una vista previa con tu nombre y selección antes de enviar.`,
      suggestions: ['¿Cuánto cuesta?', '¿Qué colores hay?', 'Ir a personalizar'],
      action: { type: 'link', href: '/personalizar', label: 'Ir a Personalizar' },
    }),
  },
  {
    id: 'colores',
    weight: 2,
    patterns: ['color', 'colores', 'filamento', 'dorado', 'azul', 'blanco', 'negro', 'verde'],
    reply: () => ({
      text: `Colores de filamento disponibles:\n\n${COLORES.map((c) => `• ${c}`).join('\n')}\n\nEliges uno al personalizar; el preview muestra cómo quedará tu pedido.`,
      suggestions: ['Personalizar', '¿Cuánto cuesta?'],
      action: { type: 'link', href: '/personalizar', label: 'Elegir color' },
    }),
  },
  {
    id: 'selecciones',
    weight: 2,
    patterns: [
      'seleccion',
      'selecciones',
      'equipo',
      'equipos',
      'argentina',
      'brasil',
      'pais',
      'clasificados',
      '48',
    ],
    reply: () => ({
      text: 'Puedes elegir cualquiera de las **48 selecciones clasificadas** al Mundial 2026 (equipos nacionales, no clubes). El nombre aparece en tu vista previa y queda registrado en tu pedido.\n\nEn Personalizar hay buscador por confederación.',
      suggestions: ['Ver hub del Mundial', 'Personalizar'],
      action: { type: 'link', href: '/mundial', label: 'Hub Mundial 2026' },
    }),
  },
  {
    id: 'mundial',
    weight: 2,
    patterns: [
      'mundial',
      'copa',
      'fifa',
      '2026',
      'mexico',
      'usa',
      'canada',
      'sedes',
      'partidos',
    ],
    reply: () => ({
      text: `Copa Mundial FIFA 2026:\n\n• Anfitriones: EE. UU., México y Canadá\n• 48 selecciones · 104 partidos · 16 sedes\n• Inicio: 11 de junio de 2026\n• Final prevista: 19 de julio de 2026\n\nGoalDesk celebra el torneo con diseño de balón y tu selección favorita.`,
      suggestions: ['¿Qué selecciones hay?', 'Ver hub del Mundial'],
      action: { type: 'link', href: '/mundial', label: 'Explorar Mundial' },
    }),
  },
  {
    id: 'qr',
    weight: 2,
    patterns: ['qr', 'codigo qr', 'escanear', 'celular', 'movil', 'compartir link'],
    reply: () => ({
      text: 'En la sección **QR** generas un código para abrir GoalDesk desde el celular. En la misma red WiFi funciona con la IP local; para compartir fuera de tu red necesitas túnel Cloudflare o desplegar en internet (Vercel + backend).',
      suggestions: ['¿Cómo personalizar?', '¿Qué es GoalDesk?'],
      action: { type: 'link', href: '/qr', label: 'Ir a QR' },
    }),
  },
  {
    id: 'unifranz',
    weight: 2,
    patterns: ['unifranz', 'universidad', 'carrera', 'ingenieria', 'sistemas', 'proyecto'],
    reply: () => ({
      text: 'GoalDesk Smart 2026 es un emprendimiento académico de **UNIFRANZ · Ingeniería de Sistemas**. Combina impresión 3D, web React, API Node.js y PostgreSQL. La base del portalapicero lleva la marca UNIFRANZ.',
      suggestions: ['¿Qué es el producto?', '¿Cuánto cuesta?'],
      action: null,
    }),
  },
  {
    id: 'entrega',
    weight: 2,
    patterns: ['entrega', 'envio', 'demora', 'cuanto tarda', 'cuando llega', 'retiro', 'produccion'],
    reply: () => ({
      text: 'Cada portalapicero se imprime en 3D según tu configuración. Los tiempos dependen de la demanda del emprendimiento. Al confirmar tu pedido queda registrado y el equipo UNIFRANZ puede contactarte por correo para coordinar entrega.',
      suggestions: ['Hacer pedido', '¿Cuánto cuesta?'],
      action: { type: 'link', href: '/personalizar', label: 'Confirmar pedido' },
    }),
  },
  {
    id: 'redes',
    weight: 3,
    patterns: [
      'instagram',
      'tiktok',
      'redes',
      'red social',
      'siguenos',
      'síguenos',
      'goaldesk_franz',
      '@goaldesk',
    ],
    reply: () => ({
      text: 'Las cuentas oficiales de GoalDesk son:\n\n• Instagram: **@goaldesk_franz** — https://www.instagram.com/goaldesk_franz\n• TikTok: **@goaldesk_franz** — https://www.tiktok.com/@goaldesk_franz',
      suggestions: ['Ver catálogo', 'Personalizar'],
      action: { type: 'link', href: '/qr', label: 'Página QR y redes' },
    }),
  },
  {
    id: 'contacto',
    weight: 2,
    patterns: ['contacto', 'whatsapp', 'correo', 'email', 'hablar', 'humano', 'soporte'],
    reply: () => ({
      text: 'Para consultas de pedidos usa el correo que dejas en Personalizar. Si eres de UNIFRANZ, pregunta al equipo GoalDesk en clase. También puedes explorar el catálogo y el hub del Mundial aquí en la web.',
      suggestions: ['Personalizar', 'Ver catálogo'],
      action: null,
    }),
  },
  {
    id: 'admin',
    weight: 1,
    patterns: ['admin', 'panel', 'administrador', 'gestionar pedidos'],
    reply: () => ({
      text: 'El panel **Admin** es para el equipo del emprendimiento. Necesitas la contraseña configurada en el servidor. Desde ahí ves pedidos, estadísticas y estados.',
      suggestions: ['¿Cómo hago mi pedido?', '¿Cuánto cuesta?'],
      action: { type: 'link', href: '/admin', label: 'Ir a Admin' },
    }),
  },
];

function scoreIntent(normalizedMsg, intent) {
  let score = 0;
  for (const p of intent.patterns) {
    if (normalizedMsg.includes(p)) {
      score += intent.weight * (p.length > 6 ? 2 : 1);
    }
  }
  return score;
}

function matchSuggestionChip(msg, intents) {
  const chips = {
    'ir a personalizar': 'personalizar',
    personalizar: 'personalizar',
    'armar mi goaldesk': 'personalizar',
    'ver catálogo': 'producto',
    'ver catalogo': 'producto',
    '¿cuánto cuesta?': 'precio',
    'cuanto cuesta': 'precio',
    '¿cómo personalizar?': 'personalizar',
    'como personalizar': 'personalizar',
    '¿qué es goaldesk?': 'producto',
    'que es goaldesk': 'producto',
    'hub mundial 2026': 'mundial',
    'explorar mundial': 'mundial',
  };
  const key = normalize(msg);
  const intentId = chips[key];
  if (intentId) {
    return intents.find((i) => i.id === intentId);
  }
  return null;
}

export function resolveChatMessage(message, history = []) {
  const normalizedMsg = normalize(message);
  if (!normalizedMsg) {
    return {
      text: 'Escribe tu pregunta y te ayudo con GoalDesk, precios o el Mundial 2026.',
      suggestions: ['¿Qué es GoalDesk?', '¿Cuánto cuesta?', 'Personalizar'],
      action: null,
      intent: 'empty',
    };
  }

  const chipIntent = matchSuggestionChip(message, INTENTS);
  if (chipIntent) {
    const result = chipIntent.reply({ history });
    return { ...result, intent: chipIntent.id };
  }

  let best = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const s = scoreIntent(normalizedMsg, intent);
    if (s > bestScore) {
      bestScore = s;
      best = intent;
    }
  }

  if (best && bestScore > 0) {
    const result = best.reply({ history, message: normalizedMsg });
    return { ...result, intent: best.id };
  }

  const lastBot = [...history].reverse().find((m) => m.role === 'assistant');
  if (lastBot?.intent === 'precio' && /extra|mas|otro|tambien|suma/.test(normalizedMsg)) {
    const extras = INTENTS.find((i) => i.id === 'extras');
    const result = extras.reply({ history });
    return { ...result, intent: 'extras' };
  }

  return {
    text: `No estoy seguro de entender "${message.trim()}". Puedo ayudarte con el producto, precios desde ${formatBs(PRECIO_BASE)}, personalización, selecciones del Mundial o el código QR.\n\nPrueba una de las sugerencias o reformula tu pregunta.`,
    suggestions: ['¿Qué es GoalDesk?', '¿Cuánto cuesta?', '¿Cómo personalizar?', 'Ver Mundial 2026'],
    action: null,
    intent: 'fallback',
  };
}
