import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const AtsClassic: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div
      className="w-full min-h-[297mm] bg-white text-gray-900 font-serif leading-relaxed text-[13px] box-border p-12 flex flex-col justify-between"
      style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
    >
      <div>
      {/* Header */}
      <header className="text-center pb-4 border-b border-gray-400">
        <h1 className="text-2xl font-bold tracking-wide uppercase text-gray-950">
          {personal.fullName || 'Nama Lengkap'}
        </h1>
        <p className="text-base italic text-gray-700 mt-1 font-sans">
          {personal.jobTitle || 'Posisi / Role Profesional'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-700 font-sans">
          {personal.phone && <span>{personal.phone}</span>}
          {personal.email && (
            <>
              <span>•</span>
              <span>{personal.email}</span>
            </>
          )}
          {personal.address && (
            <>
              <span>•</span>
              <span>{personal.address}</span>
            </>
          )}
          {personal.linkedin && (
            <>
              <span>•</span>
              <span>{personal.linkedin}</span>
            </>
          )}
          {personal.github && (
            <>
              <span>•</span>
              <span>{personal.github}</span>
            </>
          )}
          {personal.website && (
            <>
              <span>•</span>
              <span>{personal.website}</span>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 font-sans">
            Ringkasan Profesional
          </h2>
          <p className="text-gray-800 text-justify leading-normal whitespace-pre-line">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {experiences && experiences.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-3 font-sans">
            Pengalaman Kerja
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-gray-950 text-sm">{exp.position}</span>
                    <span className="text-gray-700 italic"> — {exp.company}</span>
                  </div>
                  <span className="text-xs text-gray-600 font-sans shrink-0 ml-2">
                    {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-1.5 text-gray-800 text-justify whitespace-pre-line leading-normal">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 font-sans">
            Pendidikan
          </h2>
          <div className="space-y-2">
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <span className="font-bold text-gray-950">{edu.institution}</span>
                  {(edu.degree || edu.fieldOfStudy) && (
                    <span className="text-gray-700 italic">
                      , {edu.degree} {edu.fieldOfStudy ? `– ${edu.fieldOfStudy}` : ''}
                    </span>
                  )}
                </div>
                {(edu.startDate || edu.endDate) && (
                  <span className="text-xs text-gray-600 font-sans shrink-0 ml-2">
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-400 pb-1 mb-2 font-sans">
            Keahlian & Kompetensi
          </h2>
          <div className="text-gray-800 leading-relaxed font-sans text-xs">
            {skills.map((s, idx) => (
              <span key={s.id}>
                <span className="font-medium text-gray-900">{s.name}</span>
                {s.level ? ` (${s.level})` : ''}
                {idx < skills.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </section>
      )}
      </div>
    </div>
  );
};
