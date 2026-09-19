'use client';

import React from 'react';
import { Experience } from '@/types/resume';
import { Plus, Trash2, Building, Briefcase, Calendar } from 'lucide-react';

interface Props {
  experiences: Experience[];
  onChange: (updated: Experience[]) => void;
}

export const ExperienceForm: React.FC<Props> = ({ experiences, onChange }) => {
  const handleAdd = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
    };
    onChange([...experiences, newExp]);
  };

  const handleUpdate = (id: string, field: keyof Experience, value: unknown) => {
    onChange(
      experiences.map((exp) => {
        if (exp.id === id) {
          return { ...exp, [field]: value };
        }
        return exp;
      })
    );
  };

  const handleRemove = (id: string) => {
    onChange(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Pengalaman Kerja</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tampilkan riwayat karir dan pencapaian kuantitatif Anda secara kronologis terbalik.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Tambah Pengalaman
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-600 font-medium">Belum ada pengalaman kerja yang ditambahkan.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-3 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg shadow-sm cursor-pointer"
          >
            + Tambah Riwayat Pertama
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  #{index + 1} {exp.position || 'Posisi Baru'}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(exp.id)}
                  className="text-rose-500 hover:text-rose-700 p-1 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                  title="Hapus Pengalaman"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Posisi / Jabatan
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => handleUpdate(exp.id, 'position', e.target.value)}
                      placeholder="Senior Full Stack Engineer"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Perusahaan
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                      placeholder="PT Tech Indonesia"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal Mulai
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                      placeholder="Contoh: Jan 2022 atau 2022-01"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Tanggal Berakhir
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.isCurrent}
                        onChange={(e) => {
                          handleUpdate(exp.id, 'isCurrent', e.target.checked);
                          if (e.target.checked) {
                            handleUpdate(exp.id, 'endDate', 'Sekarang');
                          } else {
                            handleUpdate(exp.id, 'endDate', '');
                          }
                        }}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      Masih Bekerja
                    </label>
                  </div>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      disabled={exp.isCurrent}
                      value={exp.isCurrent ? 'Sekarang' : exp.endDate}
                      onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                      placeholder="Contoh: Des 2024 atau Sekarang"
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-100 disabled:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Deskripsi Tanggung Jawab & Pencapaian (Gunakan Bullet Points)
                </label>
                <textarea
                  rows={3}
                  value={exp.description}
                  onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)}
                  placeholder="• Memimpin tim engineering dalam merilis fitur baru&#10;• Meningkatkan throughput sistem sebesar 30%"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed font-sans"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
