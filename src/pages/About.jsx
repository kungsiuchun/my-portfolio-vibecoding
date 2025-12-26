import React from 'react';
import { User, Code, Database, LineChart, Mail, Github, Linkedin } from 'lucide-react';

const About = () => {
  const skillCategories = [
    {
      title: "Data Visualization & Analysis",
      icon: <LineChart className="text-sky-500" />,
      skills: [
        { name: "Power BI", score: 8, color: "bg-sky-400" },
        { name: "Python (Pandas/NumPy)", score: 7, color: "bg-sky-400" },
        { name: "Data Storytelling", score: 9, color: "bg-sky-400" }
      ]
    },
    {
      title: "Data Management & SQL",
      icon: <Database className="text-emerald-500" />,
      skills: [
        { name: "SQL (Complex Queries)", score: 9, color: "bg-emerald-400" },
        { name: "ETL Processes", score: 8, color: "bg-emerald-400" },
        { name: "Database Design", score: 7, color: "bg-emerald-400" }
      ]
    },
    {
      title: "Frontend Development",
      icon: <Code className="text-rose-500" />,
      skills: [
        { name: "React.js", score: 8, color: "bg-rose-400" },
        { name: "Tailwind CSS", score: 9, color: "bg-rose-400" },
        { name: "Vite / Modern Tooling", score: 8, color: "bg-rose-400" }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 transition-colors duration-500">
      
      {/* 1. Hero Section: 加上 dark:bg-slate-900 和 dark:border-slate-800 */}
      <section className="relative bg-white dark:bg-slate-900 rounded-[3.5rem] p-8 md:p-20 shadow-sm border border-slate-50 dark:border-slate-800 overflow-hidden mb-12 transition-colors duration-500">
        {/* 深色模式下的背景裝飾球稍微調暗 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 dark:bg-rose-900/10 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-inner flex-shrink-0">
            <img src={`${import.meta.env.BASE_URL}images/SIUCHUN_HEADSHOT.jpeg`} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            {/* 2. 文字: 加上 dark:text-white */}
            <h1 className="text-5xl md:text-7xl font-black text-slate-800 dark:text-white mb-6">I'm Vibe.</h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
              A developer specializing in <span className="text-rose-400 font-medium">Data Visualization</span> and 
              <span className="text-sky-400 font-medium"> Frontend Engineering</span>.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="mailto:kungsiuchun0@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-full hover:bg-rose-400 dark:hover:bg-rose-400 transition-colors shadow-lg font-bold">
                <Mail size={18} /> Contact Me
              </a>
              <div className="flex gap-3">
                <a href="https://github.com/kungsiuchun" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/siu-chun-kung-75255916a/" className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Skill Ecosystem Section */}
      <section className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 dark:text-white">Skill Ecosystem</h2>
          <p className="text-slate-400 dark:text-slate-500 mt-4 font-medium">Multi-disciplinary technical expertise</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            /* 💡 卡片背景改為 dark:bg-slate-900 */
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-sm border border-slate-50 dark:border-slate-800 hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{category.title}</h3>
              </div>

              <div className="space-y-8">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-end px-1">
                      <span className="text-slate-700 dark:text-slate-300 font-medium">{skill.name}</span>
                      <span className="text-slate-300 dark:text-slate-600 text-xs font-bold">{skill.score} / 10</span>
                    </div>
                    {/* 進度條底色改為 dark:bg-slate-800 */}
                    <div className="h-2 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${skill.color} rounded-full transition-all duration-1000 ease-out delay-300`}
                        style={{ width: `${skill.score * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Philosophy: 這裡原本就是深色，但在深色模式下可以微調邊框 */}
      <section className="bg-slate-900 dark:bg-black text-white rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden border border-transparent dark:border-slate-800">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 italic">"If data is not beautiful, it cannot be understood; if it cannot be understood, it loses the power to solve problems."</h2>
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-8 italic">"數據如果不美觀，它就無法被理解；如果無法被理解，它就失去了解決問題的能力。"</h2> */}
          <div className="w-12 h-1 bg-rose-400 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-400 text-lg font-light leading-loose">
            In my development journey, I put user experience at the heart of everything I build. 
            My goal is not just to create accurate reports, but to craft visual art that allows 
            decision-makers to capture insights at a glance.
          </p>
          {/* <p className="text-slate-400 text-lg font-light leading-loose">
            在 Power BI 的開發過程中，我始終堅持以用戶體驗為中心。我的目標不僅是做出正確的報表，
            而是做出能讓決策者一眼看出洞察（Insight）的視覺化藝術。
          </p> */}
        </div>
      </section>
    </div>
  );
};

export default About;