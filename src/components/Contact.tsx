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
