// Template 05 — CodeCraft (animated). Dark navy + violet developer portfolio.
// Font: Plus Jakarta Sans
// <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet">
import { useCallback, useEffect, useRef, useState } from "react";
import { Img, Socials } from "./shared";

const font = { fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" };
const EASE = "cubic-bezier(.2,.7,.2,1)";

const CSS = `
@keyframes cc-float{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-40px) scale(1.12)}}
@keyframes cc-spin{to{transform:rotate(360deg)}}
@keyframes cc-marquee{to{transform:translateX(-50%)}}
@keyframes cc-grad{0%{background-position:0% 50%}100%{background-position:200% 50%}}
@keyframes cc-blink{0%,49%{opacity:1}50%,100%{opacity:0}}
@keyframes cc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes cc-pulse{0%{box-shadow:0 0 0 0 rgba(139,92,246,.55)}100%{box-shadow:0 0 0 16px rgba(139,92,246,0)}}
@keyframes cc-shine{from{transform:translateX(-120%) skewX(-20deg)}to{transform:translateX(220%) skewX(-20deg)}}
.cc-r{opacity:0;transition:opacity .9s ${EASE},transform .9s ${EASE}}
.cc-up{transform:translateY(36px)}.cc-left{transform:translateX(-36px)}.cc-right{transform:translateX(36px)}.cc-zoom{transform:scale(.93)}
.cc-r.cc-in{opacity:1;transform:none}
.cc-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding:.1em 0;margin:-.1em 0}
.cc-w>span{display:inline-block;transform:translateY(115%);transition:transform 1s ${EASE}}
.cc-in .cc-w>span{transform:none}
.cc-wipe{clip-path:inset(0 100% 0 0);transition:clip-path 1.2s cubic-bezier(.7,0,.2,1)}
.cc-wipe.cc-in{clip-path:inset(0 0 0 0)}
.cc-grad{background:linear-gradient(90deg,#818cf8,#c084fc,#f472b6,#818cf8);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:cc-grad 6s linear infinite}
.cc-link{background:linear-gradient(90deg,#818cf8,#c084fc) 0 100%/0 2px no-repeat;padding-bottom:3px;transition:background-size .35s ${EASE},color .2s}
.cc-link:hover{background-size:100% 2px;color:#fff}
.cc-dots{background-image:radial-gradient(rgba(255,255,255,.09) 1px,transparent 1px);background-size:24px 24px;-webkit-mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%);mask-image:radial-gradient(ellipse at center,#000 30%,transparent 75%)}
.cc-spot{background:radial-gradient(320px circle at var(--x,50%) var(--y,50%),rgba(139,92,246,.2),transparent 70%)}
.cc-btn{position:relative;overflow:hidden}
.cc-btn::after{content:"";position:absolute;inset:0;width:40%;background:rgba(255,255,255,.35);transform:translateX(-120%) skewX(-20deg)}
.cc-btn:hover::after{animation:cc-shine .8s ease}
@media (prefers-reduced-motion:reduce){
 .cc-r,.cc-w>span,.cc-wipe{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}
 [class*=cc-anim],.cc-grad,.cc-btn:hover::after{animation:none!important}
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
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`cc-r cc-${v} ${seen ? "cc-in" : ""} ${className}`}>{children}</div>;
}

function Title({ as: Tag = "h2", lines, className = "", delay = 0 }) {
  const [ref, seen] = useInView(0.25);
  let n = 0;
  return (
    <Tag ref={ref} aria-label={lines.join(" ")} className={`${className} ${seen ? "cc-in" : ""}`}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block">
          {String(line).split(" ").map((w, j) => (
            <span key={j} className="cc-w mr-[0.22em]"><span style={{ transitionDelay: `${delay + n++ * 70}ms` }}>{w}</span></span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

function Wipe({ children, delay = 0, className = "" }) {
  const [ref, seen] = useInView(0.1);
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`cc-wipe ${seen ? "cc-in" : ""} ${className}`}>{children}</div>;
}

// card with a violet spotlight that follows the cursor
function Card({ children, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <Tag ref={ref} onPointerMove={move} className={`group relative overflow-hidden rounded-xl border border-white/10 bg-white/[.03] transition duration-300 hover:-translate-y-1 hover:border-violet-400/50 ${className}`}>
      <span aria-hidden="true" className="cc-spot pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {children}
    </Tag>
  );
}

function Count({ to }) {
  const [ref, seen] = useInView(0.5);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setV(to);
    let raf, t0;
    const step = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 1100); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{v}</span>;
}

function useTypewriter(text, speed = 70, startDelay = 500) {
  const [out, setOut] = useState("");
  useEffect(() => {
    const full = text || "";
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setOut(full);
    setOut("");
    let i = 0, timer;
    const tick = () => { i++; setOut(full.slice(0, i)); if (i < full.length) timer = setTimeout(tick, speed); };
    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  return out;
}

const Label = ({ children }) => <Reveal v="left"><p className="text-xs font-semibold uppercase tracking-widest text-violet-400">{children}</p></Reveal>;

/* ---------- template ---------- */
function CodeCraftTemplate({ portfolio }) {
  const { name, role, email, profileImage, about, skills, projects, caseStudy, designPhilosophy, coreValues, personalAesthetic, socialLinks } = portfolio;
  const bar = useRef(null), hero = useRef(null);
  const typed = useTypewriter(name, 80, 700);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const heroMove = (e) => {
    const r = hero.current.getBoundingClientRect();
    hero.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    hero.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const cta = "cc-btn rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_-4px_rgba(139,92,246,.8)]";
  const ticker = skills?.length ? skills : [role].filter(Boolean);
  const code = [
    ["const ", "developer", " = {"],
    ["  name: ", JSON.stringify(name || ""), ","],
    ["  role: ", JSON.stringify(role || ""), ","],
    ["  skills: ", JSON.stringify((skills || []).slice(0, 3)), ","],
    ["  available: ", "true", ","],
    ["};", "", ""],
  ];

  return (
    <div style={font} className="min-h-screen overflow-x-clip bg-[#0a0b1e] text-slate-300">
      <style>{CSS}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"><div ref={bar} className="h-full origin-left bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400" style={{ transform: "scaleX(0)" }} /></div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0b1e]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="font-bold text-white"><span className="text-violet-400">&lt;/&gt;</span> {name}</a>
          <nav aria-label="Primary" className="hidden gap-8 text-sm text-slate-400 md:flex">
            {[["about", "About"], ["projects", "Projects"], ["contact", "Contact"]].map(([id, l]) => <a key={id} className="cc-link" href={`#${id}`}>{l}</a>)}
          </nav>
          {email && <a href={`mailto:${email}`} className={cta}>Hire me</a>}
        </div>
      </header>

      <main id="top">
        {/* 01 — HERO */}
        <section ref={hero} onPointerMove={heroMove} className="relative overflow-hidden">
          <div aria-hidden="true" className="cc-dots absolute inset-0" />
          <div aria-hidden="true" className="cc-spot pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="cc-anim absolute -left-24 top-10 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" style={{ animation: "cc-float 14s ease-in-out infinite" }} />
          <div aria-hidden="true" className="cc-anim absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" style={{ animation: "cc-float 17s ease-in-out infinite reverse" }} />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
            <div>
              <Label>01 / Developer</Label>
              <Reveal delay={150}><span className="mt-5 inline-block rounded border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300">{role}</span></Reveal>
              <h1 aria-label={`Hi, I’m ${name}`} className="mt-6 break-words text-5xl font-extrabold leading-tight text-white sm:text-6xl">
                <span aria-hidden="true">Hi, I’m <span className="cc-grad">{typed}</span><span className="cc-anim ml-0.5 inline-block w-[3px] translate-y-1 bg-violet-400" style={{ height: "0.9em", animation: "cc-blink 1s steps(1) infinite" }} /></span>
              </h1>
              {about && <Reveal delay={900}><p className="mt-5 max-w-md leading-relaxed text-slate-400">{about}</p></Reveal>}
              <Reveal delay={1050} className="mt-8 flex flex-wrap gap-3">
                {projects?.length > 0 && <a href="#projects" className={cta}>View my work</a>}
                <Socials portfolio={portfolio} className="rounded-lg border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10" />
              </Reveal>
            </div>

            <div className="relative mx-auto w-full max-w-sm">
              <div aria-hidden="true" className="cc-anim absolute -inset-2 rounded-full bg-[conic-gradient(from_0deg,#818cf8,#c084fc,#f472b6,transparent,#818cf8)] opacity-80 blur-[2px]" style={{ animation: "cc-spin 7s linear infinite" }} />
              <div aria-hidden="true" className="absolute inset-6 rounded-full bg-violet-600/70 blur-sm" />
              <Reveal v="zoom" delay={300}>
                <div className="cc-anim" style={{ animation: "cc-bob 6s ease-in-out infinite" }}>
                  <Img src={profileImage} alt={`Portrait of ${name}`} className="relative aspect-square w-full rounded-full border-4 border-violet-400/40" />
                </div>
              </Reveal>
              <Reveal v="right" delay={900} className="absolute -right-2 bottom-2 z-10 w-[17rem] max-w-[85%] sm:-right-10">
                <div className="cc-anim rounded-lg border border-white/10 bg-[#0d1030]/90 p-4 font-mono text-[11px] leading-5 shadow-xl backdrop-blur" style={{ animation: "cc-bob 7s ease-in-out infinite reverse" }} aria-hidden="true">
                  <div className="mb-2 flex items-center justify-between text-slate-500"><span>&lt;/&gt; Code</span><span className="cc-anim h-2 w-2 rounded-full bg-green-400" style={{ animation: "cc-pulse 2s ease-out infinite" }} /></div>
                  {code.map(([a, b, c], i) => (
                    <Reveal key={i} v="left" delay={1100 + i * 220}>
                      <div className="whitespace-pre-wrap break-words"><span className="text-violet-300">{a}</span><span className="text-amber-300">{b}</span><span className="text-slate-400">{c}</span></div>
                    </Reveal>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ticker */}
        {ticker.length > 0 && (
          <div className="overflow-hidden border-y border-white/10 bg-white/[.02] py-4" aria-hidden="true">
            <div className="cc-anim flex w-max gap-10 whitespace-nowrap text-lg font-bold text-slate-500" style={{ animation: "cc-marquee 30s linear infinite" }}>
              {Array.from({ length: 4 }).flatMap(() => ticker).map((t, i) => <span key={i} className="flex items-center gap-10">{t}<span className="text-violet-500">✦</span></span>)}
            </div>
          </div>
        )}

        {/* 02 — ABOUT */}
        <section id="about" className="border-b border-white/10 bg-white/[.02]">
          <div className="mx-auto max-w-6xl px-5 py-16">
            <Label>02 / About me</Label>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <Title lines={["Building ideas into", "digital products."]} className="text-3xl font-bold text-white" />
                {about && <Reveal delay={300}><p className="mt-5 leading-relaxed text-slate-400">{about}</p></Reveal>}
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10">
                {[["Projects", projects?.length || 0], ["Technologies", skills?.length || 0]].map(([l, n], i) => (
                  <Reveal key={l} v="zoom" delay={i * 150}>
                    <div className="bg-[#0a0b1e] p-6"><p className="text-sm text-slate-400">{l}</p><p className="cc-grad mt-2 text-4xl font-bold"><Count to={n} /></p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 03 — PHILOSOPHY */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Label>03 / Design philosophy</Label>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center gap-5">
              {designPhilosophy?.text1 && <Title as="p" lines={[`“${designPhilosophy.text1}”`]} className="text-3xl font-bold leading-tight text-white sm:text-4xl" />}
              {designPhilosophy?.text2 && <Title as="p" lines={[`“${designPhilosophy.text2}”`]} delay={250} className="text-2xl font-medium leading-tight text-violet-300 sm:text-3xl" />}
            </div>
            <Wipe><Img src={designPhilosophy?.image} alt="Design philosophy" className="aspect-[4/3] rounded-xl" /></Wipe>
          </div>
        </section>

        {/* 04 — VALUES */}
        <section className="border-y border-white/10 bg-white/[.02]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Label>04 / Core values</Label>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {[[coreValues?.image1, "Core value one", "Purpose", "Every technical decision should serve a clear purpose."],
                [coreValues?.image2, "Core value two", "Simplicity", "Clean interfaces and maintainable code create better experiences."]].map(([src, alt, t, d], i) => (
                <Reveal key={t} delay={i * 150}>
                  <Card as="article">
                    <div className="overflow-hidden"><Img src={src} alt={alt} className="aspect-[4/3] transition duration-700 group-hover:scale-105" /></div>
                    <div className="p-6"><span className="text-xs text-violet-400">0{i + 1}</span><h3 className="mt-2 text-xl font-bold text-white">{t}</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">{d}</p></div>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — PROCESS */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Label>05 / From thought to form</Label>
          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <Title lines={["From concept to clean,", "functional code."]} className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:col-span-8" />
            <Reveal delay={350} className="md:col-span-4"><p className="leading-relaxed text-slate-400">I transform ideas into responsive interfaces, reusable components, and practical digital experiences through a structured development process.</p></Reveal>
          </div>
        </section>

        {/* 06 — PROJECTS */}
        <section id="projects" className="mx-auto max-w-6xl px-5 py-20">
          <Label>06 / Featured projects</Label>
          <Title lines={["Some of my recent work"]} className="mb-10 mt-2 text-3xl font-bold text-white" />
          {projects?.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project, index) => (
                <Reveal key={index} delay={index * 140}>
                  <Card as="article" className="h-full">
                    <div className="relative overflow-hidden">
                      <Img src={project.image} alt={project.title} className="aspect-[16/10] w-full transition duration-700 group-hover:scale-110" />
                      <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">{String(index + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true" className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-white opacity-0 transition duration-300 group-hover:rotate-45 group-hover:opacity-100">↗</span>
                    </div>
                    <div className="p-5"><h3 className="font-semibold text-white">{project.title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">{project.description}</p></div>
                  </Card>
                </Reveal>
              ))}
            </div>
          ) : <p className="text-slate-500">No projects added yet.</p>}
        </section>

        {/* 07 — CASE STUDY */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Label>07 / Case study</Label>
          <Reveal v="zoom" className="mt-8">
            <Card>
              <div className="overflow-hidden"><Img src={caseStudy?.image} alt={caseStudy?.title || "Case study"} className="aspect-video w-full transition duration-700 group-hover:scale-105" /></div>
              <div className="grid gap-8 p-7 md:grid-cols-2">
                <Title lines={[caseStudy?.title || "Selected case study"]} className="text-3xl font-bold text-white" />
                <p className="leading-relaxed text-slate-400">{caseStudy?.description}</p>
              </div>
            </Card>
          </Reveal>
        </section>

        {/* 08 — TOOLS */}
        <section id="skills" className="border-y border-white/10 bg-white/[.02]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Label>08 / Creative tools</Label>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              <div>
                <Title lines={["Technologies I work with"]} className="text-3xl font-bold text-white" />
                <Reveal delay={250}><p className="mt-4 leading-relaxed text-slate-400">A practical toolkit for building modern, scalable web experiences.</p></Reveal>
              </div>
              {skills?.length > 0 && (
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {skills.map((skill, index) => (
                    <li key={`${skill}-${index}`}>
                      <Reveal v="zoom" delay={Math.min(index, 9) * 70}>
                        <div className="group rounded-lg border border-white/10 bg-white/[.03] px-4 py-4 text-sm font-medium text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:bg-violet-500/10 hover:text-white">
                          <span className="mr-2 inline-block text-violet-400 transition-transform group-hover:translate-x-0.5">{String(index + 1).padStart(2, "0")}</span>{skill}
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* 09 — AESTHETIC */}
        <section className="mx-auto max-w-6xl px-5 py-20">
          <Label>09 / Personal aesthetic</Label>
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8"><Wipe><Img src={personalAesthetic?.image} alt="Personal aesthetic" className="aspect-video rounded-xl" /></Wipe></div>
            <Title as="p" lines={["Build clean.", "Think clearly.", "Ship confidently."]} delay={250} className="text-3xl font-bold leading-tight text-white md:col-span-4" />
          </div>
        </section>

        {/* 10 — CONTACT */}
        <section id="contact" className="border-t border-white/10 bg-white/[.02]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Label>10 / Contact & social links</Label>
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <Title lines={["Have a project in mind?"]} className="text-3xl font-bold text-white sm:text-4xl" />
                {email && <Reveal delay={300}><a href={`mailto:${email}`} className="cc-link mt-5 block break-all text-xl font-semibold text-violet-300 sm:text-2xl">{email}</a></Reveal>}
              </div>
              <Reveal delay={450} className="flex flex-wrap gap-5 text-sm">
                {socialLinks?.github && <a href={socialLinks.github} target="_blank" rel="noreferrer" className="cc-link text-slate-300">GitHub ↗</a>}
                {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="cc-link text-slate-300">LinkedIn ↗</a>}
              </Reveal>
            </div>
          </div>
        </section>

        {/* 11 — THANK YOU */}
        <section className="relative mx-auto max-w-6xl overflow-hidden px-5 py-24">
          <div aria-hidden="true" className="cc-anim absolute left-1/3 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/20 blur-3xl" style={{ animation: "cc-float 12s ease-in-out infinite" }} />
          <div className="relative">
            <Label>11 / Thank you</Label>
            <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <h2 aria-label="LET'S BUILD." className="text-6xl font-extrabold tracking-tight sm:text-8xl"><Title as="span" lines={["LET'S", "BUILD."]} className="cc-grad block" /></h2>
              <Reveal delay={500} className="flex items-center gap-5 text-sm">
                {[["about", "About"], ["projects", "Projects"], ["contact", "Contact"]].map(([id, l]) => <a key={id} href={`#${id}`} className="cc-link text-slate-400">{l}</a>)}
                <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: "smooth" }); }} className="cc-anim inline-block text-violet-300 hover:text-white" style={{ animation: "cc-bob 2.4s ease-in-out infinite" }}>↑ Top</a>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 px-5 py-6 text-xs text-slate-500 sm:flex-row"><span>{name}</span><span>{role}</span></div>
      </footer>
    </div>
  );
}

export default CodeCraftTemplate;