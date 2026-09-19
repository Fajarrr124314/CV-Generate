'use client';

import React, { useState } from 'react';
import { Skill } from '@/types/resume';
import { Plus, X, Sparkles, Award } from 'lucide-react';

interface Props {
  skills: Skill[];
  onChange: (updated: Skill[]) => void;
}

const COMMON_SUGGESTIONS = [
  'TypeScript', 'React.js', 'Next.js', 'Node.js', 'Python', 'Go',
  'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS', 'RESTful API', 'Git',
  'GraphQL', 'Figma', 'Agile / Scrum', 'CI/CD Pipeline', 'MongoDB'
];

export const SkillsForm: React.FC<Props> = ({ skills, onChange }) => {
  const [nameInput, setNameInput] = useState('');
  const [levelInput, setLevelInput] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Advanced');

  const handleAddSkill = (skillName?: string) => {
    const targetName = (skillName || nameInput).trim();
    if (!targetName) return;

    // Check duplicate
    if (skills.some((s) => s.name.toLowerCase() === targetName.toLowerCase())) {
      setNameInput('');
      return;
    }

    const newSkill: Skill = {
      id: `sk-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: targetName,
      level: levelInput,
    };

    onChange([...skills, newSkill]);
    setNameInput('');
  };

  const handleRemoveSkill = (id: string) => {
    onChange(skills.filter((s) => s.id !== id));
  };

  const handleLevelChange = (id: string, newLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert') => {
    onChange(
      skills.map((s) => {
        if (s.id === id) {
          return { ...s, level: newLevel };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900">Keahlian & Kemampuan Teknis</h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Tambahkan keahlian inti, teknologi, dan tools yang paling relevan dengan pekerjaan impian Anda.
        </p>
      </div>

      {/* Add New Skill Bar */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <label className="block text-xs font-semibold text-slate-700">
          Tambah Keahlian Baru
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="Contoh: React.js, Docker, Strategic Planning..."
            className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={levelInput}
            onChange={(e) => setLevelInput(e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert')}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          <button
            type="button"
            onClick={() => handleAddSkill()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-2">
          <p className="text-[11px] font-medium text-slate-500 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Saran Populer (Klik untuk menambahkan):
          </p>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_SUGGESTIONS.filter(
              (item) => !skills.some((s) => s.name.toLowerCase() === item.toLowerCase())
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleAddSkill(item)}
                className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-600 rounded-md transition-colors cursor-pointer"
              >
                + {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Current Skills List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700">
            Daftar Keahlian ({skills.length})
          </label>
        </div>

        {skills.length === 0 ? (
          <div className="p-6 border border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-xs">
            Belum ada keahlian yang terdaftar.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-lg shadow-xs"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <Award className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 truncate">
                    {skill.name}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <select
                    value={skill.level}
                    onChange={(e) =>
                      handleLevelChange(
                        skill.id,
                        e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
                      )
                    }
                    className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 rounded px-1.5 py-0.5"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="text-slate-400 hover:text-rose-500 p-0.5 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
