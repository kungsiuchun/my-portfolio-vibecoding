"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }
  .transform-style-3d { transform-style: preserve-3d; }

  .film-grain {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      opacity: 0.06;
      mix-blend-mode: overlay;
      background-image:
        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.45) 0.5px, transparent 0.5px),
        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.35) 0.5px, transparent 0.5px);
      background-size: 3px 3px;
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, var(--color-foreground) 0%, color-mix(in srgb, var(--color-foreground) 40%, transparent) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 10px 20px color-mix(in srgb, var(--color-foreground) 15%, transparent))
          drop-shadow(0px 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #162C6D 0%, #0A101D 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06) 0%, transparent 40%);
      mix-blend-mode: screen;
      transition: opacity 0.3s ease;
  }

  .dashboard-shell {
      background: linear-gradient(180deg, rgba(8,18,45,0.96) 0%, rgba(5,11,30,0.98) 100%);
      border: 1px solid rgba(148, 163, 184, 0.14);
      box-shadow:
          0 45px 90px -20px rgba(0,0,0,0.82),
          0 18px 30px -12px rgba(0,0,0,0.68),
          inset 0 1px 0 rgba(255,255,255,0.12),
          inset 0 -1px 0 rgba(15, 23, 42, 0.8);
      overflow: hidden;
      transform-style: preserve-3d;
  }

  .dashboard-shell::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
          radial-gradient(circle at top left, rgba(96,165,250,0.18), transparent 34%),
          linear-gradient(135deg, rgba(255,255,255,0.06), transparent 30%);
      pointer-events: none;
      z-index: 1;
  }

  .dashboard-shell::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
          linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(148,163,184,0.05) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: linear-gradient(180deg, rgba(0,0,0,0.55), transparent 90%);
      pointer-events: none;
      z-index: 1;
  }

  .dashboard-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 42%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
      box-shadow:
          0 18px 36px rgba(2,6,23,0.35),
          inset 0 1px 0 rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
  }

  .dashboard-chip {
      background: linear-gradient(180deg, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.3) 100%);
      border: 1px solid rgba(148,163,184,0.15);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .dashboard-bar-track {
      background: rgba(148,163,184,0.12);
  }

  .dashboard-bar-fill {
      background: linear-gradient(90deg, #38BDF8 0%, #2563EB 100%);
      box-shadow: 0 0 24px rgba(56,189,248,0.35);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  primaryCtaLabel?: string;
  primaryCtaTarget?: string;
  secondaryCtaLabel?: string;
  secondaryCtaTarget?: string;
}

export function CinematicHero({
  brandName = 'SiuChun',
  tagline1 = 'Design the system,',
  tagline2 = 'ship the signal.',
  cardHeading = 'BI systems, staged with intent.',
  cardDescription = (
    <>
      Executive reporting, KPI design, and narrative dashboards built to help
      stakeholders move faster with cleaner signals.
    </>
  ),
  metricValue = 12,
  metricLabel = 'YoY Growth',
  ctaHeading = 'Move to the work.',
  ctaDescription = 'Jump straight into projects, analytics, and contact details without fake links or dead ends.',
  primaryCtaLabel = 'Explore Projects',
  primaryCtaTarget = 'projects',
  secondaryCtaLabel = 'Contact Me',
  secondaryCtaTarget = 'contact',
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;

      cancelAnimationFrame(requestRef.current);

      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          mainCardRef.current.style.setProperty('--mouse-x', `${mouseX}px`);
          mainCardRef.current.style.setProperty('--mouse-y', `${mouseY}px`);

          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;

          gsap.to(mockupRef.current, {
            rotationY: xVal * 10,
            rotationX: -yVal * 10,
            ease: 'power3.out',
            duration: 1.2,
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set('.text-track', {
        autoAlpha: 0,
        y: 60,
        scale: 0.85,
        filter: 'blur(20px)',
        rotationX: -20,
      });
      gsap.set('.text-days', { autoAlpha: 1, clipPath: 'inset(0 100% 0 0)' });
      gsap.set('.main-card', { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set(['.card-left-text', '.card-right-text', '.mockup-scroll-wrapper', '.floating-badge', '.phone-widget'], {
        autoAlpha: 0,
      });
      gsap.set('.cta-wrapper', { autoAlpha: 0, scale: 0.8, filter: 'blur(30px)' });

      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to('.text-track', {
          duration: 1.8,
          autoAlpha: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          rotationX: 0,
          ease: 'expo.out',
        })
        .to(
          '.text-days',
          {
            duration: 1.4,
            clipPath: 'inset(0 0% 0 0)',
            ease: 'power4.inOut',
          },
          '-=1.0',
        );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=7000',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        .to(['.hero-text-wrapper', '.bg-grid-theme'], {
          scale: 1.15,
          filter: 'blur(20px)',
          opacity: 0.2,
          ease: 'power2.inOut',
          duration: 2,
        }, 0)
        .to('.main-card', { y: 0, ease: 'power3.inOut', duration: 2 }, 0)
        .to('.main-card', {
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          ease: 'power3.inOut',
          duration: 1.5,
        })
        .fromTo(
          '.mockup-scroll-wrapper',
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 2.5 },
          '-=0.8',
        )
        .fromTo(
          '.phone-widget',
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.12, ease: 'back.out(1.2)', duration: 1.3 },
          '-=1.5',
        )
        .fromTo(
          '.floating-badge',
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'back.out(1.5)', duration: 1.5, stagger: 0.2 },
          '-=2.0',
        )
        .fromTo('.card-left-text', { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: 'power4.out', duration: 1.5 }, '-=1.5')
        .fromTo('.card-right-text', { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 1.5 }, '<')
        .to({}, { duration: 2.5 })
        .set('.hero-text-wrapper', { autoAlpha: 0 })
        .set('.cta-wrapper', { autoAlpha: 1 })
        .to({}, { duration: 1.5 })
        .to(['.mockup-scroll-wrapper', '.floating-badge', '.card-left-text', '.card-right-text'], {
          scale: 0.9,
          y: -40,
          z: -200,
          autoAlpha: 0,
          ease: 'power3.in',
          duration: 1.2,
          stagger: 0.05,
        })
        .to(
          '.main-card',
          {
            width: isMobile ? '92vw' : '85vw',
            height: isMobile ? '92vh' : '85vh',
            borderRadius: isMobile ? '32px' : '40px',
            ease: 'expo.inOut',
            duration: 1.8,
          },
          'pullback',
        )
        .to('.cta-wrapper', { scale: 1, filter: 'blur(0px)', ease: 'expo.inOut', duration: 1.8 }, 'pullback')
        .to('.main-card', { y: -window.innerHeight - 300, ease: 'power3.in', duration: 1.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  const scrollToTarget = (targetId: string) => {
    const id = targetId.replace(/^#/, '');
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-screen min-h-screen overflow-hidden flex items-center justify-center bg-background text-foreground font-sans antialiased',
        className,
      )}
      style={{ perspective: '1500px' }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-50" aria-hidden="true" />

      <div className="hero-text-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 pb-6 overflow-visible will-change-transform transform-style-3d">
        <h1 className="text-track gsap-reveal text-3d-matte text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[0.98] mb-3">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte inline-block text-5xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter leading-[1.12] pt-1 pb-4">
          {tagline2}
        </h1>
      </div>

      <div className="cta-wrapper absolute z-10 flex flex-col items-center justify-center text-center w-screen px-4 gsap-reveal pointer-events-auto will-change-transform">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-silver-matte">
          {ctaHeading}
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto font-light leading-relaxed">
          {ctaDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <button
            type="button"
            onClick={() => scrollToTarget(primaryCtaTarget)}
            className="btn-modern-light flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase mb-[-2px]">Jump to</div>
              <div className="text-xl font-bold leading-none tracking-tight">{primaryCtaLabel}</div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => scrollToTarget(secondaryCtaTarget)}
            className="btn-modern-dark flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            <div className="text-left">
              <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase mb-[-2px]">Jump to</div>
              <div className="text-xl font-bold leading-none tracking-tight">{secondaryCtaLabel}</div>
            </div>
          </button>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none" style={{ perspective: '1500px' }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card relative overflow-hidden gsap-reveal flex items-center justify-center pointer-events-auto w-[92vw] md:w-[85vw] h-[92vh] md:h-[85vh] rounded-[32px] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative w-full h-full max-w-[1780px] mx-auto px-4 lg:px-8 xl:px-10 flex flex-col justify-evenly lg:grid lg:grid-cols-[0.56fr_2.25fr_0.54fr] items-center lg:gap-2 xl:gap-4 z-10 py-6 lg:py-0">
            <div className="card-right-text gsap-reveal order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full lg:-translate-x-6 xl:-translate-x-10 lg:-translate-y-4">
              <h2 className="text-6xl md:text-[6rem] lg:text-[5.7rem] xl:text-[6.2rem] font-black uppercase tracking-tighter text-card-silver-matte lg:mt-0">
                {brandName}
              </h2>
            </div>

            <div className="mockup-scroll-wrapper order-2 lg:order-2 relative w-full h-[420px] lg:h-[780px] xl:h-[800px] flex items-center justify-center z-10" style={{ perspective: '1000px' }}>
              <div className="relative w-full h-full flex items-center justify-center transform scale-[0.7] md:scale-[0.92] lg:scale-[1.05] xl:scale-[1.1]">
                <div
                  ref={mockupRef}
                  className="dashboard-shell relative w-[680px] h-[420px] lg:w-[950px] lg:h-[534px] xl:w-[1075px] xl:h-[605px] rounded-[2.75rem] xl:rounded-[3rem] will-change-transform transform-style-3d"
                >
                  <div className="absolute inset-[10px] xl:inset-[12px] rounded-[2.35rem] xl:rounded-[2.65rem] overflow-hidden bg-[#071126] shadow-[inset_0_0_24px_rgba(0,0,0,0.45)] text-white z-10">
                    <div className="absolute inset-0 dashboard-glare z-40 pointer-events-none" aria-hidden="true" />

                    <div className="relative z-20 h-full px-8 pt-7 pb-6 lg:px-9 lg:pt-7 lg:pb-6 xl:px-10 xl:pt-8 xl:pb-7">
                      <div className="phone-widget flex items-start justify-between mb-6 xl:mb-7">
                        <div>
                          <div className="flex items-center gap-2 mb-3 xl:mb-4">
                            <span className="dashboard-chip rounded-full px-3 py-1 text-[11px] xl:px-4 xl:py-1.5 xl:text-xs font-bold uppercase tracking-[0.24em] text-sky-100/70">
                              Executive BI
                            </span>
                            <span className="flex items-center gap-2 text-[11px] xl:text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300/80">
                              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.85)]" />
                              Live Refresh
                            </span>
                          </div>
                          <p className="text-xs xl:text-[12px] font-medium uppercase tracking-[0.28em] text-slate-400">Quarterly revenue overview</p>
                          <h4 className="text-[34px] lg:text-[38px] xl:text-[42px] font-black tracking-tight text-white">Boardroom Signal Layer</h4>
                        </div>
                        <div className="dashboard-chip rounded-2xl px-5 py-4 text-right min-w-[146px] lg:min-w-[174px] xl:min-w-[196px] xl:px-6 xl:py-5">
                          <p className="text-[11px] xl:text-xs font-bold uppercase tracking-[0.28em] text-slate-400">Forecast</p>
                          <p className="text-[30px] lg:text-[34px] xl:text-[38px] font-black tracking-tight text-white">97.2%</p>
                          <p className="text-xs xl:text-sm font-medium text-emerald-300">On target</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-[1.08fr_0.92fr] items-start gap-3 lg:gap-4 xl:gap-4">
                        <div className="phone-widget widget-depth self-start h-fit rounded-[1.7rem] p-4 xl:p-4.5">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-[11px] xl:text-xs font-bold uppercase tracking-[0.26em] text-slate-400">Revenue</p>
                              <p className="text-[42px] lg:text-[46px] xl:text-[40px] font-black leading-none tracking-tight text-white">$4.2M</p>
                            </div>
                            <div className="dashboard-chip rounded-full px-3 py-1.5 xl:px-3.5 xl:py-2">
                              <span className="text-[11px] xl:text-xs font-bold text-emerald-300">+18.4% {metricLabel}</span>
                            </div>
                          </div>
                          <div className="relative h-[98px] lg:h-[108px] xl:h-[118px] rounded-[1.25rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] border border-white/5 overflow-hidden">
                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 100" aria-hidden="true">
                              <defs>
                                <linearGradient id="hero-dashboard-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor="#38BDF8" />
                                  <stop offset="100%" stopColor="#60A5FA" />
                                </linearGradient>
                              </defs>
                              <path d="M8 78 C36 72, 44 46, 72 48 S118 79, 146 60 S198 20, 252 28" fill="none" stroke="url(#hero-dashboard-line)" strokeWidth="4" strokeLinecap="round" />
                              <path d="M8 78 C36 72, 44 46, 72 48 S118 79, 146 60 S198 20, 252 28 L252 100 L8 100 Z" fill="url(#hero-dashboard-line)" opacity="0.16" />
                              <circle cx="146" cy="60" r="4" fill="#7DD3FC" />
                              <circle cx="252" cy="28" r="5" fill="#BFDBFE" />
                            </svg>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-[11px] xl:text-xs font-medium text-slate-400">
                            <span>North America leads this quarter</span>
                            <span className="text-sky-200">Q4 close</span>
                          </div>
                        </div>

                        <div className="space-y-3 xl:space-y-3.5 self-start">
                          <div className="phone-widget widget-depth h-fit rounded-[1.55rem] p-3.5 xl:p-4">
                            <div className="flex items-center justify-between mb-2.5">
                              <p className="text-[11px] xl:text-xs font-bold uppercase tracking-[0.26em] text-slate-400">Pipeline by segment</p>
                              <span className="text-[11px] xl:text-xs font-bold text-indigo-200">82%</span>
                            </div>
                            <div className="space-y-2 xl:space-y-2.5">
                              <div>
                                <div className="mb-1 flex items-center justify-between text-[11px] xl:text-xs text-slate-300">
                                  <span>Enterprise</span>
                                  <span>$1.8M</span>
                                </div>
                                <div className="dashboard-bar-track h-2 rounded-full overflow-hidden">
                                  <div className="dashboard-bar-fill h-full w-[82%] rounded-full" />
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 flex items-center justify-between text-[11px] xl:text-xs text-slate-300">
                                  <span>Mid-market</span>
                                  <span>$1.1M</span>
                                </div>
                                <div className="dashboard-bar-track h-2 rounded-full overflow-hidden">
                                  <div className="h-full w-[64%] rounded-full bg-[linear-gradient(90deg,#22C55E_0%,#38BDF8_100%)]" />
                                </div>
                              </div>
                              <div>
                                <div className="mb-1 flex items-center justify-between text-[11px] xl:text-xs text-slate-300">
                                  <span>SMB</span>
                                  <span>$0.7M</span>
                                </div>
                                <div className="dashboard-bar-track h-2 rounded-full overflow-hidden">
                                  <div className="h-full w-[41%] rounded-full bg-[linear-gradient(90deg,#F59E0B_0%,#F97316_100%)]" />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="phone-widget widget-depth h-fit rounded-[1.55rem] p-3.5 xl:p-4">
                            <div className="mb-2.5 flex items-center justify-between">
                              <p className="text-[11px] xl:text-xs font-bold uppercase tracking-[0.26em] text-slate-400">Regional performance</p>
                              <span className="text-[11px] xl:text-xs font-bold text-emerald-300">+6 pts</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5">
                              <div className="rounded-[1rem] bg-white/5 px-2.5 py-2 xl:px-3 xl:py-2.5 text-center">
                                <p className="text-[10px] xl:text-[11px] uppercase tracking-[0.2em] text-slate-400">APAC</p>
                                <p className="text-[18px] xl:text-[20px] font-black text-white">118%</p>
                              </div>
                              <div className="rounded-[1rem] bg-white/5 px-2.5 py-2 xl:px-3 xl:py-2.5 text-center">
                                <p className="text-[10px] xl:text-[11px] uppercase tracking-[0.2em] text-slate-400">EMEA</p>
                                <p className="text-[18px] xl:text-[20px] font-black text-white">104%</p>
                              </div>
                              <div className="rounded-[1rem] bg-white/5 px-2.5 py-2 xl:px-3 xl:py-2.5 text-center">
                                <p className="text-[10px] xl:text-[11px] uppercase tracking-[0.2em] text-slate-400">NA</p>
                                <p className="text-[18px] xl:text-[20px] font-black text-white">121%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="floating-badge absolute flex top-10 lg:top-14 left-[-15px] lg:left-[-104px] xl:left-[-118px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-blue-500/20 to-blue-900/10 flex items-center justify-center border border-blue-400/30 shadow-inner">
                    <span className="text-base lg:text-xl drop-shadow-lg" aria-hidden="true">🚀</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Power BI Delivery</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">Executive reporting with motion</p>
                  </div>
                </div>

                <div className="floating-badge absolute flex bottom-12 lg:bottom-14 right-[-15px] lg:right-[-104px] xl:right-[-118px] floating-ui-badge rounded-xl lg:rounded-2xl p-3 lg:p-4 items-center gap-3 lg:gap-4 z-30">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 flex items-center justify-center border border-indigo-400/30 shadow-inner">
                    <span className="text-base lg:text-lg drop-shadow-lg" aria-hidden="true">📊</span>
                  </div>
                  <div>
                    <p className="text-white text-xs lg:text-sm font-bold tracking-tight">Executive Reporting</p>
                    <p className="text-blue-200/50 text-[10px] lg:text-xs font-medium">KPI hierarchy built for decisions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-[320px] xl:max-w-[360px] px-4 lg:px-0 lg:self-end lg:pb-12 xl:pb-16">
              <h3 className="text-white text-2xl md:text-3xl lg:text-[2.3rem] xl:text-[2.5rem] font-bold mb-0 lg:mb-5 tracking-tight">
                {cardHeading}
              </h3>
              <p className="hidden md:block text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none">
                {cardDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CinematicHero;
