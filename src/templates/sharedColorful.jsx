// Shared helpers for the colourful templates. Put next to the templates.
// Fonts for index.html: https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&family=Fraunces:wght@400;600&family=Bebas+Neue&family=Poppins:wght@400;500;600;700&display=swap
export const Img = ({ src, alt, className = "" }) =>
  src ? <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} /> : null;

export const pick = (...a) => a.find(Boolean);

// every extra picture the user supplied, in a fixed order
export const gallery = (p) =>
  [p.caseStudy?.image, p.designPhilosophy?.image, p.coreValues?.image1, p.coreValues?.image2, p.personalAesthetic?.image].filter(Boolean);

export const Links = ({ portfolio, className = "" }) => (
  <>
    {portfolio.email && <a className={className} href={`mailto:${portfolio.email}`}>Email</a>}
    {portfolio.socialLinks?.github && <a className={className} href={portfolio.socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>}
    {portfolio.socialLinks?.linkedin && <a className={className} href={portfolio.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
  </>
);

export const philosophy = (p) => [p.designPhilosophy?.text1, p.designPhilosophy?.text2].filter(Boolean);
