import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const MinimalistGrid: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-800 font-sans text-xs p-8 flex flex-col justify-between">
      <div>
        {/* Top Header Card */}
        <header className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          {personal.photoUrl ? (
            <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-emerald-400 shadow-lg shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personal.photoUrl}
                alt={personal.fullName}
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-xl bg-emerald-950 border border-emerald-600 flex items-center justify-center text-3xl font-extrabold text-emerald-300 shrink-0">
              {personal.fullName
                ? personal.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                : 'SL'}
            </div>
          )}

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-sm font-semibold text-emerald-300 mt-0.5">
              {personal.jobTitle || 'Posisi / Role Profesional'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-[11px] text-emerald-100">
              {personal.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{personal.address}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{personal.linkedin}</span>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-1.5">
                  <GithubIcon className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{personal.github}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{personal.website}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Summary */}
        {personal.summary && (
          <section className="mt-5 bg-slate-50 border border-slate-200/80 rounded-lg p-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-emerald-600 rounded-sm inline-block" />
              Tentang Profesional
            </h2>
            <p className="text-slate-700 text-justify leading-relaxed whitespace-pre-line text-xs">
              {personal.summary}
            </p>
          </section>
        )}

        {/* 2 Column Body Grid */}
        <div className="grid grid-cols-12 gap-6 mt-6">
          {/* Main Column: Experience (8 cols) */}
          <section className="col-span-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-emerald-600 flex items-center justify-between">
              <span>Pengalaman Kerja</span>
              <span className="text-[10px] text-slate-700 font-medium lowercase">karir & dampak</span>
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-3.5 bg-white border border-slate-200 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                      <p className="text-emerald-700 font-semibold text-[11px]">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded shrink-0 border border-emerald-200">
                      {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-2 text-slate-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Right Column: Education & Skills (4 cols) */}
          <aside className="col-span-4 space-y-5">
            {/* Education */}
            {educations && educations.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-emerald-600 mb-3">
                  Pendidikan
                </h2>
                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div key={edu.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                      <p className="text-[11px] text-slate-800">{edu.fieldOfStudy}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[10px] text-slate-700 font-medium mt-1">
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-emerald-600 mb-3">
                  Keahlian Utama
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-1 bg-teal-50 border border-teal-200 text-teal-900 text-[11px] rounded-md font-medium"
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
    </div>
  );
};
