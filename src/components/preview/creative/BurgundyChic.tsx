import React from 'react';
import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/ui/Icons';

interface Props {
  data: ResumeData;
}

export const BurgundyChic: React.FC<Props> = ({ data }) => {
  const { personal, experiences, educations, skills } = data;

  return (
    <div className="w-full min-h-[297mm] bg-white flex text-slate-800 font-sans text-xs">
      {/* Left Deep Burgundy Sidebar */}
      <aside className="w-[33%] bg-[#881337] text-white p-7 flex flex-col justify-between shrink-0">
        <div>
          {/* Avatar Photo */}
          {personal.photoUrl ? (
            <div className="flex justify-center mb-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-rose-200 shadow-md">
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
              <div className="w-28 h-28 rounded-full bg-[#4c0519] border-2 border-rose-300/40 flex items-center justify-center text-2xl font-bold text-rose-200">
                {personal.fullName
                  ? personal.fullName.split(' ').map((n) => n[0]).slice(0, 2).join('')
                  : 'BC'}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-3 pb-6 border-b border-rose-400/40">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200">
              Informasi Kontak
            </h3>

            {personal.email && (
              <div className="flex items-center gap-2 text-rose-100 break-all text-[11px]">
                <Mail className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2 text-rose-100 text-[11px]">
                <Phone className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-start gap-2 text-rose-100 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-rose-300 shrink-0 mt-0.5" />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="flex items-center gap-2 text-rose-100 text-[11px]">
                <LinkedinIcon className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="flex items-center gap-2 text-rose-100 text-[11px]">
                <GithubIcon className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>{personal.github}</span>
              </div>
            )}
            {personal.website && (
              <div className="flex items-center gap-2 text-rose-100 text-[11px]">
                <Globe className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                <span>{personal.website}</span>
              </div>
            )}
          </div>

          {/* Education in sidebar */}
          {educations && educations.length > 0 && (
            <div className="py-6 border-b border-rose-400/40 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200">
                Pendidikan
              </h3>
              <div className="space-y-2.5">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-semibold text-white text-xs">{edu.degree}</p>
                    <p className="text-[11px] text-rose-200">{edu.fieldOfStudy}</p>
                    <p className="text-[10px] text-rose-300 mt-0.5">{edu.institution}</p>
                    {(edu.startDate || edu.endDate) && (
                      <p className="text-[10px] text-rose-400">
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-200">
                Keahlian
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s) => (
                  <span
                    key={s.id}
                    className="px-2 py-0.5 bg-[#4c0519]/70 border border-rose-400/40 text-rose-100 text-[10px] rounded"
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
      <main className="w-[67%] p-8 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="border-b-2 border-[#881337] pb-4">
            <h1 className="text-3xl font-extrabold text-[#881337] tracking-tight">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-sm font-semibold text-slate-700 mt-1 uppercase tracking-wide">
              {personal.jobTitle || 'Posisi / Role Profesional'}
            </p>
          </div>

          {/* Summary */}
          {personal.summary && (
            <section className="mt-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#881337] mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#881337] rounded-xs inline-block" />
                Profil Singkat
              </h2>
              <p className="text-slate-700 text-justify leading-relaxed whitespace-pre-line text-xs">
                {personal.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <section className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#881337] mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#881337] rounded-xs inline-block" />
                Pengalaman Kerja
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="pb-3 border-b border-slate-100 last:border-0">
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                      <span className="text-[10px] font-semibold text-[#881337] bg-rose-50 px-2 py-0.5 rounded">
                        {exp.startDate} – {exp.isCurrent ? 'Sekarang' : exp.endDate}
                      </span>
                    </div>
                    <p className="text-[#881337] font-semibold text-xs mt-0.5">{exp.company}</p>
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
