'use client';

import React, { useState, useEffect } from 'react';
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
    // ATS Templates (4)
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
      id: 'ats-minimal',
      name: 'ATS Minimalist',
      category: 'ATS-Friendly',
      rawCategory: 'ATS',
      badge: 'Padat & Ringkas',
      badgeColor: 'bg-stone-100 text-stone-700 border-stone-300',
      description: 'Format monospace linear untuk profesional teknis dan pendaftar instansi resmi.',
    },
    {
      id: 'ats-photo',
      name: 'ATS Formal Photo',
      category: 'ATS-Friendly',
      rawCategory: 'ATS',
      badge: 'BUMN & Foto Formal',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      description: 'Tata letak ATS terstruktur dengan pas foto formal di sebelah kiri atas.',
    },

    // Creative Templates (15)
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
      id: 'creative-corporate-blue',
      name: 'Corporate Blue',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Corporate & Finance',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Sidebar solid royal blue yang berwibawa untuk lingkungan perbankan dan multinasional.',
    },
    {
      id: 'creative-emerald-executive',
      name: 'Emerald Executive',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Leadership & Ops',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      description: 'Pita header forest green solid dengan kartu grid terstruktur untuk level manajerial.',
    },
    {
      id: 'creative-burgundy-chic',
      name: 'Burgundy Elegance',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Legal & Medical',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      description: 'Sentuhan warna wine red mewah yang sangat cocok untuk bidang hukum, medis, dan akademis.',
    },
    {
      id: 'creative-charcoal-split',
      name: 'Charcoal Split',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Modern Architecture',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      description: 'Sidebar slate matte gelap dengan kontras monokrom bersih yang tegas dan maskulin.',
    },
    {
      id: 'creative-amber-warm',
      name: 'Warm Amber',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Creative Studio',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300',
      description: 'Perpaduan warna ochre hangat dan kanvas cream untuk desainer dan pekerja kreatif.',
    },
    {
      id: 'creative-left-rail',
      name: 'Slim Left Rail',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Minimalist Tech',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      description: 'Garis sisi tipis ikonik untuk kontak, memberikan ruang konten utama yang lapang.',
    },
    {
      id: 'creative-infobar',
      name: 'Top Infobar',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Professional Staff',
      badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
      description: 'Header solid steel slate dengan chip kontak ringkas dan tata letak 2 kolom di bawah.',
    },
    {
      id: 'creative-modern-badge',
      name: 'Modern Badge Card',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Modern Product',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Struktur kartu berbingkai halus dengan tag badge untuk menonjolkan pencapaian kunci.',
    },
    {
      id: 'creative-swiss-clean',
      name: 'Swiss Typographic',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Design & Media',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      description: 'Gaya International Typographic hitam dan merah vermilion solid yang tajam dan berkarakter.',
    },
    {
      id: 'creative-coral-studio',
      name: 'Terracotta Studio',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Agency & Media',
      badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
      description: 'Warna clay orange hangat dan alami untuk branding dan industri periklanan kreatif.',
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
      description: 'Visual jejak karir kronologis dengan milestone node interaktif tanpa gradasi berlebih.',
    },
    {
      id: 'creative-grid',
      name: 'Minimalist Grid',
      category: 'Creative Design',
      rawCategory: 'CREATIVE',
      badge: 'Creative & Agency',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Header solid teal dengan tata letak grid modern untuk portofolio teknologi.',
    },

    // Cover Letter Templates (2)
    {
      id: 'cover-letter',
      name: 'Standard Cover Letter',
      category: 'Surat Lamaran',
      rawCategory: 'COVER_LETTER',
      badge: 'Resmi HRD',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Format surat lamaran profesional dengan layout proporsional yang memikat hiring manager.',
    },
    {
      id: 'cover-letter-modern',
      name: 'Modern Header Letter',
      category: 'Surat Lamaran',
      rawCategory: 'COVER_LETTER',
      badge: 'Modern & Formal',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Format surat lamaran beraksen pita biru solid yang serasi dengan CV modern Anda.',
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

  // Automatically calculate ideal fit scale based on viewport dimensions
  const handleFitZoom = () => {
    if (typeof window === 'undefined') return;
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    
    // Available width calculation
    const paddingX = isMobile ? 24 : isTablet ? 40 : 64;
    const availW = window.innerWidth - paddingX;

    // Available height calculation
    const headerH = isMobile ? 115 : 75;
    const availH = window.innerHeight - headerH - (isMobile ? 32 : 48);

    const scaleW = availW / 794;
    const scaleH = availH / 1123;

    // On mobile, prioritize full-width readability
    // On tablet & desktop, fit full A4 page into viewport
    let fit: number;
    if (isMobile) {
      fit = Math.min(scaleW, 0.55);
    } else if (isTablet) {
      fit = Math.min(scaleW * 0.9, scaleH * 0.95);
    } else {
      fit = Math.min(scaleW * 0.85, scaleH * 0.95, 0.88);
    }

    setModalZoom(Number(Math.max(0.3, fit).toFixed(2)));
  };

  // Lock body scroll and auto-fit zoom when preview modal opens
  useEffect(() => {
    if (selectedPreview) {
      document.body.style.overflow = 'hidden';
      handleFitZoom();
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPreview]);

  // Window resize handler while preview modal is open
  useEffect(() => {
    const onResize = () => {
      if (selectedPreview) {
        handleFitZoom();
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [selectedPreview]);

  // Keyboard navigation shortcuts: Escape to close, Left/Right arrows to browse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPreview) return;
      if (e.key === 'Escape') {
        setSelectedPreview(null);
      } else if (e.key === 'ArrowRight') {
        handleNextPreview();
      } else if (e.key === 'ArrowLeft') {
        handlePrevPreview();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPreview]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Quick Fullscreen Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col p-3 sm:p-5 animate-in fade-in duration-200">
          {/* Modal Header Bar */}
          <div className="max-w-6xl w-full mx-auto bg-slate-900 border border-slate-800 rounded-xl p-3 sm:px-5 sm:py-3 shadow-2xl shrink-0">
            {/* Mobile Layout: 2 Clean Rows (< sm) | Desktop Layout: 1 Row (sm:) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-3">
              {/* Row 1: Title, Badge & Quick Close Button */}
              <div className="flex items-center justify-between sm:justify-start gap-2.5 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-full border shrink-0 ${selectedPreview.badgeColor}`}>
                    {selectedPreview.badge}
                  </span>
                  <div className="truncate">
                    <h3 className="text-xs sm:text-base font-bold text-white leading-tight truncate">
                      {selectedPreview.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 hidden md:block truncate">
                      {selectedPreview.category} • {selectedPreview.description}
                    </p>
                  </div>
                </div>

                {/* Mobile-only close button on Row 1 */}
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="sm:hidden p-1.5 bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Tutup Pratinjau"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Row 2: Zoom Controls (with FIT button), Prev/Next, and Use Template */}
              <div className="flex items-center justify-between sm:justify-end gap-2 border-t sm:border-t-0 border-slate-800/80 pt-2 sm:pt-0">
                {/* Zoom Controls with FIT button */}
                <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 sm:p-1 border border-slate-700 text-xs shrink-0">
                  <button
                    type="button"
                    onClick={() => setModalZoom((z) => Math.max(0.3, Number((z - 0.1).toFixed(2))))}
                    className="p-1 sm:p-1.5 hover:bg-slate-700 text-slate-300 rounded cursor-pointer transition-colors"
                    title="Perkecil (-10%)"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleFitZoom}
                    className="px-2 py-0.5 sm:py-1 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 rounded text-[10px] sm:text-xs font-bold cursor-pointer transition-colors"
                    title="Sesuaikan Ukuran Layar (FIT)"
                  >
                    FIT
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalZoom((z) => Math.min(1.4, Number((z + 0.1).toFixed(2))))}
                    className="p-1 sm:p-1.5 hover:bg-slate-700 text-slate-300 rounded cursor-pointer transition-colors"
                    title="Perbesar (+10%)"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1.5 font-mono text-[10px] sm:text-[11px] text-slate-400 min-w-[36px] text-center hidden min-[420px]:inline-block">
                    {Math.round(modalZoom * 100)}%
                  </span>
                </div>

                {/* Prev / Next Template Navigation */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={handlePrevPreview}
                    className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer transition-colors"
                    title="Template Sebelumnya (←)"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextPreview}
                    className="p-1.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 cursor-pointer transition-colors"
                    title="Template Selanjutnya (→)"
                  >
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Action Button: Use This Template */}
                <Link
                  href={`/builder?template=${selectedPreview.id}`}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                >
                  <span>Gunakan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {/* Desktop Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPreview(null)}
                  className="hidden sm:flex p-2 bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 rounded-lg border border-slate-700 transition-colors cursor-pointer shrink-0"
                  title="Tutup Pratinjau (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Modal Preview Body with Dimension Sizer (Guarantees Perfect Centering & No Left-side Clipping) */}
          <div className="flex-1 overflow-auto my-3 flex items-start justify-center p-2 sm:p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
            <div
              style={{
                width: `${794 * modalZoom}px`,
                height: `${1123 * modalZoom}px`,
              }}
              className="relative shrink-0 transition-all duration-150 ease-out my-auto shadow-2xl"
            >
              <div
                style={{
                  width: '794px',
                  minHeight: '1123px',
                  transform: `scale(${modalZoom})`,
                  transformOrigin: 'top left',
                }}
                className="absolute top-0 left-0 bg-white shadow-2xl rounded-xs overflow-hidden"
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
              <span>Lihat 20 Template</span>
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

                  {/* Clean Centered Miniature Preview Box with Authentic A4 Ratio (210/297) */}
                  <div
                    onClick={() => setSelectedPreview(tpl)}
                    className="relative w-full aspect-[210/297] rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner group/box mb-4 cursor-pointer"
                  >
                    {/* Centered Scaled Sheet with Authentic Proportion */}
                    <div className="absolute inset-0 flex items-start justify-center overflow-hidden bg-slate-950 p-1.5 sm:p-2">
                      <div
                        style={{
                          width: '794px',
                          minHeight: '1123px',
                          transform: 'scale(0.44)',
                          transformOrigin: 'top center',
                        }}
                        className="bg-white shadow-2xl shrink-0 select-none pointer-events-none rounded-xs"
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
