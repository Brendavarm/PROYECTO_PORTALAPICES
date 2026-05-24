import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FIFA_FACTS } from '../data/constants';

export default function FifaFactsPanel() {
  const [activeId, setActiveId] = useState(FIFA_FACTS[0]?.id);

  const active = FIFA_FACTS.find((f) => f.id === activeId) ?? FIFA_FACTS[0];

  return (
    <div className="facts-panel mx-auto w-full max-w-3xl">
      <p className="facts-panel__hint text-center text-sm text-muted">
        Toca un tema para leer la curiosidad
      </p>

      <div className="facts-panel__grid mt-6">
        {FIFA_FACTS.map((fact) => {
          const isActive = fact.id === activeId;
          return (
            <button
              key={fact.id}
              type="button"
              onClick={() => setActiveId(fact.id)}
              className={`fact-chip ${isActive ? 'fact-chip--active' : ''}`}
              aria-pressed={isActive}
            >
              {fact.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="facts-panel__detail card card-body mt-8"
        >
          <p className="eyebrow">Curiosidad</p>
          <h3 className="heading-md mt-2">{active.label}</h3>
          <p className="mt-4 text-base leading-relaxed text-muted">{active.text}</p>
          <p className="mt-6 text-xs text-muted">
            {FIFA_FACTS.findIndex((f) => f.id === active.id) + 1} de {FIFA_FACTS.length} temas
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
