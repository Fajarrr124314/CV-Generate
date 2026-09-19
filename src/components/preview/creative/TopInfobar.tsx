import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const TopInfobar: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-800 font-sans text-xs flex flex-col justify-between">
      <div>
        {/* Solid Top Infobar */}
        <header className="bg-[#1e293b] text-white p-7">
          <div className="flex flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-5 text-left flex-1">
              {personal.photoUrl ? (
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-slate-400 shadow shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={personal.photoUrl}
                    alt={personal.fullName}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-lg bg-slate-800 border border-slate-600 flex items-center justify-center text-2xl font-bold text-slate-300 shrink-0">
                  {personal.fullName ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('') : 'IB'}
                </div>
              )}

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">
                  {personal.fullName || 'Nama Lengkap'}
                </h1>
                <p className="text-sm font-semibold text-slate-300 mt-0.5">
                  {personal.jobTitle || 'Posisi / Role Profesional'}
                </p>
              </div>
            </div>

            {/* Quick Contact Chips in Header */}
            <div className="text-right text-[11px] text-slate-300 space-y-1 shrink-0">
              {personal.email && (
                <div className="flex items-center justify-end gap-1.5">
                  <span>{personal.email}</span>
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center justify-end gap-1.5">
                  <span>{personal.phone}</span>
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
              {personal.address && (
                <div className="flex items-center justify-end gap-1.5">
                  <span>{personal.address}</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
            </div>
          </div>

          {/* Social Links line */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400">
            {personal.linkedin && (
              <div className="flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-slate-300" />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-1">
                <GithubIcon className="w-3 h-3 text-slate-300" />
                <span>{personal.github}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-300" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>
        </header>

        {/* Body Content */}
        <div className="p-8 space-y-6">
          {/* Summary */}
          {personal.summary && (
            <section className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">
                Ringkasan Profesional
              </h2>
              <p className="text-slate-700 text-justify leading-relaxed whitespace-pre-line text-xs">
                {personal.summary}
              </p>
            </section>
          )}

          {/* 2 Columns: 8/4 */}
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900">
                Pengalaman Kerja
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pb-3 border-b border-slate-100 last:border-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                      <span className="text-[10px] font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
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
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900 mb-3">
                    Pendidikan
                  </h2>
                  <div className="space-y-3">
                    {educations.map((edu) => (
                      <div key={edu.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                        <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                        <p className="text-[11px] text-slate-800">{edu.fieldOfStudy}</p>
                        <p className="text-[10px] text-slate-700 font-medium mt-0.5">{edu.institution}</p>
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
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 pb-1 border-b-2 border-slate-900 mb-3">
                    Keahlian
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 bg-slate-100 border border-slate-300 text-slate-800 text-[10px] font-medium rounded"
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
    </div>
  );
};
