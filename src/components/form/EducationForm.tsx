'use client';

import React from 'react';
import { Education } from '@/types/resume';
import { Plus, Trash2, GraduationCap, Calendar } from 'lucide-react';

interface Props {
  educations: Education[];
  onChange: (updated: Education[]) => void;
}

export const EducationForm: React.FC<Props> = ({ educations, onChange }) => {
  const handleAdd = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
    };
    onChange([...educations, newEdu]);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    onChange(
      educations.map((edu) => {
        if (edu.id === id) {
          return { ...edu, [field]: value };
        }
        return edu;
      })
    );
  };

  const handleRemove = (id: string) => {
    onChange(educations.filter((edu) => edu.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Riwayat Pendidikan</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cantumkan gelar, universitas, atau institusi pendidikan formal terakhir Anda.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Pendidikan
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">Belum ada data pendidikan.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-3 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
          >
            + Tambah Pendidikan Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div
              key={edu.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  #{index + 1} {edu.institution || 'Institusi Baru'}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(edu.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                  title="Hapus Pendidikan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Institusi / Universitas
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                      placeholder="Institut Teknologi Bandung (ITB)"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gelar / Jenjang
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                    placeholder="Sarjana Komputer (S.Kom) / S1"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jurusan / Bidang Studi
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => handleUpdate(edu.id, 'fieldOfStudy', e.target.value)}
                    placeholder="Teknik Informatika"
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tahun Masuk / Mulai
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={edu.startDate}
                      onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                      placeholder="2014"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tahun Kelulusan / Berakhir
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                      placeholder="2018"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
