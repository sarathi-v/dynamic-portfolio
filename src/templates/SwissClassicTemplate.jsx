// Template 03 — Swiss Classic (animated). Font: Archivo. No extra dependencies.
// <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;800&display=swap" rel="stylesheet">
import { useCallback, useEffect, useRef, useState } from "react";

const font = { fontFamily: "Archivo, 'Helvetica Neue', Helvetica, Arial, sans-serif" };
const EASE = "cubic-bezier(.2,.7,.2,1)";

const CSS = `
@keyframes sw-marquee{to{transform:translateX(-50%)}}
@keyframes sw-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes sw-blink{0%,100%{opacity:1}50%{opacity:.2}}
.sw-r{opacity:0;transition:opacity .9s ${EASE},transform .9s ${EASE}}
.sw-up{transform:translateY(32px)}.sw-left{transform:translateX(-32px)}
.sw-r.sw-in{opacity:1;transform:none}
.sw-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding:.1em 0;margin:-.1em 0}
.sw-w>span{display:inline-block;transform:translateY(115%);transition:transform 1s ${EASE}}
.sw-in .sw-w>span{transform:none}
.sw-rule{transform:scaleX(0);transform-origin:left;transition:transform 1.3s cubic-bezier(.7,0,.2,1)}
.sw-rule.sw-in{transform:none}
.sw-wipe{clip-path:inset(0 100% 0 0);transition:clip-path 1.3s cubic-bezier(.7,0,.2,1)}
.sw-wipe.sw-in{clip-path:inset(0 0 0 0)}
.sw-wipe img{transform:scale(1.18);transition:transform 1.8s ${EASE},filter .7s}
.sw-wipe.sw-in img{transform:scale(1)}
.sw-link{background:linear-gradient(#dc2626,#dc2626) 0 100%/0 2px no-repeat;transition:background-size .35s ${EASE},color .2s}
.sw-link:hover{background-size:100% 2px;color:#dc2626}
@media (prefers-reduced-motion:reduce){
 .sw-r,.sw-w>span,.sw-rule,.sw-wipe,.sw-wipe img{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}
 [class*=sw-anim]{animation:none!important}
}`;

/* ---------- helpers ---------- */
function useInView(threshold = 0.15) {
  const [seen, setSeen] = useState(false);
  const io = useRef(null);
  const ref = useCallback((el) => {
    io.current?.disconnect();
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    io.current = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.current.disconnect(); } }, { threshold });
    io.current.observe(el);
  }, [threshold]);
  return [ref, seen];
}

function Reveal({ children, v = "up", delay = 0, className = "" }) {
  const [ref, seen] = useInView();
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`sw-r sw-${v} ${seen ? "sw-in" : ""} ${className}`}>{children}</div>;
}

