import React from 'react';
import { ResumeData } from '@/types/resume';

interface Props {
  data: ResumeData;
}

export const StandardLetter: React.FC<Props> = ({ data }) => {
  const { personal, coverLetter } = data;

  const letter = coverLetter || {
    recipientName: 'Nama Recruiter / Hiring Manager',
    recipientTitle: 'Head of Department / HR Manager',
    companyName: 'Nama Perusahaan',
    companyAddress: 'Alamat Kantor / Kota',
    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
    subject: 'Lamaran Pekerjaan',
    letterBody: '',
  };

  return (
    <div
      className="w-full min-h-[297mm] bg-white text-slate-900 font-sans text-[13px] leading-relaxed p-12 flex flex-col justify-between"
      style={{ fontFamily: 'var(--font-geist-sans), Inter, sans-serif' }}
    >
      <div>
        {/* Sender Header */}
        <div className="pb-6 border-b-2 border-slate-800 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-950 tracking-tight">
              {personal.fullName || 'Nama Lengkap'}
            </h1>
            <p className="text-sm font-semibold text-indigo-600 mt-0.5">
              {personal.jobTitle || 'Posisi / Role Profesional'}
            </p>
          </div>

          <div className="text-right text-xs text-slate-600 space-y-0.5">
            {personal.email && <p className="font-medium text-slate-800">{personal.email}</p>}
            {personal.phone && <p>{personal.phone}</p>}
            {personal.address && <p>{personal.address}</p>}
          </div>
        </div>

        {/* Date */}
        <div className="mt-8 text-xs text-slate-700 font-medium">
          {letter.date}
        </div>

        {/* Recipient Info */}
        <div className="mt-6 text-xs text-slate-800 space-y-0.5 leading-normal">
          {letter.recipientName && <p className="font-bold text-slate-950 text-sm">{letter.recipientName}</p>}
          {letter.recipientTitle && <p className="text-slate-700">{letter.recipientTitle}</p>}
          {letter.companyName && <p className="font-semibold text-slate-900">{letter.companyName}</p>}
          {letter.companyAddress && <p className="text-slate-600">{letter.companyAddress}</p>}
        </div>

        {/* Subject */}
        {letter.subject && (
          <div className="mt-6 font-bold text-slate-950 text-sm border-l-4 border-indigo-600 pl-3 py-0.5 bg-slate-50">
            Perihal: {letter.subject}
          </div>
        )}

        {/* Letter Body */}
        <div className="mt-6 text-slate-800 whitespace-pre-line leading-relaxed text-justify space-y-3">
          {letter.letterBody || (
            <p className="text-slate-400 italic">
              Tuliskan isi surat lamaran kerja Anda di panel editor sebelah kiri...
            </p>
          )}
        </div>
      </div>

      {/* Sign-off */}
      <div className="pt-10">
        <p className="text-xs text-slate-700">Hormat saya,</p>
        <div className="h-14 flex items-end">
          <p className="font-serif italic text-lg text-slate-500">
            {personal.fullName || 'Tanda Tangan'}
          </p>
        </div>
        <p className="font-bold text-slate-950 text-xs mt-1">
          {personal.fullName || 'Nama Lengkap'}
        </p>
        <p className="text-[11px] text-slate-600">
          {personal.jobTitle || 'Pelamar'}
        </p>
      </div>
    </div>
  );
};
