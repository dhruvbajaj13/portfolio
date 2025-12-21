import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      for (const link of [...navLinks].reverse()) {
        const el = document.getElementById(link.href.substring(1));
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(link.href.substring(1));
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div
        className="
          rounded-full 
          bg-black/40 
          backdrop-blur-xl 
          border border-white/10 
          shadow-xl
          px-6 py-3
          md:px-12 md:py-5
        "
      >
        <div className="flex items-center gap-6 md:gap-14">
          {navLinks.map((link) => {
            const isActive = active === link.href.substring(1);
            return (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className="
                  group relative 
                  text-[13px] md:text-[16px]
                  font-medium tracking-wide
                  text-white/60
                  transition-all duration-300
                  hover:text-white hover:-translate-y-[1px]
                "
              >
                <span
                  className={`transition-all duration-300 ${
                    isActive ? "text-white tracking-wider" : ""
                  }`}
                >
                  {link.name}
                </span>

                {/* Underline */}
                <span
                  className={`
                    absolute -bottom-1 left-1/2
                    h-[2px]
                    w-0 -translate-x-1/2
                    bg-white/90
                    transition-all duration-300
                    group-hover:w-full
                    ${isActive ? "w-full" : ""}
                  `}
                />

                {/* Subtle glow */}
                <span className="absolute inset-0 rounded-md opacity-0 blur-md bg-white/20 transition group-hover:opacity-100 -z-10" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
