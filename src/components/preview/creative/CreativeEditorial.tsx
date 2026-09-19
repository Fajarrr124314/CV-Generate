import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const CreativeEditorial: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div
      className="w-full min-h-[297mm] bg-[#faf8f5] text-stone-900 text-xs p-10 flex flex-col justify-between"
      style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
    >
      <div>
        {/* Editorial Top Masthead */}
        <header className="border-b-2 border-stone-800 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-amber-700 font-bold block mb-1">
                Curriculum Vitae • Executive Profile
              </span>
              <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-stone-950 capitalize">
                {personal.fullName || 'Nama Lengkap'}
              </h1>
              <p className="text-sm italic text-stone-700 font-medium mt-1 font-serif">
                {personal.jobTitle || 'Executive & Strategic Leader'}
              </p>
            </div>

            {/* Framed Avatar or Monogram */}
            {personal.photoUrl ? (
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-stone-800 shadow-md shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover grayscale contrast-105"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-lg bg-stone-900 text-amber-100 flex items-center justify-center text-2xl font-serif border border-stone-700 shrink-0">
                {personal.fullName
                  ? personal.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                  : 'ED'}
              </div>
            )}
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-4 pt-3 border-t border-stone-300/80 text-[11px] font-sans text-stone-700 font-medium">
            {personal.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-1.5">
                <LinkedinIcon className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{personal.github}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>
        </header>

        {/* 2-Column Asymmetric Layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Left Column (5 cols): Statement, Skills, Education */}
          <div className="col-span-5 space-y-6 border-r border-stone-300/70 pr-6">
            {/* Executive Statement */}
            {personal.summary && (
              <div>
                <h2 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-800 pb-1 mb-2">
                  Executive Brief
                </h2>
                <blockquote className="italic text-stone-800 text-justify text-[11px] leading-relaxed border-l-2 border-amber-700 pl-3">
                  &ldquo;{personal.summary}&rdquo;
                </blockquote>
              </div>
            )}

            {/* Education */}
            {educations && educations.length > 0 && (
              <div>
                <h2 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-800 pb-1 mb-3">
                  Academic Background
                </h2>
                <div className="space-y-3 font-sans">
                  {educations.map((edu) => (
                    <div key={edu.id}>
                      <p className="font-bold text-stone-900 text-xs">{edu.degree}</p>
                      <p className="text-[11px] text-stone-800 italic font-serif">{edu.fieldOfStudy}</p>
                      <p className="text-[10px] text-amber-800 font-medium uppercase tracking-wider mt-0.5">
                        {edu.institution}
                      </p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[10px] text-stone-600">
                          {edu.startDate} – {edu.endDate}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Core Competencies */}
            {skills && skills.length > 0 && (
              <div>
                <h2 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-800 pb-1 mb-3">
                  Key Competencies
                </h2>
                <div className="space-y-1.5 font-sans">
                  {skills.map((s) => (
                    <div key={s.id} className="flex justify-between items-baseline border-b border-stone-200 pb-1">
                      <span className="text-[11px] font-medium text-stone-800">{s.name}</span>
                      <span className="text-[10px] text-stone-700 italic font-medium">{s.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column (7 cols): Professional Trajectory */}
          <div className="col-span-7 space-y-5">
            <div>
              <h2 className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-stone-900 border-b border-stone-800 pb-1 mb-4 flex items-center justify-between">
                <span>Career History</span>
                <span className="text-[9px] font-normal text-stone-700 lowercase italic">chronological</span>
              </h2>

              <div className="space-y-5">
                {experiences.map((exp) => (
                  <div key={exp.id} className="group">
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h3 className="font-bold text-stone-950 text-xs font-sans">
                        {exp.position}
                      </h3>
                      <span className="text-[10px] font-sans text-stone-700 italic font-medium">
                        {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800 font-medium font-sans uppercase tracking-wider mt-0.5">
                      {exp.company}
                    </p>
                    {exp.description && (
                      <p className="mt-2 text-stone-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
