// Modern Template (animated) — rose / burgundy presentation style. No extra dependencies.
import { useEffect, useRef, useState } from "react";

/* ---------- motion styles ---------- */
const CSS = `
@keyframes md-bg{0%,100%{background-position:0% 0%}50%{background-position:100% 100%}}
@keyframes md-float{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(14px,-18px) rotate(4deg)}}
@keyframes md-marquee{to{transform:translateX(-50%)}}
@keyframes md-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes md-ping{0%{box-shadow:0 0 0 0 rgba(232,183,194,.7)}100%{box-shadow:0 0 0 22px rgba(232,183,194,0)}}
@keyframes md-sheen{from{background-position:-200% 0}to{background-position:200% 0}}
.md-r{opacity:0;transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1),clip-path 1.2s cubic-bezier(.7,0,.2,1)}
.md-up{transform:translateY(44px)}.md-left{transform:translateX(-60px)}.md-right{transform:translateX(60px)}.md-zoom{transform:scale(.92)}
.md-wipe{opacity:1;clip-path:inset(0 100% 0 0)}
.md-r.md-in{opacity:1;transform:none}.md-wipe.md-in{clip-path:inset(0 0 0 0)}
.md-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.1em}
.md-w>span{display:inline-block;transform:translateY(115%) rotate(4deg);transition:transform 1s cubic-bezier(.2,.7,.2,1)}
.md-in .md-w>span{transform:none}
.md-rule{transform:scaleX(0);transform-origin:left;transition:transform 1.1s cubic-bezier(.7,0,.2,1) .3s}
.md-in .md-rule,.md-rule.md-in{transform:none}
.md-sheen{background-image:linear-gradient(110deg,transparent 35%,rgba(255,255,255,.35) 50%,transparent 65%);background-size:200% 100%}
.group:hover .md-sheen{animation:md-sheen 1.2s linear}
@media (prefers-reduced-motion:reduce){
 .md-r,.md-w>span,.md-rule{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}
 [class*=md-anim]{animation:none!important}
}`;

/* ---------- helpers ---------- */
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

function Reveal({ children, v = "up", delay = 0, className = "" }) {
  const [ref, seen] = useInView();
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`md-r md-${v} ${seen ? "md-in" : ""} ${className}`}>{children}</div>;
}

