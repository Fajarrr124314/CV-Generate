'use client';

import React, { useState } from 'react';
import { Download, FileDown, Image as LucideImage, Printer, Loader2, Check, ChevronDown, Sparkles } from 'lucide-react';
import { exportToPDF, exportToImage, printDocument } from '@/utils/exportDocument';

interface Props {
  elementId: string;
  candidateName?: string;
  documentType?: string;
  theme?: 'light' | 'dark';
  variant?: 'auto' | 'dropdown' | 'buttons';
  dropdownPlacement?: 'bottom' | 'top';
}

export const ExportBar: React.FC<Props> = ({
  elementId,
  candidateName,
  documentType,
  theme = 'light',
  variant = 'auto',
  dropdownPlacement = 'bottom',
}) => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    const label = format === 'jpeg' ? 'JPG' : 'PNG';
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

  // Dropdown Menu Component
  const renderDropdown = () => (
    <div className="relative shrink-0">
      {/* Trigger Button */}
      <button
        type="button"
        disabled={!!isExporting}
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all cursor-pointer shrink-0 disabled:opacity-80`}
        title="Pilih format unduhan (PDF, PNG, JPG, Cetak)"
      >
        {isExporting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            <span>Membuat {isExporting}...</span>
          </>
        ) : isDone ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>Berhasil!</span>
          </>
        ) : (
          <>
            <FileDown className="w-3.5 h-3.5 shrink-0" />
            <span>Unduh</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {/* Floating Popover Choices */}
      {isOpen && (
        <>
          {/* Backdrop for click outside */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Floating Dropdown Card */}
          <div
            className={`absolute right-0 z-50 w-72 rounded-xl shadow-2xl border p-1.5 flex flex-col gap-1 transition-all animate-in fade-in zoom-in-95 duration-150 ${
              dropdownPlacement === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            } ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className={`px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider border-b flex items-center justify-between ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
            }`}>
              <span>Pilih Format Unduh</span>
              <span className="text-indigo-500 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Siap Cetak
              </span>
            </div>

            {/* Option 1: PDF */}
            <button
              type="button"
              disabled={!!isExporting}
              onClick={() => {
                setIsOpen(false);
                handleExportPDF();
              }}
              className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors text-left group cursor-pointer ${
                isDark ? 'hover:bg-slate-800 active:bg-slate-700' : 'hover:bg-indigo-50 active:bg-indigo-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <FileDown className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600">
                    Dokumen PDF
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    Standar HRD & lolos ATS (A4)
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-200/50 uppercase">
                Utama
              </span>
            </button>

            {/* Option 2: PNG */}
            <button
              type="button"
              disabled={!!isExporting}
              onClick={() => {
                setIsOpen(false);
                handleExportImage('png');
              }}
              className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors text-left group cursor-pointer ${
                isDark ? 'hover:bg-slate-800 active:bg-slate-700' : 'hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-600/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <LucideImage className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600">
                    Gambar PNG
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    Resolusi tinggi jernih tanpa blur
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-200/50 uppercase">
                HD
              </span>
            </button>

            {/* Option 3: JPG */}
            <button
              type="button"
              disabled={!!isExporting}
              onClick={() => {
                setIsOpen(false);
                handleExportImage('jpeg');
              }}
              className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors text-left group cursor-pointer ${
                isDark ? 'hover:bg-slate-800 active:bg-slate-700' : 'hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-600/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-amber-600">
                    Gambar JPG
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    Ukuran file kompresi ringan
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded border border-amber-200/50 uppercase">
                Ringan
              </span>
            </button>

            {/* Option 4: Print */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                printDocument();
              }}
              className={`w-full px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors text-left group cursor-pointer border-t ${
                isDark
                  ? 'border-slate-800 hover:bg-slate-800 active:bg-slate-700'
                  : 'border-slate-100 hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-500/15 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Printer className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    Cetak Dokumen
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    Dialog print browser langsung
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded uppercase">
                Print
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Buttons Row Component (Desktop View)
  const renderButtons = () => {
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
          className="px-2.5 sm:px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          title="Download Dokumen PDF A4 Berkualitas Tinggi"
        >
          {isExporting === 'PDF' ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
              <span>Membuat PDF...</span>
            </>
          ) : isDone ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Berhasil Unduh!</span>
            </>
          ) : (
            <>
              <FileDown className="w-3.5 h-3.5 shrink-0" />
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Secondary: PNG */}
        <button
          type="button"
          disabled={!!isExporting}
          onClick={() => handleExportImage('png')}
          className={`px-2.5 py-1.5 border text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shrink-0 ${secondaryBtnStyle}`}
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

        {/* Secondary: JPG */}
        <button
          type="button"
          disabled={!!isExporting}
          onClick={() => handleExportImage('jpeg')}
          className={`px-2.5 py-1.5 border text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer shrink-0 ${secondaryBtnStyle}`}
          title="Download gambar JPG kompresi ringan"
        >
          {isExporting === 'JPG' ? (
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

        {/* Native Print */}
        <button
          type="button"
          onClick={printDocument}
          className={`px-2.5 py-1.5 border text-xs font-medium rounded-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0 ${printBtnStyle}`}
          title="Cetak langsung atau simpan via dialog print browser"
        >
          <Printer className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
          <span>Print</span>
        </button>
      </div>
    );
  };

  if (variant === 'dropdown') {
    return renderDropdown();
  }

  if (variant === 'buttons') {
    return renderButtons();
  }

  // Variant 'auto': Dropdown on mobile (< lg), full buttons on desktop (>= lg)
  return (
    <>
      <div className="lg:hidden">
        {renderDropdown()}
      </div>
      <div className="hidden lg:block">
        {renderButtons()}
      </div>
    </>
  );
};

