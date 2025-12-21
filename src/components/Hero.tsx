import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, FileDown, FolderOpen } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  /* ------------------ ENTRY ANIMATIONS ------------------ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(identityRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current?.children || [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
          "-=0.3"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.2"
        );

      gsap.to(".hero-orb", {
        y: 30,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ------------------ 3D PARALLAX ------------------ */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!bgRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      gsap.to(bgRef.current, {
        rotateY: x,
        rotateX: -y,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  /* ------------------ SCROLL ------------------ */
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop - 120,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="
        relative
        min-h-screen
        bg-background
        perspective-[1200px]
        overflow-x-hidden
        overflow-y-visible
        flex
        items-start
        md:items-center
        pt-28
        md:pt-0
      "
    >
      {/* ---------- BACKGROUND ---------- */}
      <div
        ref={bgRef}
        className="absolute inset-0 transform-gpu"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="hero-orb absolute top-[20%] left-[15%] w-[260px] h-[260px] sm:w-[420px] sm:h-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="hero-orb absolute bottom-[15%] right-[10%] w-[240px] h-[240px] sm:w-[380px] sm:h-[380px] rounded-full bg-primary/10 blur-[140px]" />
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Identity */}
          <div ref={identityRef} className="mb-6 md:mb-8 opacity-0">
            <span className="text-lg sm:text-xl md:text-2xl text-foreground">
              Hi, I’m <span className="text-primary font-semibold">Dhruv Bajaj</span> 👋
            </span>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-2">
              Pre-Final Year Engineering Student • Software Developer
            </p>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className="
              font-display
              text-[2.2rem]
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-bold
              tracking-tight
              leading-[1.15]
              pb-2
              mb-6
              opacity-0
              text-foreground
            "
          >
            Building <span className="text-primary">modern web</span>
            <br />
            & <span className="text-primary">AI-powered systems</span>
          </h1>

          {/* Subheadline */}
          <p
            ref={subheadlineRef}
            className="
              text-base
              sm:text-lg
              md:text-xl
              text-muted-foreground
              mb-8
              md:mb-10
              opacity-0
              max-w-2xl
              mx-auto
            "
          >
            Focused on clean architecture, performance, and real-world problem solving
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            {/* View Projects */}
            <button
              onClick={scrollToProjects}
              className="
                btn-primary
                flex items-center gap-3
                px-7 py-3.5
                text-base md:text-lg
                transition-all duration-300 ease-out
                hover:scale-[1.08]
                active:scale-[0.96]
              "
            >
              <FolderOpen className="w-6 h-6" />
              View Projects
            </button>

            {/* Download Resume */}
            <a
              href="https://drive.google.com/file/d/1FxG4TJ51vdHdKJ0fnpWu6hcq1bevpTDO/preview"
              target="_blank"
              rel="noopener noreferrer"
              className="
                btn-secondary
                flex items-center gap-3
                px-7 py-3.5
                text-base md:text-lg
                transition-all duration-300 ease-out
                hover:scale-[1.08]
                active:scale-[0.96]
              "
            >
              <FileDown className="w-6 h-6" />
              Download Resume
            </a>
          </div>
        </div>
      </div>

      {/* ---------- SCROLL INDICATOR ---------- */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 cursor-pointer hidden sm:block"
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-scroll-mouse" />
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
