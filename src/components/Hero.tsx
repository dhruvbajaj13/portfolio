import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { ArrowDown, Download, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const ROLES = ["Full-Stack Developer", "AI Engineer", "SaaS Builder", "Open Source Contributor"];

const Hero = () => {
  const heroRef     = useRef<HTMLDivElement>(null);
  const mountRef    = useRef<HTMLDivElement>(null);
  const roleRef     = useRef<HTMLSpanElement>(null);
  const cursorRef   = useRef<HTMLSpanElement>(null);
  const badgeRef    = useRef<HTMLDivElement>(null);
  const nameRef     = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const socialsRef  = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  /* ── Three.js 3D Scene ── */
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    /* renderer */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* scene & camera */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
    camera.position.z = 5;

    /* shared material palette */
    const MAT = [
      new THREE.MeshStandardMaterial({ color: 0x2563eb, wireframe: true, transparent: true, opacity: 0.55 }),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.45 }),
      new THREE.MeshStandardMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.35 }),
      new THREE.MeshStandardMaterial({ color: 0x1d4ed8, wireframe: true, transparent: true, opacity: 0.50 }),
    ];

    /* lights */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dLight = new THREE.DirectionalLight(0x4f87ff, 1.2);
    dLight.position.set(3, 5, 5);
    scene.add(dLight);
    const pLight = new THREE.PointLight(0x2563eb, 1.5, 12);
    pLight.position.set(-3, 2, 2);
    scene.add(pLight);

    /* geometry factory */
    type Shape = { mesh: THREE.Mesh; rx: number; ry: number; rz: number; float: number; floatSpeed: number };
    const shapes: Shape[] = [];

    const add = (geo: THREE.BufferGeometry, mat: THREE.MeshStandardMaterial, x: number, y: number, z: number, s: number) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.setScalar(s);
      scene.add(mesh);
      shapes.push({ mesh, rx: Math.random() * 0.004 + 0.001, ry: Math.random() * 0.005 + 0.002, rz: Math.random() * 0.003, float: 0, floatSpeed: Math.random() * 0.6 + 0.4 });
    };

    /* populate scene */
    add(new THREE.IcosahedronGeometry(1, 0),   MAT[0],  3.2,  0.8, -1.5, 0.9);
    add(new THREE.OctahedronGeometry(0.9, 0),  MAT[1], -3.0,  0.4, -2.0, 0.85);
    add(new THREE.TetrahedronGeometry(0.8, 0), MAT[2],  2.4, -1.6, -1.0, 0.7);
    add(new THREE.OctahedronGeometry(0.6, 0),  MAT[3], -2.0, -1.4, -0.8, 0.65);
    add(new THREE.IcosahedronGeometry(0.5, 0), MAT[1],  0.8,  2.0, -2.5, 0.6);
    add(new THREE.TetrahedronGeometry(0.5, 0), MAT[0], -1.2,  1.8, -1.8, 0.55);
    add(new THREE.IcosahedronGeometry(1.3, 1), MAT[2],  0.0, -0.2, -4.0, 1.1);

    /* floating particles */
    const pGeo = new THREE.BufferGeometry();
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 12;
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x3b82f6, size: 0.04, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(pGeo, pMat));

    /* mouse tracking */
    let mouseX = 0, mouseY = 0;
    const targetCam = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    /* resize */
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    /* animate */
    let t = 0;
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.01;

      /* camera gentle follow */
      targetCam.x += (mouseX * 0.25 - targetCam.x) * 0.05;
      targetCam.y += (mouseY * 0.15 - targetCam.y) * 0.05;
      camera.position.x = targetCam.x;
      camera.position.y = -targetCam.y;
      camera.lookAt(scene.position);

      /* shape rotation + float */
      shapes.forEach((s, i) => {
        s.mesh.rotation.x += s.rx;
        s.mesh.rotation.y += s.ry;
        s.mesh.rotation.z += s.rz;
        s.mesh.position.y += Math.sin(t * s.floatSpeed + i) * 0.003;
      });

      renderer.render(scene, camera);
    };
    animate();

    /* entrance: shapes fade in */
    shapes.forEach((s, i) => {
      gsap.fromTo(s.mesh.scale, { x: 0, y: 0, z: 0 }, { x: s.mesh.scale.x, y: s.mesh.scale.y, z: s.mesh.scale.z, duration: 1.2, delay: 0.3 + i * 0.12, ease: "back.out(1.4)" });
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  /* ── typewriter ── */
  useEffect(() => {
    let roleIdx = 0, charIdx = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = ROLES[roleIdx];
      if (roleRef.current) roleRef.current.textContent = word.slice(0, charIdx);
      if (!deleting && charIdx === word.length) { timer = setTimeout(() => { deleting = true; tick(); }, 1800); return; }
      if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; }
      charIdx += deleting ? -1 : 1;
      timer = setTimeout(tick, deleting ? 45 : 80);
    };
    gsap.to(cursorRef.current, { opacity: 0, repeat: -1, yoyo: true, duration: 0.5 });
    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  }, []);

  /* ── entry animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(badgeRef.current,   { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 0.5)
        .fromTo(nameRef.current,    { opacity: 0, y: 50 },              { opacity: 1, y: 0, duration: 0.9 }, "-=0.3")
        .fromTo(descRef.current,    { opacity: 0, y: 24 },              { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
        .fromTo(ctaRef.current?.children ?? [],   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, "-=0.4")
        .fromTo(socialsRef.current?.children ?? [], { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .fromTo(statsRef.current?.children ?? [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .fromTo(scrollRef.current,  { opacity: 0 },                    { opacity: 1, duration: 0.4 }, "-=0.1");

      gsap.to(".h-orb", { y: "+=30", duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16"
    >
      {/* ── 3D canvas mount ── */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />

      {/* ── soft ambient orbs behind content ── */}
      <div className="h-orb absolute top-[15%]  left-[5%]  w-[300px] h-[300px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" style={{ zIndex: 1 }} />
      <div className="h-orb absolute bottom-[10%] right-[5%] w-[260px] h-[260px] rounded-full bg-primary/8  blur-[140px] pointer-events-none" style={{ zIndex: 1 }} />

      {/* ── content ── */}
      <div className="relative w-full max-w-5xl mx-auto px-6 md:px-12 text-center" style={{ zIndex: 10 }}>

        {/* badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-xs font-semibold text-primary mb-8 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Open to SDE Internship Opportunities
        </div>

        {/* name */}
        <h1
          ref={nameRef}
          className="font-display text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-5 opacity-0"
          style={{ textShadow: "0 0 80px hsl(213 60% 48% / 0.15)" }}
        >
          <span className="text-foreground">Dhruv</span>{" "}
          <span className="text-gradient">Bajaj</span>
        </h1>

        {/* typewriter */}
        <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground mb-5">
          <span ref={roleRef} className="text-foreground/90 min-w-[2ch]" />
          <span ref={cursorRef} className="inline-block w-[3px] h-7 bg-primary rounded-full" />
        </div>

        {/* desc */}
        <p ref={descRef} className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 opacity-0">
          ECE undergrad at NSUT building full-stack products and AI systems.
          I turn ideas into production-ready software — fast, clean, and scalable.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="group relative flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm text-primary-foreground bg-primary overflow-hidden transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97] opacity-0"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              View My Work
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
          </button>

          <a
            href="https://drive.google.com/file/d/1FxG4TJ51vdHdKJ0fnpWu6hcq1bevpTDO/view"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm border border-border/60 bg-secondary/40 text-foreground backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-primary/8 hover:scale-[1.05] hover:shadow-lg hover:shadow-primary/10 active:scale-[0.97] opacity-0"
          >
            <Download className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            Download Résumé
          </a>
        </div>

        {/* socials */}
        <div ref={socialsRef} className="flex items-center justify-center gap-3 mb-14">
          {[
            { href: "https://github.com/dhruvbajaj13",               Icon: Github,   label: "GitHub"   },
            { href: "https://linkedin.com/in/dhruv-bajaj-6593002b1", Icon: Linkedin, label: "LinkedIn" },
            { href: "mailto:d4bajaj@gmail.com",                      Icon: Mail,     label: "Email"    },
          ].map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-icon opacity-0">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* stats bar */}
        <div ref={statsRef} className="inline-grid grid-cols-3 gap-px rounded-2xl border border-border/40 bg-border/20 overflow-hidden">
          {[
            { value: "10+",   label: "Projects Shipped" },
            { value: "5+",   label: "Tech Stacks"       },
            { value: "2027", label: "Graduating"        },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center px-8 py-4 bg-card/70 backdrop-blur opacity-0">
              <span className="text-2xl font-bold text-gradient">{value}</span>
              <span className="text-[11px] text-muted-foreground mt-0.5 whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors opacity-0"
        style={{ zIndex: 10 }}
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent animate-scroll-mouse" />
        <ArrowDown className="w-3.5 h-3.5 animate-scroll-mouse" />
      </div>

      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" style={{ zIndex: 5 }} />
    </section>
  );
};

export default Hero;
