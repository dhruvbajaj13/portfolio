import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const techStack = {
  Languages: [
    {
      name: 'Java',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'JavaScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    },
    {
      name: 'TypeScript',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      name: 'Python',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
  ],

  'Frameworks & Libraries': [
    {
      name: 'React.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'Next.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    },
    {
      name: 'Node.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    },
    {
      name: 'Express.js',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    },
    {
      name: 'Tailwind CSS',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    },
  ],

  Databases: [
    {
      name: 'MongoDB',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    },
    {
      name: 'MySQL',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    },
    {
    name: 'ChromaDB',
    icon: 'data:image/webp;base64,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',
  },
  ],

  'AI Technologies': [
    {
      name: 'LangChain',
      icon: 'https://avatars.githubusercontent.com/u/126733545?s=200&v=4',
    },
    {
      name: 'LangGraph',
      icon: 'data:image/png;base64,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',
    },
    {
      name: 'RAG',
      icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png',
    },
    {
      name: 'LLMs',
      icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png',
    },
    {
      name: 'Vector Databases',
      icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712066.png',
    },
    {
      name: 'Embedding Models',
      icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712054.png',
    },
  ],

  'Tools & Platforms': [
    {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'GitHub',
    icon: 'data:image/jpeg;base64,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',
  },
    {
      name: 'Postman',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    },
    {
      name: 'Jira',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg',
    },
    
    {
      name: 'WebSockets',
      icon: 'https://cdn-icons-png.flaticon.com/512/4712/4712071.png',
    },
    {
      name: 'Jupyter Notebook',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg',
    },
  ],
};

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

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
        '.tech-card',
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="tech-stack"
      className="pt-10 pb-24 relative overflow-hidden"
    >
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-16 opacity-0">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto">
            Technologies I actively use to build scalable and modern applications
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-14 max-w-5xl mx-auto">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                {category}
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-5">
                {items.map((tech) => (
                  <div
                    key={tech.name}
                    className="tech-card glass-card p-4 md:p-5 flex flex-col items-center gap-3 opacity-0 group transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="w-full h-full object-contain group-hover:brightness-110 transition"
                      />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-foreground/80 group-hover:text-foreground text-center transition-colors">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
