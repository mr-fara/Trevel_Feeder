import {useState, type FormEvent} from 'react';
import {ArrowLeft, Eye, EyeOff, LockKeyhole, Plane, ShieldCheck} from 'lucide-react';
import {Link, useNavigate} from 'react-router-dom';
import {apiPost} from '../../lib/api';

interface LoginResponse {
  email: string;
}

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await apiPost<LoginResponse>('/api/admin/auth/login', {email, password});
      navigate('/admin', {replace: true});
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-[#F3F5F2] lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden bg-[#163A35] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-40 -top-40 h-135 w-135 rounded-full border border-white/10" />
        <div className="absolute -right-20 -top-20 h-75 w-75 rounded-full border border-white/10" />
        <Link to="/" className="relative inline-flex w-fit items-center gap-3 text-sm font-semibold">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-white/10"><Plane size={19} /></span>
          Travels Feeder <span className="font-normal text-white/50">/ Admin</span>
        </Link>
        <div className="relative max-w-xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#E7AD76]">Operations workspace</p>
          <h1 className="text-5xl font-semibold leading-[1.08]">Every journey starts with a conversation.</h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/65">Review traveller requests, coordinate transfers, and keep every enquiry moving.</p>
        </div>
        <p className="relative text-xs text-white/45">Private staff access · Travels Feeder</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900 lg:hidden">
            <ArrowLeft size={16} /> Back to website
          </Link>
          <div className="mb-9">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#163A35] text-white"><ShieldCheck size={22} /></div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B64E39]">Team sign-in</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#182522]">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">Sign in to manage travel requests.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm font-semibold text-slate-700">
              Work email
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-12 w-full rounded-lg border border-slate-200 bg-white px-3.5 font-normal outline-none transition focus:border-[#28766B] focus:ring-4 focus:ring-[#28766B]/10"
                placeholder="admin@travelsfeeder.com"
              />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Password
              <span className="relative mt-2 block">
                <LockKeyhole size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-12 font-normal outline-none transition focus:border-[#28766B] focus:ring-4 focus:ring-[#28766B]/10"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </span>
            </label>
            {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="flex h-12 w-full items-center justify-center rounded-lg bg-[#163A35] px-4 text-sm font-semibold text-white transition hover:bg-[#20544C] disabled:cursor-wait disabled:opacity-60">
              {isSubmitting ? 'Signing in...' : 'Sign in to dashboard'}
            </button>
          </form>
          <p className="mt-8 text-center text-xs text-slate-400">Authorised team members only</p>
        </div>
      </section>
    </main>
  );
}
