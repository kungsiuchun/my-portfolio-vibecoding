import React from 'react';
import { User, Code, Database, LineChart, Mail, Github, Linkedin } from 'lucide-react';

const About = () => {
  // 1. 分類技能組
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
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <section className="relative bg-white rounded-[3.5rem] p-8 md:p-20 shadow-sm border border-slate-50 overflow-hidden mb-12">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-slate-200 overflow-hidden shadow-inner flex-shrink-0">
            {/* 這裡可以放你的頭像 */}
            <img src={`${import.meta.env.BASE_URL}src/images/SIUCHUN_HEADSHOT.jpeg`} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-6">I'm Vibe.</h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-8">
              一名專注於 <span className="text-rose-400 font-medium">數據視覺化</span> 與 
              <span className="text-sky-400 font-medium"> 前端工程 </span> 的開發者。
              我熱衷於將複雜的數據轉化為直觀、美觀且具備互動性的故事。
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="mailto:kungsiuchun0@gmail.com" className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full hover:bg-rose-400 transition-colors shadow-lg">
                <Mail size={18} /> 聯繫我
              </a>
              <div className="flex gap-3">
                <a href="https://github.com/kungsiuchun" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-all"><Github size={20} /></a>
                <a href="https://www.linkedin.com/in/siu-chun-kung-75255916a/" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200 transition-all"><Linkedin size={20} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="mb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800">Skill Ecosystem</h2>
          <p className="text-slate-400 mt-4">跨領域的技術整合能力</p>
        </div>

        {/* 💡 技能分類網格 */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-50 hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800">{category.title}</h3>
              </div>

              <div className="space-y-8">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <div className="flex justify-between items-end px-1">
                      <span className="text-slate-700 font-medium">{skill.name}</span>
                      <span className="text-slate-300 text-xs font-bold">{skill.score} / 10</span>
                    </div>
                    {/* 進度條 */}
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
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

      {/* Core Philosophy */}
      <section className="bg-slate-900 text-white rounded-[3.5rem] p-12 md:p-20 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 italic">"數據如果不美觀，它就無法被理解；如果無法被理解，它就失去了解決問題的能力。"</h2>
          <div className="w-12 h-1 bg-rose-400 mx-auto rounded-full mb-8"></div>
          <p className="text-slate-400 text-lg font-light leading-loose">
            在 Power BI 的開發過程中，我始終堅持以用戶體驗為中心。我的目標不僅是做出正確的報表，
            而是做出能讓決策者一眼看出洞察（Insight）的視覺化藝術。
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;