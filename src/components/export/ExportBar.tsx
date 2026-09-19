'use client';

import React, { useState } from 'react';
import { Download, FileDown, Image as LucideImage, Printer, Loader2, Check } from 'lucide-react';
import { exportToPDF, exportToImage, printDocument } from '@/utils/exportDocument';

interface Props {
  elementId: string;
  candidateName?: string;
  documentType?: string;
}

export const ExportBar: React.FC<Props> = ({ elementId, candidateName, documentType }) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);

  const cleanName = (candidateName || 'Resume').trim().replace(/\s+/g, '_');
  const baseFilename = `${cleanName}_${documentType || 'CV'}`;

  const handleExportPDF = async () => {
    try {
      setIsExporting('PDF');
      await exportToPDF(elementId, `${baseFilename}.pdf`);
      triggerDone();
    } catch (err) {
      console.error('Export PDF error:', err);
      alert('Gagal mengekspor PDF. Pastikan gambar profil valid.');
    } finally {
      setIsExporting(null);
    }
  };

  const handleExportImage = async (format: 'png' | 'jpeg') => {
    try {
      setIsExporting(format.toUpperCase());
      await exportToImage(elementId, format, `${baseFilename}.${format}`);
      triggerDone();
    } catch (err) {
      console.error(`Export ${format} error:`, err);
      alert(`Gagal mengekspor ${format.toUpperCase()}.`);
    } finally {
      setIsExporting(null);
    }
  };

  const triggerDone = () => {
    setIsDone(true);
    setTimeout(() => setIsDone(false), 2500);
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {/* Primary: Export PDF */}
      <button
        type="button"
        disabled={!!isExporting}
        onClick={handleExportPDF}
        className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
        title="Download PDF A4 Berkualitas Tinggi"
      >
        {isExporting === 'PDF' ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Membuat PDF...</span>
          </>
        ) : isDone ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-300" />
            <span>Berhasil!</span>
          </>
        ) : (
          <>
            <FileDown className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </>
        )}
      </button>

      {/* Secondary: PNG */}
      <button
        type="button"
        disabled={!!isExporting}
        onClick={() => handleExportImage('png')}
        className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
        title="Download gambar PNG tajam"
      >
        {isExporting === 'PNG' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <LucideImage className="w-3.5 h-3.5 text-slate-500" />
        )}
        <span className="hidden sm:inline">PNG</span>
      </button>

      {/* Secondary: JPG */}
      <button
        type="button"
        disabled={!!isExporting}
        onClick={() => handleExportImage('jpeg')}
        className="px-2.5 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium rounded-lg shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer"
        title="Download gambar JPG"
      >
        {isExporting === 'JPEG' ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : (
          <Download className="w-3.5 h-3.5 text-slate-500" />
        )}
        <span className="hidden sm:inline">JPG</span>
      </button>

      {/* Native Print */}
      <button
        type="button"
        onClick={printDocument}
        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
        title="Print atau simpan langsung melalui dialog print browser"
      >
        <Printer className="w-3.5 h-3.5 text-slate-600" />
        <span className="hidden sm:inline">Print</span>
      </button>
    </div>
  );
};
