'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ResumeData,
  TemplateCategory,
  PersonalDetails,
  Experience,
  Education,
  Skill,
  CoverLetterData
} from '@/types/resume';
import {
  loadResumeData,
  saveResumeData,
  clearResumeData,
  INITIAL_RESUME_DATA
} from '@/utils/storage';
import { PersonalInfo } from '@/components/form/PersonalInfo';
import { ExperienceForm } from '@/components/form/ExperienceForm';
import { EducationForm } from '@/components/form/EducationForm';
import { SkillsForm } from '@/components/form/SkillsForm';
import { CoverLetterForm } from '@/components/form/CoverLetterForm';
import { ResumePreviewRenderer } from '@/components/preview/ResumePreviewRenderer';
import { ExportBar } from '@/components/export/ExportBar';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layout,
  ArrowLeft
} from 'lucide-react';

const TEMPLATES = [
  { id: 'ats-classic', name: 'ATS Classic', category: 'ATS' as TemplateCategory, desc: '1 Kolom Bersih, Standar Korporat & BUMN' },
  { id: 'ats-modern', name: 'ATS Modern', category: 'ATS' as TemplateCategory, desc: 'Sans-Serif Elegan, Hierarki Tegas' },
  { id: 'creative-sidebar', name: 'Modern Sidebar', category: 'CREATIVE' as TemplateCategory, desc: 'Dual-Column Navy, Avatar & Progress Bar' },
  { id: 'creative-editorial', name: 'Editorial Luxe', category: 'CREATIVE' as TemplateCategory, desc: 'Gaya Majalah Elegan & Asimetris Eksekutif' },
  { id: 'creative-dark', name: 'Cyber Dark Tech', category: 'CREATIVE' as TemplateCategory, desc: 'Tema Dark Mode Futuristik untuk Engineer & Desainer' },
  { id: 'creative-timeline', name: 'Dynamic Timeline', category: 'CREATIVE' as TemplateCategory, desc: 'Jejak Karir Kronologis Visual & Gradient Banner' },
  { id: 'creative-nordic', name: 'Nordic Minimalist', category: 'CREATIVE' as TemplateCategory, desc: 'Gaya Scandinavian Bersih, Aksen Sage & Sand' },
  { id: 'creative-grid', name: 'Minimalist Grid', category: 'CREATIVE' as TemplateCategory, desc: 'Grid Kontemporer, Aksen Teal & Emerald' },
  { id: 'cover-letter', name: 'Standard Letter', category: 'COVER_LETTER' as TemplateCategory, desc: 'Format Surat Resmi HRD Indonesia' },
];

