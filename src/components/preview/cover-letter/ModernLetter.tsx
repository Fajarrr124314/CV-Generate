import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const ModernLetter: React.FC<Props> = ({ data }) => {
  const { personal, coverLetter } = data;

  const letter = coverLetter || {
    recipientName: 'Bapak/Ibu Hiring Manager',
    recipientTitle: 'Head of Talent Acquisition',
    companyName: 'PT Global Tech Nusantara',
    companyAddress: 'Jakarta Selatan',
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
    subject: 'Lamaran Pekerjaan',
    letterBody: '',
  };

  return (
    <div className="w-full min-h-[297mm] bg-white text-slate-800 font-sans text-xs flex flex-col justify-between">
      <div>
        {/* Solid Header Band */}
        <header className="bg-[#1e3a8a] text-white p-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200 block mb-1">
              Surat Lamaran Kerja Resmi
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-xs font-semibold text-blue-200 mt-0.5 uppercase tracking-wider">
              {personal.jobTitle || 'Posisi / Role Profesional'}
            </p>
          </div>

          <div className="text-right text-[11px] text-blue-100 space-y-0.5 shrink-0">
            {personal.email && <div>{personal.email}</div>}
            {personal.phone && <div>{personal.phone}</div>}
            {personal.address && <div>{personal.address}</div>}
          </div>
        </header>

        {/* Letter Body Area */}
        <div className="p-10 space-y-6">
          {/* Date & Recipient */}
          <div className="flex justify-between items-start text-xs">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Ditujukan Kepada:
              </span>
              <p className="font-bold text-slate-900 text-sm">{letter.recipientName || 'Hiring Team'}</p>
              {letter.recipientTitle && <p className="text-slate-600">{letter.recipientTitle}</p>}
              {letter.companyName && <p className="font-semibold text-slate-800">{letter.companyName}</p>}
              {letter.companyAddress && <p className="text-slate-500">{letter.companyAddress}</p>}
            </div>

            <div className="text-slate-500 font-medium text-xs">
              {letter.date}
            </div>
          </div>

          {/* Subject Line */}
          {letter.subject && (
            <div className="p-3 bg-blue-50 border-l-4 border-[#1e3a8a] font-bold text-slate-900 text-xs">
              Perihal: {letter.subject}
            </div>
          )}

          {/* Body Content */}
          <div className="text-slate-700 whitespace-pre-line leading-relaxed text-justify space-y-3 pt-2">
            {letter.letterBody || (
              <p className="text-slate-400 italic">
                Tuliskan isi surat lamaran kerja Anda di panel editor...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sign-off */}
      <div className="p-10 pt-0">
        <p className="text-xs text-slate-600">Hormat saya,</p>
        <div className="h-12 flex items-end">
          <p className="font-serif italic text-base text-slate-500">
            {personal.fullName || 'Tanda Tangan'}
          </p>
        </div>
        <p className="font-bold text-slate-900 text-xs mt-1">
          {personal.fullName || 'Nama Lengkap'}
        </p>
        <p className="text-[10px] text-slate-500">
          {personal.jobTitle || 'Pelamar'}
        </p>
      </div>
    </div>
  );
};
