export default function PageHeader({ eyebrow, title, highlight, description, center = true }) {
  const align = center ? 'text-center mx-auto' : '';

  return (
    <header className={`section-header-spacing w-full max-w-2xl ${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`heading-lg ${eyebrow ? 'mt-3' : 'mt-0'}`}>
        {title}
        {highlight && (
          <>
            {' '}
            <span className="accent-word">{highlight}</span>
          </>
        )}
      </h2>
      {description && <p className={`text-lead ${center ? 'mx-auto' : ''} mt-5`}>{description}</p>}
    </header>
  );
}
