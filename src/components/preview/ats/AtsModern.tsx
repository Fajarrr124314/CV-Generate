import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const AtsModern: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-900 font-sans leading-relaxed text-[13px] box-border p-12 flex flex-col justify-between">
      <div>
      {/* Header */}
      <header className="pb-3 border-b-2 border-slate-800">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          {personal.fullName || 'Nama Lengkap'}
        </h1>
        <p className="text-base font-semibold text-slate-700 mt-0.5">
          {personal.jobTitle || 'Posisi / Role Profesional'}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-slate-600">
          {personal.email && (
            <span className="font-medium text-slate-800">{personal.email}</span>
          )}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.address && <span>{personal.address}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
          {personal.website && <span>{personal.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personal.summary && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Profil Profesional
          </h2>
          <p className="text-slate-700 text-justify leading-relaxed whitespace-pre-line">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Pengalaman Kerja
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-950 text-sm">{exp.position}</h3>
                    <p className="text-slate-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    {exp.startDate} — {exp.isCurrent ? 'Sekarang' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-2 text-slate-700 text-justify whitespace-pre-line leading-relaxed text-xs">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Pendidikan
          </h2>
          <div className="space-y-2.5">
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">{edu.institution}</h3>
                  <p className="text-slate-700 text-xs">
                    {edu.degree} {edu.fieldOfStudy ? `• ${edu.fieldOfStudy}` : ''}
                  </p>
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span className="text-xs text-slate-500 font-medium shrink-0">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2.5">
            Keahlian Teknis & Kompetensi
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <span
                key={s.id}
                className="inline-flex items-center text-xs px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded font-medium"
              >
                {s.name}
                {s.level && <span className="ml-1 text-[10px] text-slate-500">({s.level})</span>}
              </span>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
};
