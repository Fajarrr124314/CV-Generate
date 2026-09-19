import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const CharcoalSplit: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white flex text-slate-800 font-sans text-xs">
      {/* Left Charcoal Sidebar */}
      <aside className="w-[34%] bg-[#111827] text-slate-200 p-7 flex flex-col justify-between shrink-0">
        <div>
          {/* Avatar Photo */}
          {personal.photoUrl ? (
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-slate-400 shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-300">
                {personal.fullName
                  ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')
                  : 'CS'}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Kontak
            </h3>

            {personal.email && (
              <div className="flex items-center gap-2 text-slate-300 break-all text-[11px]">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-start gap-2 text-slate-300 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <LinkedinIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <GithubIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personal.github}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>

          {/* Education in sidebar */}
          {educations && educations.length > 0 && (
            <div className="py-6 border-b border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Pendidikan
              </h3>
              <div className="space-y-2.5">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-white text-xs">{edu.degree}</p>
                    <p className="text-[11px] text-slate-400">{edu.fieldOfStudy}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[10px] text-slate-500">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills in sidebar */}
          {skills && skills.length > 0 && (
            <div className="pt-6 space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Keahlian
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 text-[10px] rounded"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Right Main Body */}
      <main className="w-[66%] p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-sm font-semibold text-slate-600 mt-1 uppercase tracking-wider">
              {personal.jobTitle || 'Posisi / Role Profesional'}
            </p>
          </div>

          {/* Summary */}
          {personal.summary && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 mb-2">
                Ringkasan Profesional
              </h2>
              <p className="text-slate-700 text-justify leading-relaxed whitespace-pre-line text-xs">
                {personal.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 mb-3">
                Pengalaman Kerja
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pb-3 border-b border-slate-200 last:border-0">
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h3 className="font-bold text-slate-950 text-xs">{exp.position}</h3>
                      <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium text-xs mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="mt-1.5 text-slate-600 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
