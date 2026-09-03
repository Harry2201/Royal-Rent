import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalBackdrop, modalPanel } from '../../animations/variants';
import { getDressAvailability } from '../../data/listings';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useBookings } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function BookingRequestModal({ dress, open, onClose }) {
  const { createBooking } = useBookings();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ startDate: '', endDate: '', message: '' });
  const [loading, setLoading] = useState(false);

  if (!dress) return null;

  const availability = getDressAvailability(dress);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please sign in to book');
      return;
    }
    if (!form.startDate || !form.endDate) {
      toast.error('Select rental dates');
      return;
    }
    setLoading(true);
    try {
      await createBooking({
        dressId: dress.id,
        dressTitle: dress.title,
        dressImage: dress.images?.[0],
        ownerId: dress.ownerId,
        ownerName: dress.ownerName,
        startDate: form.startDate,
        endDate: form.endDate,
        totalPrice: dress.rentalPrice,
        message: form.message,
      });
      toast.success('Request sent');

      setForm({
        startDate: '',
        endDate: '',
        message: '',
      });
      
      onClose();
    } catch (err) {
      toast.error(err.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          {...modalBackdrop}
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/30 p-4"
          onClick={onClose}
        >
          <motion.div
            {...modalPanel}
            className="card-surface w-full max-w-md p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="heading-section text-xl">Request booking</h3>
            <p className="text-body mt-1 text-sm">{dress.title}</p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <Input
                label="Start date"
                name="startDate"
                type="date"
                value={form.startDate}
                min={availability.from || undefined}
                max={availability.to || undefined}
                onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
              />
              <Input
                label="End date"
                name="endDate"
                type="date"
                value={form.endDate}
                min={form.startDate || availability.from || undefined}
                max={availability.to || undefined}
                onChange={(e) => setForm((p) => ({ ...p, endDate: e.target.value }))}
              />
              <div>
                <label className="text-label mb-2 block">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Event details, size…"
                />
              </div>
              <Button type="submit" fullWidth loading={loading}>
                Send request
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
