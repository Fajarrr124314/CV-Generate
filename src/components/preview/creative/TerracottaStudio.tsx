import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const TerracottaStudio: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-[#fdfbf7] text-[#292524] font-sans text-xs flex flex-col justify-between">
      <div>
        {/* Solid Terracotta Top Block */}
        <header className="bg-[#9a3412] text-white p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-5 text-center sm:text-left flex-1">
              {personal.photoUrl ? (
                <div className="w-22 h-22 rounded-full overflow-hidden border-3 border-orange-200 shadow-md shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={personal.photoUrl}
                    alt={personal.fullName}
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-22 h-22 rounded-full bg-[#7c2d12] border-2 border-orange-300/40 flex items-center justify-center text-2xl font-bold text-orange-200 shrink-0">
                  {personal.fullName ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('') : 'TS'}
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-200 block mb-1">
                  Creative Portfolio & Resume
                </span>
                <h1 className="text-3xl font-black tracking-tight text-white">
                  {personal.fullName || 'Nama Lengkap'}
                </h1>
                <p className="text-sm font-medium text-orange-100 mt-0.5">
                  {personal.jobTitle || 'Posisi / Role Profesional'}
                </p>
              </div>
            </div>

            {/* Quick Contact Chips */}
            <div className="text-right text-[11px] text-orange-100 space-y-1 shrink-0">
              {personal.email && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{personal.email}</span>
                  <Mail className="w-3.5 h-3.5 text-orange-300" />
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{personal.phone}</span>
                  <Phone className="w-3.5 h-3.5 text-orange-300" />
                </div>
              )}
              {personal.address && (
                <div className="flex items-center sm:justify-end gap-1.5">
                  <span>{personal.address}</span>
                  <MapPin className="w-3.5 h-3.5 text-orange-300" />
                </div>
              )}
            </div>
          </div>

          {/* Social Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 pt-3 border-t border-orange-800/80 text-[11px] text-orange-200">
            {personal.linkedin && (
              <div className="flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-orange-300" />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-1">
                <GithubIcon className="w-3 h-3 text-orange-300" />
                <span>{personal.github}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-orange-300" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 space-y-6">
          {/* Summary */}
          {personal.summary && (
            <section className="p-4 bg-orange-50 border border-orange-200/70 rounded-lg">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#9a3412] mb-1">
                Tentang Saya
              </h2>
              <p className="text-stone-800 text-justify leading-relaxed whitespace-pre-line text-xs">
                {personal.summary}
              </p>
            </section>
          )}

          {/* 2 Column Body */}
          <div className="grid grid-cols-12 gap-7">
            <section className="col-span-8 space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#9a3412] pb-1 border-b-2 border-[#9a3412]">
                Pengalaman Kerja
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-bold text-stone-900 text-xs">{exp.position}</h3>
                      <span className="text-[10px] font-semibold text-[#9a3412] bg-orange-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[#9a3412] font-semibold text-xs mt-0.5">{exp.company}</p>
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
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#9a3412] pb-1 border-b-2 border-[#9a3412] mb-3">
                    Pendidikan
                  </h2>
                  <div className="space-y-3">
                    {educations.map((edu) => (
                      <div key={edu.id} className="p-2.5 bg-orange-50/60 border border-orange-200/80 rounded">
                        <p className="font-bold text-stone-900 text-xs">{edu.degree}</p>
                        <p className="text-[11px] text-stone-800">{edu.fieldOfStudy}</p>
                        <p className="text-[10px] text-[#9a3412] font-medium mt-0.5">{edu.institution}</p>
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
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#9a3412] pb-1 border-b-2 border-[#9a3412] mb-3">
                    Keahlian
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 bg-orange-100/80 border border-orange-200 text-orange-900 text-[10px] font-medium rounded"
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
