import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, X, ArrowUpRight, Zap, Globe, Code2, Chrome } from 'lucide-react';
import { projects, Project } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

/* ─── helpers ─── */
const categoryMeta: Record<string, { label: string; Icon: React.ElementType; color: string }> = {
  splitr:       { label: 'Full-Stack · AI',        Icon: Zap,      color: 'from-violet-500/20 to-purple-500/10 border-violet-500/30' },
  'smart-agent':{ label: 'AI · LLM',               Icon: Globe,    color: 'from-cyan-500/20 to-teal-500/10 border-cyan-500/30'       },
  codecraft:    { label: 'SaaS · Full-Stack',       Icon: Code2,    color: 'from-orange-500/20 to-amber-500/10 border-orange-500/30'  },
  synthex:      { label: 'Chrome Extension · AI',  Icon: Chrome,   color: 'from-emerald-500/20 to-green-500/10 border-emerald-500/30' },
};

const accentMap: Record<string, string> = {
  splitr:        'group-hover:text-violet-400',
  'smart-agent': 'group-hover:text-cyan-400',
  codecraft:     'group-hover:text-orange-400',
  synthex:       'group-hover:text-emerald-400',
};

const glowMap: Record<string, string> = {
  splitr:        'hover:shadow-violet-500/10',
  'smart-agent': 'hover:shadow-cyan-500/10',
  codecraft:     'hover:shadow-orange-500/10',
  synthex:       'hover:shadow-emerald-500/10',
};

const chipAccentMap: Record<string, string> = {
  splitr:        'group-hover:border-violet-500/40 group-hover:text-violet-300',
  'smart-agent': 'group-hover:border-cyan-500/40 group-hover:text-cyan-300',
  codecraft:     'group-hover:border-orange-500/40 group-hover:text-orange-300',
  synthex:       'group-hover:border-emerald-500/40 group-hover:text-emerald-300',
};

