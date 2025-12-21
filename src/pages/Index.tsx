import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Journey from '@/components/Journey';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import CompetitiveProgramming from '@/components/CompetitiveProgramming';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';


gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll setup with GSAP
    const sections = gsap.utils.toArray<HTMLElement>('section');
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.8 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 20%',
            scrub: 0.5,
          },
        }
      );
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Journey />
        <TechStack />
        <Projects />
        <CompetitiveProgramming />
        
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
