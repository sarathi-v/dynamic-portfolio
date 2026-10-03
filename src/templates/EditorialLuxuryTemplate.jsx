// Template 01 — Editorial Luxury (animated). Fonts: Cormorant Garamond + Inter. No extra dependencies.
import { useEffect, useRef, useState } from "react";

const serif = { fontFamily: "'Cormorant Garamond', Georgia, serif" };
const sans = { fontFamily: "Inter, system-ui, sans-serif" };
const EASE = "cubic-bezier(.2,.7,.2,1)";

/* ---------- motion styles ---------- */
const CSS = `
@keyframes ed-marquee{to{transform:translateX(-50%)}}
@keyframes ed-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
.ed-r{opacity:0;transition:opacity 1s ${EASE},transform 1s ${EASE}}
.ed-up{transform:translateY(40px)}.ed-left{transform:translateX(-40px)}.ed-right{transform:translateX(40px)}
.ed-r.ed-in{opacity:1;transform:none}
.ed-w{display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.12em;margin-bottom:-.12em}
.ed-w>span{display:inline-block;transform:translateY(112%);transition:transform 1.1s ${EASE}}
.ed-in .ed-w>span{transform:none}
.ed-rule{transform:scaleX(0);transform-origin:left;transition:transform 1.4s cubic-bezier(.7,0,.2,1)}
.ed-rule.ed-in{transform:none}
.ed-curtain{clip-path:inset(100% 0 0 0);transition:clip-path 1.5s cubic-bezier(.7,0,.2,1)}
.ed-curtain.ed-in{clip-path:inset(0 0 0 0)}
.ed-curtain img{transform:scale(1.25);transition:transform 2s ${EASE}}
.ed-curtain.ed-in img{transform:scale(1)}
.ed-curtain.ed-in:hover img{transform:scale(1.06);transition-duration:1.2s}
.ed-link{background:linear-gradient(currentColor,currentColor) 0 100%/0 1px no-repeat;padding-bottom:2px;transition:background-size .45s ${EASE}}
.ed-link:hover{background-size:100% 1px}
.ed-link-on{background-size:100% 1px}.ed-link-on:hover{background-size:0 1px;background-position:100% 100%}
@media (prefers-reduced-motion:reduce){
 .ed-r,.ed-w>span,.ed-rule,.ed-curtain,.ed-curtain img{opacity:1!important;transform:none!important;clip-path:none!important;transition:none!important}
 [class*=ed-anim]{animation:none!important}
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
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`ed-r ed-${v} ${seen ? "ed-in" : ""} ${className}`}>{children}</div>;
}

// word-by-word masked headline
function Title({ as: Tag = "h3", text, lines, style, className = "", delay = 0 }) {
  const [ref, seen] = useInView(0.25);
  const list = lines || [text];
  let n = 0;
  return (
    <Tag ref={ref} style={style} aria-label={list.join(" ")} className={`${className} ${seen ? "ed-in" : ""}`}>
      {list.map((line, i) => (
        <span key={i} aria-hidden="true" className="block">
          {String(line).split(" ").map((w, j) => (
            <span key={j} className="ed-w mr-[0.22em]"><span style={{ transitionDelay: `${delay + n++ * 70}ms` }}>{w}</span></span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

// hairline that draws itself; parent must be `relative`
function Rule({ className = "top-0 bg-stone-300", delay = 0 }) {
  const [ref, seen] = useInView(0.01);
  return <div ref={ref} aria-hidden="true" style={{ transitionDelay: `${delay}ms` }} className={`ed-rule absolute left-0 h-px w-full ${className} ${seen ? "ed-in" : ""}`} />;
}

const Label = ({ children }) => (
  <Reveal v="left"><h2 className="flex items-center gap-3 text-sm text-stone-500"><span aria-hidden="true" className="h-px w-8 bg-stone-400" />{children}</h2></Reveal>
);

// image: curtain reveal + scroll parallax + hover zoom. data-cursor shows the "View" bubble.
function Img({ src, alt, className = "", cursor }) {
  const box = useRef(null), par = useRef(null);
  const [ref, seen] = useInView(0.1);
  useEffect(() => {
    if (!src || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = box.current?.getBoundingClientRect();
        if (r && par.current) par.current.style.transform = `translateY(${((r.top + r.height / 2 - innerHeight / 2) / innerHeight) * -26}px)`;
      });
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => { removeEventListener("scroll", update); cancelAnimationFrame(raf); };
  }, [src]);
  if (!src) return null;
  return (
    <div ref={(el) => { box.current = el; ref.current = el; }} data-cursor={cursor} className={`ed-curtain relative overflow-hidden bg-stone-200 ${seen ? "ed-in" : ""} ${className}`}>
      <div ref={par} className="-mt-[8%] h-[116%] w-full will-change-transform">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

/* ---------- template ---------- */
function EditorialLuxuryTemplate({ portfolio }) {
  const { name, role, email, profileImage, about, skills, projects, caseStudy, designPhilosophy, coreValues, personalAesthetic, socialLinks } = portfolio;
  const bar = useRef(null), bubble = useRef(null);
  const [hideHeader, setHideHeader] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const h = document.documentElement, y = h.scrollTop;
      if (bar.current) bar.current.style.transform = `scaleX(${y / Math.max(1, h.scrollHeight - h.clientHeight)})`;
      setHideHeader(y > last && y > 160);
      last = y;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // "View" bubble that follows the cursor over images with data-cursor
  const onPointerMove = (e) => {
    const b = bubble.current;
    if (!b || e.pointerType === "touch") return;
    const t = e.target.closest?.("[data-cursor]");
    b.style.transform = `translate(${e.clientX - 40}px,${e.clientY - 40}px) scale(${t ? 1 : 0})`;
    if (t) b.firstChild.textContent = t.dataset.cursor;
  };

  const link = "ed-link";
  const label = "text-sm text-stone-500";
  const h3 = "font-light";

  return (
    <div style={sans} onPointerMove={onPointerMove} className="min-h-screen overflow-x-hidden bg-[#faf9f7] text-stone-900">
      <style>{CSS}</style>
      <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"><div ref={bar} className="h-full origin-left bg-stone-900" style={{ transform: "scaleX(0)" }} /></div>
      <div ref={bubble} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-50 hidden h-20 w-20 items-center justify-center rounded-full bg-stone-900 text-xs tracking-wider text-white md:flex" style={{ transform: "translate(-200px,-200px) scale(0)", transition: "transform .35s cubic-bezier(.2,.7,.2,1)" }}><span /></div>

      {/* HEADER */}
      <header className={`sticky top-0 z-40 bg-[#faf9f7]/85 backdrop-blur transition-transform duration-500 ${hideHeader ? "-translate-y-full" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-stone-300 px-5 py-5 text-sm sm:px-10">
          <a href="#top" className="font-medium tracking-wide">{name}</a>
          <nav aria-label="Primary" className="flex gap-5 sm:gap-8">
            {[["about", "About"], ["philosophy", "Philosophy"], ["work", "Work"], ["contact", "Contact"]].map(([id, l]) => <a key={id} className={link} href={`#${id}`}>{l}</a>)}
          </nav>
        </div>
      </header>

      <main id="top">
        {/* 1. HERO */}
        <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-12 sm:px-10 lg:grid-cols-12 lg:pt-20">
          <div className="lg:col-span-7 lg:pt-10">
            <Reveal v="left" delay={100}><p className="mb-6 text-sm text-stone-500">{role}</p></Reveal>
            <Reveal v="left" delay={200}><p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">Portfolio</p></Reveal>
            <Title as="h1" text={name || ""} delay={300} style={serif} className="break-words text-6xl font-light leading-[0.95] sm:text-8xl xl:text-9xl" />
            <Reveal delay={800}><p className="mt-8 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">{about}</p></Reveal>
            <Reveal delay={950} className="mt-8 flex flex-wrap gap-6 text-sm"><a className={link} href="#work">Explore my work</a><a className={link} href="#contact">Get in touch</a></Reveal>
          </div>
          {profileImage && (
            <div className="relative lg:col-span-5 lg:mt-24">
              <Reveal v="right" delay={600} className="absolute inset-0 translate-x-3 translate-y-3 border border-stone-900/40 sm:translate-x-4 sm:translate-y-4"><span /></Reveal>
              <Img src={profileImage} alt={`Portrait of ${name}`} className="aspect-[4/5]" />
            </div>
          )}
        </section>

        {/* ticker */}
        {(skills?.length > 0 || role) && (
          <div className="overflow-hidden border-y border-stone-300 py-6" aria-hidden="true">
            <div className="ed-anim flex w-max gap-12 whitespace-nowrap text-4xl font-light italic text-stone-400 sm:text-6xl" style={{ ...serif, animation: "ed-marquee 40s linear infinite" }}>
              {Array.from({ length: 4 }).flatMap(() => (skills?.length ? skills : [role])).map((s, i) => <span key={i} className="flex items-center gap-12">{s}<span className="text-stone-300">·</span></span>)}
            </div>
          </div>
        )}

        {/* 2. ABOUT */}
        <section id="about" className="relative mx-auto grid max-w-7xl gap-8 px-5 py-20 sm:px-10 lg:grid-cols-12">
          <Rule />
          <div className="lg:col-span-3"><Label>02 / About</Label></div>
          <div className="lg:col-span-7 lg:col-start-5">
            <Title text="About Me" style={serif} className={`mb-6 text-4xl sm:text-5xl ${h3}`} />
            <Reveal delay={250}><p style={serif} className="text-3xl font-light leading-snug sm:text-4xl">{about}</p></Reveal>
          </div>
        </section>

        {/* 3. PHILOSOPHY */}
        <section id="philosophy" className="relative bg-stone-100">
          <Rule />
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="mb-8"><Label>03 / Design Philosophy</Label></div>
              {[designPhilosophy?.text1, designPhilosophy?.text2].filter(Boolean).map((t, i) => (
                <Title key={t} as="p" text={t} delay={i * 250} style={serif} className="mb-6 text-4xl font-light italic leading-tight sm:text-5xl" />
              ))}
            </div>
            <Img src={designPhilosophy?.image} alt="Design philosophy" className="aspect-square lg:col-span-4 lg:col-start-9" />
          </div>
        </section>

        {/* 4. CORE VALUES */}
        <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-10">
          <Rule />
          <div className="mb-14"><Label>04 / Core Values</Label><Title text="What guides the work." style={serif} className={`mt-4 text-5xl sm:text-6xl ${h3}`} /></div>
          <div className="grid gap-8 md:grid-cols-2">
            {[[coreValues?.image1, "Core value one", "Purpose", "Every creative decision begins with meaning, intention, and a clear purpose."],
              [coreValues?.image2, "Core value two", "Clarity", "Simplicity creates space for ideas to communicate clearly and naturally."]].map(([src, alt, t, d], i) => (
              <div key={t} className={i ? "md:mt-20" : ""}>
                <Img src={src} alt={alt} className="aspect-[4/3]" />
                <Reveal delay={300} className="mt-6 max-w-md">
                  <span className="text-xs text-stone-400">0{i + 1}</span>
                  <h4 style={serif} className="mt-2 text-3xl">{t}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{d}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </section>

        {/* 5. PROCESS */}
        <section className="relative">
          <Rule />
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-10 lg:grid-cols-12">
            <div className="lg:col-span-5"><Label>05 / Process</Label><Title lines={["From Thought", "to Form"]} style={serif} className={`mt-5 text-5xl leading-tight sm:text-6xl ${h3}`} /></div>
            <div className="space-y-12 lg:col-span-6 lg:col-start-7">
              {[["Exploration & Discovery", "Transforming insights and inspiration into early visual directions through research and exploration."],
                ["Refinement & Execution", "Developing each element with intention while maintaining clarity, balance, and emotional impact."]].map(([t, d], i) => (
                <Reveal key={t} v="right" delay={i * 200}>
                  <div className="group relative pt-6">
                    <Rule delay={i * 200} />
                    <span className="text-xs text-stone-400">0{i + 1}</span>
                    <h4 style={serif} className="mt-3 text-3xl transition-transform duration-500 group-hover:translate-x-2">{t}</h4>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-stone-600">{d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PROJECTS */}
        <section id="work" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-10">
          <Rule />
          <div className="mb-14"><Label>06 / Featured Projects</Label><Title text="Selected Work" style={serif} className={`mt-4 text-5xl sm:text-6xl ${h3}`} /></div>
          <div className="space-y-20 sm:space-y-28">
            {projects?.slice(0, 3).map((project, index) => {
              const flip = index % 2 === 1;
              return (
                <article key={`${project.title}-${index}`} className="group grid items-end gap-6 md:grid-cols-12">
                  <Img src={project.image} alt={project.title} cursor="View" className={`aspect-[4/3] md:col-span-8 ${flip ? "md:order-2" : ""}`} />
                  <Reveal v={flip ? "right" : "left"} delay={250} className={`md:col-span-4 ${flip ? "md:order-1 md:pr-6" : "md:pl-6"}`}>
                    <p className="text-xs text-stone-400">Project {String(index + 1).padStart(2, "0")}</p>
                    <h3 style={serif} className="mt-3 text-3xl transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600">{project.description}</p>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </section>

        {/* 7. CASE STUDY */}
        {caseStudy?.title && (
          <section className="relative bg-stone-100">
            <Rule />
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-10 lg:grid-cols-2 lg:items-center">
              <Img src={caseStudy.image} alt={caseStudy.title} cursor="Read" className="aspect-[5/4]" />
              <div>
                <div className="mb-4"><Label>07 / Case Study</Label></div>
                <Title text={caseStudy.title} style={serif} className={`text-5xl sm:text-6xl ${h3}`} />
                <Reveal delay={350}><p className="mt-6 max-w-md leading-relaxed text-stone-600">{caseStudy.description}</p></Reveal>
              </div>
            </div>
          </section>
        )}

        {/* 8. TOOLS */}
        <section className="relative mx-auto max-w-7xl px-5 py-24 sm:px-10">
          <Rule />
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5"><Label>08 / Creative Tools</Label><Title lines={["Tools behind", "the craft."]} style={serif} className={`mt-4 text-5xl sm:text-6xl ${h3}`} /></div>
            <div className="relative lg:col-span-6 lg:col-start-7">
              <Rule />
              {skills?.map((skill, index) => (
                <Reveal key={skill} delay={Math.min(index, 8) * 70}>
                  <div className="group relative flex items-center justify-between overflow-hidden border-b border-stone-300 px-1 py-5">
                    <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-stone-900 transition-transform duration-500 group-hover:scale-x-100" />
                    <span className="relative text-xs text-stone-400 transition-colors group-hover:text-stone-300">{String(index + 1).padStart(2, "0")}</span>
                    <span className="relative text-lg transition duration-500 group-hover:-translate-x-2 group-hover:text-white">{skill}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 9. AESTHETIC */}
        {personalAesthetic?.image && (
          <section className="relative bg-[#f0eeea]">
            <Rule />
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-24 sm:px-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <Label>09 / Personal Aesthetic</Label>
                <Title lines={["A visual", "language of my own."]} style={serif} className={`mt-4 text-5xl leading-tight sm:text-6xl ${h3}`} />
                <Reveal delay={400}><p className="mt-6 max-w-md leading-relaxed text-stone-600">A balance between structure, emotion, simplicity, and carefully considered details.</p></Reveal>
              </div>
              <Img src={personalAesthetic.image} alt="Personal aesthetic" className="aspect-[4/3] lg:col-span-6 lg:col-start-7" />
            </div>
          </section>
        )}

        {/* 10. CONTACT */}
        <section id="contact" className="relative">
          <Rule />
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-10">
            <Label>10 / Contact &amp; Social Links</Label>
            <Title lines={["Let's create something", "meaningful together."]} style={serif} className={`mt-5 max-w-4xl text-5xl leading-tight sm:text-7xl ${h3}`} />
            {email && (
              <Reveal delay={400}>
                <a href={`mailto:${email}`} style={serif} className="ed-link ed-link-on group mt-12 inline-block break-all text-3xl font-light sm:text-5xl">
                  {email} <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-2">↗</span>
                </a>
              </Reveal>
            )}
            <Reveal delay={550} className="mt-8 flex gap-6 text-sm">
              {socialLinks?.github && <a className={link} href={socialLinks.github} target="_blank" rel="noreferrer">GitHub</a>}
              {socialLinks?.linkedin && <a className={link} href={socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </Reveal>
          </div>
        </section>

        {/* 11. THANK YOU */}
        <section className="relative">
          <Rule />
          <div className="mx-auto max-w-7xl px-5 py-20 text-center sm:px-10">
            <Reveal><p className="text-xs uppercase tracking-[0.3em] text-stone-400">11 / End</p></Reveal>
            <Title as="h2" text="Thank You" style={serif} className="mt-5 text-5xl font-light sm:text-7xl" />
            <Reveal delay={300}><p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-stone-500">Thank you for taking the time to explore my portfolio and creative work.</p></Reveal>
            <div className="relative mx-auto mt-10 h-px w-20"><Rule className="top-0 bg-stone-900" delay={300} /></div>
            <Reveal delay={500}>
              <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: "smooth" }); }} className="ed-anim ed-link mt-8 inline-block text-xs uppercase tracking-[0.25em] text-stone-500" style={{ animation: "ed-bob 2.6s ease-in-out infinite" }}>↑ Back to top</a>
              <p className="mt-6 text-xs text-stone-400">© {new Date().getFullYear()} {name}. All rights reserved.</p>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}

export default EditorialLuxuryTemplate;