function BuilderContent() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template');

  const [data, setData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'coverLetter'>('personal');
  const [zoom, setZoom] = useState(0.9);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Baru saja');
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize from LocalStorage and query param safely on client mount
  useEffect(() => {
    const timer = setTimeout(() => {
      let loaded = loadResumeData();
      if (templateParam) {
        const found = TEMPLATES.find((t) => t.id === templateParam);
        if (found) {
          loaded = {
            ...loaded,
            templateId: found.id,
            category: found.category,
          };
          if (found.category === 'COVER_LETTER') {
            setActiveTab('coverLetter');
          }
        }
      }
      setData(loaded);
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [templateParam]);

  // Auto-save on data changes
  const updateData = (updated: ResumeData) => {
    setData(updated);
    saveResumeData(updated);
    const now = new Date();
    setLastSavedTime(
      `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    );
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectTemplate = (templateId: string) => {
    const selected = TEMPLATES.find((t) => t.id === templateId);
    if (!selected) return;

    const updated: ResumeData = {
      ...data,
      templateId,
      category: selected.category,
    };

    if (selected.category === 'COVER_LETTER') {
      setActiveTab('coverLetter');
    }

    updateData(updated);
  };

  const handleSelectCategory = (cat: TemplateCategory) => {
    const firstTemplateInCat = TEMPLATES.find((t) => t.category === cat);
    if (firstTemplateInCat) {
      handleSelectTemplate(firstTemplateInCat.id);
    }
  };

  const handleLoadSample = () => {
    if (confirm('Muat data contoh? Data yang belum tersimpan akan digantikan.')) {
      updateData(INITIAL_RESUME_DATA);
      showToast('Data contoh profesional berhasil dimuat!');
    }
  };

  const handleReset = () => {
    if (confirm('Kosongkan semua form? Tindakan ini tidak dapat dibatalkan.')) {
      const cleared = clearResumeData();
      setData(cleared);
      showToast('Form telah dikosongkan.');
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="animate-pulse flex items-center gap-3">
          <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping" />
          <span className="text-sm font-medium">Memuat SpaceLive Studio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Navbar Header (Hidden in Print) */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-2.5 shadow-xs">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-xs font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Beranda</span>
            </Link>

            <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                SL
              </div>
              <div>
                <h1 className="text-xs font-bold text-slate-900 leading-tight">SpaceLive Studio</h1>
                <p className="text-[10px] text-slate-500">CV & Cover Letter Builder</p>
              </div>
            </div>

            {/* Auto-save Status */}
            <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tersimpan: {lastSavedTime}</span>
            </div>
          </div>

          {/* Center: Template & Category Selectors */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {/* Category Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => handleSelectCategory('ATS')}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  data.category === 'ATS'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ATS Friendly
              </button>
              <button
                type="button"
                onClick={() => handleSelectCategory('CREATIVE')}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  data.category === 'CREATIVE'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Creative
              </button>
              <button
                type="button"
                onClick={() => handleSelectCategory('COVER_LETTER')}
                className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                  data.category === 'COVER_LETTER'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cover Letter
              </button>
            </div>

            {/* Template Selector Dropdown */}
            <div className="relative">
              <select
                value={data.templateId}
                onChange={(e) => handleSelectTemplate(e.target.value)}
                className="bg-white border border-slate-300 text-slate-800 text-xs font-medium rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
              >
                {TEMPLATES.filter((t) => t.category === data.category).map((tmpl) => (
                  <option key={tmpl.id} value={tmpl.id}>
                    {tmpl.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right Actions: Sample, Reset, Export */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Muat Data Contoh Lengkap"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden xl:inline">Contoh Data</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 hover:text-rose-600 text-xs font-medium rounded-lg shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Kosongkan Semua Form"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">Reset</span>
            </button>

            {/* Export Bar */}
            <ExportBar
              elementId="resume-preview"
              candidateName={data.personal.fullName}
              documentType={data.category === 'COVER_LETTER' ? 'Cover_Letter' : 'CV'}
            />
          </div>
        </div>
      </header>

      {/* Main Studio Split-Screen Body */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1750px] w-full mx-auto overflow-hidden">
        {/* LEFT COLUMN: Form Wizard Panel */}
        <section className="no-print w-full lg:w-[46%] xl:w-[42%] bg-white border-r border-slate-200 flex flex-col h-auto lg:h-[calc(100vh-60px)] shadow-xs">
          {/* Form Tabs Header */}
          <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-2.5 flex items-center gap-1.5 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'personal'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Pribadi
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Pengalaman ({data.experiences.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'education'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Pendidikan ({data.educations.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Keahlian ({data.skills.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('coverLetter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'coverLetter'
                  ? 'bg-white text-indigo-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Cover Letter
            </button>
          </div>

          {/* Form Content Area with Smooth Scroll */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'personal' && (
              <PersonalInfo
                data={data.personal}
                onChange={(updated: PersonalDetails) => updateData({ ...data, personal: updated })}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceForm
                experiences={data.experiences}
                onChange={(updated: Experience[]) => updateData({ ...data, experiences: updated })}
              />
            )}

            {activeTab === 'education' && (
              <EducationForm
                educations={data.educations}
                onChange={(updated: Education[]) => updateData({ ...data, educations: updated })}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsForm
                skills={data.skills}
                onChange={(updated: Skill[]) => updateData({ ...data, skills: updated })}
              />
            )}

            {activeTab === 'coverLetter' && (
              <CoverLetterForm
                data={
                  data.coverLetter || {
                    recipientName: '',
                    recipientTitle: '',
                    companyName: '',
                    companyAddress: '',
                    date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' }),
                    letterBody: '',
                  }
                }
                candidateRole={data.personal.jobTitle}
                candidateName={data.personal.fullName}
                onChange={(updated: CoverLetterData) => updateData({ ...data, coverLetter: updated })}
              />
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: Live Preview Canvas */}
        <section className="flex-1 bg-slate-200/80 flex flex-col h-auto lg:h-[calc(100vh-60px)] overflow-hidden">
          {/* Canvas Controls Toolbar (Zoom, Fit) */}
          <div className="no-print bg-white/80 backdrop-blur-xs border-b border-slate-200 px-6 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <Layout className="w-4 h-4 text-indigo-600" />
              <span>Live A4 Preview ({TEMPLATES.find((t) => t.id === data.templateId)?.name})</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.4, Number((z - 0.1).toFixed(2))))}
                className="p-1.5 bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs font-medium text-slate-700 min-w-[45px] text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.5, Number((z + 0.1).toFixed(2))))}
                className="p-1.5 bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setZoom(0.85)}
                className="px-2 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                title="Reset Zoom"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">Fit</span>
              </button>
            </div>
          </div>

          {/* Scalable Preview Viewport */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
            <div
              className="print-page-wrapper transition-transform duration-100 ease-out origin-top shadow-2xl rounded-sm"
              style={{
                transform: `scale(${zoom})`,
                width: '210mm',
              }}
            >
              {/* Actual printable document container */}
              <div
                id="resume-preview"
                className="bg-white min-h-[297mm] w-[210mm] shadow-lg rounded-xs overflow-hidden"
              >
                <ResumePreviewRenderer data={data} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
          <div className="animate-pulse flex items-center gap-3">
            <div className="w-4 h-4 bg-indigo-500 rounded-full animate-ping" />
            <span className="text-sm font-medium">Memuat SpaceLive Studio...</span>
          </div>
        </div>
      }
    >
      <BuilderContent />
    </Suspense>
  );
}
