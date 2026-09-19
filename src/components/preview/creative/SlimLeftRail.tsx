import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, User } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const SlimLeftRail: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white flex text-slate-800 font-sans text-xs">
      {/* Slim Solid Left Accent Rail */}
      <aside className="w-16 bg-[#312e81] text-indigo-200 flex flex-col items-center py-8 shrink-0 space-y-8">
        <div className="w-10 h-10 rounded-lg bg-indigo-800 flex items-center justify-center text-white font-bold text-sm">
          {personal.fullName ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('') : 'SL'}
        </div>
        <div className="flex flex-col items-center space-y-5 text-indigo-300">
          <User className="w-5 h-5" />
          <Mail className="w-5 h-5" />
          <Phone className="w-5 h-5" />
          <MapPin className="w-5 h-5" />
        </div>
      </aside>

      {/* Main Spacious Content */}
      <main className="flex-1 p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <header className="border-b-2 border-slate-200 pb-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                  {personal.fullName || 'Nama Lengkap'}
                </h1>
                <p className="text-sm font-semibold text-[#312e81] mt-0.5 uppercase tracking-wide">
                  {personal.jobTitle || 'Posisi / Role Profesional'}
                </p>
              </div>

              {personal.photoUrl && (
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-300 shadow-sm shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={personal.photoUrl}
                    alt={personal.fullName}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Contact Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-[11px] text-slate-700 font-medium">
              {personal.email && <span>{personal.email}</span>}
              {personal.phone && <span>• {personal.phone}</span>}
              {personal.address && <span>• {personal.address}</span>}
              {personal.linkedin && (
                <span className="flex items-center gap-1">
                  • <LinkedinIcon className="w-3 h-3 text-[#312e81]" /> {personal.linkedin}
                </span>
              )}
              {personal.github && (
                <span className="flex items-center gap-1">
                  • <GithubIcon className="w-3 h-3 text-[#312e81]" /> {personal.github}
                </span>
              )}
              {personal.website && (
                <span className="flex items-center gap-1">
                  • <Globe className="w-3 h-3 text-[#312e81]" /> {personal.website}
                </span>
              )}
            </div>
          </header>

          {/* Summary */}
          {personal.summary && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#312e81] rounded-full inline-block" />
                Profil Profesional
              </h2>
              <p className="text-slate-800 text-justify leading-relaxed whitespace-pre-line text-xs">
                {personal.summary}
              </p>
            </section>
          )}

          {/* 2-Column Split */}
          <div className="grid grid-cols-12 gap-6 mt-6">
            <section className="col-span-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#312e81] rounded-full inline-block" />
                Pengalaman Kerja
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                      <span className="text-[10px] font-semibold text-[#312e81] bg-indigo-50 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-800 font-semibold text-xs mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="mt-1.5 text-slate-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <aside className="col-span-4 space-y-5">
              {/* Education */}
              {educations && educations.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-200 mb-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#312e81] rounded-full inline-block" />
                    Pendidikan
                  </h2>
                  <div className="space-y-3">
                    {educations.map((edu) => (
                      <div key={edu.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                        <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                        <p className="text-[11px] text-slate-800">{edu.fieldOfStudy}</p>
                        <p className="text-[10px] text-indigo-800 font-medium mt-0.5">{edu.institution}</p>
                        {(edu.startDate || edu.endDate) && (
                          <p className="text-[10px] text-slate-600 mt-1">
                            {edu.startDate} – {edu.endDate}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {skills && skills.length > 0 && (
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-200 mb-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#312e81] rounded-full inline-block" />
                    Keahlian
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-[#312e81] text-[10px] font-medium rounded"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
