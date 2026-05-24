import { motion } from 'framer-motion';
import FeatureIcon from '../ui/FeatureIcon';

export default function StatCard({ title, value, subtitle, icon, variant = 'default' }) {
  const cardClass =
    variant === 'admin' ? 'admin-stat-card' : 'glass-gold rounded-xl p-5';

  return (
    <motion.div
      className={cardClass}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p
            className={
              variant === 'admin'
                ? 'admin-stat-card__label'
                : 'text-xs uppercase tracking-wider text-slate-400'
            }
          >
            {title}
          </p>
          <p
            className={
              variant === 'admin'
                ? 'admin-stat-card__value'
                : 'mt-2 break-words font-display text-2xl font-bold text-gold md:text-3xl'
            }
          >
            {value}
          </p>
          {subtitle && (
            <p
              className={
                variant === 'admin'
                  ? 'admin-stat-card__hint'
                  : 'mt-1 text-xs text-slate-500'
              }
            >
              {subtitle}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={
              variant === 'admin' ? 'admin-stat-card__icon-wrap' : 'card-icon-wrap'
            }
          >
            <FeatureIcon
              name={icon}
              className={variant === 'admin' ? 'h-5 w-5' : 'h-5 w-5 text-gold'}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
