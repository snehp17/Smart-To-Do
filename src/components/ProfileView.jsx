import { Settings, User, Moon, Sun, Sparkles, FileText, Download, RotateCcw, Trash2 } from 'lucide-react'
import { DogSVG, CatSVG } from './PetSVG'
import { exportTasksToPDF } from '../utils/pdfExport'

export default function ProfileView({
  theme,
  onToggleTheme,
  pet,
  onSwitchPet,
  onOpenPetSelector,
  tasks = [],
  stats = {},
  onResetTasks,
  onSweepTasks,
  isDark,
}) {
  const PetComponent = pet === 'cat' ? CatSVG : DogSVG

  const handleExportPDF = () => {
    exportTasksToPDF(tasks, stats, pet)
  }

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 animate-fade-in">
      {/* 1. Header */}
      <div className="pb-2 border-b border-[var(--border-card)]">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-main)] flex items-center gap-2">
          <span>Profile & Preferences</span>
          <span>⚙️</span>
        </h2>
        <p className="text-xs sm:text-sm font-medium text-[var(--text-sub)]">
          Manage your companion, appearance themes, and export productivity PDF reports.
        </p>
      </div>

      {/* 2. User & Companion Showcase Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-[var(--brand-tag-bg)] border border-[var(--border-card)] flex items-center justify-center flex-shrink-0">
            <PetComponent size={44} isCelebrating={true} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-[var(--text-main)]">
                Productive Pioneer
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--brand-primary)] text-white font-mono">
                Level 4
              </span>
            </div>
            <p className="text-xs font-medium text-[var(--text-sub)] mt-0.5">
              Active Companion: <span className="capitalize font-bold text-[var(--brand-primary)]">{pet}</span> 🐾
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onSwitchPet(pet === 'dog' ? 'cat' : 'dog')}
            className="px-3.5 py-1.5 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-bold text-[var(--text-main)] hover:border-[var(--brand-primary)] cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            Switch to {pet === 'dog' ? 'Cat 🐱' : 'Dog 🐶'}
          </button>
          <button
            type="button"
            onClick={onOpenPetSelector}
            className="px-4 py-1.5 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            Customize
          </button>
        </div>
      </div>

      {/* 3. Settings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Appearance & Themes */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Moon className="w-4 h-4 text-[var(--brand-primary)]" />
              <h4 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                Appearance
              </h4>
            </div>
            <p className="text-xs font-medium text-[var(--text-sub)] mb-4">
              Switch between warm sunlight cream theme and dark night mode.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => theme === 'dark' && onToggleTheme()}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                theme === 'light'
                  ? 'border-[var(--brand-primary)] bg-[#FAF6F0] text-[#2B241E] shadow-xs font-extrabold ring-1 ring-[var(--brand-primary)]/30'
                  : 'border-[var(--border-card)] bg-[var(--bg-page)] text-[var(--text-sub)]'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light Warm</span>
            </button>
            <button
              type="button"
              onClick={() => theme === 'light' && onToggleTheme()}
              className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                theme === 'dark'
                  ? 'border-amber-500 bg-neutral-900 text-white shadow-xs font-extrabold ring-1 ring-amber-500/30'
                  : 'border-[var(--border-card)] bg-[var(--bg-page)] text-[var(--text-sub)]'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-amber-400" />
              <span>Dark Night</span>
            </button>
          </div>
        </div>

        {/* Data & Export PDF */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--border-card)] bg-[var(--bg-card)] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <FileText className="w-4 h-4 text-[var(--brand-primary)]" />
              <h4 className="text-sm sm:text-base font-extrabold text-[var(--text-main)]">
                Export & Reports
              </h4>
            </div>
            <p className="text-xs font-medium text-[var(--text-sub)] mb-4">
              Generate and download a clean PDF schedule & task report.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportPDF}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              type="button"
              onClick={onSweepTasks}
              className="py-2.5 px-3 rounded-xl border border-[var(--border-card)] bg-[var(--bg-page)] text-xs font-bold text-[var(--text-main)] hover:text-red-500 cursor-pointer flex items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-95"
              title="Remove completed items"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Sweep</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
