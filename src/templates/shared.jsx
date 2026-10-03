// Shared helpers for the modern templates. Copy next to the templates.
export const Img = ({ src, alt, className = "" }) =>
  src ? <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} /> : null;
export const Socials = ({ portfolio, className = "" }) =>
  [["GitHub", portfolio.socialLinks?.github], ["LinkedIn", portfolio.socialLinks?.linkedin]]
    .filter(([, u]) => u)
    .map(([l, u]) => <a key={l} href={u} target="_blank" rel="noreferrer" className={className}>{l}</a>);
export const philosophy = (p) => [p.designPhilosophy?.text1, p.designPhilosophy?.text2].filter(Boolean);
export const gallery = (p) =>
  [[p.coreValues?.image1, "Core value one"], [p.coreValues?.image2, "Core value two"], [p.personalAesthetic?.image, "Personal aesthetic"], [p.designPhilosophy?.image, "Design philosophy"]]
    .filter(([s]) => s);
