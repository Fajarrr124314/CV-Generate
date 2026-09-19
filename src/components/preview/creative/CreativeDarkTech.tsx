import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Terminal, Code2 } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const CreativeDarkTech: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-[#0c1222] text-slate-200 text-xs p-8 flex flex-col justify-between font-sans selection:bg-cyan-500 selection:text-black">
      <div>
        {/* Terminal Style Header Card */}
        <header className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
          {/* Neon Glow */}
          <div className="absolute top-0 right-0 w-64 h-32 bg-cyan-500/10 blur-3xl pointer-events-none" />

          {/* Terminal Window Dots */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[10px] font-mono text-slate-500 ml-2">dev_resume.config.ts</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
              <Terminal className="w-3 h-3" />
              <span>status: available</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Avatar with Cyber Border */}
            {personal.photoUrl ? (
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl bg-slate-800 border-2 border-cyan-400/80 flex items-center justify-center text-2xl font-mono font-bold text-cyan-400 shrink-0">
                &lt;/&gt;
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                <span>{personal.fullName || 'Nama Lengkap'}</span>
              </h1>
              <p className="text-xs font-mono text-cyan-400 mt-0.5 tracking-wide">
                $ role: &quot;{personal.jobTitle || 'Senior Software Engineer'}&quot;
              </p>

              {/* Contact Icons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-[11px] text-slate-400">
                {personal.email && (
                  <div className="flex items-center gap-1.5 hover:text-cyan-300">
                    <Mail className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{personal.address}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-1.5">
                    <GithubIcon className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{personal.github}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <LinkedinIcon className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>{personal.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Bio summary */}
        {personal.summary && (
          <div className="mt-4 p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              {"// Summary"}
            </span>
            <p className="text-slate-300 text-justify leading-relaxed text-xs">
              {personal.summary}
            </p>
          </div>
        )}

        {/* 2-Column Grid */}
        <div className="grid grid-cols-12 gap-5 mt-5">
          {/* Main (8 cols): Experience */}
          <section className="col-span-8 space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Work_Experience[]
              </h2>
            </div>

            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3.5 bg-slate-900/70 border border-slate-800/90 rounded-lg hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-white text-xs">{exp.position}</h3>
                      <p className="text-cyan-400 font-mono text-[11px] mt-0.5">@{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded shrink-0">
                      {exp.startDate} ~ {exp.isCurrent ? 'Current' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-slate-300 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Right (4 cols): Skills & Education */}
          <aside className="col-span-4 space-y-5">
            {/* Tech Stack Skills */}
            {skills && skills.length > 0 && (
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white pb-1 border-b border-slate-800 mb-2.5">
                  Tech_Stack
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <div
                      key={s.id}
                      className="px-2 py-1 bg-slate-900 border border-slate-700/80 rounded text-[10px] font-mono text-slate-200 flex items-center justify-between gap-1.5"
                    >
                      <span>{s.name}</span>
                      <span className="text-cyan-400 text-[9px]">[{s.level[0]}]</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {educations && educations.length > 0 && (
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white pb-1 border-b border-slate-800 mb-2.5">
                  Education
                </h2>
                <div className="space-y-2.5">
                  {educations.map((edu) => (
                    <div key={edu.id} className="p-2.5 bg-slate-900/50 border border-slate-800 rounded">
                      <p className="font-bold text-slate-200 text-xs">{edu.degree}</p>
                      <p className="text-[10px] text-slate-400">{edu.fieldOfStudy}</p>
                      <p className="text-[10px] font-mono text-cyan-400 mt-0.5">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[9px] font-mono text-slate-500 mt-1">
                          {edu.startDate} - {edu.endDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
