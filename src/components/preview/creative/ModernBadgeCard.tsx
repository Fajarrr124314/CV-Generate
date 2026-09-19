import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const ModernBadgeCard: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-[#f8fafc] text-slate-800 font-sans text-xs p-8 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Top Profile Card */}
        <header className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-5 text-center sm:text-left flex-1">
            {personal.photoUrl ? (
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-indigo-500 shadow-sm shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.photoUrl}
                  alt={personal.fullName}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-2xl font-bold text-indigo-700 shrink-0">
                {personal.fullName ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('') : 'MB'}
              </div>
            )}

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md border border-indigo-100 inline-block mb-1">
                CV Profesional
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {personal.fullName || 'Nama Lengkap'}
              </h1>
              <p className="text-sm font-semibold text-slate-700 mt-0.5">
                {personal.jobTitle || 'Posisi / Role Profesional'}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="text-right text-[11px] text-slate-700 font-medium space-y-1 shrink-0">
            {personal.email && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <span>{personal.email}</span>
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <span>{personal.phone}</span>
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
              </div>
            )}
            {personal.address && (
              <div className="flex items-center sm:justify-end gap-1.5">
                <span>{personal.address}</span>
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              </div>
            )}
          </div>
        </header>

        {/* Links row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-700 px-2 font-medium">
          {personal.linkedin && (
            <span className="flex items-center gap-1 font-medium">
              <LinkedinIcon className="w-3 h-3 text-indigo-600" /> {personal.linkedin}
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1 font-medium">
              <GithubIcon className="w-3 h-3 text-indigo-600" /> {personal.github}
            </span>
          )}
          {personal.website && (
            <span className="flex items-center gap-1 font-medium">
              <Globe className="w-3 h-3 text-indigo-600" /> {personal.website}
            </span>
          )}
        </div>

        {/* Summary Card */}
        {personal.summary && (
          <section className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              Tentang Profesional
            </h2>
            <p className="text-slate-800 text-justify leading-relaxed whitespace-pre-line text-xs">
              {personal.summary}
            </p>
          </section>
        )}

        {/* 2 Column Body */}
        <div className="grid grid-cols-12 gap-5">
          {/* Work Experience */}
          <section className="col-span-8 space-y-3.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 px-1">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              Pengalaman Kerja
            </h2>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                      {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-indigo-700 font-semibold text-xs mt-0.5">{exp.company}</p>
                  {exp.description && (
                    <p className="mt-1.5 text-slate-800 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Side: Education & Skills */}
          <aside className="col-span-4 space-y-4">
            {/* Education */}
            {educations && educations.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 px-1 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  Pendidikan
                </h2>
                <div className="space-y-2.5">
                  {educations.map((edu) => (
                    <div key={edu.id} className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                      <p className="font-bold text-slate-900 text-xs">{edu.degree}</p>
                      <p className="text-[11px] text-slate-800">{edu.fieldOfStudy}</p>
                      <p className="text-[10px] text-indigo-700 font-medium mt-0.5">{edu.institution}</p>
                      {(edu.startDate || edu.endDate) && (
                        <p className="text-[10px] text-slate-600 mt-1">
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 px-1 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  Keahlian
                </h2>
                <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-medium rounded-md"
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