function Title({ as: Tag = "h2", lines, className = "", delay = 0 }) {
  const [ref, seen] = useInView(0.25);
  let n = 0;
  return (
    <Tag ref={ref} aria-label={lines.join(" ")} className={`${className} ${seen ? "sw-in" : ""}`}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block">
          {String(line).split(" ").map((w, j) => (
            <span key={j} className="sw-w mr-[0.2em]"><span style={{ transitionDelay: `${delay + n++ * 80}ms` }}>{w}</span></span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

// hairline that draws itself; parent must be `relative`
function Rule({ className = "top-0 h-px bg-black", delay = 0 }) {
  const [ref, seen] = useInView(0.01);
  return <div ref={ref} aria-hidden="true" style={{ transitionDelay: `${delay}ms` }} className={`sw-rule absolute left-0 w-full ${className} ${seen ? "sw-in" : ""}`} />;
}

// number that counts up to its value
function Count({ to }) {
  const [ref, seen] = useInView(0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
    let raf, t0;
    const step = (t) => {
      t0 ??= t;
      const p = Math.min(1, (t - t0) / 900);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{String(v).padStart(2, "0")}</span>;
}

// image: wipe-in, greyscale that turns to colour when it reaches screen centre or on hover
function Img({ src, alt, className = "" }) {
  const [ref, seen] = useInView(0.1);
  const [center, setCenter] = useState(false);
  const el = useRef(null);
  const setRefs = useCallback((node) => { el.current = node; ref(node); }, [ref]);
  useEffect(() => {
    if (!el.current || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setCenter(e.isIntersecting), { rootMargin: "-35% 0px -35% 0px" });
    io.observe(el.current);
    return () => io.disconnect();
  }, [src]);
  if (!src) return null;
  return (
    <div ref={setRefs} className={`sw-wipe overflow-hidden ${seen ? "sw-in" : ""} ${className}`}>
      <img src={src} alt={alt} loading="lazy" className={`h-full w-full object-cover ${center ? "grayscale-0" : "grayscale"} hover:grayscale-0`} />
    </div>
  );
}

const Section = ({ n, title, children, id }) => (
  <section id={id} className="relative">
    <Rule className="top-0 h-[2px] bg-black" />
    <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 py-10 sm:px-8 md:grid-cols-12 md:py-16">
      <div className="col-span-4 mb-6 flex gap-4 md:sticky md:top-20 md:col-span-3 md:mb-0 md:block md:self-start">
        <span className="block text-sm font-medium text-red-600"><Count to={parseInt(n, 10)} /></span>
        <Reveal v="left"><h2 className="text-sm font-medium md:mt-1">{title}</h2></Reveal>
      </div>
      <div className="col-span-4 md:col-span-9">{children}</div>
    </div>
  </section>
);

/* ---------- template ---------- */
function SwissClassicTemplate({ portfolio }) {
  const { name, role, email, profileImage, about, skills, projects, caseStudy, designPhilosophy, coreValues, personalAesthetic, socialLinks } = portfolio;
  const num = (i) => String(i + 1).padStart(2, "0");
  const bar = useRef(null);
  const [grid, setGrid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
    };
    const onKey = (e) => { if (e.key.toLowerCase() === "g" && !/input|textarea/i.test(e.target.tagName)) setGrid((g) => !g); };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("keydown", onKey);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("keydown", onKey); };
  }, []);

  const ticker = skills?.length ? skills : [role].filter(Boolean);
  const big = "font-extrabold leading-tight tracking-tight";

  return (
    <div style={font} className="min-h-screen overflow-x-clip bg-white text-black">
      <style>{CSS}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"><div ref={bar} className="h-full origin-left bg-red-600" style={{ transform: "scaleX(0)" }} /></div>
      <div aria-hidden="true" className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-500 ${grid ? "opacity-100" : "opacity-0"}`}>
        <div className="mx-auto grid h-full max-w-7xl grid-cols-4 gap-x-4 px-4 sm:px-8 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => <div key={i} className={`bg-red-500/10 ${i >= 4 ? "hidden md:block" : ""}`} />)}
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm font-medium sm:px-8">
          <span className="flex items-center gap-2"><span aria-hidden="true" className="sw-anim h-2 w-2 bg-red-600" style={{ animation: "sw-blink 2s ease-in-out infinite" }} />{name}</span>
          <nav aria-label="Primary" className="flex items-center gap-5">
            {[["about", "About"], ["work", "Work"], ["contact", "Contact"]].map(([id, l]) => <a key={id} className="sw-link" href={`#${id}`}>{l}</a>)}
            <button type="button" onClick={() => setGrid((g) => !g)} aria-pressed={grid} title="Toggle layout grid (G)" className={`hidden border border-black px-2 py-0.5 text-xs transition sm:block ${grid ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}>Grid</button>
          </nav>
        </div>
        <div className="mx-auto h-px max-w-7xl bg-neutral-200" />
      </header>

      <main>
        {/* 01 — HERO */}
        <section className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 pb-16 pt-10 sm:px-8 md:grid-cols-12 md:pb-24 md:pt-20">
          <div className="col-span-4 md:col-span-9">
            <Reveal v="left"><span className="mb-5 block text-sm font-medium text-red-600">01 / Portfolio</span></Reveal>
            <Title as="h1" lines={[name || ""]} delay={150} className="break-words text-6xl font-extrabold leading-[0.88] tracking-tighter sm:text-8xl lg:text-[9rem]" />
          </div>
          <div className="col-span-4 mt-10 md:col-span-3 md:mt-0">
            <Reveal delay={500}><p className="text-lg font-medium">{role}</p></Reveal>
            <Img src={profileImage} alt={`Portrait of ${name}`} className="mt-6 aspect-[4/5]" />
          </div>
        </section>

        {/* ticker */}
        {ticker.length > 0 && (
          <div className="overflow-hidden bg-black py-4 text-white" aria-hidden="true">
            <div className="sw-anim flex w-max gap-10 whitespace-nowrap text-2xl font-extrabold uppercase tracking-tight sm:text-4xl" style={{ animation: "sw-marquee 32s linear infinite" }}>
              {Array.from({ length: 4 }).flatMap(() => ticker).map((t, i) => <span key={i} className="flex items-center gap-10">{t}<span className="text-red-600">■</span></span>)}
            </div>
          </div>
        )}

        {/* 02 — ABOUT */}
        {about && (
          <Section id="about" n="02" title="About">
            <Reveal><p className="max-w-4xl text-2xl font-medium leading-snug sm:text-3xl md:text-4xl">{about}</p></Reveal>
            {skills?.length > 0 && (
              <div className="mt-12">
                <p className="mb-3 text-sm font-medium text-red-600">Creative Tools</p>
                <ul className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                  <Rule />
                  {skills.map((skill, index) => (
                    <li key={`${skill}-${index}`} className="group relative border-b border-black py-3 text-sm font-medium transition-colors hover:text-red-600">
                      <Stagger i={index}><span className="mr-3 inline-block text-neutral-400 transition-transform group-hover:translate-x-1">{num(index)}</span>{skill}</Stagger>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Section>
        )}

        {/* 03 — PHILOSOPHY */}
        {(designPhilosophy?.text1 || designPhilosophy?.text2 || designPhilosophy?.image) && (
          <Section n="03" title="Design philosophy">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-7">
                {[designPhilosophy?.text1, designPhilosophy?.text2].filter(Boolean).map((t, i) => (
                  <Title key={t} as="p" lines={[t]} delay={i * 200} className={`text-3xl sm:text-4xl md:text-5xl ${big}`} />
                ))}
              </div>
              <Img src={designPhilosophy?.image} alt="Design philosophy" className="aspect-square" />
            </div>
          </Section>
        )}

        {/* 04 — VALUES */}
        <Section n="04" title="Core values">
          <div className="grid gap-6 sm:grid-cols-2">
            {[[coreValues?.image1, "Core value one", "Clarity"], [coreValues?.image2, "Core value two", "Purpose"]].map(([src, alt, t], i) => (
              <div key={t}>
                <Reveal v="left" delay={i * 150}><div className="mb-3 text-sm text-red-600">0{i + 1}</div></Reveal>
                <Img src={src} alt={alt} className="aspect-[4/5]" />
                <Title as="p" lines={[t]} delay={300} className="mt-4 text-xl font-extrabold tracking-tight" />
              </div>
            ))}
          </div>
        </Section>

        {/* 05 — PROCESS */}
        <Section n="05" title="From thought to form">
          <div className="grid gap-8 lg:grid-cols-12">
            <Title as="p" lines={["Ideas become meaningful", "when they are given form."]} className="text-4xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:col-span-8" />
            <Reveal delay={400} className="lg:col-span-4"><p className="text-sm leading-relaxed text-neutral-700">Every project begins with an idea and develops through structure, experimentation, refinement, and a clear visual direction.</p></Reveal>
          </div>
        </Section>

        {/* 06 — PROJECTS */}
        <Section id="work" n="06" title="Featured projects">
          {projects?.length > 0 ? (
            <ol>
              {projects.slice(0, 3).map((project, index) => (
                <li key={index} className="group relative grid gap-5 py-8 transition-colors first:pt-0 hover:bg-neutral-50 sm:grid-cols-5">
                  <Rule className="bottom-0 h-px bg-black" delay={index * 120} />
                  <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-red-600 transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="sm:col-span-1"><span className="text-sm text-neutral-500"><Count to={index + 1} /></span></div>
                  <Reveal v="left" delay={150} className="sm:col-span-2">
                    <h3 className="text-2xl font-extrabold tracking-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-3xl">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-neutral-700">{project.description}</p>
                  </Reveal>
                  <div className="sm:col-span-2"><Img src={project.image} alt={project.title} className="aspect-[4/3]" /></div>
                </li>
              ))}
            </ol>
          ) : <p className="text-neutral-500">No projects added yet.</p>}
        </Section>

        {/* 07 — CASE STUDY */}
        <Section n="07" title="Case study">
          {caseStudy?.title || caseStudy?.description || caseStudy?.image ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <Reveal v="left"><span className="text-sm text-red-600">Selected work</span></Reveal>
                <Title as="h3" lines={[caseStudy?.title || ""]} className="mt-4 text-4xl font-extrabold leading-none tracking-tight sm:text-6xl" />
                {caseStudy?.description && <Reveal delay={350}><p className="mt-6 max-w-lg leading-relaxed text-neutral-700">{caseStudy.description}</p></Reveal>}
              </div>
              <Img src={caseStudy?.image} alt={caseStudy?.title || "Case study"} className="aspect-[4/3]" />
            </div>
          ) : <p className="text-neutral-500">No case study added yet.</p>}
        </Section>

        {/* 08 — TOOLS */}
        <Section n="08" title="Creative tools">
          {skills?.length > 0 ? (
            <div>
              <Title as="p" lines={["A focused toolkit for turning ideas into", "functional and expressive digital experiences."]} className="max-w-2xl text-2xl font-medium leading-snug sm:text-3xl" />
              <div className="relative mt-10 grid sm:grid-cols-2 lg:grid-cols-3">
                <Rule />
                {skills.map((skill, index) => (
                  <Reveal key={`${skill}-tool-${index}`} v="up" delay={Math.min(index, 8) * 70}>
                    <div className="group relative overflow-hidden border-b border-black py-5 pl-1">
                      <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 bg-black transition-transform duration-500 group-hover:scale-y-100" />
                      <span className="relative block text-sm text-red-600">{num(index)}</span>
                      <p className="relative mt-2 text-xl font-extrabold tracking-tight transition-colors duration-500 group-hover:text-white">{skill}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ) : <p className="text-neutral-500">No tools added yet.</p>}
        </Section>

        {/* 09 — AESTHETIC */}
        <Section n="09" title="Personal aesthetic">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8"><Img src={personalAesthetic?.image} alt="Personal aesthetic" className="aspect-[16/9]" /></div>
            <div className="flex items-end lg:col-span-4"><Title as="p" lines={["Less noise.", "More intention."]} delay={300} className={`text-3xl sm:text-4xl ${big}`} /></div>
          </div>
        </Section>

        {/* 10 — CONTACT */}
        <Section id="contact" n="10" title="Contact & social links">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <Reveal v="left"><p className="text-sm text-red-600">Start a conversation</p></Reveal>
              {email && <Reveal delay={150}><a href={`mailto:${email}`} className="sw-link group mt-4 block break-all text-2xl font-extrabold tracking-tight sm:text-4xl">{email} <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span></a></Reveal>}
            </div>
            <div className="flex flex-col gap-4 text-sm font-medium">
              {[["GitHub", socialLinks?.github], ["LinkedIn", socialLinks?.linkedin]].filter(([, h]) => h).map(([l, h], i) => (
                <Reveal key={l} delay={200 + i * 120}>
                  <a href={h} target="_blank" rel="noreferrer" className="group relative flex justify-between pb-2 transition-colors hover:text-red-600">
                    <Rule className="bottom-0 h-px bg-black" delay={i * 150} />{l}<span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* 11 — THANK YOU */}
        <section className="relative bg-black text-white">
          <Rule className="top-0 h-[2px] bg-red-600" />
          <div className="mx-auto grid max-w-7xl grid-cols-4 gap-x-4 px-4 py-16 sm:px-8 md:grid-cols-12 md:py-24">
            <Reveal v="left" className="col-span-4 md:col-span-3"><span className="text-sm font-medium text-red-500">11 / Thank you</span></Reveal>
            <div className="col-span-4 md:col-span-9">
              <Title lines={["THANK", "YOU."]} className="text-5xl font-extrabold leading-[0.9] tracking-tighter sm:text-7xl md:text-8xl" />
              <Reveal delay={500} className="mt-10 flex flex-wrap gap-6 text-sm font-medium">
                {[["about", "About"], ["work", "Work"], ["contact", "Contact"]].map(([id, l]) => <a key={id} href={`#${id}`} className="underline underline-offset-4 transition hover:text-red-500">{l}</a>)}
                <a href="#" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: "smooth" }); }} className="sw-anim ml-auto inline-block transition hover:text-red-500" style={{ animation: "sw-bob 2.4s ease-in-out infinite" }}>↑ Top</a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black px-4 pb-8 text-sm text-white sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-neutral-700 pt-5 sm:flex-row"><span>{name}</span><span>{role}</span></div>
      </footer>
    </div>
  );
}

// small helper so list items in the About grid reveal with a stagger
function Stagger({ i, children }) {
  const [ref, seen] = useInView(0.2);
  return <div ref={ref} style={{ transitionDelay: `${Math.min(i, 8) * 70}ms` }} className={`sw-r sw-up ${seen ? "sw-in" : ""}`}>{children}</div>;
}

export default SwissClassicTemplate;