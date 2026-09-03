import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function ProfileSettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser(form);
      setLoading(false);
      toast.success('Profile updated');
    }, 600);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out');
    navigate('/');
  };

  return (
    <div className="max-w-md">
      <h1 className="heading-section">Settings</h1>
      <p className="text-body mt-2 text-sm">Manage your account.</p>
      <p className="mt-2 text-xs text-royal-muted">
        Saves to this browser session only. Mock mode does not persist profile
        changes on a server.
      </p>

      <form onSubmit={handleSave} className="mt-10 space-y-4">
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <Input
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
        />
        <Input
          label="City"
          name="city"
          value={form.city}
          onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
        />
        <p className="text-xs text-royal-muted">
          Role: <span className="capitalize text-royal-cream">{user?.role}</span>
        </p>
        <Button type="submit" loading={loading}>
          Save
        </Button>
      </form>

      <Button variant="ghost" className="mt-8" onClick={handleLogout}>
        Sign out
      </Button>
    </div>
  );
}
