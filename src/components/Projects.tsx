import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight, X } from 'lucide-react';
import { projects, Project } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

/* ================= PROJECT CARD ================= */

const ProjectCard = ({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) => {
  const isChromeExtension = project.title === 'Synthex';

  return (
    <div
      onClick={onClick}
      className="
        project-card glass-card group cursor-pointer overflow-hidden
        transition-all duration-300
        hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10
      "
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

        {isChromeExtension && (
          <span className="absolute top-3 left-3 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold text-primary-foreground">
            Chrome Extension
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3
          className="
            text-xl
            font-bold
            tracking-tight
            text-foreground
            group-hover:text-primary
            transition-colors
          "
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>

        {/* Tech preview chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="
                rounded-full border border-border/40 bg-secondary/40
                px-3 py-1 text-[11px] font-medium
                text-foreground/80 backdrop-blur
                transition-colors
                group-hover:border-primary/40 group-hover:text-primary
              "
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span
              className="
                rounded-full border border-border/40 bg-secondary/40
                px-3 py-1 text-[11px] font-medium text-muted-foreground
              "
            >
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
          View Details
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

/* ================= PROJECT MODAL ================= */

const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.modal-section',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, delay: 0.2 }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={modalRef}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md px-4"
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-5xl w-full max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-border/40 bg-card/90 backdrop-blur p-6 flex justify-between items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {project.title}
          </h2>

          <div className="flex gap-3">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-5 py-2 rounded-lg
                  bg-primary text-primary-foreground text-sm font-semibold
                  transition-all duration-300
                  hover:scale-105 hover:shadow-lg hover:shadow-primary/40
                "
              >
                <ExternalLink className="w-4 h-4" />
                Live
              </a>
            )}

            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2 px-5 py-2 rounded-lg
                  bg-secondary text-sm font-semibold
                  transition-all duration-300
                  hover:scale-105 hover:shadow-lg
                "
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-secondary transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-12">
          {/* About */}
          <p className="modal-section text-muted-foreground text-base leading-relaxed">
            {project.description}
          </p>

          {/* Problem / Solution */}
          <div className="modal-section grid md:grid-cols-2 gap-6">
            <div className="rounded-lg bg-secondary/30 p-5">
              <h4 className="font-bold mb-2">Problem</h4>
              <p className="text-sm text-muted-foreground">{project.problem}</p>
            </div>
            <div className="rounded-lg bg-primary/5 p-5">
              <h4 className="font-bold mb-2">Solution</h4>
              <p className="text-sm text-muted-foreground">{project.solution}</p>
            </div>
          </div>

          {/* Features */}
          <div className="modal-section">
            <h4 className="font-bold mb-4">Key Features</h4>
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              {project.features.map((f, i) => (
                <li key={i} className="rounded-lg bg-secondary/20 p-4">
                  {['✨', '⚡', '🔒', '🧠', '📊'][i % 5]} {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="modal-section">
            <h4 className="font-bold mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="
                    px-4 py-2 rounded-xl text-sm font-semibold
                    bg-secondary/40 border border-border/40
                    transition-all duration-300
                    hover:border-primary hover:text-primary
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges */}
          <div className="modal-section">
            <h4 className="font-bold mb-4">Challenges & Learnings</h4>
            <div className="space-y-3">
              {project.challenges.map((c, i) => (
                <p
                  key={i}
                  className="border-l-2 border-primary/60 pl-4 text-sm text-muted-foreground"
                >
                  🧩 {c}
                </p>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="modal-section rounded-lg bg-primary/5 p-6">
            <h4 className="font-bold mb-2">Impact</h4>
            <p className="text-sm text-foreground/90">
              🎯 {project.impressive}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= PROJECTS SECTION ================= */

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45 }
      );
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.12 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="pt-14 pb-20">
      <div className="px-6 md:px-12 lg:px-20">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 opacity-0"
        >
          Featured <span className="text-gradient">Projects</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Real-world projects showcasing full-stack, AI, and browser extension development
        </p>

        <div className="projects-grid grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onClick={() => setActive(p)} />
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
};

export default Projects;
