import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/dhruvbajaj13',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYdCZhbVNuoVDpKYkx1pDRQey7spXdqk9Oxg&s',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dhruvbajaj13/',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
  },
  {
    label: 'X',
    href: 'https://x.com/DhruvBajaj43391',
    icon: 'data:image/png;base64,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'
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/dhruvvv_1307',
    icon: 'data:image/jpeg;base64,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'
  },
  {
    label: 'Discord',
    href: 'https://discord.gg/8PcMKtM6',
    icon: 'data:image/png;base64,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'
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, scrollTrigger: { trigger: titleRef.current, start: 'top 85%' } }
      );

      gsap.fromTo(
        '.contact-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="pt-14 pb-24">
      <div className="px-6 md:px-12 lg:px-20">

        {/* Title */}
        <div ref={titleRef} className="text-center mb-14 opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open to internships and full-time opportunities.
          </p>
        </div>

        {/* EMAIL – FIXED */}
        <div className="flex justify-center mb-12">
          <div
            role="button"
            tabIndex={0}
            onClick={() => (window.location.href = 'mailto:d4bajaj@gmail.com')}
            className="
              glass-card px-8 py-5 flex items-center gap-4
              cursor-pointer select-none
              hover:-translate-y-1 transition
              hover:border-primary/40 hover:shadow-xl hover:shadow-primary/20
            "
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/732/732200.png"
              className="w-7 h-7"
            />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">d4bajaj@gmail.com</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText('d4bajaj@gmail.com');
                setCopied(true);
                setTimeout(() => setCopied(false), 1200);
              }}
              className="ml-4 text-xs text-primary"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* SOCIALS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 max-w-4xl mx-auto">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                contact-card glass-card p-6 text-center
                hover:-translate-y-2 transition
                hover:border-primary/30 hover:shadow-lg hover:shadow-primary/15
                opacity-0
              "
            >
              <img src={item.icon} className="w-6 h-6 mx-auto mb-3" />
              <div className="text-sm font-semibold">{item.label}</div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Contact;
