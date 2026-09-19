'use client';

import React from 'react';
import { CoverLetterData } from '@/types/resume';
import { User, Building, MapPin, Calendar, FileText, Sparkles } from 'lucide-react';

interface Props {
  data: CoverLetterData;
  onChange: (updated: CoverLetterData) => void;
  candidateName?: string;
  candidateRole?: string;
}

const TEMPLATE_ID = `Dengan hormat,

Sehubungan dengan informasi lowongan pekerjaan yang saya peroleh mengenai posisi [Posisi Pekerjaan] di [Nama Perusahaan], bersama surat ini saya bermaksud untuk mengajukan diri guna bergabung dengan tim profesional Anda.

Dengan latar belakang pengalaman kerja yang relevan dan rekam jejak dalam mencapai target performa tim, saya memiliki pemahaman mendalam mengenai tantangan operasional dan inovasi yang dibutuhkan oleh industri saat ini. Saya terbiasa berkolaborasi dalam lingkungan kerja yang dinamis, memimpin inisiatif strategis, serta memberikan solusi yang efisien dan berdampak positif.

[Nama Perusahaan] memiliki reputasi luar biasa dalam hal inovasi dan kepemimpinan pasar. Saya yakin keahlian teknis dan kepemimpinan yang saya miliki dapat memberikan kontribusi nyata yang selaras dengan visi jangka panjang perusahaan.

Terlampir kurikulum vitae saya untuk pertimbangan lebih lanjut. Saya sangat menyambut kesempatan untuk dapat menghadiri sesi wawancara guna mendiskusikan kualifikasi saya secara lebih rinci.

Atas perhatian dan kesempatan yang diberikan, saya sampaikan terima kasih.`;

const TEMPLATE_EN = `Dear Hiring Manager,

I am writing to express my strong interest in the [Target Position] opening at [Company Name]. With a proven track record of excellence, hands-on leadership, and strategic problem-solving in high-paced environments, I am confident in my ability to deliver immediate value to your organization.

Throughout my professional career, I have specialized in architecting scalable systems and fostering cross-functional collaboration that directly drives revenue and operational excellence. My background aligns seamlessly with the core requirements outlined in your job listing.

I have long admired [Company Name]'s leadership and pioneering contributions to the industry. Joining your forward-thinking team represents an inspiring opportunity where I can leverage my expertise to help accelerate key company initiatives.

Please find my resume attached for your review. I would welcome the opportunity to discuss further how my background and enthusiasm meet your needs.

Thank you for your time and consideration.`;

export const CoverLetterForm: React.FC<Props> = ({ data, onChange, candidateRole }) => {
  const handleChange = (field: keyof CoverLetterData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const applyTemplate = (template: string) => {
    let populated = template.replace(/\[Posisi Pekerjaan\]/g, candidateRole || 'posisi yang dibutuhkan');
    populated = populated.replace(/\[Target Position\]/g, candidateRole || 'the open position');
    if (data.companyName) {
      populated = populated.replace(/\[Nama Perusahaan\]/g, data.companyName);
      populated = populated.replace(/\[Company Name\]/g, data.companyName);
    }
    handleChange('letterBody', populated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900">Editor Surat Lamaran (Cover Letter)</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Lengkapi data penerima dan isi surat untuk membuat cover letter resmi berstandar HRD.
          </p>
        </div>

        {/* Quick Template Fillers */}
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => applyTemplate(TEMPLATE_ID)}
            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-md flex items-center gap-1 transition-colors cursor-pointer border border-indigo-200"
          >
            <Sparkles className="w-3 h-3 text-indigo-500" />
            Template Indo
          </button>
          <button
            type="button"
            onClick={() => applyTemplate(TEMPLATE_EN)}
            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-md flex items-center gap-1 transition-colors cursor-pointer border border-emerald-200"
          >
            <Sparkles className="w-3 h-3 text-emerald-500" />
            Template English
          </button>
        </div>
      </div>

      {/* Recipient Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nama Penerima / Hiring Manager
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.recipientName}
              onChange={(e) => handleChange('recipientName', e.target.value)}
              placeholder="Bpk. Hendra Wijaya / Hiring Team"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Jabatan Penerima
          </label>
          <input
            type="text"
            value={data.recipientTitle}
            onChange={(e) => handleChange('recipientTitle', e.target.value)}
            placeholder="Head of Talent Acquisition / HR Manager"
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Nama Perusahaan
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="PT Global Tech Nusantara"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tanggal Surat
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
              placeholder="19 September 2026"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Alamat Perusahaan
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.companyAddress}
              onChange={(e) => handleChange('companyAddress', e.target.value)}
              placeholder="SCBD Lot 28, Senayan, Jakarta Selatan"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Perihal / Subjek Surat
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.subject || ''}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Lamaran Pekerjaan - Lead Full Stack Engineer"
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Letter Body */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Isi Surat Lamaran
        </label>
        <textarea
          rows={11}
          value={data.letterBody}
          onChange={(e) => handleChange('letterBody', e.target.value)}
          placeholder="Tuliskan isi surat lamaran kerja Anda di sini..."
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
        />
      </div>
    </div>
  );
};
