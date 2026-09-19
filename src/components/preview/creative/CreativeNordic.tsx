import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const CreativeNordic: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-[#fdfcfb] text-[#2c3e38] text-xs p-10 flex flex-col justify-between font-sans">
      <div>
        {/* Nordic Top Header */}
        <header className="pb-8 border-b border-[#d8e2dc] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#4a7063] font-semibold block mb-1">
              Curriculum Vitae
            </span>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1b2b25]">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-sm font-medium text-[#4a7063] mt-1">
              {personal.jobTitle || 'Product & Architectural Designer'}
            </p>

            {/* Subtle Contact Info */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1.5 mt-3 text-[11px] text-[#557067]">
              {personal.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-[#3d6355] shrink-0" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#3d6355] shrink-0" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#3d6355] shrink-0" />
                  <span>{personal.address}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3 h-3 text-[#3d6355] shrink-0" />
                  <span>{personal.linkedin}</span>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-1.5">
                  <GithubIcon className="w-3 h-3 text-[#3d6355] shrink-0" />
                  <span>{personal.github}</span>
                </div>
              )}
              {personal.website && (
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3 h-3 text-[#3d6355] shrink-0" />
                  <span>{personal.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Minimalist Circular Photo */}
          {personal.photoUrl ? (
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#b8ccbf] shadow-sm shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personal.photoUrl}
                alt={personal.fullName}
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#e8efe9] border border-[#b8ccbf] flex items-center justify-center text-xl font-light text-[#3d6355] shrink-0">
              {personal.fullName
                ? personal.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                : 'NO'}
            </div>
          )}
        </header>

        {/* Profile Intro */}
        {personal.summary && (
          <div className="mt-6 py-4 px-5 bg-[#f4f7f4] border-l-3 border-[#3d6355] rounded-r-lg">
            <p className="text-[#3a5249] text-justify leading-relaxed text-xs">
              {personal.summary}
            </p>
          </div>
        )}

        {/* 2-Column Split */}
        <div className="grid grid-cols-12 gap-8 mt-7">
          {/* Main (7 cols): Work */}
          <section className="col-span-7 space-y-5">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#243d33] pb-1.5 border-b border-[#d8e2dc]">
              Riwayat Profesional
            </h2>

            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-semibold text-[#1a2d26] text-xs">{exp.position}</h3>
                    <span className="text-[10px] text-[#6b857c] font-light">
                      {exp.startDate} – {exp.isCurrent ? 'Saat ini' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-[#3d6355] font-medium text-[11px] mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1.5 text-[#445b53] text-justify whitespace-pre-line leading-relaxed text-[11px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Side (5 cols): Education & Skills */}
          <aside className="col-span-5 space-y-6">
            {/* Education */}
            {educations && educations.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#243d33] pb-1.5 border-b border-[#d8e2dc] mb-3">
                  Pendidikan
                </h2>
                <div className="space-y-3">
                  {educations.map((edu) => (
                    <div key={edu.id} className="p-3 bg-[#f7f9f7] rounded-lg border border-[#e5ece5]">
                      <p className="font-semibold text-[#1a2d26] text-xs">{edu.degree}</p>
                      <p className="text-[11px] text-[#4d665d]">{edu.fieldOfStudy}</p>
                      <p className="text-[10px] text-[#3d6355] mt-0.5 font-medium">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[10px] text-[#7d968e] mt-1">
                          {edu.startDate} – {edu.endDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Pills */}
            {skills && skills.length > 0 && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#243d33] pb-1.5 border-b border-[#d8e2dc] mb-3">
                  Keahlian & Minat
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-2.5 py-1 bg-[#e8efe9] text-[#284439] text-[11px] rounded-full border border-[#cad9cd]"
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
