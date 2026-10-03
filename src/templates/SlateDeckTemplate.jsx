// Template 08 — Slate Deck (animated)
// Charcoal presentation deck. Font: Montserrat
import { useEffect, useRef, useState } from "react";
import { Img, Socials } from "./shared";

const font = { fontFamily: "Montserrat, system-ui, sans-serif" };
const slideCls = "relative overflow-hidden bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-6 sm:p-12";
const BEIGE = "bg-[#dccfc0]";

/* ---------- motion styles (no libraries) ---------- */
const CSS = `
.sd-r{opacity:0;transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1),clip-path 1.1s cubic-bezier(.7,0,.2,1)}
.sd-up{transform:translateY(40px)}.sd-left{transform:translateX(-56px)}.sd-right{transform:translateX(56px)}.sd-zoom{transform:scale(.94)}
.sd-wipe{opacity:1;clip-path:inset(0 100% 0 0)}
.sd-r.sd-in{opacity:1;transform:none}.sd-wipe.sd-in{clip-path:inset(0 0 0 0)}
.sd-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.08em}
.sd-w>span{display:inline-block;transform:translateY(110%);transition:transform .9s cubic-bezier(.2,.7,.2,1)}
.sd-in .sd-w>span{transform:none}
.sd-rule{transform:scaleX(0);transform-origin:left;transition:transform 1.1s cubic-bezier(.7,0,.2,1) .2s}
.sd-in .sd-rule,.sd-rule.sd-in{transform:none}
@keyframes sd-float{0%,100%{transform:translate(0,0)}50%{transform:translate(10px,-12px)}}
@keyframes sd-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes sd-ping{0%{box-shadow:0 0 0 0 rgba(220,207,192,.65)}100%{box-shadow:0 0 0 20px rgba(220,207,192,0)}}
@keyframes sd-sheen{from{background-position:-200% 0}to{background-position:200% 0}}
.sd-float{animation:sd-float 7s ease-in-out infinite}
.sd-bob{animation:sd-bob 2.4s ease-in-out infinite}
.sd-ping{animation:sd-ping 2s ease-out infinite}
.sd-sheen{background-image:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.12) 50%,transparent 65%);background-size:200% 100%;animation:sd-sheen 5s linear infinite}
@media (prefers-reduced-motion:reduce){
 .sd-r,.sd-w>span,.sd-rule{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}
 .sd-float,.sd-bob,.sd-ping,.sd-sheen{animation:none!important}
}`;

/* ---------- hooks & motion helpers ---------- */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return setSeen(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

// v: up | left | right | zoom | wipe
function Reveal({ children, v = "up", delay = 0, className = "" }) {
  const [ref, seen] = useInView();
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`sd-r sd-${v} ${seen ? "sd-in" : ""} ${className}`}>{children}</div>;
}

