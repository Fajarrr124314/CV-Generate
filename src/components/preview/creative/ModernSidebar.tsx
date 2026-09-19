import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const ModernSidebar: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  const getLevelPercent = (level: string) => {
    switch (level) {
      case 'Expert': return '100%';
      case 'Advanced': return '80%';
      case 'Intermediate': return '60%';
      case 'Beginner': return '40%';
      default: return '70%';
    }
  };

  return (
    <div className="w-full min-h-[297mm] bg-white flex text-slate-800 font-sans text-xs">
      {/* Left Sidebar */}
      <aside className="w-[34%] bg-slate-900 text-slate-200 p-6 flex flex-col justify-between shrink-0">
        <div>
          {/* Avatar / Photo */}
          {personal.photoUrl ? (
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-400 shadow-md">
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
              <div className="w-28 h-28 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-indigo-400">
                {personal.fullName
                  ? personal.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                  : 'SL'}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-3 pb-6 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Kontak
            </h3>

            {personal.email && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[11px]">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[11px]">{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span className="text-[11px]">{personal.address}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <Globe className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[11px]">{personal.website}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <LinkedinIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[11px]">{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-2 text-slate-300 break-all">
                <GithubIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[11px]">{personal.github}</span>
              </div>
            )}
          </div>

          {/* Education in Sidebar */}
          {educations && educations.length > 0 && (
            <div className="py-6 border-b border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Pendidikan
              </h3>
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-white text-xs">{edu.degree}</p>
                    <p className="text-[11px] text-slate-400">{edu.fieldOfStudy}</p>
                    <p className="text-[11px] text-indigo-300">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {edu.startDate} – {edu.endDate}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills with Progress Bars */}
          {skills && skills.length > 0 && (
            <div className="pt-6 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Keahlian
              </h3>
              <div className="space-y-2.5">
                {skills.map((s) => (
                  <div key={s.id}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-200 font-medium">{s.name}</span>
                      <span className="text-[10px] text-indigo-300">{s.level}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{ width: getLevelPercent(s.level) }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-[66%] p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="border-b-2 border-slate-100 pb-5">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-base font-semibold text-indigo-600 mt-1 uppercase tracking-wide">
              {personal.jobTitle || 'Posisi / Role Profesional'}
            </p>
          </div>

          {/* Summary */}
          {personal.summary && (
            <div className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block" />
                Tentang Saya
              </h2>
              <p className="text-slate-600 text-justify leading-relaxed whitespace-pre-line text-xs">
                {personal.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600 inline-block" />
                Pengalaman Kerja
              </h2>
              <div className="space-y-5 border-l-2 border-indigo-100 pl-4 ml-1">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Dot on timeline */}
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 ring-4 ring-white" />
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                      <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-slate-700 font-medium text-xs mt-0.5">{exp.company}</p>
                    {exp.description && (
                      <p className="mt-2 text-slate-600 text-justify whitespace-pre-line leading-relaxed text-[11px]">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
