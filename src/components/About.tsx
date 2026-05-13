import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePhoto from '../assets/photo.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: photoRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pt-12 pb-24 relative overflow-hidden"
    >
      
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 opacity-0"
        >
          About <span className="text-gradient">Me</span>
        </h2>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Profile Photo */}
          <div ref={photoRef} className="opacity-0 flex justify-center">
  <div className="relative">
    <div
      className="
        w-[280px] h-[280px]
        md:w-[320px] md:h-[320px]
        rounded-full overflow-hidden
        bg-white
        border-2 border-border/50
        shadow-lg
        flex items-center justify-center
      "
    >
      <img
        src={profilePhoto}
        alt="Dhruv Bajaj"
        className="w-full h-full object-cover scale-125"
      />
    </div>

    {/* Decorative ring */}
    <div className="absolute -inset-5 rounded-full border border-primary/10 -z-10" />
  </div>
</div>


          {/* Content */}
          <div ref={contentRef} className="space-y-6 opacity-0">
            <p className="text-base md:text-lg text-foreground leading-relaxed">
              I’m a{' '}
              <span className="text-primary font-medium">
                3rd-year B.Tech student
              </span>{' '}
              at{' '}
              <span className="text-primary font-medium">
                Netaji Subhas University of Technology (NSUT)
              </span>
              , pursuing Electronics & Communication Engineering with a
              specialization in{' '}
              <span className="text-primary font-medium">IoT</span>. I’m
              passionate about software engineering and enjoy building
              real-world, scalable applications.
            </p>

            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              I have a strong foundation in{' '}
              <span className="text-primary font-medium">
                Data Structures & Algorithms
              </span>
              , which helps me approach problems logically and write efficient,
              maintainable code. Alongside this, I work across the full stack
              using modern web technologies.
            </p>

            <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
              Recently, I’ve been exploring{' '}
              <span className="text-primary font-medium">
                AI-powered systems
              </span>
              , building applications with RAG pipelines, LangChain, and
              agent-based workflows. I focus on creating solutions that are
              practical, scalable, and impactful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
