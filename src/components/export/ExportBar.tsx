'use client';

import React, { useState } from 'react';
import { Download, FileDown, Image as LucideImage, Printer, Loader2, Check } from 'lucide-react';
import { exportToPDF, exportToImage, printDocument } from '@/utils/exportDocument';

interface Props {
  elementId: string;
  candidateName?: string;
  documentType?: string;
  theme?: 'light' | 'dark';
}

export const ExportBar: React.FC<Props> = ({ elementId, candidateName, documentType, theme = 'light' }) => {
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
    const label = format === 'jpeg' ? 'JPEG' : 'PNG';
    try {
      setIsExporting(label);
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

  const isDark = theme === 'dark';

  const secondaryBtnStyle = isDark
    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 shadow-xs'
    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs';

  const printBtnStyle = isDark
    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 shadow-xs'
    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 shadow-xs';

  return (
    <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
      {/* Primary: Export PDF */}
      <button
        type="button"
        disabled={!!isExporting}
        onClick={handleExportPDF}
        className="px-2 sm:px-3 py-1 sm:py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[11px] sm:text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1 sm:gap-1.5 transition-all disabled:opacity-50 cursor-pointer shrink-0"
        title="Download Dokumen PDF A4 Berkualitas Tinggi"
      >
        {isExporting === 'PDF' ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            <span><span className="hidden min-[400px]:inline">Membuat </span>PDF...</span>
          </>
        ) : isDone ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span><span className="hidden min-[400px]:inline">Berhasil </span>Unduh!</span>
          </>
        ) : (
          <>
            <FileDown className="w-3.5 h-3.5 shrink-0" />
            <span><span className="hidden min-[400px]:inline">Download </span>PDF</span>
          </>
        )}
      </button>

      {/* Secondary: PNG (Available on Mobile & Desktop) */}
      <button
        type="button"
        disabled={!!isExporting}
        onClick={() => handleExportImage('png')}
        className={`px-1.5 sm:px-2.5 py-1 sm:py-1.5 border text-[11px] sm:text-xs font-medium rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shrink-0 ${secondaryBtnStyle}`}
        title="Download gambar PNG tajam"
      >
        {isExporting === 'PNG' ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-indigo-500" />
            <span className="text-indigo-500 font-semibold">PNG...</span>
          </>
        ) : (
          <>
            <LucideImage className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <span>PNG</span>
          </>
        )}
      </button>

      {/* Secondary: JPG (Available on Mobile & Desktop) */}
      <button
        type="button"
        disabled={!!isExporting}
        onClick={() => handleExportImage('jpeg')}
        className={`px-1.5 sm:px-2.5 py-1 sm:py-1.5 border text-[11px] sm:text-xs font-medium rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shrink-0 ${secondaryBtnStyle}`}
        title="Download gambar JPG kompresi ringan"
      >
        {isExporting === 'JPEG' ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0 text-indigo-500" />
            <span className="text-indigo-500 font-semibold">JPG...</span>
          </>
        ) : (
          <>
            <Download className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <span>JPG</span>
          </>
        )}
      </button>

      {/* Native Print (Available on Mobile & Desktop) */}
      <button
        type="button"
        onClick={printDocument}
        className={`px-1.5 sm:px-2.5 py-1 sm:py-1.5 border text-[11px] sm:text-xs font-medium rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0 ${printBtnStyle}`}
        title="Cetak langsung atau simpan via dialog print browser"
      >
        <Printer className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
        <span className="hidden min-[420px]:inline">Print</span>
      </button>
    </div>
  );
};

