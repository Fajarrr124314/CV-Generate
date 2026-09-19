import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const WarmAmber: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-[#fffdfa] text-stone-800 font-sans text-xs p-10 flex flex-col justify-between">
      <div>
        {/* Amber Header */}
        <header className="pb-6 border-b-2 border-amber-600">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex-1 text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-700 block mb-1">
                Curriculum Vitae
              </span>
              <h1 className="text-4xl font-black text-stone-900 tracking-tight">
                {personal.fullName || 'Nama Lengkap'}
              </h1>
              <p className="text-sm font-semibold text-amber-700 mt-0.5">
                {personal.jobTitle || 'Posisi / Role Profesional'}
              </p>

              {/* Contact Icons */}
              <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-1.5 mt-3 text-[11px] text-stone-700 font-medium">
                {personal.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{personal.email}</span>
                  </div>
                )}
                {personal.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{personal.phone}</span>
                  </div>
                )}
                {personal.address && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{personal.address}</span>
                  </div>
                )}
                {personal.linkedin && (
                  <div className="flex items-center gap-1.5">
                    <LinkedinIcon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{personal.linkedin}</span>
                  </div>
                )}
                {personal.github && (
                  <div className="flex items-center gap-1.5">
                    <GithubIcon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{personal.github}</span>
                  </div>
                )}
                {personal.website && (
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{personal.website}</span>
                  </div>
                )}
              </div>
            </div>

            {personal.photoUrl ? (
              <div className="w-24 h-24 rounded-full overflow-hidden border-3 border-amber-600 shadow-md shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-amber-100 border-2 border-amber-600 flex items-center justify-center text-2xl font-bold text-amber-800 shrink-0">
                {personal.fullName ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('') : 'WA'}
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {personal.summary && (
          <section className="mt-5 p-4 bg-amber-50/70 border-l-4 border-amber-600 rounded-r-lg">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
              Ringkasan Profesional
            </h2>
            <p className="text-stone-800 text-justify leading-relaxed whitespace-pre-line text-xs">
              {personal.summary}
            </p>
          </section>
        )}

        {/* 2 Columns: 8/4 */}
        <div className="grid grid-cols-12 gap-7 mt-6">
          <section className="col-span-8 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 pb-1.5 border-b-2 border-amber-600">
              Pengalaman Kerja
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="pb-3 border-b border-stone-200/80 last:border-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-bold text-stone-900 text-xs">{exp.position}</h3>
                    <span className="text-[10px] font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                      {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-amber-800 font-semibold text-xs mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1.5 text-stone-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 pb-1.5 border-b-2 border-amber-600 mb-3">
                  Pendidikan
                </h2>
                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div key={edu.id} className="p-2.5 bg-amber-50/50 border border-amber-200/80 rounded">
                      <p className="font-bold text-stone-900 text-xs">{edu.degree}</p>
                      <p className="text-[11px] text-stone-800">{edu.fieldOfStudy}</p>
                      <p className="text-[10px] text-amber-800 font-medium mt-0.5">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[10px] text-stone-600 mt-1">
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-stone-900 pb-1.5 border-b-2 border-amber-600 mb-3">
                  Keahlian Utama
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 bg-stone-100 border border-amber-200 text-stone-800 text-[10px] font-medium rounded"
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
