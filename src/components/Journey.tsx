import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Frontend Developer Intern',
    company: 'Nexel – Futurize the Innovation',
    duration: 'Jan 2025 – Feb 2025',
    points: [
      'Worked on building responsive and interactive user interfaces using modern frontend technologies.',
      'Collaborated with the team to improve UI performance, code quality, and overall user experience.',
    ],
  },
  {
    role: 'Open Source Contributor',
    company: 'GirlScript Summer of Code (GSSoC)',
    duration: 'June 2025 – Oct 2025',
    points: [
      'Contributed to open-source projects by fixing bugs, improving features, and enhancing documentation.',
      'Worked closely with mentors and contributors, following best practices in Git, pull requests, and code reviews.',
    ],
  },
];

const Journey = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 25 },
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
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power2.out',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        '.experience-card',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: timelineRef.current,
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
      id="journey"
      className="pt-12 pb-24 relative overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Hands-on experience through internships and open-source contributions
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-primary/30"
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="experience-card relative pl-12 md:pl-16 opacity-0"
              >
                {/* Dot */}
                <div className="absolute left-2.5 md:left-4 top-3 w-3 h-3 rounded-full bg-primary border-2 border-background" />

                {/* Card */}
                <div className="glass-card p-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-primary">
                        {exp.role}
                      </h3>
                      <p className="text-base md:text-lg text-foreground">
                        {exp.company}
                      </p>
                    </div>

                    <span className="mt-2 sm:mt-0 text-sm text-muted-foreground">
                      {exp.duration}
                    </span>
                  </div>

                  {/* Bullet Points */}
                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-foreground/85">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;