function Title({ as: Tag = "h2", lines, className = "", delay = 0 }) {
  const [ref, seen] = useInView(0.3);
  let n = 0;
  return (
    <Tag ref={ref} aria-label={lines.join(" ")} className={`${className} ${seen ? "md-in" : ""}`}>
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block">
          {line.split(" ").map((w, j) => (
            <span key={j} className="md-w mr-[0.22em]"><span style={{ transitionDelay: `${delay + n++ * 90}ms` }}>{w}</span></span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

const Eyebrow = ({ children }) => <Reveal v="left"><p className="text-base font-semibold sm:text-lg">{children}</p></Reveal>;

function Tilt({ children, className = "" }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `perspective(1000px) rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 7}deg) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 7}deg)`;
  };
  return <div ref={ref} className={className} onPointerMove={move} onPointerLeave={() => (ref.current.style.transform = "")} style={{ transition: "transform .25s ease-out" }}>{children}</div>;
}

// button/link that leans toward the cursor
function Magnetic({ as: Tag = "a", children, className = "", ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  return <Tag ref={ref} onPointerMove={move} onPointerLeave={() => (ref.current.style.transform = "")} style={{ transition: "transform .2s ease-out, background-color .3s, color .3s" }} className={className} {...rest}>{children}</Tag>;
}

// decorative shape: reacts to the mouse (depth) and floats on its own
function Shape({ pos, look, depth = 20, dur = 9 }) {
  return (
    <div aria-hidden="true" className={`absolute ${pos}`} style={{ transform: `translate3d(calc(var(--mx,0)*${depth}px),calc(var(--my,0)*${depth}px),0)`, transition: "transform .5s ease-out" }}>
      <div className={`md-anim ${look}`} style={{ animation: `md-float ${dur}s ease-in-out infinite` }} />
    </div>
  );
}

/* ---------- template ---------- */
function ModernTemplate({ portfolio }) {
  const { name, role, email, profileImage, about, skills, projects, caseStudy, designPhilosophy, coreValues, personalAesthetic, socialLinks } = portfolio;
  const bar = useRef(null), glow = useRef(null), hero = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)})`;
    };
    const onMove = (e) => {
      if (reduce) return;
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - 200}px,${e.clientY - 200}px)`;
      hero.current?.style.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(3));
      hero.current?.style.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(3));
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", onMove);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("pointermove", onMove); };
  }, []);

  const sec = "relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20";
  const h2 = "mt-3 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl";
  const ticker = skills?.length ? skills : [role].filter(Boolean);
  const circle = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition duration-500";

  return (
    <div className="md-anim min-h-screen overflow-hidden bg-gradient-to-br from-[#d98a9d] via-[#9f3148] to-[#260912] text-white [background-size:220%_220%]" style={{ animation: "md-bg 22s ease-in-out infinite" }}>
      <style>{CSS}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1"><div ref={bar} className="h-full origin-left bg-[#e8b7c2]" style={{ transform: "scaleX(0)" }} /></div>
      <div ref={glow} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[400px] w-[400px] rounded-full bg-[#e8b7c2] opacity-20 blur-3xl md:block" style={{ transform: "translate(-500px,-500px)", transition: "transform .3s ease-out" }} />

      {/* 1. HERO */}
      <section ref={hero} className="relative min-h-screen px-6 py-8 sm:px-10 md:px-16">
        <Shape pos="left-0 top-40" look="h-60 w-60 rounded-tr-[120px] bg-gradient-to-br from-[#f0b7c3] to-[#9d1f38]" depth={30} dur={10} />
        <Shape pos="-bottom-20 left-0" look="h-72 w-72 rounded-tr-full bg-gradient-to-br from-[#e8a5b5] to-[#8e1d35] opacity-80" depth={-20} dur={12} />
        <Shape pos="right-[-80px] top-60" look="h-16 w-80 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2]" depth={45} dur={8} />
        <Shape pos="bottom-[-100px] left-[30%]" look="h-64 w-64 rounded-full bg-gradient-to-br from-[#e8a5b5] to-[#9e1d35]" depth={-35} dur={14} />

        <Reveal v="up" className="relative z-10 flex flex-col justify-between gap-3 text-sm font-semibold sm:flex-row">
          <p>Portfolio Presentation</p><p>Visual Logic: Designing with Intention</p>
        </Reveal>

        <div className="relative z-10 mx-auto mt-16 w-full max-w-6xl md:mt-24">
          <Reveal v="left" delay={200}><p className="mb-4 text-lg font-semibold">{role}</p></Reveal>
          <Title as="h1" lines={[name || ""]} delay={300} className="break-words text-5xl font-bold leading-[0.9] sm:text-7xl md:text-8xl lg:text-9xl" />
          <Reveal delay={800} className="mt-8 max-w-xl"><p className="text-base leading-7 sm:text-lg sm:leading-8">{about}</p></Reveal>
          <Reveal delay={950} className="mt-8 flex flex-wrap gap-3">
            <Magnetic href="#work" className="rounded-full bg-black px-6 py-3 text-sm font-semibold hover:bg-white hover:text-black">View my work</Magnetic>
            <Magnetic href="#contact" className="rounded-full border border-white px-6 py-3 text-sm font-semibold hover:bg-white hover:text-black">Contact me</Magnetic>
          </Reveal>
        </div>

        <Reveal delay={1100} className="absolute bottom-10 right-6 z-10 sm:right-12">
          <p className="text-sm sm:text-lg">Presented By:<span className="ml-2 font-bold">{name}</span></p>
        </Reveal>
        <a href="#about" aria-label="Scroll down" className="md-anim absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 text-2xl sm:block" style={{ animation: "md-bob 2.2s ease-in-out infinite" }}>↓</a>
      </section>

      {/* ticker */}
      {ticker.length > 0 && (
        <div className="relative z-10 overflow-hidden bg-[#e8b7c2] py-4 text-black" aria-hidden="true">
          <div className="md-anim flex w-max gap-10 whitespace-nowrap text-xl font-bold uppercase tracking-wide" style={{ animation: "md-marquee 30s linear infinite" }}>
            {Array.from({ length: 4 }).flatMap(() => ticker).map((t, i) => <span key={i} className="flex items-center gap-10">{t}<span>✦</span></span>)}
          </div>
        </div>
      )}

      {/* 2. ABOUT */}
      <section id="about" className={sec}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="relative">
            <Reveal v="left" delay={300} className="absolute -left-4 -top-4 z-20 h-16 w-40 rounded-full bg-gradient-to-r from-[#9e1735] to-[#e7a1b2] sm:h-20 sm:w-48" />
            {profileImage && <Reveal v="wipe"><Tilt><img src={profileImage} alt={`Portrait of ${name}`} className="relative z-10 h-[350px] w-full rounded-[40px] object-cover sm:h-[450px] md:h-[500px]" /></Tilt></Reveal>}
          </div>
          <div className="relative z-10">
            <Eyebrow>{role}</Eyebrow>
            <Title lines={["About Me"]} className="mt-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl" />
            <Reveal delay={300}><p className="mt-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">{about}</p></Reveal>
          </div>
        </div>
      </section>

      {/* 3. DESIGN PHILOSOPHY */}
      <section className={sec}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <Reveal v="left" className="absolute -left-10 top-20 h-64 w-64 rounded-r-full bg-[#e5a5b5] opacity-40 sm:h-80 sm:w-80" />
            <div className="relative z-10"><Eyebrow>{role}</Eyebrow><Title lines={["Design", "Philosophy"]} className={h2} /></div>
          </div>
          <div className="relative z-10">
            <div className="rounded-3xl bg-[#8f3048]/50 p-6 backdrop-blur-sm sm:p-8">
              {[designPhilosophy?.text1, designPhilosophy?.text2].filter(Boolean).map((t, i) => (
                <Reveal key={i} v="right" delay={i * 200} className={i ? "mt-8" : ""}>
                  <div className="group flex items-start gap-4">
                    <span className={`${circle} bg-black text-xl group-hover:translate-x-1 group-hover:bg-white group-hover:text-black`}>→</span>
                    <p className="text-base font-semibold sm:text-lg">{t}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {designPhilosophy?.image && <Reveal v="wipe" delay={200} className="mt-8"><div className="overflow-hidden rounded-[30px]"><img src={designPhilosophy.image} alt="Design philosophy" className="h-56 w-full object-cover transition duration-700 hover:scale-105 sm:h-72" /></div></Reveal>}
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES */}
      <section className={sec}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center md:text-left"><Eyebrow>{role}</Eyebrow><Title lines={["Core Values"]} className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl" /></div>
          <div className="grid gap-8 md:grid-cols-2">
            {[[coreValues?.image1, "Core value one", "Emotion as the bridge between viewer and message"], [coreValues?.image2, "Core value two", "Clarity as a foundation for understanding"]].map(([src, alt, text], i) => (
              <Reveal key={i} delay={i * 200} className={i ? "md:mt-10" : ""}>
                <div className="group">
                  {src && <div className="overflow-hidden rounded-[30px]"><img src={src} alt={alt} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-80" /></div>}
                  <div className="mt-6 rounded-3xl bg-[#e8b7c2]/80 p-6 text-black transition duration-300 group-hover:-translate-y-1 sm:p-8">
                    <div className="flex items-center gap-4">
                      <span className={`${circle} border-2 border-black text-2xl group-hover:rotate-90`}>+</span>
                      <p className="text-base font-semibold sm:text-lg">{text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FROM THOUGHT TO FORM */}
      <section className={sec}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-14"><Eyebrow>{role}</Eyebrow><Title lines={["From Thought", "to Form"]} className={`${h2} max-w-3xl`} /></div>
          <div className="grid gap-8 lg:grid-cols-2">
            {[["01", "Exploration & Discovery", "Transforming insights and inspiration into early visual directions through research and experimentation.", false],
              ["02", "Refinement & Execution", "Developing each element with intention, ensuring clarity, balance, and emotional connection in the final design.", true]].map(([n, t, d, light], i) => (
              <Reveal key={n} v={i ? "right" : "left"} delay={i * 150}>
                <Tilt><div className={`group rounded-[32px] p-6 sm:p-10 ${light ? "bg-[#e8b7c2]/80 text-black" : "bg-[#8f3048]/60"}`}>
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-5xl font-bold">{n}</span>
                    <span className={`flex h-12 w-12 items-center justify-center rounded-full text-xl transition duration-500 group-hover:translate-x-2 ${light ? "border-2 border-black" : "bg-black"}`}>→</span>
                  </div>
                  <h3 className="text-2xl font-bold sm:text-3xl">{t}</h3>
                  <p className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">{d}</p>
                </div></Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED PROJECTS */}
      <section id="work" className={sec}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><Eyebrow>{role}</Eyebrow><Title lines={["Featured", "Projects"]} className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl" /></div>
            <Reveal delay={300}><p className="max-w-md text-base leading-7 sm:text-lg">Each project is an opportunity to tell a story through thoughtful design, clarity, and visual expression.</p></Reveal>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {projects?.slice(0, 3).map((project, index) => (
              <Reveal key={`${project.title}-${index}`} delay={(index % 2) * 150}>
                <Tilt>
                  <article className="group overflow-hidden rounded-[32px] bg-[#e8b7c2] text-black">
                    <div className="relative overflow-hidden">
                      {project.image ? (
                        <img src={project.image} alt={project.title} className="h-64 w-full object-cover transition duration-700 group-hover:scale-110 sm:h-80" />
                      ) : (
                        <div className="flex h-64 items-center justify-center bg-[#b84d68] text-5xl font-bold text-white sm:h-80">{String(index + 1).padStart(2, "0")}</div>
                      )}
                      <span aria-hidden="true" className="md-sheen pointer-events-none absolute inset-0" />
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-widest">Project {String(index + 1).padStart(2, "0")}</p>
                          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{project.title}</h3>
                        </div>
                        <span className={`${circle} border-2 border-black group-hover:rotate-45 group-hover:bg-black group-hover:text-[#e8b7c2]`}>↗</span>
                      </div>
                      <p className="mt-5 text-base leading-7 sm:text-lg">{project.description}</p>
                    </div>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CASE STUDY */}
      <section className={sec}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12"><Eyebrow>{role}</Eyebrow><Title lines={["Case Study"]} className={h2} /></div>
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal v="wipe">
              <div className="relative min-h-[360px] overflow-hidden rounded-[32px] bg-[#8f3048] sm:min-h-[500px]">
                {caseStudy?.image ? (
                  <img src={caseStudy.image} alt={caseStudy.title || "Case Study"} className="h-full min-h-[360px] w-full object-cover transition duration-700 hover:scale-105 sm:min-h-[500px]" />
                ) : (
                  <div className="flex h-full min-h-[360px] items-center justify-center sm:min-h-[500px]"><span className="text-6xl font-bold text-[#d98da2] sm:text-8xl">CASE</span></div>
                )}
              </div>
            </Reveal>
            <Reveal v="right" delay={200} className="flex">
              <div className="flex flex-1 flex-col justify-center rounded-[32px] bg-[#e8b7c2] p-6 text-black sm:p-10 lg:p-14">
                <p className="text-sm font-semibold uppercase tracking-[0.2em]">Featured Case Study</p>
                <h3 className="mt-5 text-3xl font-bold sm:text-4xl">{caseStudy?.title || "Rebranding"}</h3>
                <div className="md-rule mt-5 h-1 w-20 rounded-full bg-black" />
                <p className="mt-6 text-base leading-7 sm:text-lg sm:leading-8">{caseStudy?.description || "A rebranding project focused on clarity, heritage, and timeless appeal. The design introduces a refined visual direction through thoughtful typography and modern composition."}</p>
                <div className="mt-8"><span className="inline-flex rounded-full border-2 border-black px-5 py-2 text-sm font-semibold transition hover:bg-black hover:text-[#e8b7c2]">View Case Study</span></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. CREATIVE TOOLS */}
      <section className={sec}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12"><Eyebrow>{role}</Eyebrow><Title lines={["Creative Tools"]} className="mt-3 text-4xl font-bold sm:text-5xl md:text-6xl" /></div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(skills?.length > 0 ? skills.map((s) => [s, "A creative tool used to develop thoughtful and polished digital experiences."]) : [["Creative Thinking"], ["Digital Design"], ["Experimentation"]]).map(([skill, desc], index) => (
              <Reveal key={skill} v="zoom" delay={Math.min(index, 8) * 90}>
                <div className={`group relative overflow-hidden rounded-[28px] p-6 transition duration-300 hover:-translate-y-2 sm:p-8 ${index % 3 === 1 ? "bg-[#8f3048]" : "bg-[#e8b7c2] text-black"}`}>
                  <span className="text-4xl font-bold">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-8 text-2xl font-bold">{skill}</h3>
                  {desc && <p className="mt-4 leading-7">{desc}</p>}
                  <span aria-hidden="true" className="md-sheen pointer-events-none absolute inset-0" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PERSONAL AESTHETIC */}
      <section className={sec}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <Reveal v="wipe">
            <div className="relative overflow-hidden rounded-[32px] bg-[#8f3048]">
              {personalAesthetic?.image ? (
                <img src={personalAesthetic.image} alt="Personal aesthetic" className="h-[400px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[500px]" />
              ) : (
                <div className="flex h-[400px] items-center justify-center sm:h-[500px]"><span className="text-8xl font-bold text-white/20">09</span></div>
              )}
            </div>
          </Reveal>
          <div>
            <Eyebrow>{role}</Eyebrow>
            <Title lines={["Personal", "Aesthetic"]} className={h2} />
            <Reveal delay={300}><p className="mt-8 max-w-xl text-base leading-7 sm:text-lg sm:leading-8">My style blends structure with expressiveness. I enjoy creating harmony between order and spontaneity — where logic meets feeling.</p></Reveal>
            <div className="md-rule mt-8 h-1 w-24 rounded-full bg-[#e8b7c2]" style={{ transitionDelay: "700ms" }} />
          </div>
        </div>
      </section>

      {/* 10. CONTACT */}
      <section id="contact" className={sec}>
        <div className="mx-auto max-w-7xl">
          <Reveal v="zoom">
            <div className="relative overflow-hidden rounded-[40px] bg-[#8f3048] px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-20">
              <div aria-hidden="true" className="md-anim absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#e8b7c2] opacity-30" style={{ animation: "md-float 11s ease-in-out infinite" }} />
              <div aria-hidden="true" className="md-anim absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#e8b7c2] opacity-20" style={{ animation: "md-float 14s ease-in-out infinite reverse" }} />
              <div className="relative z-10">
                <Eyebrow>{role}</Eyebrow>
                <Title lines={["Let's work", "together"]} className="mt-5 max-w-4xl text-5xl font-bold leading-[0.95] sm:text-6xl md:text-7xl lg:text-8xl" />
                <Reveal delay={400}><p className="mt-6 max-w-xl text-base leading-7 sm:text-lg">Have an idea, project, or opportunity? Let's create something meaningful together.</p></Reveal>
                <Reveal delay={550} className="mt-12 grid gap-6 text-base sm:grid-cols-2 sm:text-lg lg:grid-cols-3">
                  {email && (
                    <div><p className="font-semibold">Email</p>
                      <Magnetic href={`mailto:${email}`} className="md-anim mt-2 inline-block break-all rounded-full px-1 underline" style={{ animation: "md-ping 2.4s ease-out infinite" }}>{email}</Magnetic></div>
                  )}
                  <div><p className="font-semibold">Social</p>
                    <div className="mt-2 flex flex-wrap gap-4">
                      {socialLinks?.github && <a href={socialLinks.github} target="_blank" rel="noreferrer" className="underline transition hover:text-[#e8b7c2]">GitHub</a>}
                      {socialLinks?.linkedin && <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="underline transition hover:text-[#e8b7c2]">LinkedIn</a>}
                    </div></div>
                  <div><p className="font-semibold">Role</p><p className="mt-2">{role}</p></div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 11. THANK YOU */}
      <section className={sec}>
        <div className="mx-auto max-w-7xl text-center">
          <div className="md-anim mx-auto h-3 w-3 rounded-full bg-[#e8b7c2]" style={{ animation: "md-ping 2s ease-out infinite" }} />
          <Reveal delay={100}><p className="mt-8 text-base font-semibold sm:text-lg">{name}</p></Reveal>
          <Title lines={["Thank You"]} className="mt-4 text-5xl font-bold leading-none sm:text-6xl md:text-8xl" />
          <Reveal delay={400}><p className="mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg">Thank you for taking the time to explore my portfolio.</p></Reveal>
          <Reveal delay={500}><a href="#top" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: "smooth" }); }} className="md-anim mt-8 inline-block text-sm font-semibold uppercase tracking-widest hover:text-[#e8b7c2]" style={{ animation: "md-bob 2.4s ease-in-out infinite" }}>↑ Back to top</a></Reveal>
          <div className="mt-10 border-t border-white/20 pt-6 text-sm text-white/70">© {new Date().getFullYear()} {name}. All rights reserved.</div>
        </div>
      </section>
    </div>
  );
}

export default ModernTemplate;