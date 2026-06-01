import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import FeatureIcon from '../ui/FeatureIcon';
import { getChatStatus, postChatMessage } from '../../services/api';

const WELCOME_RULES = {
  role: 'assistant',
  content:
    'Hola. Soy el asistente de GoalDesk Smart 2026. Puedo explicarte el portalapicero, precios, cómo personalizar tu pedido y datos del Mundial 2026.',
  suggestions: ['¿Qué es GoalDesk?', '¿Cuánto cuesta?', '¿Cómo personalizar?'],
};

const WELCOME_AGENT = {
  role: 'assistant',
  content:
    'Hola. Soy el **Agente GoalDesk** con IA autónoma. Puedo calcular precios, buscar selecciones del Mundial y **crear tu pedido** si me das nombre, correo, color y equipo favorito.',
  suggestions: [
    'Quiero uno dorado para Argentina',
    '¿Cuánto cuesta con grabado?',
    'Hazme un pedido',
  ],
};

const TOOL_LABELS = {
  info_producto: 'Info producto',
  listar_colores: 'Colores',
  listar_extras: 'Extras',
  calcular_precio: 'Calcular precio',
  buscar_seleccion: 'Buscar selección',
  info_mundial: 'Mundial 2026',
  crear_pedido: 'Crear pedido',
  consultar_pedidos: 'Consultar pedidos',
};

function formatTime(date) {
  return date.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' });
}

function renderText(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={i} className="gd-chat__line">
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          return part;
        })}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

export default function GoalDeskChat() {
  const [open, setOpen] = useState(false);
  const [agentEnabled, setAgentEnabled] = useState(false);
  const [messages, setMessages] = useState([WELCOME_RULES]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [error, setError] = useState(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    getChatStatus()
      .then(({ data }) => {
        const enabled = Boolean(data.enabled);
        setAgentEnabled(enabled);
        setMessages([enabled ? WELCOME_AGENT : WELCOME_RULES]);
      })
      .catch(() => setMessages([WELCOME_RULES]));
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages, loading]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      const userMsg = {
        role: 'user',
        content: trimmed,
        time: formatTime(new Date()),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setLoading(true);
      setLoadingStatus(agentEnabled ? 'Agente pensando…' : 'Escribiendo…');

      try {
        const history = messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map((m) => ({
            role: m.role,
            content: m.content,
            intent: m.intent,
          }));

        const { data } = await postChatMessage(trimmed, history);

        if (data.toolsUsed?.length) {
          setLoadingStatus(`Ejecutando: ${data.toolsUsed[data.toolsUsed.length - 1]}…`);
        }

        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.reply,
            suggestions: data.suggestions ?? [],
            action: data.action,
            intent: data.intent,
            engine: data.engine,
            toolsUsed: data.toolsUsed ?? [],
            orderCreated: data.orderCreated,
            time: formatTime(new Date()),
          },
        ]);
      } catch {
        setError('No pudimos conectar con el asistente. Verifica que el backend esté encendido.');
      } finally {
        setLoading(false);
        setLoadingStatus('');
      }
    },
    [loading, messages, agentEnabled]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const lastSuggestions =
    [...messages].reverse().find((m) => m.role === 'assistant' && m.suggestions?.length)
      ?.suggestions ?? (agentEnabled ? WELCOME_AGENT.suggestions : WELCOME_RULES.suggestions);

  return (
    <div className="gd-chat" aria-live="polite">
      <AnimatePresence>
        {open && (
          <motion.div
            className="gd-chat__panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-label="Asistente GoalDesk"
          >
            <header className="gd-chat__header">
              <div className="gd-chat__header-info">
                <span className="gd-chat__avatar" aria-hidden>
                  <FeatureIcon name="ball" className="h-5 w-5 text-[var(--color-gold)]" />
                </span>
                <div>
                  <p className="gd-chat__title">
                    {agentEnabled ? 'Agente GoalDesk IA' : 'Asistente GoalDesk'}
                  </p>
                  <p className="gd-chat__status">
                    {loading
                      ? loadingStatus || 'Procesando…'
                      : agentEnabled
                        ? 'IA autónoma · tool-use · UNIFRANZ 2026'
                        : 'En línea · UNIFRANZ 2026'}
                  </p>
                </div>
              </div>
              {agentEnabled && (
                <span className="gd-chat__ai-badge" title="Agente con herramientas API">
                  IA
                </span>
              )}
              <button
                type="button"
                className="gd-chat__close"
                onClick={() => setOpen(false)}
                aria-label="Cerrar chat"
              >
                ×
              </button>
            </header>

            <div className="gd-chat__messages" ref={listRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`gd-chat__msg gd-chat__msg--${msg.role}`}>
                  <div className="gd-chat__bubble">{renderText(msg.content)}</div>

                  {msg.orderCreated && (
                    <div className="gd-chat__order-card" role="status">
                      <p className="gd-chat__order-title">Pedido registrado</p>
                      <p className="gd-chat__order-meta">
                        #{msg.orderCreated.pedidoId} · Bs {msg.orderCreated.precio} ·{' '}
                        {msg.orderCreated.estado}
                      </p>
                    </div>
                  )}

                  {msg.toolsUsed?.length > 0 && (
                    <div className="gd-chat__tools" aria-label="Herramientas ejecutadas">
                      {msg.toolsUsed.map((t) => (
                        <span key={t} className="gd-chat__tool-tag">
                          {TOOL_LABELS[t] || t}
                        </span>
                      ))}
                    </div>
                  )}

                  {msg.action?.href && (
                    <Link
                      to={msg.action.href}
                      className="gd-chat__action"
                      onClick={() => setOpen(false)}
                    >
                      {msg.action.label}
                    </Link>
                  )}
                  {msg.time && (
                    <time className="gd-chat__time" dateTime={msg.time}>
                      {msg.time}
                    </time>
                  )}
                </div>
              ))}
              {loading && (
                <div className="gd-chat__msg gd-chat__msg--assistant">
                  <div className="gd-chat__bubble gd-chat__typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="gd-chat__error" role="alert">
                {error}
              </p>
            )}

            <div className="gd-chat__chips">
              {lastSuggestions.slice(0, 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="gd-chat__chip"
                  disabled={loading}
                  onClick={() => sendMessage(s)}
                >
                  {s}
                </button>
              ))}
            </div>

            <form className="gd-chat__form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  agentEnabled
                    ? 'Ej: Quiero uno azul, Brasil, con grabado…'
                    : 'Pregunta sobre GoalDesk, precios, Mundial…'
                }
                className="gd-chat__input"
                maxLength={500}
                disabled={loading}
                aria-label="Mensaje para el asistente"
              />
              <button
                type="submit"
                className="gd-chat__send"
                disabled={loading || !input.trim()}
                aria-label="Enviar mensaje"
              >
                →
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className={`gd-chat__toggle${open ? ' gd-chat__toggle--open' : ''}${
          agentEnabled ? ' gd-chat__toggle--ai' : ''
        }`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente GoalDesk'}
      >
        <FeatureIcon name="ball" className="h-6 w-6 text-[var(--color-gold)]" />
        {agentEnabled && !open && <span className="gd-chat__toggle-dot" aria-hidden />}
      </button>
    </div>
  );
}
