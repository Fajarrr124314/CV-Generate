import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const AtsPhoto: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-900 font-sans leading-relaxed text-[13px] box-border p-12 flex flex-col justify-between">
      <div>
        {/* Header with Photo on Top-Left */}
        <header className="pb-4 border-b-2 border-slate-900 flex flex-row items-center gap-5">
          {/* Formal Top-Left Passport Photo */}
          {personal.photoUrl ? (
            <div className="w-24 h-28 rounded-md overflow-hidden border-2 border-slate-700 shadow-xs shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personal.photoUrl}
                alt={personal.fullName}
                crossOrigin="anonymous"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-28 rounded-md bg-slate-100 border-2 border-slate-400 flex flex-col items-center justify-center text-slate-500 shrink-0">
              <span className="text-2xl font-bold">
                {personal.fullName
                  ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')
                  : 'PAS'}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">Foto Formal</span>
            </div>
          )}

          {/* Name & Contact Info to the right of Photo */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-base font-semibold text-slate-700 mt-0.5">
              {personal.jobTitle || 'Posisi / Role Profesional'}
            </p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-xs text-slate-700">
              {personal.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="font-semibold text-slate-900">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.address && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>{personal.address}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="truncate">{personal.linkedin}</span>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="truncate">{personal.github}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        {personal.summary && (
          <section className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Profil Profesional
            </h2>
            <p className="text-slate-800 text-justify leading-relaxed whitespace-pre-line text-xs">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-3">
              Pengalaman Kerja
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-950 text-xs">{exp.position}</h3>
                      <p className="text-slate-800 font-medium text-xs">{exp.company}</p>
                    </div>
                    <span className="text-[11px] font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded shrink-0">
                      {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="mt-1.5 text-slate-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {educations && educations.length > 0 && (
          <section className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2">
              Pendidikan
            </h2>
            <div className="space-y-2.5">
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">{edu.institution}</h3>
                    <p className="text-slate-800 text-xs">
                      {edu.degree} {edu.fieldOfStudy ? `• ${edu.fieldOfStudy}` : ''}
                    </p>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-[11px] text-slate-700 font-medium shrink-0">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className="mt-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2.5">
              Keahlian & Kompetensi
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center text-xs px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded font-medium"
                >
                  {s.name}
                  {s.level && <span className="ml-1 text-[10px] text-slate-600">({s.level})</span>}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
