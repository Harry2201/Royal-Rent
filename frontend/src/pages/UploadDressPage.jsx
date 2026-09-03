import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useDresses } from '../context/DressContext';
import { CITIES, CATEGORIES, OCCASIONS } from '../utils/constants';

const STEPS = ['Details', 'Pricing', 'Images', 'Preview'];

const emptyForm = {
  title: '',
  brand: '',
  designer: '',
  description: '',
  category: '',
  occasion: '',
  gender: 'women',
  city: '',
  sizes: 'S, M, L',
  rentalPrice: '',
  originalPrice: '',
  availabilityFrom: '',
  availabilityTo: '',
  images: [],
};

export default function UploadDressPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { publishDress } = useDresses();
  const navigate = useNavigate();

  const update = (patch) => setForm((p) => ({ ...p, ...patch }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.title.trim()) e.title = 'Required';
      if (!form.brand.trim()) e.brand = 'Required';
      if (!form.city) e.city = 'Required';
      if (!form.category) e.category = 'Required';
    }
    if (step === 1) {
      if (!form.rentalPrice) e.rentalPrice = 'Required';
      if (!form.availabilityFrom) e.availabilityFrom = 'Required';
      if (!form.availabilityTo) e.availabilityTo = 'Required';
    }
    if (step === 2 && form.images.length === 0) e.images = 'Add at least one image';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFiles = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => update({ images: [...form.images, reader.result] });
      reader.readAsDataURL(file);
    });
  };

  const handlePublish = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      await publishDress({
        title: form.title,
        brand: form.brand,
        designer: form.designer || form.brand,
        description: form.description,
        category: form.category,
        occasion: form.occasion || 'Wedding',
        gender: form.gender,
        city: form.city,
        sizes: form.sizes.split(',').map((s) => s.trim()),
        rentalPrice: Number(form.rentalPrice),
        originalPrice: Number(form.originalPrice) || Number(form.rentalPrice) * 20,
        availability: { from: form.availabilityFrom, to: form.availabilityTo, status: 'available' },
        images: form.images,
        tags: [form.category, form.occasion, form.city].filter(Boolean).map((t) => t.toLowerCase()),
      });
      toast.success('Published');
      navigate('/my-listings');
    } catch (err) {
      toast.error(err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else handlePublish();
  };

  return (
    <div className="max-w-xl">
      <h1 className="heading-section">Upload dress</h1>
      <p className="text-body mt-2 text-sm">List your piece on the marketplace.</p>

      <div className="mt-8 flex gap-4 border-b border-royal-border pb-4">
        {STEPS.map((label, i) => (
          <span
            key={label}
            className={`text-xs font-medium ${
              i === step ? 'text-royal-cream' : 'text-royal-muted'
            }`}
          >
            {i + 1}. {label}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-8 space-y-4"
        >
          {step === 0 && (
            <>
              <Input label="Title" name="title" value={form.title} onChange={(e) => update({ title: e.target.value })} error={errors.title} />
              <Input label="Brand" name="brand" value={form.brand} onChange={(e) => update({ brand: e.target.value })} error={errors.brand} />
              <Input label="Designer" name="designer" value={form.designer} onChange={(e) => update({ designer: e.target.value })} />
              <div>
                <label className="text-label mb-2 block">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => update({ description: e.target.value })}
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
              <SelectField label="City" value={form.city} options={CITIES} onChange={(v) => update({ city: v })} error={errors.city} />
              <SelectField label="Category" value={form.category} options={CATEGORIES} onChange={(v) => update({ category: v })} error={errors.category} />
              <SelectField label="Occasion" value={form.occasion} options={OCCASIONS} onChange={(v) => update({ occasion: v })} />
              <SelectField label="Gender" value={form.gender} options={['women', 'men']} onChange={(v) => update({ gender: v })} />
            </>
          )}

          {step === 1 && (
            <>
              <Input label="Rental price (₹)" name="rentalPrice" type="number" value={form.rentalPrice} onChange={(e) => update({ rentalPrice: e.target.value })} error={errors.rentalPrice} />
              <Input label="Retail price (₹)" name="originalPrice" type="number" value={form.originalPrice} onChange={(e) => update({ originalPrice: e.target.value })} />
              <Input label="Sizes" name="sizes" value={form.sizes} onChange={(e) => update({ sizes: e.target.value })} />
              <Input label="From" name="availabilityFrom" type="date" value={form.availabilityFrom} onChange={(e) => update({ availabilityFrom: e.target.value })} error={errors.availabilityFrom} />
              <Input label="Until" name="availabilityTo" type="date" value={form.availabilityTo} onChange={(e) => update({ availabilityTo: e.target.value })} error={errors.availabilityTo} />
            </>
          )}

          {step === 2 && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={`rounded-md border border-dashed p-12 text-center transition-colors ${
                dragOver ? 'border-royal-cream bg-royal-bg' : 'border-royal-border'
              }`}
            >
              <p className="text-sm text-royal-muted">Drag images here</p>
              <label className="mt-4 inline-block cursor-pointer text-sm font-medium hover:underline">
                Browse
                <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
              </label>
              {errors.images && <p className="mt-2 text-xs text-red-600">{errors.images}</p>}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {form.images.map((src, i) => (
                  <img key={i} src={src} alt="" className="h-20 w-16 rounded-md object-cover" />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="card-surface p-6">
              {form.images[0] && (
                <img src={form.images[0]} alt="" className="mb-6 aspect-video w-full rounded-md object-cover" />
              )}
              <h3 className="font-display text-xl font-semibold">{form.title || 'Untitled'}</h3>
              <p className="text-label mt-2">{form.brand}</p>
              <p className="text-body mt-4 text-sm">
                {form.city} · ₹{form.rentalPrice}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex gap-3">
        {step > 0 && (
          <Button variant="ghost" type="button" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        )}
        <Button type="button" onClick={next} loading={loading}>
          {step === STEPS.length - 1 ? 'Publish' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}

function SelectField({ label, value, options, onChange, error }) {
  return (
    <div>
      <label className="text-label mb-2 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${error ? 'border-red-500/50' : ''}`}
      >
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