const tagGradient: Record<string, string> = {
  splitr:        'bg-violet-500/15 text-violet-300 border-violet-500/30',
  'smart-agent': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  codecraft:     'bg-orange-500/15 text-orange-300 border-orange-500/30',
  synthex:       'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};

const modalAccent: Record<string, { badge: string; border: string; heading: string; glow: string }> = {
  splitr:        { badge: 'bg-violet-500/15 text-violet-300',  border: 'border-violet-500/30', heading: 'text-violet-400',  glow: 'shadow-violet-500/20'  },
  'smart-agent': { badge: 'bg-cyan-500/15 text-cyan-300',      border: 'border-cyan-500/30',   heading: 'text-cyan-400',    glow: 'shadow-cyan-500/20'    },
  codecraft:     { badge: 'bg-orange-500/15 text-orange-300',  border: 'border-orange-500/30', heading: 'text-orange-400',  glow: 'shadow-orange-500/20'  },
  synthex:       { badge: 'bg-emerald-500/15 text-emerald-300',border: 'border-emerald-500/30',heading: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
};

const featureIcons = ['✦', '⬡', '◈', '⟁', '◉'];

/* ─── card ─── */
const ProjectCard = ({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) => {
  const meta  = categoryMeta[project.id]  ?? { label: 'Project', Icon: Code2, color: 'from-primary/20 to-primary/5 border-primary/20' };
  const hoverAccent = accentMap[project.id]   ?? 'group-hover:text-primary';
  const hoverGlow   = glowMap[project.id]     ?? 'hover:shadow-primary/10';
  const chipAccent  = chipAccentMap[project.id] ?? '';
  const tag         = tagGradient[project.id] ?? 'bg-primary/15 text-primary border-primary/30';

  const isFeatured = index === 0;

  return (
    <div
      onClick={onClick}
      className={`
        project-card group relative cursor-pointer overflow-hidden rounded-2xl
        border border-border/40 bg-card/60 backdrop-blur-sm
        transition-all duration-500
        hover:-translate-y-2 hover:border-border/80 hover:shadow-2xl ${hoverGlow}
        ${isFeatured ? 'md:col-span-2' : ''}
      `}
    >
      {/* gradient overlay on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${meta.color} pointer-events-none`} />

      <div className={`relative flex ${isFeatured ? 'flex-col md:flex-row' : 'flex-col'} h-full`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${isFeatured ? 'md:w-[45%] aspect-video md:aspect-auto' : 'aspect-video'}`}>
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent md:bg-gradient-to-r" />

          {/* Number badge */}
          <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur border border-border/60 flex items-center justify-center text-xs font-bold text-muted-foreground">
            0{index + 1}
          </div>
        </div>

        {/* Content */}
        <div className={`relative flex flex-col justify-between p-6 ${isFeatured ? 'md:p-8 flex-1' : ''}`}>
          {/* Top */}
          <div>
            {/* Category tag */}
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full border ${tag} mb-4`}>
              <meta.Icon className="w-3 h-3" />
              {meta.label}
            </span>

            {/* Title */}
            <h3 className={`font-bold tracking-tight text-foreground transition-colors duration-300 ${hoverAccent} ${isFeatured ? 'text-2xl md:text-3xl mb-3' : 'text-xl mb-2'}`}>
              {project.title}
            </h3>

            {/* Description */}
            <p className={`text-muted-foreground leading-relaxed ${isFeatured ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'}`}>
              {project.description}
            </p>

            {/* Tech chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, isFeatured ? 5 : 3).map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full border border-border/40 bg-secondary/30 px-3 py-1 text-[11px] font-medium text-foreground/70 backdrop-blur transition-all duration-300 ${chipAccent}`}
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > (isFeatured ? 5 : 3) && (
                <span className="rounded-full border border-border/40 bg-secondary/30 px-3 py-1 text-[11px] font-medium text-muted-foreground">
                  +{project.techStack.length - (isFeatured ? 5 : 3)} more
                </span>
              )}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 flex items-center justify-between">
            {/* Links */}
            <div className="flex items-center gap-3">
              {project.liveDemo && project.liveDemo !== '#' && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80 hover:text-primary transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  Source
                </a>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              View case study
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── modal ─── */
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const accent = modalAccent[project.id] ?? { badge: 'bg-primary/15 text-primary', border: 'border-primary/30', heading: 'text-primary', glow: 'shadow-primary/20' };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    gsap.fromTo(panelRef.current,   { opacity: 0, y: 40, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' });
    gsap.fromTo('.ms', { opacity: 0, y: 16 }, { opacity: 1, y: 0, stagger: 0.07, delay: 0.25, duration: 0.4 });
    return () => { document.body.style.overflow = ''; };
  }, []);

  const close = () => {
    gsap.to(panelRef.current,   { opacity: 0, y: 20, scale: 0.97, duration: 0.2 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose });
  };

  return (
    <div
      ref={overlayRef}
      onClick={close}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-lg px-4"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border ${accent.border} bg-card/95 backdrop-blur-xl shadow-2xl ${accent.glow}`}
      >
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-5 right-5 z-20 p-2 rounded-xl bg-secondary/60 hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero image */}
        <div className="relative h-52 md:h-64 overflow-hidden rounded-t-2xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
          <div className="absolute bottom-6 left-8">
            <span className={`inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${accent.badge} ${accent.border} mb-2`}>
              {categoryMeta[project.id]?.label ?? 'Project'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{project.title}</h2>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 px-8 py-4 border-b border-border/30">
          {project.liveDemo && project.liveDemo !== '#' && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold border ${accent.badge} ${accent.border} hover:brightness-110 transition-all`}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-secondary/60 text-sm font-semibold hover:bg-secondary transition-all"
            >
              <Github className="w-4 h-4" />
              View Source
            </a>
          )}
        </div>

        {/* Body */}
        <div className="p-8 space-y-10">

          {/* Description */}
          <p className="ms text-muted-foreground text-base leading-relaxed">{project.description}</p>

          {/* Problem / Solution */}
          <div className="ms grid md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-secondary/20 border border-border/30 p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2">Problem</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{project.problem}</p>
            </div>
            <div className={`rounded-xl border p-5 ${accent.badge} ${accent.border}`}>
              <p className="text-xs font-bold tracking-widest uppercase mb-2 opacity-70">Solution</p>
              <p className="text-sm leading-relaxed opacity-90">{project.solution}</p>
            </div>
          </div>

          {/* Features */}
          <div className="ms">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Key Features</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {project.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 rounded-xl bg-secondary/20 border border-border/20 p-4 text-sm text-foreground/80">
                  <span className={`mt-0.5 text-base ${accent.heading}`}>{featureIcons[i % featureIcons.length]}</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="ms">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all duration-200 hover:brightness-110 ${accent.badge} ${accent.border}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="ms">
            <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">Challenges & Learnings</p>
            <div className="space-y-3">
              {project.challenges.map((c, i) => (
                <div key={i} className={`flex gap-3 border-l-2 pl-4 ${accent.border}`}>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className={`ms rounded-xl border p-6 ${accent.badge} ${accent.border}`}>
            <p className="text-xs font-bold tracking-widest uppercase mb-3 opacity-70">Impact</p>
            <p className={`text-sm font-semibold leading-relaxed ${accent.heading}`}>{project.impressive}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── section ─── */
const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      });
      gsap.fromTo('.project-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="pt-16 pb-24">
      <div className="px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary/70 border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base">
            A selection of real-world products — from AI-powered platforms to browser extensions — built and shipped end-to-end.
          </p>
        </div>

        {/* Grid: first card spans 2 cols, rest are normal */}
        <div className="projects-grid grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onClick={() => setActive(p)} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/dhruvbajaj13"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <Github className="w-4 h-4" />
            See all projects on GitHub
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
};

export default Projects;
