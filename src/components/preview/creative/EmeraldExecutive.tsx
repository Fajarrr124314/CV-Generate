import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const EmeraldExecutive: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-800 font-sans text-xs flex flex-col justify-between">
      <div>
        {/* Solid Forest Green Top Banner */}
        <header className="bg-[#064e3b] text-white p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {personal.photoUrl ? (
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-emerald-300 shadow-md shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-lg bg-[#022c22] border border-emerald-400/40 flex items-center justify-center text-3xl font-bold text-emerald-200 shrink-0">
                {personal.fullName
                  ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')
                  : 'EE'}
              </div>
            )}

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                {personal.fullName || 'Nama Lengkap'}
              </h1>
              <p className="text-sm font-semibold text-emerald-200 mt-0.5">
                {personal.jobTitle || 'Posisi / Role Profesional'}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 mt-3 text-[11px] text-emerald-100">
                {personal.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span>{personal.address}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span>{personal.github}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                    <span>{personal.website}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Body Content */}
        <div className="p-8 space-y-6">
          {/* Summary */}
          {personal.summary && (
            <section className="bg-emerald-50/60 border border-emerald-200/80 rounded-lg p-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#064e3b] mb-1.5">
                Profil & Ringkasan Eksekutif
              </h2>
              <p className="text-slate-800 text-justify leading-relaxed whitespace-pre-line text-xs">
                {personal.summary}
              </p>
            </section>
          )}

          {/* 2 Columns: Experience (8) & Side (4) */}
          <div className="grid grid-cols-12 gap-6">
            <section className="col-span-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#064e3b] pb-1 border-b-2 border-[#064e3b]">
                Pengalaman Kerja
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-emerald-800 font-semibold text-xs mt-0.5">{exp.company}</p>
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
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#064e3b] pb-1 border-b-2 border-[#064e3b] mb-3">
                    Pendidikan
                  </h2>
                  <div className="space-y-3">
                    {educations.map((edu) => (
                      <div key={edu.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded">
                        <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                        <p className="text-[11px] text-slate-800">{edu.fieldOfStudy}</p>
                        <p className="text-[10px] text-emerald-700 font-medium mt-0.5">{edu.institution}</p>
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
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#064e3b] pb-1 border-b-2 border-[#064e3b] mb-3">
                    Kompetensi
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-medium rounded"
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
