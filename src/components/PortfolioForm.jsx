import { useId, useRef, useState } from "react";

/* ---------- constants & validators ---------- */
const MAX_MB = 5;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const emailOk = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const urlOk = (v) => {
  if (!v) return true;
  try { return /^https?:$/.test(new URL(v).protocol); } catch { return false; }
};
const release = (url) => { if (typeof url === "string" && url.startsWith("blob:")) URL.revokeObjectURL(url); };
const hasFiles = (e) => Array.from(e.dataTransfer?.types || []).includes("Files");

const SECTIONS = [
  { id: "profile", label: "Profile", desc: "Who you are, at a glance." },
  { id: "about", label: "About", desc: "Your story in your own words." },
  { id: "philosophy", label: "Philosophy", desc: "What guides your work." },
  { id: "values", label: "Values", desc: "Two images that show what you stand for." },
  { id: "process", label: "Process", desc: "From thought to form." },
  { id: "projects", label: "Projects", desc: "Your featured work. Drag cards to reorder." },
  { id: "case", label: "Case study", desc: "One project, told in depth." },
  { id: "tools", label: "Tools", desc: "The skills and tools you create with." },
  { id: "aesthetic", label: "Aesthetic", desc: "The look and feel that is yours." },
  { id: "contact", label: "Contact", desc: "How people can reach you." },
];

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";
const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";
const btn = `inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition ${focus}`;
const btnPrimary = `${btn} bg-indigo-600 text-white hover:bg-indigo-700`;
const btnGhost = `${btn} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;

/* ---------- reusable pieces ---------- */
function Field({ label, hint, error, multiline, ...props }) {
  const id = useId();
  const Tag = multiline ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-800">{label}</label>
      <Tag id={id} aria-invalid={!!error} aria-describedby={`${id}-d`} className={`${inputCls} ${error ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`} {...props} />
      <p id={`${id}-d`} className={`mt-1.5 text-xs ${error ? "text-red-600" : "text-slate-500"}`} role={error ? "alert" : undefined}>{error || hint}</p>
    </div>
  );
}

function SectionHeader({ n, title, desc }) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest text-indigo-600">STEP {String(n).padStart(2, "0")}</p>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
      <p className="mt-1 text-slate-600">{desc}</p>
    </div>
  );
}

function ImageDropzone({ label, value, onChange, className = "aspect-[4/3]", rounded = "rounded-xl", hint }) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const accept = (file) => {
    if (!file) return;
    if (!TYPES.includes(file.type)) return setError("Please choose a JPG, PNG, WebP or GIF image.");
    if (file.size > MAX_MB * 1048576) return setError(`That file is ${(file.size / 1048576).toFixed(1)} MB. The limit is ${MAX_MB} MB.`);
    setError("");
    release(value);
    onChange(URL.createObjectURL(file));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const remove = () => { release(value); onChange(""); setError(""); };
  const handlers = {
    onDragOver: (e) => { if (hasFiles(e)) { e.preventDefault(); setOver(true); } },
    onDragLeave: () => setOver(false),
    onDrop: (e) => { if (hasFiles(e)) { e.preventDefault(); setOver(false); accept(e.dataTransfer.files[0]); } },
  };

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium text-slate-800">{label}</p>
      <input ref={inputRef} type="file" accept={TYPES.join(",")} className="sr-only" aria-label={`Choose file for ${label}`} tabIndex={-1}
        onChange={(e) => { accept(e.target.files[0]); e.target.value = ""; }} />
      <div {...handlers} className={`relative overflow-hidden ${rounded} ${className} ${over ? "ring-4 ring-indigo-300" : ""}`}>
        {value ? (
          <>
            <img src={value} alt={`${label} preview`} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
              <button type="button" onClick={() => inputRef.current?.click()} className={`${btn} bg-white/95 text-slate-900 hover:bg-white`}>Replace</button>
              <button type="button" onClick={remove} className={`${btn} bg-white/95 text-red-700 hover:bg-white`}>Remove</button>
              {added && <span className="ml-auto text-xs font-medium text-white" role="status">✓ Image added</span>}
            </div>
          </>
        ) : (
          <button type="button" onClick={() => inputRef.current?.click()}
            className={`flex h-full w-full flex-col items-center justify-center gap-1 border-2 border-dashed px-4 text-center transition ${focus} ${over ? "border-indigo-500 bg-indigo-50" : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/50"} ${rounded}`}>
            <span aria-hidden="true" className="mb-1 grid h-10 w-10 place-items-center rounded-full bg-white text-xl text-indigo-600 shadow-sm">↑</span>
            <span className="text-sm font-semibold text-slate-800">{over ? "Drop to upload" : "Drag & drop your image here"}</span>
            <span className="text-xs text-slate-500">or <span className="font-medium text-indigo-600 underline">browse from your device</span></span>
            <span className="mt-1 text-xs text-slate-400">{hint || `JPG, PNG, WebP or GIF · up to ${MAX_MB} MB`}</span>
          </button>
        )}
      </div>
      {error && <p role="alert" className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function ProjectCard({ index, total, project, onChange, onRemove, onMove, drag }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <article
      onDragOver={drag.over} onDrop={drag.drop}
      className={`rounded-2xl border bg-white p-4 transition sm:p-5 ${drag.isDragging ? "opacity-40" : ""} ${drag.isTarget ? "border-indigo-500 ring-2 ring-indigo-200" : "border-slate-200"}`}>
      <div className="mb-4 flex items-center gap-2">
        <button type="button" draggable onDragStart={drag.start} onDragEnd={drag.end} aria-label={`Drag to reorder project ${index + 1}`}
          className={`cursor-grab rounded-md px-2 py-1 text-lg leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700 active:cursor-grabbing ${focus}`}>⠿</button>
        <h3 className="text-sm font-semibold text-slate-900">Project {String(index + 1).padStart(2, "0")}</h3>
        {index < 3 && <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">Featured</span>}
        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move project up" className={`${btnGhost} px-2.5 py-1 disabled:opacity-40`}>↑</button>
          <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move project down" className={`${btnGhost} px-2.5 py-1 disabled:opacity-40`}>↓</button>
          {confirm ? (
            <>
              <button type="button" onClick={onRemove} className={`${btn} bg-red-600 py-1 text-white hover:bg-red-700`}>Confirm delete</button>
              <button type="button" onClick={() => setConfirm(false)} className={`${btnGhost} py-1`}>Cancel</button>
            </>
          ) : (
            <button type="button" onClick={() => setConfirm(true)} className={`${btnGhost} py-1 text-red-700`}>Delete</button>
          )}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-4">
          <Field label="Title" value={project.title || ""} onChange={(e) => onChange({ title: e.target.value })} placeholder="e.g. E-Commerce Website" />
          <Field multiline rows={4} label="Description" value={project.description || ""} onChange={(e) => onChange({ description: e.target.value })} placeholder="What was it, and what was your role?" />
        </div>
        <ImageDropzone label="Project image" value={project.image} onChange={(image) => onChange({ image })} className="aspect-[4/3]" />
      </div>
    </article>
  );
}

function SkillInput({ skills, onChange }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (!v || skills.some((s) => s.toLowerCase() === v.toLowerCase())) return setDraft("");
    onChange([...skills, v]);
    setDraft("");
  };
  const move = (i, d) => {
    const next = [...skills];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };
  return (
    <div>
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="New skill or tool" className={inputCls}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Type a skill or tool, e.g. Figma" />
        <button type="button" onClick={add} className={`${btnPrimary} shrink-0`}>+ Add</button>
      </div>
      {skills.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No tools yet. Add React, Figma, Photoshop, anything you create with.</p>
      ) : (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {skills.map((s, i) => (
            <li key={i} className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1.5">
              <input value={s} aria-label={`Skill ${i + 1}`} onChange={(e) => onChange(skills.map((x, j) => (j === i ? e.target.value : x)))}
                onBlur={(e) => { if (!e.target.value.trim()) onChange(skills.filter((_, j) => j !== i)); }}
                className="min-w-0 flex-1 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200" />
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move ${s} earlier`} className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30">↑</button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === skills.length - 1} aria-label={`Move ${s} later`} className="rounded px-2 py-1 text-slate-500 hover:bg-slate-100 disabled:opacity-30">↓</button>
              <button type="button" onClick={() => onChange(skills.filter((_, j) => j !== i))} aria-label={`Delete ${s}`} className="rounded px-2 py-1 text-red-600 hover:bg-red-50">✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ProgressIndicator({ percent }) {
  return (
    <div className="flex items-center gap-3" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100} aria-label="Portfolio completion">
      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200 sm:w-40">
        <div className="h-full rounded-full bg-indigo-600 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
      <span className="text-sm font-semibold tabular-nums text-slate-800">{percent}%</span>
    </div>
  );
}

/* ---------- main editor ---------- */
function PortfolioForm({ portfolio = {}, onChange }) {
  const p = portfolio || {};
  const [active, setActive] = useState("profile");
  const [dragFrom, setDragFrom] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const topRef = useRef(null);

  // single update path: merge a patch and notify the parent
  const emit = (patch) => onChange?.({ ...p, ...patch });
  const nested = (key, patch) => emit({ [key]: { ...(p[key] || {}), ...patch } });
  const projects = p.projects || [];
  const skills = p.skills || [];
  const social = p.socialLinks || {};

  const move = (from, to) => {
    if (to < 0 || to >= projects.length || from === to) return;
    const next = [...projects];
    next.splice(to, 0, next.splice(from, 1)[0]);
    emit({ projects: next });
  };
  const endDrag = () => { setDragFrom(null); setDragOver(null); };

  const done = {
    profile: !!(p.name && p.role && p.profileImage),
    about: !!p.about?.trim(),
    philosophy: !!(p.designPhilosophy?.text1 && p.designPhilosophy?.image),
    values: !!(p.coreValues?.image1 && p.coreValues?.image2),
    process: true,
    projects: projects.length > 0 && !!projects[0].title,
    case: !!(p.caseStudy?.title && p.caseStudy?.image),
    tools: skills.length > 0,
    aesthetic: !!p.personalAesthetic?.image,
    contact: !!(p.email && (social.github || social.linkedin)),
  };
  const percent = Math.round((Object.values(done).filter(Boolean).length / SECTIONS.length) * 100);
  const idx = SECTIONS.findIndex((s) => s.id === active);
  const section = SECTIONS[idx];
  const go = (id) => { setActive(id); topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  return (
    <div className="min-h-full bg-[#f6f5f1] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div><p className="text-sm font-bold">Portfolio editor</p><p className="hidden text-xs text-slate-500 sm:block">Changes appear in your preview instantly</p></div>
          <ProgressIndicator percent={percent} />
        </div>
      </header>

      <div className="mx-auto max-w-6xl gap-10 px-4 py-6 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
        <nav aria-label="Editor sections" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 lg:sticky lg:top-24 lg:mx-0 lg:mb-0 lg:flex-col lg:gap-1 lg:self-start lg:overflow-visible lg:px-0 lg:pb-0">
          {SECTIONS.map((s, i) => (
            <button key={s.id} type="button" onClick={() => go(s.id)} aria-current={active === s.id ? "step" : undefined}
              className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition ${focus} ${active === s.id ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-white/70 lg:bg-transparent"}`}>
              <span className="text-xs tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-medium">{s.label}</span>
              <span className={`ml-auto hidden text-xs sm:inline ${done[s.id] ? (active === s.id ? "text-emerald-300" : "text-emerald-600") : "opacity-0"}`} aria-label={done[s.id] ? "completed" : undefined}>✓</span>
            </button>
          ))}
        </nav>

        <main ref={topRef} className="scroll-mt-20 pb-16">
          <SectionHeader n={idx + 1} title={section.label} desc={section.desc} />

          {active === "profile" && (
            <div className="grid gap-8 md:grid-cols-[14rem_1fr]">
              <ImageDropzone label="Profile image" value={p.profileImage} onChange={(v) => emit({ profileImage: v })} className="aspect-[4/5]" />
              <div className="space-y-5">
                <Field label="Full name" value={p.name || ""} onChange={(e) => emit({ name: e.target.value })} placeholder="e.g. Mohammed Askar" autoComplete="name" />
                <Field label="Role / professional title" value={p.role || ""} onChange={(e) => emit({ role: e.target.value })} placeholder="e.g. Full Stack Developer" />
                <Field label="Email" type="email" value={p.email || ""} onChange={(e) => emit({ email: e.target.value })} placeholder="you@example.com" autoComplete="email"
                  error={emailOk(p.email) ? "" : "That email doesn't look right yet."} hint="Shown in the contact area of your portfolio." />
              </div>
            </div>
          )}

          {active === "about" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <Field multiline rows={9} label="About / bio" value={p.about || ""} onChange={(e) => emit({ about: e.target.value })}
                placeholder="Tell visitors who you are, what you do, what you care about, and what makes your work unique..."
                hint={`${(p.about || "").length} characters · 300 to 600 reads best`} />
            </div>
          )}

          {active === "philosophy" && (
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <Field multiline rows={3} label="Statement 1" value={p.designPhilosophy?.text1 || ""} onChange={(e) => nested("designPhilosophy", { text1: e.target.value })} placeholder="Design communicates before words do" />
                <Field multiline rows={3} label="Statement 2" value={p.designPhilosophy?.text2 || ""} onChange={(e) => nested("designPhilosophy", { text2: e.target.value })} placeholder="Simplicity strengthens emotional impact" />
              </div>
              <ImageDropzone label="Philosophy image" value={p.designPhilosophy?.image} onChange={(v) => nested("designPhilosophy", { image: v })} />
            </div>
          )}

          {active === "values" && (
            <div className="grid gap-6 sm:grid-cols-2">
              <ImageDropzone label="Core value image 1" value={p.coreValues?.image1} onChange={(v) => nested("coreValues", { image1: v })} className="aspect-[3/4]" />
              <ImageDropzone label="Core value image 2" value={p.coreValues?.image2} onChange={(v) => nested("coreValues", { image2: v })} className="aspect-[3/4]" />
            </div>
          )}

          {active === "process" && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <ol className="grid gap-4 sm:grid-cols-3">
                {["Discover", "Develop", "Deliver"].map((t, i) => (
                  <li key={t} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold text-indigo-600">0{i + 1}</p><p className="mt-1 font-semibold">{t}</p></li>
                ))}
              </ol>
              <p className="mt-5 text-sm text-slate-600">This section is built into your templates, so there is nothing to fill in. It's marked complete automatically.</p>
            </div>
          )}

          {active === "projects" && (
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-10 text-center">
                  <p className="text-lg font-semibold">No projects yet</p>
                  <p className="mt-1 text-sm text-slate-600">Start by adding your first project.</p>
                  <button type="button" onClick={() => emit({ projects: [{ title: "", description: "", image: "" }] })} className={`${btnPrimary} mt-5`}>+ Add project</button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-slate-600">Your first three projects are the featured ones. Drag the ⠿ handle, or use the arrows, to reorder.</p>
                  {projects.map((pr, i) => (
                    <ProjectCard key={i} index={i} total={projects.length} project={pr}
                      onChange={(patch) => emit({ projects: projects.map((x, j) => (j === i ? { ...x, ...patch } : x)) })}
                      onRemove={() => { release(pr.image); emit({ projects: projects.filter((_, j) => j !== i) }); }}
                      onMove={(d) => move(i, i + d)}
                      drag={{
                        isDragging: dragFrom === i,
                        isTarget: dragFrom !== null && dragOver === i && dragFrom !== i,
                        start: (e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(i)); const c = e.currentTarget.closest("article"); if (c) e.dataTransfer.setDragImage(c, 24, 24); setDragFrom(i); },
                        end: endDrag,
                        over: (e) => { if (dragFrom === null) return; e.preventDefault(); setDragOver(i); },
                        drop: (e) => { if (dragFrom === null) return; e.preventDefault(); move(dragFrom, i); endDrag(); },
                      }} />
                  ))}
                  <button type="button" onClick={() => emit({ projects: [...projects, { title: "", description: "", image: "" }] })} className={`${btnGhost} w-full border-dashed py-3`}>+ Add another project</button>
                </>
              )}
            </div>
          )}

          {active === "case" && (
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-5">
                <Field label="Case study title" value={p.caseStudy?.title || ""} onChange={(e) => nested("caseStudy", { title: e.target.value })} placeholder="e.g. Rebranding" />
                <Field multiline rows={7} label="Description" value={p.caseStudy?.description || ""} onChange={(e) => nested("caseStudy", { description: e.target.value })} placeholder="The challenge, your approach, and the result." />
              </div>
              <ImageDropzone label="Case study image" value={p.caseStudy?.image} onChange={(v) => nested("caseStudy", { image: v })} className="aspect-[4/3]" />
            </div>
          )}

          {active === "tools" && <SkillInput skills={skills} onChange={(list) => emit({ skills: list })} />}

          {active === "aesthetic" && (
            <div className="mx-auto max-w-xl">
              <ImageDropzone label="Personal aesthetic image" value={p.personalAesthetic?.image} onChange={(v) => nested("personalAesthetic", { image: v })} className="aspect-[16/10]" rounded="rounded-3xl"
                hint="A mood, a place, a texture. Something that feels like you." />
            </div>
          )}

          {active === "contact" && (
            <div className="max-w-xl space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <Field label="Email" type="email" value={p.email || ""} onChange={(e) => emit({ email: e.target.value })} placeholder="you@example.com" error={emailOk(p.email) ? "" : "That email doesn't look right yet."} />
              <Field label="GitHub" type="url" value={social.github || ""} onChange={(e) => nested("socialLinks", { github: e.target.value })} placeholder="https://github.com/username" error={urlOk(social.github) ? "" : "Please enter a full link starting with https://"} />
              <Field label="LinkedIn" type="url" value={social.linkedin || ""} onChange={(e) => nested("socialLinks", { linkedin: e.target.value })} placeholder="https://linkedin.com/in/username" error={urlOk(social.linkedin) ? "" : "Please enter a full link starting with https://"} />
            </div>
          )}

          <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
            <button type="button" onClick={() => go(SECTIONS[idx - 1].id)} disabled={idx === 0} className={`${btnGhost} disabled:invisible`}>← {SECTIONS[idx - 1]?.label}</button>
            <button type="button" onClick={() => go(SECTIONS[idx + 1].id)} disabled={idx === SECTIONS.length - 1} className={`${btnPrimary} disabled:invisible`}>{SECTIONS[idx + 1]?.label} →</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PortfolioForm;
