import { useState } from 'react';
import { CITIES, CATEGORIES, OCCASIONS, GENDERS } from '../../utils/constants';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── DressFilters — inline filter bar, no heavy card surface ─── */
export default function DressFilters({ filters, onChange, onReset }) {
  const [open, setOpen] = useState(false);

  const activeCount = [
    filters.city, filters.category, filters.occasion,
    filters.gender, filters.minPrice, filters.maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="border-b border-royal-border pb-6">

      {/* ── Top row: active pills + toggle ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-6">

        {/* Active filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          {activeCount === 0 ? (
            <span className="text-xs text-royal-muted/60">No filters active</span>
          ) : (
            <>
              {filters.city && <Pill label={filters.city} onRemove={() => onChange({ city: '' })} />}
              {filters.category && <Pill label={filters.category} onRemove={() => onChange({ category: '' })} />}
              {filters.occasion && <Pill label={filters.occasion} onRemove={() => onChange({ occasion: '' })} />}
              {filters.gender && <Pill label={filters.gender} onRemove={() => onChange({ gender: '' })} />}
              {filters.minPrice && <Pill label={`Min ₹${filters.minPrice}`} onRemove={() => onChange({ minPrice: '' })} />}
              {filters.maxPrice && <Pill label={`Max ₹${filters.maxPrice}`} onRemove={() => onChange({ maxPrice: '' })} />}
            </>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => { onReset(); setOpen(false); }}
              className="text-xs font-medium text-royal-muted underline-offset-4 hover:text-royal-cream hover:underline"
            >
              Clear all
            </button>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex items-center gap-2 border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
              open ? 'border-royal-cream bg-royal-cream text-white' : 'border-royal-border text-royal-muted hover:border-royal-cream hover:text-royal-cream'
            }`}
          >
            {open ? 'Close' : 'Filter'}
            {activeCount > 0 && !open && (
              <span className="flex h-4 w-4 items-center justify-center bg-royal-cream text-[9px] text-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Expandable filter panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-x-8 gap-y-6 border-t border-royal-border pt-6 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <FilterSelect
                label="City"
                value={filters.city}
                onChange={(v) => onChange({ city: v })}
                options={['', ...CITIES]}
              />
              <FilterSelect
                label="Category"
                value={filters.category}
                onChange={(v) => onChange({ category: v })}
                options={['', ...CATEGORIES]}
              />
              <FilterSelect
                label="Occasion"
                value={filters.occasion}
                onChange={(v) => onChange({ occasion: v })}
                options={['', ...OCCASIONS]}
              />
              <FilterSelect
                label="For"
                value={filters.gender}
                onChange={(v) => onChange({ gender: v })}
                options={[['', 'All'], [GENDERS.WOMEN, 'Women'], [GENDERS.MEN, 'Men']]}
                pairOptions
              />
              <div>
                <label className="text-label mb-2 block">Min (₹)</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => onChange({ minPrice: e.target.value })}
                  placeholder="1,000"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-label mb-2 block">Max (₹)</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => onChange({ maxPrice: e.target.value })}
                  placeholder="10,000"
                  className="input-field"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-royal-border bg-royal-bg px-3 py-1 text-[11px] font-medium text-royal-cream">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="text-royal-muted transition-colors hover:text-royal-cream"
        aria-label={`Remove ${label}`}
      >
        ×
      </button>
    </span>
  );
}

function FilterSelect({ label, value, onChange, options, pairOptions = false }) {
  return (
    <div>
      <label className="text-label mb-2 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      >
        {pairOptions
          ? options.map(([val, text]) => (
              <option key={val || 'all'} value={val}>{text}</option>
            ))
          : options.map((opt) => (
              <option key={opt || 'all'} value={opt}>{opt || 'All'}</option>
            ))}
      </select>
    </div>
  );
}