// word-by-word headline reveal
function Title({ as: Tag = "h2", lines, className = "", delay = 0 }) {
  const [ref, seen] = useInView(0.3);
  let n = 0;
  return (
    <Tag ref={ref} aria-label={lines.join(" ")} className={`${className} ${seen ? "sd-in" : ""}`}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block">
          {line.split(" ").map((w, j) => (
            <span key={j} className="sd-w mr-[0.25em]"><span style={{ transitionDelay: `${delay + n++ * 80}ms` }}>{w}</span></span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

// gentle scroll parallax
function Parallax({ children, amount = 28 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = ref.current?.getBoundingClientRect();
        if (r) ref.current.style.transform = `translateY(${((r.top + r.height / 2 - innerHeight / 2) / innerHeight) * -amount}px)`;
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => { removeEventListener("scroll", update); cancelAnimationFrame(raf); };
  }, [amount]);
  return <div ref={ref}>{children}</div>;
}

// 3D tilt on hover (desktop only)
function Tilt({ children }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `perspective(900px) rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 8}deg) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 8}deg)`;
  };
  return <div ref={ref} onPointerMove={move} onPointerLeave={() => (ref.current.style.transform = "")} style={{ transition: "transform .25s ease-out" }}>{children}</div>;
}

const SectionLabel = ({ number, children }) => (
  <Reveal v="left" className="mb-5">
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">{number} / {children}</p>
  </Reveal>
);

function Slide({ id, name, role, children, className = "" }) {
  const [ref, seen] = useInView(0.06);
  return (
    <section id={id} data-slide ref={ref} className={`${slideCls} sd-r sd-zoom ${seen ? "sd-in" : ""} ${className}`}>
      <div className="relative mb-8 flex justify-between pb-4 text-[11px] font-semibold uppercase tracking-wider text-neutral-300 sm:mb-12">
        <span>{name}</span>
        <span className="font-normal">{role}</span>
        <i aria-hidden="true" className="sd-rule absolute bottom-0 left-0 h-px w-full bg-white/25" />
      </div>
      {children}
    </section>
  );
}

const NAV = [["top", "Profile"], ["about", "About"], ["philosophy", "Philosophy"], ["values", "Values"], ["process", "Process"], ["work", "Projects"], ["case", "Case study"], ["tools", "Tools"], ["aesthetic", "Aesthetic"], ["contact", "Contact"], ["thanks", "Thanks"]];

/* ---------- template ---------- */
function SlateDeckTemplate({ portfolio }) {
  const { name, role, email, profileImage, about, skills, projects, caseStudy, designPhilosophy, coreValues, personalAesthetic } = portfolio;
  const [active, setActive] = useState("top");
  const bar = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    if (!("IntersectionObserver" in window)) return () => removeEventListener("scroll", onScroll);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll("[data-slide]").forEach((s) => io.observe(s));
    return () => { removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const p = { name, role };
  const h2 = "text-3xl font-extrabold uppercase text-white sm:text-5xl";

  return (
    <div style={font} className="min-h-screen overflow-x-hidden bg-neutral-800 p-3 text-neutral-200 sm:p-8">
      <style>{CSS}</style>
      <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-1"><div ref={bar} className={`h-full origin-left ${BEIGE}`} style={{ transform: "scaleX(0)" }} /></div>

      <nav aria-label="Slides" className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} aria-label={`Go to ${label}`} aria-current={active === id ? "true" : undefined} className="group flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-300 opacity-0 transition group-hover:opacity-100">{label}</span>
            <span className={`block w-1.5 rounded-full transition-all duration-300 ${active === id ? `h-6 ${BEIGE}` : "h-1.5 bg-neutral-500 group-hover:bg-neutral-300"}`} />
          </a>
        ))}
      </nav>

      <main className="mx-auto max-w-5xl space-y-4 sm:space-y-8">
        {/* 01 — PROFILE */}
        <Slide id="top" {...p} className="min-h-[600px]">
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <SectionLabel number="01">Profile</SectionLabel>
              <Reveal delay={100}><p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-400">Portfolio</p></Reveal>
              <Title as="h1" lines={[name || ""]} delay={200} className="break-words text-4xl font-extrabold uppercase leading-tight text-white sm:text-6xl" />
              <div className="my-6 h-0.5 w-20 bg-white sd-rule" style={{ transitionDelay: "700ms" }} />
              <Reveal delay={600}><p className="text-sm font-semibold uppercase">{role}</p></Reveal>
              {about && <Reveal delay={750}><p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">{about}</p></Reveal>}
            </div>
            {profileImage && (
              <div className="relative pb-4 pr-4">
                <Reveal v="right" delay={300} className={`absolute -top-4 left-8 h-full w-3/4 ${BEIGE}`} />
                <Reveal v="wipe" delay={250}><Parallax><Img src={profileImage} alt={`Portrait of ${name}`} className="relative aspect-[4/3] w-full" /></Parallax></Reveal>
              </div>
            )}
          </div>
        </Slide>

        {/* 02 — ABOUT */}
        <Slide id="about" {...p}>
          <SectionLabel number="02">About me</SectionLabel>
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <Title lines={["About"]} className={h2} />
              <Reveal delay={200}><p className="mt-6 border-l-2 border-white pl-4 text-sm font-semibold uppercase">{name}</p></Reveal>
              {about && <Reveal delay={350}><p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-300">{about}</p></Reveal>}
            </div>
            <Reveal v="right" delay={150} className={`${BEIGE} p-2 md:col-span-5`}>
              {profileImage && <Parallax amount={18}><Img src={profileImage} alt={`Portrait of ${name}`} className="aspect-[3/4] w-full" /></Parallax>}
            </Reveal>
          </div>
        </Slide>

        {/* 03 — DESIGN PHILOSOPHY */}
        <Slide id="philosophy" {...p}>
          <SectionLabel number="03">Design philosophy</SectionLabel>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Title lines={["Design Philosophy"]} className="text-2xl font-extrabold uppercase text-white sm:text-4xl" />
              <div className="mt-8 space-y-5">
                {[designPhilosophy?.text1, designPhilosophy?.text2].filter(Boolean).map((t, i) => (
                  <Reveal key={i} v="left" delay={200 + i * 200}>
                    <p className="border-l-2 border-[#dccfc0] pl-5 text-xl font-semibold leading-relaxed text-white sm:text-2xl">{t}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            {designPhilosophy?.image && (
              <div className="relative">
                <Reveal v="zoom" delay={300} className={`sd-float absolute -bottom-4 -left-4 h-24 w-24 ${BEIGE}`} />
                <Reveal v="wipe"><Img src={designPhilosophy.image} alt="Design philosophy" className="relative aspect-[4/3] w-full" /></Reveal>
              </div>
            )}
          </div>
        </Slide>

        {/* 04 — CORE VALUES */}
        <Slide id="values" {...p}>
          <SectionLabel number="04">Core values</SectionLabel>
          <Title lines={["Core Values"]} className="text-2xl font-extrabold uppercase text-white sm:text-4xl" />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {[[coreValues?.image1, "Core value one", "Purpose"], [coreValues?.image2, "Core value two", "Creativity"]].map(([src, alt, label], i) => (
              <Reveal key={i} delay={i * 200} className={i ? "md:mt-8" : ""}>
                <div className="group border border-neutral-700 bg-black/30 p-4 transition duration-300 hover:-translate-y-1 hover:border-[#dccfc0]">
                  {src && <div className="overflow-hidden"><Img src={src} alt={alt} className="aspect-[4/3] w-full transition duration-700 group-hover:scale-105" /></div>}
                  <div className="mt-5"><span className="text-xs text-neutral-500">0{i + 1}</span><h3 className="mt-1 text-lg font-extrabold uppercase text-white">{label}</h3></div>
                </div>
              </Reveal>
            ))}
          </div>
        </Slide>

        {/* 05 — FROM THOUGHT TO FORM */}
        <Slide id="process" {...p}>
          <SectionLabel number="05">From thought to form</SectionLabel>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Title lines={["From Thought", "To Form"]} className={h2} />
              <Reveal delay={300}><p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">Ideas become meaningful when they are shaped with intention, structure, and attention to detail.</p></Reveal>
            </div>
            <div className="grid gap-3">
              {[["Think", "Understand the idea, audience, and purpose."], ["Shape", "Develop the concept into a clear visual direction."], ["Create", "Build the final experience with precision."]].map(([t, d], i) => (
                <Reveal key={t} v="right" delay={i * 180}>
                  <div className="group border-l-4 border-[#dccfc0] bg-neutral-800 p-5 transition duration-300 hover:translate-x-2 hover:bg-neutral-700">
                    <span className="text-xs text-neutral-500">0{i + 1}</span>
                    <h3 className="mt-2 font-extrabold uppercase text-white">{t}</h3>
                    <p className="mt-2 text-sm text-neutral-400">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Slide>

        {/* 06 — FEATURED PROJECTS */}
        <Slide id="work" {...p}>
          <SectionLabel number="06">Featured projects</SectionLabel>
          <div className="flex flex-col gap-6 md:flex-row">
            <Title lines={["Projects"]} className="text-2xl font-extrabold uppercase text-white md:rotate-180 md:text-3xl md:[writing-mode:vertical-rl]" />
            {projects?.length > 0 ? (
              <div className="grid flex-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 3).map((project, index) => (
                  <Reveal key={index} delay={index * 150}>
                    <Tilt>
                      <article className="group">
                        <div className={`overflow-hidden ${BEIGE} p-1`}>
                          <Img src={project.image} alt={project.title} className="aspect-[3/4] w-full transition duration-700 group-hover:scale-110" />
                        </div>
                        <div className="mt-4">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500">Project {String(index + 1).padStart(2, "0")}</span>
                          <h3 className="relative mt-2 inline-block text-sm font-extrabold uppercase text-white after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#dccfc0] after:transition-all after:duration-500 group-hover:after:w-full">{project.title}</h3>
                          <p className="mt-1 text-xs leading-relaxed text-neutral-400">{project.description}</p>
                        </div>
                      </article>
                    </Tilt>
                  </Reveal>
                ))}
              </div>
            ) : <p className="text-sm text-neutral-500">No projects added yet.</p>}
          </div>
        </Slide>

        {/* 07 — CASE STUDY */}
        <Slide id="case" {...p}>
          <SectionLabel number="07">Case study</SectionLabel>
          <div className="mt-5 grid items-center gap-8 md:grid-cols-2">
            {caseStudy?.image && <Reveal v="left" className={`${BEIGE} p-2`}><div className="overflow-hidden"><Img src={caseStudy.image} alt={caseStudy.title || "Case study"} className="aspect-[4/3] w-full transition duration-700 hover:scale-105" /></div></Reveal>}
            <div>
              <Title lines={[caseStudy?.title || "Case Study"]} className={h2} />
              <div className={`my-6 h-0.5 w-16 ${BEIGE} sd-rule`} style={{ transitionDelay: "500ms" }} />
              {caseStudy?.description && <Reveal delay={400}><p className="max-w-xl text-sm leading-relaxed text-neutral-300">{caseStudy.description}</p></Reveal>}
            </div>
          </div>
        </Slide>

        {/* 08 — CREATIVE TOOLS */}
        <Slide id="tools" {...p}>
          <SectionLabel number="08">Creative tools</SectionLabel>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Title lines={["Creative", "Tools"]} className={h2} />
              <Reveal delay={300}><p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-400">A focused collection of technologies and tools used to turn ideas into practical digital experiences.</p></Reveal>
            </div>
            {skills?.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {skills.map((skill, i) => (
                  <Reveal key={`${skill}-${i}`} v="zoom" delay={Math.min(i, 8) * 90}>
                    <div className="group relative overflow-hidden border border-neutral-700 bg-neutral-800 p-5 transition duration-300 hover:-translate-y-1 hover:border-[#dccfc0]">
                      <span className="text-xs text-neutral-600">{String(i + 1).padStart(2, "0")}</span>
                      <p className="mt-4 text-sm font-bold uppercase text-white">{skill}</p>
                      <span aria-hidden="true" className="sd-sheen pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </Slide>

        {/* 09 — PERSONAL AESTHETIC */}
        <Slide id="aesthetic" {...p}>
          <SectionLabel number="09">Personal aesthetic</SectionLabel>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Title lines={["Personal", "Aesthetic"]} className={h2} />
              <Reveal delay={300}><p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-300">A visual language built around contrast, simplicity, structure, and intentional details.</p></Reveal>
            </div>
            {personalAesthetic?.image && (
              <div className="relative pb-4 pr-4">
                <Reveal v="zoom" delay={200} className={`sd-float absolute bottom-0 right-0 h-3/4 w-3/4 ${BEIGE}`} />
                <Reveal v="wipe" delay={100}><Parallax><Img src={personalAesthetic.image} alt="Personal aesthetic" className="relative aspect-[4/3] w-full" /></Parallax></Reveal>
              </div>
            )}
          </div>
        </Slide>

        {/* 10 — CONTACT */}
        <Slide id="contact" {...p} className="text-center">
          <SectionLabel number="10">Contact & social links</SectionLabel>
          <Title lines={["Let's work", "together"]} className="mt-4 text-3xl font-extrabold uppercase text-white sm:text-6xl" />
          {email && (
            <Reveal delay={400}>
              <a href={`mailto:${email}`} className="sd-ping mt-8 inline-block break-all rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-[#dccfc0]">{email}</a>
            </Reveal>
          )}
          <Reveal delay={550}><div className="mt-6 flex justify-center gap-6 text-sm"><Socials portfolio={portfolio} className="underline underline-offset-4 transition hover:text-white" /></div></Reveal>
        </Slide>

        {/* 11 — THANK YOU */}
        <Slide id="thanks" {...p} className="text-center">
          <SectionLabel number="11">Thank you</SectionLabel>
          <Title lines={["Thank You"]} className="mt-5 text-3xl font-extrabold uppercase text-white sm:text-5xl" />
          <Reveal delay={300}><p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400">Thank you for taking the time to explore my work.</p></Reveal>
          <div className={`mx-auto mt-8 h-1 w-20 ${BEIGE} sd-rule`} style={{ transitionDelay: "600ms" }} />
          <Reveal delay={500}>
            <div className="mt-8 flex justify-center gap-6 text-xs uppercase tracking-wider text-neutral-500">
              {[["about", "About"], ["work", "Work"], ["contact", "Contact"]].map(([id, l]) => <a key={id} href={`#${id}`} className="transition hover:text-white">{l}</a>)}
            </div>
            <a href="#top" className="sd-bob mt-8 inline-block text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white">↑ Back to top</a>
          </Reveal>
        </Slide>
      </main>

      <footer className="mx-auto mt-4 max-w-5xl px-2 pb-4 text-center text-[10px] uppercase tracking-wider text-neutral-600 sm:mt-8">{name} · {role}</footer>
    </div>
  );
}

export default SlateDeckTemplate;