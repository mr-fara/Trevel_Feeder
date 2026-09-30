import {useEffect, useState, type FormEvent} from 'react';
import {useNavigate, useOutletContext} from 'react-router-dom';
import {ApiError, apiGet, apiPatch, apiPut} from '../../lib/api';

interface AdminProfile {displayName: string; email: string}
interface AdminSettingsContext {updateProfile: (profile: AdminProfile) => void}

export function AdminSettings() {
  const navigate = useNavigate();
  const {updateProfile} = useOutletContext<AdminSettingsContext>();
  const [profile, setProfile] = useState<AdminProfile>({displayName: '', email: ''});
  const [profilePassword, setProfilePassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    apiGet<AdminProfile>('/api/admin/auth/session').then(setProfile).catch((loadError: unknown) => {
      setError(loadError instanceof Error ? loadError.message : 'Could not load admin details.');
    }).finally(() => setLoading(false));
  }, []);

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingProfile(true);
    setError('');
    setSuccess('');
    try {
      const updated = await apiPut<AdminProfile>('/api/admin/account/profile', {...profile, currentPassword: profilePassword});
      setProfile(updated);
      updateProfile(updated);
      setProfilePassword('');
      setSuccess('Admin details updated.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not update admin details.');
    } finally {
      setSavingProfile(false);
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirmPassword) {
      setError('The new passwords do not match.');
      return;
    }

    setSavingPassword(true);
    try {
      await apiPatch<{updated: boolean}>('/api/admin/account/password', {currentPassword, newPassword});
      navigate('/admin/login', {replace: true, state: {passwordChanged: true}});
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not change password.');
    } finally {
      setSavingPassword(false);
    }
  }

  if (loading) return <p className="text-sm text-slate-500">Loading account settings...</p>;

  return <>
    <div className="mb-7"><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#B64E39]">Administrator</p><h1 className="mt-1.5 text-2xl font-semibold text-[#1D2C27] sm:text-[28px]">Account settings</h1><p className="mt-1.5 text-xs text-slate-500">Manage your admin details and sign-in password.</p></div>
    {(error || success) && <div role={error ? 'alert' : 'status'} className={`mb-5 rounded-lg border px-4 py-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>{error || success}</div>}
    <div className="grid max-w-5xl gap-5 xl:grid-cols-2">
      <section className="rounded-xl border border-[#E1E7E1] bg-white p-5 sm:p-6">
        <div className="mb-5 border-b border-[#EDF0EC] pb-4"><h2 className="text-sm font-bold">Admin details</h2><p className="mt-1 text-xs text-slate-500">Your name and email used for this admin account.</p></div>
        <form onSubmit={(event) => void saveProfile(event)} className="space-y-4">
          <label className="block text-xs font-semibold text-[#40544D]">Display name<input required minLength={2} maxLength={80} autoComplete="name" value={profile.displayName} onChange={(event) => setProfile({...profile, displayName: event.target.value})} className="mt-1.5 h-10 w-full rounded-lg border border-[#DCE5DC] px-3 text-sm font-normal outline-none focus:border-[#78A49A]" /></label>
          <label className="block text-xs font-semibold text-[#40544D]">Email address<input required type="email" maxLength={254} autoComplete="email" value={profile.email} onChange={(event) => setProfile({...profile, email: event.target.value})} className="mt-1.5 h-10 w-full rounded-lg border border-[#DCE5DC] px-3 text-sm font-normal outline-none focus:border-[#78A49A]" /></label>
          <label className="block text-xs font-semibold text-[#40544D]">Current password<input required type="password" autoComplete="current-password" value={profilePassword} onChange={(event) => setProfilePassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#DCE5DC] px-3 text-sm font-normal outline-none focus:border-[#78A49A]" /></label>
          <button type="submit" disabled={savingProfile} className="h-10 rounded-lg bg-[#163A35] px-4 text-xs font-semibold text-white transition hover:bg-[#20544C] disabled:opacity-50">{savingProfile ? 'Saving...' : 'Save details'}</button>
        </form>
      </section>
      <section className="rounded-xl border border-[#E1E7E1] bg-white p-5 sm:p-6">
        <div className="mb-5 border-b border-[#EDF0EC] pb-4"><h2 className="text-sm font-bold">Change password</h2><p className="mt-1 text-xs text-slate-500">Use at least 12 characters. You will need to sign in again.</p></div>
        <form onSubmit={(event) => void changePassword(event)} className="space-y-4">
          <label className="block text-xs font-semibold text-[#40544D]">Current password<input required type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#DCE5DC] px-3 text-sm font-normal outline-none focus:border-[#78A49A]" /></label>
          <label className="block text-xs font-semibold text-[#40544D]">New password<input required type="password" minLength={12} maxLength={200} autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#DCE5DC] px-3 text-sm font-normal outline-none focus:border-[#78A49A]" /></label>
          <label className="block text-xs font-semibold text-[#40544D]">Confirm new password<input required type="password" minLength={12} maxLength={200} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#DCE5DC] px-3 text-sm font-normal outline-none focus:border-[#78A49A]" /></label>
          <button type="submit" disabled={savingPassword} className="h-10 rounded-lg border border-[#D9E2DA] px-4 text-xs font-semibold text-[#36534B] transition hover:bg-[#F7FAF6] disabled:opacity-50">{savingPassword ? 'Updating...' : 'Update password'}</button>
        </form>
      </section>
    </div>
  </>;
}