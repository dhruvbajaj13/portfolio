import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ---------------- COUNT UP ---------------- */
const CountUpOnView = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start: number | null = null;

          const animate = (time: number) => {
            if (!start) start = time;
            const progress = Math.min((time - start) / 1200, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

/* ---------------- DATA (UNCHANGED) ---------------- */
const platforms = [
  {
    name: 'LeetCode',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
    iconSize: 'w-12 h-12',
    link: 'https://leetcode.com/u/gitcommitDD/',
    stats: [
      { label: 'Problems Solved', value: 700, suffix: '+' },
      { label: 'Contests', value: 30, suffix: '+' },
      { label: 'Rating', value: 1861 },
      { label: 'Global Rank', value: 45075, suffix: '+' },
    ],
    topics: ['Arrays', 'DP', 'Trees', 'Graphs', 'Binary Search'],
  },
  {
    name: 'Codeforces',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Codeforces_logo.svg',
    iconSize: 'w-10 h-10',
    link: 'https://codeforces.com/profile/dhruvvv_1307',
    stats: [
      { label: 'Current Rating', value: 1198 },
      { label: 'Max Rating', value: 1198 },
      { label: 'Contests', value: 10, suffix: '+' },
      { label: 'Problems Solved', value: 70, suffix: '+' },
    ],
    topics: ['Greedy', 'Math', 'Implementation', 'Bit Manipulation'],
  },
  {
    name: 'CodeChef',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/CodeChef_Logo.svg',
    iconSize: 'w-16 h-16',
    link: 'https://www.codechef.com/users/dhruvvv_1307',
    stats: [
      { label: 'Rating', value: 1446 },
      { label: 'Stars', value: 2 },
      { label: 'Contests', value: 7, suffix: '+' },
      { label: 'Problems Solved', value: 50, suffix: '+' },
    ],
    topics: ['Binary Search', 'Number Theory', 'Recursion'],
  },
];

/* ---------------- COMPONENT ---------------- */
const CompetitiveProgramming = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
        '.cp-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---------- 3D Hover ---------- */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });
  };

  return (
    <section ref={sectionRef} id="competitive" className="pt-12 pb-24 relative">
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-14 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Competitive <span className="text-gradient">Programming</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Strong DSA foundation built through consistent practice
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto perspective-[1200px]">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="cp-card glass-card p-6 transition-all duration-300 will-change-transform"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={platform.icon}
                    alt={platform.name}
                    className={`${platform.iconSize} object-contain`}
                  />
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    {platform.name}
                  </h3>
                </div>
                <a
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-md hover:bg-secondary transition"
                >
                  <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {platform.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-secondary/50 rounded-md p-4 text-center transition hover:bg-secondary"
                  >
                    <div className="text-xl font-bold text-foreground">
                      <CountUpOnView value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Topics */}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2">
                  Strong Topics
                </p>
                <div className="flex flex-wrap gap-2">
                  {platform.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-md text-xs font-medium
                        bg-secondary/60 border border-border/50
                        transition hover:bg-primary/10 hover:border-primary/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompetitiveProgramming;
