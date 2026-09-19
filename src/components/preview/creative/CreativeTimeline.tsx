import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const CreativeTimeline: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-800 text-xs p-8 flex flex-col justify-between font-sans">
      <div>
        {/* Modern Wave / Gradient Header */}
        <header className="relative bg-gradient-to-r from-violet-700 via-indigo-600 to-sky-600 text-white rounded-2xl p-6 shadow-md overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
            {personal.photoUrl ? (
              <div className="w-22 h-22 rounded-2xl overflow-hidden border-2 border-white/60 shadow-lg shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-22 h-22 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-3xl font-extrabold text-white shrink-0">
                {personal.fullName
                  ? personal.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                  : 'TL'}
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full mb-1 text-white">
                <Sparkles className="w-2.5 h-2.5" />
                Professional Profile
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                {personal.fullName || 'Nama Lengkap'}
              </h1>
              <p className="text-sm font-medium text-indigo-100 mt-0.5">
                {personal.jobTitle || 'Role & Professional Title'}
              </p>

              {/* Contact Icons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-[11px] text-indigo-100">
                {personal.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-sky-300 shrink-0" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-sky-300 shrink-0" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-sky-300 shrink-0" />
                    <span>{personal.address}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <LinkedinIcon className="w-3 h-3 text-sky-300 shrink-0" />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-1.5">
                    <GithubIcon className="w-3 h-3 text-sky-300 shrink-0" />
                    <span>{personal.github}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-sky-300 shrink-0" />
                    <span>{personal.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Summary */}
        {personal.summary && (
          <div className="mt-5 p-4 bg-indigo-50/50 border border-indigo-100 rounded-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
              Ringkasan Karir
            </h2>
            <p className="text-slate-800 text-justify leading-relaxed whitespace-pre-line text-xs">
              {personal.summary}
            </p>
          </div>
        )}

        {/* Timeline Grid */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Work Timeline (8 cols) */}
          <section className="col-span-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b-2 border-indigo-600 mb-4">
              Jejak Karir & Pengalaman
            </h2>

            <div className="relative border-l-2 border-indigo-200 pl-5 ml-2 space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative">
                  {/* Timeline Node Badge */}
                  <div className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-indigo-600 ring-4 ring-indigo-50" />

                  <div className="flex justify-between items-baseline flex-wrap gap-1">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-indigo-700 font-semibold text-[11px] mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-2 text-slate-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education & Skills (4 cols) */}
          <aside className="col-span-4 space-y-5">
            {/* Education Timeline */}
            {educations && educations.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b-2 border-indigo-600 mb-4">
                  Pendidikan
                </h2>
                <div className="relative border-l-2 border-sky-200 pl-4 ml-1 space-y-4">
                  {educations.map((edu) => (
                    <div key={edu.id} className="relative">
                      <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-sky-500 ring-4 ring-sky-50" />
                      <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                      <p className="text-[11px] text-slate-800">{edu.fieldOfStudy}</p>
                      <p className="text-[11px] text-sky-700 font-medium">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[10px] text-slate-600 mt-0.5">
                          {edu.startDate} – {edu.endDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Badges */}
            {skills && skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-2 border-b-2 border-indigo-600 mb-3">
                  Kompetensi Utama
                </h2>
                <div className="space-y-2">
                  {skills.map((s) => (
                    <div key={s.id} className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-semibold text-slate-800">{s.name}</span>
                        <span className="text-[10px] text-indigo-600 font-medium">{s.level}</span>
                      </div>
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
