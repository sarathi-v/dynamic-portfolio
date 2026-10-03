// Template 04 — Minimal Monochrome (animated). Font: Inter Tight. No extra dependencies.
// <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;600&display=swap" rel="stylesheet">
import { useCallback, useEffect, useRef, useState } from "react";

const font = { fontFamily: "'Inter Tight', system-ui, sans-serif" };
const EASE = "cubic-bezier(.2,.7,.2,1)";

const CSS = `
@keyframes mm-marquee{to{transform:translateX(-50%)}}
@keyframes mm-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.mm-r{opacity:0;transition:opacity 1s ${EASE},transform 1s ${EASE}}
.mm-up{transform:translateY(36px)}.mm-left{transform:translateX(-36px)}
.mm-r.mm-in{opacity:1;transform:none}
.mm-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding:.12em 0 .1em;margin:-.12em 0 -.1em}
.mm-w>span{display:inline-block;transform:translateY(115%);transition:transform 1.1s ${EASE}}
.mm-in .mm-w>span{transform:none}
.mm-rule{transform:scaleX(0);transform-origin:left;transition:transform 1.4s cubic-bezier(.7,0,.2,1)}
.mm-rule.mm-in{transform:none}
.mm-curtain{clip-path:inset(0 0 100% 0);transition:clip-path 1.4s cubic-bezier(.7,0,.2,1)}
.mm-curtain.mm-in{clip-path:inset(0 0 0 0)}
.mm-curtain img{transform:scale(1.22);transition:transform 2s ${EASE},filter .8s}
.mm-curtain.mm-in img{transform:scale(1)}
.mm-curtain.mm-in:hover img{transform:scale(1.05);transition-duration:1.2s}
.mm-list:hover .mm-row{opacity:.3}.mm-list .mm-row:hover{opacity:1}
.mm-row{transition:opacity .4s}
.mm-marq:hover{animation-play-state:paused}
.mm-outline{-webkit-text-stroke:1px #000;color:transparent;transition:color .3s}
.mm-outline:hover{color:#000}
.mm-dot{mix-blend-mode:difference}
.mm-dot i{display:block;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:9999px;background:#fff;transition:transform .35s ${EASE}}
.mm-dot[data-hot="1"] i{transform:scale(4.5)}
.mm-fine,.mm-fine *{cursor:none!important}
@media (prefers-reduced-motion:reduce){
 .mm-r,.mm-w>span,.mm-rule,.mm-curtain,.mm-curtain img{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}
 [class*=mm-anim]{animation:none!important}
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
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`mm-r mm-${v} ${seen ? "mm-in" : ""} ${className}`}>{children}</div>;
}

// masked headline: by word (default) or by character
function Title({ as: Tag = "h2", lines, by = "word", className = "", delay = 0, style }) {
  const [ref, seen] = useInView(0.2);
  let n = 0;
  const step = by === "char" ? 35 : 80;
  return (
    <Tag ref={ref} style={style} aria-label={lines.join(" ")} className={`${className} ${seen ? "mm-in" : ""}`}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block">
          {String(line).split(" ").map((w, j) => (
            <span key={j} className="mr-[0.2em] inline-block whitespace-nowrap">
              {(by === "char" ? w.split("") : [w]).map((c, k) => (
                <span key={k} className="mm-w"><span style={{ transitionDelay: `${delay + n++ * step}ms` }}>{c}</span></span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

function Rule({ className = "top-0 bg-neutral-300", delay = 0 }) {
  const [ref, seen] = useInView(0.01);
  return <div ref={ref} aria-hidden="true" style={{ transitionDelay: `${delay}ms` }} className={`mm-rule absolute left-0 h-px w-full ${className} ${seen ? "mm-in" : ""}`} />;
}

// image: curtain reveal + scroll parallax; greyscale until hover
function Img({ src, alt, className = "" }) {
  const [ref, seen] = useInView(0.1);
  const box = useRef(null), par = useRef(null);
  const setRefs = useCallback((n) => { box.current = n; ref(n); }, [ref]);
  useEffect(() => {
    if (!src || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = box.current?.getBoundingClientRect();
        if (r && par.current) par.current.style.transform = `translateY(${((r.top + r.height / 2 - innerHeight / 2) / innerHeight) * -22}px)`;
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => { removeEventListener("scroll", update); cancelAnimationFrame(raf); };
  }, [src]);
  if (!src) return null;
  return (
    <div ref={setRefs} className={`mm-curtain relative overflow-hidden bg-neutral-100 ${seen ? "mm-in" : ""} ${className}`}>
      <div ref={par} className="-mt-[7%] h-[114%] w-full will-change-transform">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover grayscale hover:grayscale-0" />
      </div>
    </div>
  );
}

const SectionLabel = ({ number, title }) => (
  <div className="relative mb-8 flex items-center justify-between pt-4">
    <Rule />
    <Reveal v="left"><span className="text-xs text-neutral-400">{number}</span></Reveal>
    <Reveal><span className="text-xs uppercase tracking-[0.2em] text-neutral-500">{title}</span></Reveal>
  </div>
);

/* ---------- template ---------- */
function MinimalMonochromeTemplate({ portfolio }) {
  const { name, role, email, profileImage, about, skills, projects, caseStudy, designPhilosophy, coreValues, personalAesthetic, socialLinks } = portfolio;
  const bar = useRef(null), dot = useRef(null), heroName = useRef(null);
  const [fine, setFine] = useState(false);
  const [sec, setSec] = useState(1);
  const under = "underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-black";

  // scroll bar, hero drift, section counter
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
      if (heroName.current) heroName.current.style.transform = `translateX(${-Math.min(60, h.scrollTop * 0.06)}px)`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setSec(+e.target.dataset.sec)), { rootMargin: "-50% 0px -50% 0px" });
      document.querySelectorAll("[data-sec]").forEach((s) => io.observe(s));
    }
    return () => { removeEventListener("scroll", onScroll); io?.disconnect(); };
  }, []);

  // inverting cursor dot (desktop only)
  useEffect(() => {
    if (matchMedia("(hover: none)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setFine(true);
    let x = -100, y = -100, cx = -100, cy = -100, raf;
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current?.setAttribute("data-hot", e.target.closest?.("a,button,[data-hot]") ? "1" : "0");
    };
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      if (dot.current) dot.current.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(raf); setFine(false); };
  }, []);

  const ticker = skills?.length ? skills : [role].filter(Boolean);
  const wrap = "px-5 sm:px-10";

  return (
    <div style={font} className={`min-h-screen overflow-x-clip bg-white text-black ${fine ? "mm-fine" : ""}`}>
      <style>{CSS}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"><div ref={bar} className="h-full origin-left bg-black" style={{ transform: "scaleX(0)" }} /></div>
      {fine && <div ref={dot} data-hot="0" aria-hidden="true" className="mm-dot pointer-events-none fixed left-0 top-0 z-[70]"><i /></div>}
      <div aria-hidden="true" className="pointer-events-none fixed bottom-5 left-5 z-50 text-xs tabular-nums text-white mix-blend-difference sm:left-10">{String(sec).padStart(2, "0")} / 11</div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur">
        <div className={`flex items-center justify-between py-6 text-sm ${wrap}`}>
          <span className="font-semibold">{name}</span>
          <nav aria-label="Primary" className="flex gap-5">{[["work", "Work"], ["about", "About"], ["contact", "Contact"]].map(([id, l]) => <a key={id} href={`#${id}`} className={under}>{l}</a>)}</nav>
        </div>
      </header>

      <main>
        {/* 01 — HERO */}
        <section data-sec="1" className={`${wrap} pb-16 pt-16 sm:pt-28`}>
          <SectionLabel number="01" title="Profile" />
          <div ref={heroName} className="will-change-transform">
            <Title as="h1" by="char" lines={[name || ""]} delay={150} className="break-words text-[17vw] font-light leading-[0.82] tracking-tighter sm:text-[13vw]" />
          </div>
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <Reveal delay={700}>
              <p className="text-xl text-neutral-500 sm:text-2xl">{role}</p>
              <p className="mt-3 text-sm text-neutral-400">Portfolio / Selected work</p>
            </Reveal>
            {profileImage && <Img src={profileImage} alt={`Portrait of ${name}`} className="aspect-square w-32 sm:w-44" />}
          </div>
        </section>

        {/* ticker */}
        {ticker.length > 0 && (
          <div className="overflow-hidden border-y border-neutral-300 py-6" aria-hidden="true">
            <div className="mm-anim mm-marq flex w-max gap-12 whitespace-nowrap text-[9vw] font-light leading-none tracking-tighter sm:text-[7vw]" style={{ animation: "mm-marquee 38s linear infinite" }}>
              {Array.from({ length: 4 }).flatMap(() => ticker).map((t, i) => <span key={i} className="mm-outline">{t}</span>)}
            </div>
          </div>
        )}

        {/* 02 — ABOUT */}
        <section id="about" data-sec="2" className={`${wrap} py-24`}>
          <SectionLabel number="02" title="About me" />
          {about && <Reveal><p className="max-w-5xl text-3xl font-light leading-tight sm:text-5xl md:text-6xl">{about}</p></Reveal>}
          {skills?.length > 0 && (
            <div className="mt-14 max-w-4xl">
              <Reveal v="left"><p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">Skills</p></Reveal>
              <div className="relative flex flex-wrap gap-x-6 gap-y-3 pt-5">
                <Rule />
                {skills.map((skill, index) => <Reveal key={`${skill}-${index}`} delay={Math.min(index, 8) * 70}><span className="text-lg font-light transition-colors hover:text-neutral-400">{skill}</span></Reveal>)}
              </div>
            </div>
          )}
        </section>

        {/* 03 — PHILOSOPHY */}
        <section data-sec="3" className={`bg-neutral-100 ${wrap} py-24`}>
          <SectionLabel number="03" title="Design philosophy" />
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-7">
              {designPhilosophy?.text1 && <Title as="p" lines={[designPhilosophy.text1]} className="text-3xl font-light leading-tight sm:text-5xl" />}
              {designPhilosophy?.text2 && <Title as="p" lines={[designPhilosophy.text2]} delay={250} className="text-3xl font-light leading-tight text-neutral-500 sm:text-5xl" />}
            </div>
            <Img src={designPhilosophy?.image} alt="Design philosophy" className="aspect-[4/3]" />
          </div>
        </section>

        {/* 04 — VALUES */}
        <section data-sec="4" className={`${wrap} py-24`}>
          <SectionLabel number="04" title="Core values" />
          <div className="grid gap-px bg-neutral-300 sm:grid-cols-2">
            {[[coreValues?.image1, "Core value one", "Thoughtful by design."], [coreValues?.image2, "Core value two", "Purpose over noise."]].map(([src, alt, t], i) => (
              <div key={t} className="bg-white p-5">
                <Reveal v="left" delay={i * 150}><span className="text-xs text-neutral-400">0{i + 1}</span></Reveal>
                <Img src={src} alt={alt} className="mt-5 aspect-[4/5]" />
                <Title as="p" lines={[t]} delay={300} className="mt-5 text-xl font-light" />
              </div>
            ))}
          </div>
        </section>

        {/* 05 — PROCESS */}
        <section data-sec="5" className={`${wrap} py-24`}>
          <SectionLabel number="05" title="From thought to form" />
          <div className="grid gap-10 md:grid-cols-12">
            <Title lines={["Ideas become visible through structure, rhythm and restraint."]} className="text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl md:col-span-8" />
            <Reveal delay={400} className="md:col-span-4 md:pt-3"><p className="leading-relaxed text-neutral-500">I approach each project by reducing complexity, finding the essential idea, and translating it into a clear visual language.</p></Reveal>
          </div>
        </section>

        {/* 06 — PROJECTS */}
        <section id="work" data-sec="6" className={`${wrap} pb-24`}>
          <SectionLabel number="06" title="Featured projects" />
          {projects?.length > 0 ? (
            <ul className="mm-list relative">
              <Rule className="top-0 bg-neutral-300" />
              {projects.slice(0, 3).map((project, index) => (
                <li key={index} className="mm-row group relative grid gap-6 py-10 md:grid-cols-12">
                  <Rule className="bottom-0 bg-neutral-300" delay={index * 120} />
                  <div className="md:col-span-1"><Reveal v="left"><span className="text-xs text-neutral-400">0{index + 1}</span></Reveal></div>
                  <Title lines={[project.title || ""]} className="text-4xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-3 sm:text-6xl md:col-span-5" />
                  <Reveal delay={250} className="md:col-span-3"><p className="text-neutral-500">{project.description}</p></Reveal>
                  <Img src={project.image} alt={project.title} className="aspect-[4/3] md:col-span-3" />
                </li>
              ))}
            </ul>
          ) : <p className="text-neutral-500">No projects added yet.</p>}
        </section>

        {/* 07 — CASE STUDY */}
        <section data-sec="7" className={`${wrap} py-24`}>
          <SectionLabel number="07" title="Case study" />
          <Img src={caseStudy?.image} alt={caseStudy?.title || "Case study"} className="aspect-[16/9] w-full" />
          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <Title lines={[caseStudy?.title || "Selected case study"]} className="text-4xl font-light tracking-tight sm:text-6xl md:col-span-7" />
            <Reveal delay={300} className="max-w-md md:col-span-4 md:col-start-9"><p className="text-neutral-500">{caseStudy?.description}</p></Reveal>
          </div>
        </section>

        {/* 08 — TOOLS */}
        <section data-sec="8" className={`bg-neutral-100 ${wrap} py-24`}>
          <SectionLabel number="08" title="Creative tools" />
          <div className="grid gap-10 md:grid-cols-12">
            <Title as="p" lines={["A focused toolkit for creating useful, expressive digital experiences."]} className="text-3xl font-light leading-tight sm:text-5xl md:col-span-7" />
            {skills?.length > 0 && (
              <ul className="mm-list relative md:col-span-4 md:col-start-9">
                <Rule />
                {skills.map((skill, index) => (
                  <li key={`${skill}-tool-${index}`} className="mm-row">
                    <Reveal delay={Math.min(index, 8) * 70}>
                      <div className="group flex justify-between border-b border-neutral-300 py-3 text-sm">
                        <span className="transition-transform duration-500 group-hover:translate-x-2">{skill}</span>
                        <span className="text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* 09 — AESTHETIC */}
        <section data-sec="9" className={`${wrap} py-24`}>
          <SectionLabel number="09" title="Personal aesthetic" />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8"><Img src={personalAesthetic?.image} alt="Personal aesthetic" className="aspect-[16/9]" /></div>
            <Title as="p" lines={["Quiet details.", "Clear intention.", "Lasting impact."]} delay={300} className="text-3xl font-light leading-tight sm:text-4xl lg:col-span-4" />
          </div>
        </section>

        {/* 10 — CONTACT */}
        <section id="contact" data-sec="10" className={`${wrap} py-24`}>
          <SectionLabel number="10" title="Contact & social links" />
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-8">
              <Reveal v="left"><p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-400">Get in touch</p></Reveal>
              {email && <Reveal delay={150}><a href={`mailto:${email}`} className="block break-all text-4xl font-light tracking-tight transition-colors hover:text-neutral-500 sm:text-7xl">{email}</a></Reveal>}
            </div>
            <div className="flex flex-col gap-4 text-sm md:col-span-3 md:col-start-10">
              {[["GitHub", socialLinks?.github], ["LinkedIn", socialLinks?.linkedin]].filter(([, h]) => h).map(([l, h], i) => (
                <Reveal key={l} delay={300 + i * 120}><a className={under} href={h} target="_blank" rel="noreferrer">{l} ↗</a></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 11 — THANK YOU */}
        <section data-sec="11" className={`${wrap} py-24 sm:py-32`}>
          <SectionLabel number="11" title="Thank you" />
          <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
            <Title by="char" lines={["THANK", "YOU."]} className="text-[18vw] font-light leading-[0.8] tracking-tighter sm:text-[13vw]" />
            <Reveal delay={600} className="flex items-center gap-6 text-sm">
              {[["about", "About"], ["work", "Work"], ["contact", "Contact"]].map(([id, l]) => <a key={id} href={`#${id}`} className={under}>{l}</a>)}
              <a href="#" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: "smooth" }); }} className={`mm-anim ${under} inline-block`} style={{ animation: "mm-bob 2.4s ease-in-out infinite" }}>↑ Top</a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className={`relative flex flex-col justify-between gap-3 py-6 text-xs text-neutral-500 sm:flex-row ${wrap}`}>
        <Rule /><span>{name}</span><span>{role}</span>
      </footer>
    </div>
  );
}

export default MinimalMonochromeTemplate;