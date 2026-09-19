import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const AtsMinimal: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white text-neutral-900 font-sans text-[12px] leading-relaxed p-12 flex flex-col justify-between box-border">
      <div>
        {/* Header */}
        <header className="pb-3 border-b border-neutral-900">
          <div className="flex justify-between items-baseline flex-wrap gap-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-950 uppercase">
                {personal.fullName || 'Nama Lengkap'}
              </h1>
              <p className="text-xs font-semibold text-neutral-700 mt-0.5 uppercase tracking-wider">
                {personal.jobTitle || 'Posisi / Role Profesional'}
              </p>
            </div>
            <div className="text-right text-[11px] text-neutral-700 space-y-0.5 font-mono font-medium">
              {personal.phone && <div>{personal.phone}</div>}
              {personal.email && <div>{personal.email}</div>}
              {personal.address && <div>{personal.address}</div>}
            </div>
          </div>

          {/* Links line */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[11px] text-neutral-700 font-mono font-medium">
            {personal.linkedin && <span>in/{personal.linkedin.replace(/https?:\/\/(www\.)?linkedin\.com\/in\/?/, '')}</span>}
            {personal.github && <span>git/{personal.github.replace(/https?:\/\/(www\.)?github\.com\/?/, '')}</span>}
            {personal.website && <span>{personal.website.replace(/https?:\/\/(www\.)?/, '')}</span>}
          </div>
        </header>

        {/* Professional Summary */}
        {personal.summary && (
          <section className="mt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-1.5 font-mono">
              [ Ringkasan Profil ]
            </h2>
            <p className="text-neutral-800 text-justify leading-normal whitespace-pre-line text-xs">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="mt-4">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
              [ Pengalaman Kerja ]
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-neutral-950 text-xs">{exp.position}</span>
                    <span className="text-[10px] text-neutral-700 font-mono font-medium">
                      {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-neutral-800 italic">
                    {exp.company}
                  </div>
                  {exp.description && (
                    <p className="mt-1 text-neutral-800 text-justify whitespace-pre-line leading-normal text-[11px]">
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
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
              [ Pendidikan ]
            </h2>
            <div className="space-y-2">
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-neutral-950 text-xs">{edu.institution}</span>
                    <span className="text-neutral-800 text-xs"> — {edu.degree} {edu.fieldOfStudy ? `(${edu.fieldOfStudy})` : ''}</span>
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span className="text-[10px] text-neutral-700 font-mono font-medium">
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
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-neutral-950 border-b border-neutral-300 pb-1 mb-2 font-mono">
              [ Keahlian ]
            </h2>
            <div className="text-neutral-800 text-xs leading-relaxed">
              {skills.map((s, idx) => (
                <span key={s.id}>
                  <span className="font-semibold text-neutral-950">{s.name}</span>
                  {s.level && <span className="text-neutral-600 text-[11px]"> ({s.level})</span>}
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
