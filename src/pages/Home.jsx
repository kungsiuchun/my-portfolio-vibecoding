import React from 'react';
import { ArrowRight, Mail, Github, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import GithubStats from '../components/GithubStats';
import SiteAnalytics from '../components/SiteAnalytics';
import FinancialReport from '../components/FinancialReport';
import { CinematicHero } from '@/components/ui/cinematic-landing-hero';

const Home = () => {
  const featuredPosts = [...posts]
    .sort((a, b) => new Date(b.date.replace(/\./g, '-')) - new Date(a.date.replace(/\./g, '-')))
    .slice(0, 4);

  return (
    <div className="w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.14),_transparent_26%),linear-gradient(180deg,_#020617_0%,_#0f172a_20%,_#020617_100%)] text-white">
      <section aria-label="Hero">
        <CinematicHero
          brandName="SiuChun"
          tagline1="Design the system,"
          tagline2="ship the signal."
          cardHeading="Executive BI, built for clarity."
          cardDescription={
            <>
              我做 Power BI dashboard、stakeholder reporting 同 data storytelling，重點係清晰、可信，同埋真係幫到決策。
            </>
          }
          metricValue={featuredPosts.length}
          metricLabel="YoY Growth"
          ctaHeading="Move to the work."
          ctaDescription="直接跳去 selected projects、analytics，同 contact 區塊，唔玩假 link。"
          primaryCtaLabel="Explore Projects"
          primaryCtaTarget="projects"
          secondaryCtaLabel="Contact Me"
          secondaryCtaTarget="contact"
        />
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300/70">
            Selected work
          </p>
          <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
            Projects that look sharp and actually do something.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
            下面呢堆唔係裝飾卡片，而係我網站入面真正運作緊嘅內容層。首頁要有呼吸感，但唔可以空心。
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-2">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="group rounded-[2rem] border border-white/10 bg-white/6 p-7 shadow-2xl shadow-slate-950/30 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-sky-400/30"
            >
              <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.35em] text-sky-200/70">
                <Sparkles size={14} />
                <span>{post.category}</span>
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight text-white md:text-3xl">
                <Link to={`/post/${post.id}`} className="transition-colors group-hover:text-sky-300">
                  {post.title}
                </Link>
              </h3>

              <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg">
                {post.desc}
              </p>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-400">{post.date}</span>
                <Link
                  to={`/post/${post.id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white transition-all group-hover:gap-3"
                >
                  Read More <ArrowRight size={18} className="text-sky-300" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="insights" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300/70">
                Live signals
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                Data blocks that stay useful after the novelty fades.
              </h2>
            </div>
            <GithubStats />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-fuchsia-300/70">
                Site behavior
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
                What visitors actually do on the site.
              </h2>
            </div>
            <SiteAnalytics />
          </div>
        </div>
      </section>

      <section id="report" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div className="rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl md:p-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-300/70">
              Spotlight
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
              一張報表頁，唔應該只係圖表堆砌。
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
              這裡保留原本的 FinancialReport，作為 portfolio 裡面最重的展示件。重就重，但要有價值。
            </p>
          </div>
          <FinancialReport />
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/6 p-7 shadow-2xl shadow-slate-950/30 backdrop-blur-xl md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300/70">
              Contact
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
              想合作，就直接搵我。
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              呢個版面唔會扮神秘。你有 project、產品頁、數據 dashboard 或 portfolio redesign，直接畀一條路你走到尾。
            </p>
          </div>

          <div className="grid gap-4">
            <a
              href="https://github.com/"
              className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-slate-950/70 px-6 py-5 text-white shadow-lg shadow-slate-950/25 transition-transform hover:-translate-y-0.5"
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center gap-4">
                <Github size={22} className="text-sky-300" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">GitHub</p>
                  <p className="text-lg font-semibold">Code and projects</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-400" />
            </a>

            <a
              href="mailto:hello@example.com"
              className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-slate-950/70 px-6 py-5 text-white shadow-lg shadow-slate-950/25 transition-transform hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <Mail size={22} className="text-rose-300" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">Email</p>
                  <p className="text-lg font-semibold">hello@example.com</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-400" />
            </a>

            <Link
              to="/about"
              className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-slate-950/70 px-6 py-5 text-white shadow-lg shadow-slate-950/25 transition-transform hover:-translate-y-0.5"
            >
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">About</p>
                <p className="text-lg font-semibold">Background, process, and approach</p>
              </div>
              <ArrowRight size={18} className="text-slate-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
