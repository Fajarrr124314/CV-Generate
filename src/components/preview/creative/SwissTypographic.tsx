import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const SwissTypographic: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-black font-sans text-xs p-10 flex flex-col justify-between">
      <div>
        {/* Swiss Grid Top Header */}
        <header className="border-b-4 border-black pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="inline-block px-2 py-0.5 bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-widest mb-2">
                Curriculum Vitae
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-none">
                {personal.fullName || 'Nama Lengkap'}
              </h1>
              <p className="text-sm font-bold text-[#dc2626] mt-1.5 uppercase tracking-wide">
                {personal.jobTitle || 'Posisi / Role Profesional'}
              </p>
            </div>

            {/* Photo or Monogram */}
            {personal.photoUrl ? (
              <div className="w-24 h-24 overflow-hidden border-2 border-black shadow-none shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover grayscale contrast-125"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-black text-white flex items-center justify-center text-3xl font-black shrink-0">
                {personal.fullName ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('') : 'CH'}
              </div>
            )}
          </div>

          {/* Contact Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5 pt-3 border-t border-black text-[11px] font-medium">
            {personal.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span className="truncate">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span className="truncate">{personal.address}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span className="truncate">{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span className="truncate">{personal.github}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#dc2626] shrink-0" />
                <span className="truncate">{personal.website}</span>
              </div>
            )}
          </div>
        </header>

        {/* Summary */}
        {personal.summary && (
          <section className="mb-6 pb-5 border-b border-neutral-300">
            <h2 className="text-xs font-black uppercase tracking-widest text-black mb-1.5">
              01 // Profil
            </h2>
            <p className="text-neutral-800 text-justify leading-relaxed text-xs font-normal">
              {personal.summary}
            </p>
          </section>
        )}

        {/* 2 Column Body */}
        <div className="grid grid-cols-12 gap-8">
          {/* Work Experience (8 cols) */}
          <section className="col-span-8 space-y-5">
            <h2 className="text-xs font-black uppercase tracking-widest text-black pb-1 border-b-2 border-black">
              02 // Pengalaman Profesional
            </h2>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-bold text-black text-xs uppercase">{exp.position}</h3>
                    <span className="text-[10px] font-mono text-neutral-700 font-bold">
                      {exp.startDate} — {exp.isCurrent ? 'Sekarang' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[#dc2626] font-bold text-[11px] uppercase tracking-wider mt-0.5">
                    {exp.company}
                  </p>
                  {exp.description && (
                    <p className="mt-1.5 text-neutral-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Education & Skills (4 cols) */}
          <aside className="col-span-4 space-y-6">
            {/* Education */}
            {educations && educations.length > 0 && (
              <div>
                <h2 className="text-xs font-black uppercase tracking-widest text-black pb-1 border-b-2 border-black mb-3">
                  03 // Pendidikan
                </h2>
                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-bold text-black text-xs">{edu.degree}</p>
                      <p className="text-[11px] text-neutral-700">{edu.fieldOfStudy}</p>
                      <p className="text-[10px] text-[#dc2626] font-bold mt-0.5">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[10px] font-mono text-neutral-600 mt-0.5">
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
                <h2 className="text-xs font-black uppercase tracking-widest text-black pb-1 border-b-2 border-black mb-3">
                  04 // Kompetensi
                </h2>
                <div className="space-y-1.5">
                  {skills.map((s) => (
                    <div key={s.id} className="flex justify-between items-baseline border-b border-neutral-200 pb-1 text-[11px]">
                      <span className="font-medium text-black">{s.name}</span>
                      <span className="text-[10px] text-neutral-700 font-mono font-medium">{s.level}</span>
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
