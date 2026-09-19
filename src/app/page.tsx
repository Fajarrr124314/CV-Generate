'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  FileCheck,
  ShieldCheck,
  Download,
  CheckCircle,
  Eye,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'lucide-react';
import { ResumePreviewRenderer } from '@/components/preview/ResumePreviewRenderer';
import { INITIAL_RESUME_DATA } from '@/utils/storage';
import { TemplateCategory } from '@/types/resume';

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  rawCategory: TemplateCategory;
  badge: string;
  badgeColor: string;
  description: string;
}

export default function HomePage() {
  const [selectedPreview, setSelectedPreview] = useState<TemplateItem | null>(null);
  const [modalZoom, setModalZoom] = useState(0.85);

  const templates: TemplateItem[] = [
    {
      id: 'ats-classic',
      name: 'ATS Classic',
      category: 'ATS-Friendly',
      rawCategory: 'ATS',
      badge: 'BUMN & Korporat',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Format 1 kolom serif standar yang 100% lolos parsing sistem Applicant Tracking System.',
    },
    {
      id: 'ats-modern',
      name: 'ATS Modern',
      category: 'ATS-Friendly',
      rawCategory: 'ATS',
      badge: 'Multinasional',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Tipografi sans-serif kontemporer dengan hierarki tegas, mudah dibaca cepat oleh recruiter.',
    },
    {
      id: 'creative-sidebar',
      name: 'Modern Sidebar',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Startup & Tech',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Dual-column layout dengan sidebar navy, foto profil, dan progress indicator keahlian.',
    },
    {
      id: 'creative-editorial',
      name: 'Editorial Luxe',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Executive & Media',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Gaya majalah mewah dengan tipografi serif elegan dan tata letak asimetris eksekutif.',
    },
    {
      id: 'creative-dark',
      name: 'Cyber Dark Tech',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Engineer & UI/UX',
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      description: 'Tema dark mode futuristik dengan aksen neon cyan dan kartu terminal modern.',
    },
    {
      id: 'creative-timeline',
      name: 'Dynamic Timeline',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'PM & Consultant',
      badgeColor: 'bg-violet-50 text-violet-700 border-violet-200',
      description: 'Visual jejak karir kronologis dengan gradient banner dan milestone node interaktif.',
    },
    {
      id: 'creative-nordic',
      name: 'Nordic Minimalist',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Architect & Design',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      description: 'Sentuhan Scandinavian bersih bernuansa sage green alami dan tipografi Swiss lapang.',
    },
    {
      id: 'creative-grid',
      name: 'Minimalist Grid',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Creative & Agency',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Header bergradasi elegan dengan tata letak grid modern untuk portofolio teknologi.',
    },
    {
      id: 'cover-letter',
      name: 'Standard Cover Letter',
      category: 'Surat Lamaran',
      rawCategory: 'COVER_LETTER',
      badge: 'Resmi HRD',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Format surat lamaran profesional dengan layout proporsional yang memikat hiring manager.',
    },
  ];

  const handleNextPreview = () => {
    if (!selectedPreview) return;
    const currentIndex = templates.findIndex((t) => t.id === selectedPreview.id);
    const nextIndex = (currentIndex + 1) % templates.length;
    setSelectedPreview(templates[nextIndex]);
  };

  const handlePrevPreview = () => {
    if (!selectedPreview) return;
    const currentIndex = templates.findIndex((t) => t.id === selectedPreview.id);
    const prevIndex = (currentIndex - 1 + templates.length) % templates.length;
    setSelectedPreview(templates[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Quick Fullscreen Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Modal Header Bar */}
          <div className="max-w-6xl w-full mx-auto bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${selectedPreview.badgeColor}`}>
                {selectedPreview.badge}
              </span>
              <div>
                <h3 className="text-base font-bold text-white leading-none">
                  {selectedPreview.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                  {selectedPreview.category} • {selectedPreview.description}
                </p>
              </div>
            </div>

            {/* Modal Zoom & Navigation Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700 text-xs">
                <button
                  type="button"
                  onClick={() => setModalZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
                  className="p-1.5 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                  title="Perkecil"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-mono text-[11px] text-slate-300 min-w-[40px] text-center">
                  {Math.round(modalZoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setModalZoom((z) => Math.min(1.4, Number((z + 0.1).toFixed(2))))}
                  className="p-1.5 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                  title="Perbesar"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setModalZoom(0.85)}
                  className="p-1.5 hover:bg-slate-700 text-slate-300 rounded cursor-pointer ml-1"
                  title="Reset Zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Prev / Next Template Navigation */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrevPreview}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer"
                  title="Template Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextPreview}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer"
                  title="Template Selanjutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Action Button: Use This Template */}
              <Link
                href={`/builder?template=${selectedPreview.id}`}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 cursor-pointer ml-2"
              >
                <span>Gunakan Desain Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="p-2 bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-700 transition-colors cursor-pointer ml-1"
                title="Tutup Pratinjau"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Preview Body with Smooth Scroll & Scaling */}
          <div className="flex-1 overflow-auto my-4 flex items-start justify-center p-2 sm:p-4">
            <div
              style={{
                transform: `scale(${modalZoom})`,
                transformOrigin: 'top center',
                width: '210mm',
              }}
              className="bg-white shadow-2xl rounded-xs overflow-hidden transition-transform duration-100 ease-out"
            >
              <ResumePreviewRenderer
                data={{
                  ...INITIAL_RESUME_DATA,
                  templateId: selectedPreview.id,
                  category: selectedPreview.rawCategory,
                }}
              />
            </div>
          </div>

          {/* Modal Bottom Footer Hint */}
          <div className="max-w-md mx-auto text-center text-xs text-slate-400">
            Tekan <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300">Esc</kbd> atau tombol Tutup untuk kembali ke galeri.
          </div>
        </div>
      )}

      {/* Top Banner & Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-base shadow-lg shadow-indigo-500/20">
              SL
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white">SpaceLive</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                CV & Cover Letter
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
            <a href="#templates" className="hover:text-white transition-colors">
              Pilihan Template
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Fitur Unggulan
            </a>
            <a href="#ats-guide" className="hover:text-white transition-colors">
              Panduan ATS
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/builder"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-lg shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Buka Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/25 via-violet-600/20 to-teal-500/10 blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-indigo-400 mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate CV ATS-Friendly & Cover Letter Instan</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight sm:leading-none">
            Bangun Resume Impian, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-teal-300 bg-clip-text text-transparent">
              Lolos Skrining ATS dengan Mudah.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Aplikasi generator CV modern dan surat lamaran kerja terstruktur. Pilihan template ATS klasik bebas eror parser hingga desain kreatif dengan live A4 preview & download instan PDF.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/builder"
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold rounded-xl shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Mulai Buat CV Sekarang — Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#templates"
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Lihat 9 Template</span>
            </a>
          </div>

          {/* Social Proof Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-900 pt-8">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>100% ATS Compliant</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Export Native PDF & Gambar Tanpa Watermark</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Tersimpan Otomatis di Browser Anda</span>
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section id="templates" className="py-20 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              Koleksi Desain Nyata
            </h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Pilih Format yang Sesuai dengan Target Karir Anda
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Setiap template dapat dilihat pratinjau layar penuh (zoom) atau langsung dibuka di Studio Builder.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between group hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {tpl.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tpl.badgeColor}`}>
                      {tpl.badge}
                    </span>
                  </div>

                  {/* Clean Centered Miniature Preview Box */}
                  <div
                    onClick={() => setSelectedPreview(tpl)}
                    className="relative w-full aspect-[210/260] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group/box mb-4 cursor-pointer"
                  >
                    {/* Centered Scaled Sheet */}
                    <div className="absolute top-0 left-0 w-full flex justify-center">
                      <div
                        style={{
                          width: '794px',
                          minHeight: '1123px',
                          transform: 'scale(0.35)',
                          transformOrigin: 'top center',
                        }}
                        className="bg-white shadow-2xl shrink-0 select-none pointer-events-none"
                      >
                        <ResumePreviewRenderer
                          data={{
                            ...INITIAL_RESUME_DATA,
                            templateId: tpl.id,
                            category: tpl.rawCategory,
                          }}
                        />
                      </div>
                    </div>

                    {/* Interactive Hover Overlay with Quick Preview CTA */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/box:opacity-100 transition-all flex flex-col items-center justify-center gap-2 p-4 z-20 backdrop-blur-xs">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPreview(tpl);
                        }}
                        className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Lihat Pratinjau Jelas</span>
                      </button>

                      <Link
                        href={`/builder?template=${tpl.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                      >
                        <span>Gunakan Desain Ini</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>

                {/* Card Bottom Dual Action Buttons */}
                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPreview(tpl)}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                    title="Pratinjau detail sebelum memilih"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pratinjau</span>
                  </button>

                  <Link
                    href={`/builder?template=${tpl.id}`}
                    className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
                  >
                    <span>Gunakan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section id="features" className="py-20 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">
              Keunggulan SpaceLive
            </h2>
            <p className="text-3xl font-extrabold text-white tracking-tight">
              Dibuat untuk Kecepatan, Privasi, dan Hasil Maksimal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">100% ATS Ready</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Struktur data linear tanpa tabel tersembunyi atau format yang merusak pembacaan sistem HRIS korporat.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Ekspor Multi-Format</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Simpan dokumen dalam format PDF A4 tajam, PNG resolusi tinggi, JPEG, atau langsung cetak browser.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Privasi Terjaga</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seluruh data tersimpan secara lokal di browser Anda. Tidak ada penyimpanan kredensial ke server pihak ketiga.
              </p>
            </div>

            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Cover Letter Generator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buat surat lamaran kerja resmi Bahasa Indonesia & Inggris dengan template kalimat terstruktur siap kirim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-900/50 via-slate-900 to-violet-900/50 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-white">
            Siap Melangkah ke Jenjang Karir Berikutnya?
          </h2>
          <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto">
            Gunakan SpaceLive Studio sekarang dan buat CV profesional Anda dalam waktu kurang dari 5 menit.
          </p>
          <div className="mt-6">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 text-xs font-bold rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              <span>Buka Studio Builder Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SpaceLive (<span className="text-indigo-400">spacelive.site</span>). All rights reserved.</p>
          <p>Dibuat untuk memudahkan pencari kerja di Indonesia & Global.</p>
        </div>
      </footer>
    </div>
  );
}
