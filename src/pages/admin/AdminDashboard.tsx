import {useEffect, useState, type ReactNode} from 'react';
import {Link, NavLink, Navigate, Outlet, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {
  CalendarDays,
  CarFront,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Compass,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  MessageSquareText,
  Binoculars,
  BriefcaseBusiness,
  Images,
  Package,
  Plane,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
  X,
} from 'lucide-react';
import {ApiError, apiGet, apiPatch, apiPost} from '../../lib/api';
import {AdminLoginPage} from './AdminLoginPage';
import {AdminContent} from './AdminContent';

interface AdminSession {email: string}
interface Paginated<T> {items: T[]; page: number; pageSize: number; total: number}
interface RequestRecord {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  destination: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  service?: string;
  travel_date?: string | null;
  return_date?: string | null;
  passengers?: string | null;
  trip_type?: string | null;
  message?: string | null;
  airport?: string;
  arrival_date?: string;
  arrival_time?: string | null;
  flight_number?: string | null;
  passenger_count?: number;
  vehicle_type?: string;
}
interface DashboardStats {
  enquiries: {total: number; today: number; byStatus: Record<string, number>};
  transfers: {total: number; today: number; byStatus: Record<string, number>};
}

const enquiryStatuses = ['new', 'contacted', 'confirmed', 'closed'] as const;
const transferStatuses = ['new', 'confirmed', 'completed', 'cancelled'] as const;
type RequestKind = 'enquiries' | 'transfers';

function formatDate(value?: string | null) {
  if (!value) return 'Not specified';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en', {dateStyle: 'medium'}).format(date);
}

function statusLabel(status: string) {
  return status.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function StatusBadge({status}: {status: string}) {
  const palette: Record<string, string> = {
    new: 'border-amber-200 bg-amber-50 text-amber-800',
    contacted: 'border-sky-200 bg-sky-50 text-sky-800',
    confirmed: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    completed: 'border-teal-200 bg-teal-50 text-teal-800',
    closed: 'border-slate-200 bg-slate-100 text-slate-600',
    cancelled: 'border-rose-200 bg-rose-50 text-rose-700',
  };
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${palette[status] ?? 'border-slate-200 bg-slate-50 text-slate-600'}`}>{statusLabel(status)}</span>;
}

function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [checking, setChecking] = useState(true);
  const [authError, setAuthError] = useState('');
  const [signingOut, setSigningOut] = useState(false);

  async function checkSession() {
    setChecking(true);
    setAuthError('');
    try {
      const session = await apiGet<AdminSession>('/api/admin/auth/session');
      setEmail(session.email);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        navigate('/admin/login', {replace: true, state: {from: location.pathname}});
      } else {
        setAuthError(error instanceof Error ? error.message : 'Could not check admin session.');
      }
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => { void checkSession(); }, []);

  async function signOut() {
    setSigningOut(true);
    try {
      await apiPost<void>('/api/admin/auth/logout', {});
    } finally {
      navigate('/admin/login', {replace: true});
      setSigningOut(false);
    }
  }

  if (checking) {
    return <div className="grid min-h-screen place-items-center bg-[#F3F5F2] text-sm text-slate-500">Checking secure session...</div>;
  }

  if (authError) {
    return <div className="grid min-h-screen place-items-center bg-[#F3F5F2] p-6"><div className="max-w-md text-center"><CircleAlert className="mx-auto text-[#B64E39]" /><h1 className="mt-4 text-xl font-semibold">Dashboard unavailable</h1><p className="mt-2 text-sm text-slate-500">{authError}</p><button onClick={() => void checkSession()} className="mt-5 rounded-lg bg-[#163A35] px-4 py-2.5 text-sm font-semibold text-white">Retry</button></div></div>;
  }

  return (
    <div className="min-h-screen bg-[#F3F5F2] text-[#1C2925] lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="flex flex-col bg-[#163A35] text-white lg:min-h-screen">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 lg:px-6 lg:py-6">
          <Link to="/admin" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10"><Compass size={18} /></span>
            <span><span className="block text-sm font-bold">Travels Feeder</span><span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">Admin workspace</span></span>
          </Link>
          <button onClick={() => void signOut()} disabled={signingOut} className="grid h-9 w-9 place-items-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white lg:hidden" aria-label="Sign out"><LogOut size={17} /></button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 py-3 lg:flex-1 lg:flex-col lg:px-3 lg:py-6">
          <p className="hidden px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 lg:block">Workspace</p>
          <SidebarLink to="/admin" icon={<LayoutDashboard size={17} />} label="Overview" end />
          <SidebarLink to="/admin/enquiries" icon={<MessageSquareText size={17} />} label="Enquiries" />
          <SidebarLink to="/admin/transfers" icon={<CarFront size={17} />} label="Transfers" />
          <p className="hidden px-3 pb-2 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35 lg:block">Website pages</p>
          <SidebarLink to="/admin/content/flights" icon={<Plane size={17} />} label="Flights" />
          <SidebarLink to="/admin/content/packages" icon={<Package size={17} />} label="Packages" />
          <SidebarLink to="/admin/content/destinations" icon={<MapPin size={17} />} label="Destinations" />
          <SidebarLink to="/admin/content/services" icon={<BriefcaseBusiness size={17} />} label="Services" />
          <SidebarLink to="/admin/content/safari" icon={<Binoculars size={17} />} label="Safari" />
          <SidebarLink to="/admin/content/gallery" icon={<Images size={17} />} label="Gallery" />
        </nav>
        <div className="hidden border-t border-white/10 p-4 lg:block">
          <div className="mb-3 flex min-w-0 items-center gap-2.5 px-2">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#E7AD76] text-xs font-bold text-[#163A35]">{email.slice(0, 1).toUpperCase()}</span>
            <span className="min-w-0"><span className="block truncate text-xs font-semibold">{email}</span><span className="block text-[10px] text-white/45">Administrator</span></span>
          </div>
          <button onClick={() => void signOut()} disabled={signingOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-white/65 transition hover:bg-white/10 hover:text-white"><LogOut size={15} />{signingOut ? 'Signing out...' : 'Sign out'}</button>
        </div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex h-15.5 items-center justify-between border-b border-[#E1E7E1] bg-[#F8FAF7]/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-2 text-xs text-slate-400"><span>Workspace</span><ChevronRight size={14} /><span className="font-semibold text-[#273A34]">{location.pathname.split('/').at(-1) === 'admin' ? 'Overview' : statusLabel(location.pathname.split('/').at(-1) ?? '')}</span></div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#55716A]"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Database connected</div>
        </header>
        <main className="mx-auto w-full max-w-375 p-5 sm:p-8 xl:p-10"><Outlet context={{email}} /></main>
      </div>
    </div>
  );
}

function SidebarLink({to, icon, label, end = false}: {to: string; icon: ReactNode; label: string; end?: boolean}) {
  return <NavLink to={to} end={end} className={({isActive}) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition lg:w-full ${isActive ? 'bg-white text-[#163A35]' : 'text-white/65 hover:bg-white/10 hover:text-white'}`}>{icon}<span>{label}</span></NavLink>;
}

function AdminOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function loadStats() {
    setLoading(true);
    setError('');
    try {
      setStats(await apiGet<DashboardStats>('/api/admin/dashboard'));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load dashboard metrics.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadStats(); }, []);

  const totalToday = (stats?.enquiries.today ?? 0) + (stats?.transfers.today ?? 0);
  const todayLabel = new Intl.DateTimeFormat('en', {weekday: 'long', month: 'long', day: 'numeric'}).format(new Date());
  return <>
    <PageHeading eyebrow={todayLabel} title="Overview" description="A clear view of incoming travel requests and today's activity."><button onClick={() => void loadStats()} disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D9E2DA] bg-white px-3.5 text-xs font-semibold text-[#36534B] hover:bg-[#F7FAF6] disabled:opacity-50"><RefreshCw size={15} className={loading ? 'animate-spin' : ''} />Refresh</button></PageHeading>
    {error && <ErrorNotice message={error} onRetry={() => void loadStats()} />}
    <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard title="Total enquiries" value={stats?.enquiries.total} detail={`${stats?.enquiries.byStatus.new ?? 0} awaiting first response`} icon={<MessageSquareText size={18} />} loading={loading} accent="red" />
      <MetricCard title="Transfer requests" value={stats?.transfers.total} detail={`${stats?.transfers.byStatus.new ?? 0} awaiting confirmation`} icon={<CarFront size={18} />} loading={loading} accent="green" />
      <MetricCard title="Received today" value={totalToday} detail="Across both request types" icon={<CalendarDays size={18} />} loading={loading} accent="amber" />
      <MetricCard title="Active queue" value={(stats?.enquiries.byStatus.new ?? 0) + (stats?.enquiries.byStatus.contacted ?? 0) + (stats?.transfers.byStatus.new ?? 0) + (stats?.transfers.byStatus.confirmed ?? 0)} detail="Needs follow-up or confirmation" icon={<Clock3 size={18} />} loading={loading} accent="blue" />
    </div>
    <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="rounded-xl border border-[#E1E7E1] bg-white">
        <div className="flex items-center justify-between border-b border-[#EDF0EC] px-5 py-4"><div><h2 className="text-sm font-bold">Request queues</h2><p className="mt-1 text-xs text-slate-500">Open a queue to review new submissions.</p></div><Users size={18} className="text-slate-400" /></div>
        <div className="divide-y divide-[#EDF0EC]">
          <QueueLink to="/admin/enquiries" title="Travel enquiries" description="Tours, flights, accommodation and general contact" count={stats?.enquiries.byStatus.new ?? 0} icon={<MessageSquareText size={18} />} />
          <QueueLink to="/admin/transfers" title="Airport transfers" description="Pickup details, arrival times and vehicle requests" count={stats?.transfers.byStatus.new ?? 0} icon={<CarFront size={18} />} />
        </div>
      </section>
      <section className="rounded-xl border border-[#E1E7E1] bg-[#E9F0E8] p-5 sm:p-6">
        <div className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[#2B6A5F]"><ShieldCheck size={18} /></span><div><h2 className="text-sm font-bold">Private operations</h2><p className="mt-1 text-xs leading-5 text-[#5B7069]">Customer details are only available to authenticated administrators. Update each request as your team follows up.</p></div></div>
        <div className="mt-5 grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#45635A]"><span className="rounded-lg bg-white/75 px-3 py-2">HttpOnly admin session</span><span className="rounded-lg bg-white/75 px-3 py-2">Database status tracking</span></div>
      </section>
    </div>
  </>;
}

function QueueLink({to, title, description, count, icon}: {to: string; title: string; description: string; count: number; icon: ReactNode}) {
  return <Link to={to} className="flex items-center gap-4 px-5 py-4 transition hover:bg-[#F8FAF7]"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#EFF4EF] text-[#2B6A5F]">{icon}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{title}</span><span className="mt-1 block truncate text-xs text-slate-500">{description}</span></span><span className="grid h-7 min-w-7 place-items-center rounded-full bg-[#F7E6DF] px-2 text-xs font-bold text-[#A74732]">{count}</span><ChevronRight size={16} className="text-slate-400" /></Link>;
}

function RequestInbox({kind}: {kind: RequestKind}) {
  const [result, setResult] = useState<Paginated<RequestRecord> | null>(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<RequestRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState('');
  const [error, setError] = useState('');
  const isEnquiry = kind === 'enquiries';
  const statuses = isEnquiry ? enquiryStatuses : transferStatuses;
  const title = isEnquiry ? 'Travel enquiries' : 'Airport transfers';

  useEffect(() => {
    const timer = window.setTimeout(() => { setSearch(searchInput.trim()); setPage(1); }, 250);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  async function loadRequests() {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({page: String(page), pageSize: '15'});
    if (status) params.set('status', status);
    if (search) params.set('search', search);
    try {
      setResult(await apiGet<Paginated<RequestRecord>>(`/api/admin/${kind}?${params}`));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load requests.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadRequests(); }, [kind, page, status, search]);

  async function updateStatus(record: RequestRecord, nextStatus: string) {
    setUpdatingId(record.id);
    setError('');
    try {
      const updated = await apiPatch<RequestRecord>(`/api/admin/${kind}/${record.id}/status`, {status: nextStatus});
      setResult((current) => current ? {...current, items: current.items.map((item) => item.id === updated.id ? updated : item)} : current);
      setSelected(updated);
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : 'Could not update request status.');
    } finally {
      setUpdatingId('');
    }
  }

  return <>
    <PageHeading eyebrow={isEnquiry ? 'Customer requests' : 'Ground operations'} title={title} description={isEnquiry ? 'Review trip details and keep each enquiry moving.' : 'Coordinate airport pickups and update dispatch progress.'}>
      <button onClick={() => void loadRequests()} disabled={loading} className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#D9E2DA] bg-white px-3.5 text-xs font-semibold text-[#36534B] hover:bg-[#F7FAF6] disabled:opacity-50"><RefreshCw size={15} className={loading ? 'animate-spin' : ''} />Refresh</button>
    </PageHeading>
    {error && <ErrorNotice message={error} onRetry={() => void loadRequests()} />}
    <div className="mb-4 flex flex-col gap-3 rounded-xl border border-[#E1E7E1] bg-white p-3 sm:flex-row sm:items-center">
      <label className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search name, email, phone or destination" className="h-10 w-full rounded-lg border border-[#E3E8E2] bg-[#FAFBF9] pl-9 pr-3 text-sm outline-none focus:border-[#78A49A]" /></label>
      <label className="relative"><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => {setStatus(event.target.value); setPage(1);}} className="h-10 w-full appearance-none rounded-lg border border-[#E3E8E2] bg-white pl-3 pr-9 text-xs font-semibold text-[#40544D] sm:w-44"><option value="">All statuses</option>{statuses.map((item) => <option value={item} key={item}>{statusLabel(item)}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></label>
      <span className="px-1 text-xs text-slate-500">{result?.total ?? 0} requests</span>
    </div>
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_350px]">
      <section className="overflow-hidden rounded-xl border border-[#E1E7E1] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 border-collapse text-left">
            <thead className="bg-[#F8FAF7] text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500"><tr><th className="px-4 py-3">Traveller</th><th className="px-4 py-3">{isEnquiry ? 'Service / destination' : 'Arrival / destination'}</th><th className="px-4 py-3">Received</th><th className="px-4 py-3">Status</th></tr></thead>
            <tbody className="divide-y divide-[#EDF0EC]">
              {loading && <tr><td colSpan={4} className="px-4 py-14 text-center text-sm text-slate-400">Loading requests...</td></tr>}
              {!loading && result?.items.length === 0 && <tr><td colSpan={4} className="px-4 py-14 text-center"><div className="text-sm font-semibold text-slate-600">No requests found</div><div className="mt-1 text-xs text-slate-400">Try changing the filters.</div></td></tr>}
              {!loading && result?.items.map((record) => <tr key={record.id} onClick={() => setSelected(record)} className={`cursor-pointer transition hover:bg-[#F8FAF7] ${selected?.id === record.id ? 'bg-[#F1F6F1]' : ''}`}>
                <td className="px-4 py-3.5"><span className="block text-xs font-bold text-[#263832]">{record.full_name}</span><span className="mt-1 block text-[11px] text-slate-500">{record.email}</span></td>
                <td className="px-4 py-3.5"><span className="block max-w-52 truncate text-xs font-semibold text-[#344A42]">{isEnquiry ? record.service : record.airport}</span><span className="mt-1 block max-w-52 truncate text-[11px] text-slate-500">{record.destination || 'Destination not specified'}</span></td>
                <td className="px-4 py-3.5 text-xs text-slate-600">{formatDate(record.created_at)}</td>
                <td className="px-4 py-3.5"><StatusBadge status={record.status} /></td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-[#EDF0EC] px-4 py-3"><span className="text-xs text-slate-500">Page {result?.page ?? page} of {Math.max(1, Math.ceil((result?.total ?? 0) / (result?.pageSize ?? 15)))}</span><div className="flex gap-1"><button onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1 || loading} className="grid h-8 w-8 place-items-center rounded-md border border-[#E1E7E1] text-slate-600 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={16} /></button><button onClick={() => setPage((current) => current + 1)} disabled={!result || page * result.pageSize >= result.total || loading} className="grid h-8 w-8 place-items-center rounded-md border border-[#E1E7E1] text-slate-600 disabled:opacity-40" aria-label="Next page"><ChevronRight size={16} /></button></div></div>
      </section>
      {selected ? <RequestDetail record={selected} kind={kind} statuses={statuses} updating={updatingId === selected.id} onStatusChange={(nextStatus) => void updateStatus(selected, nextStatus)} onClose={() => setSelected(null)} /> : <section className="hidden min-h-56 rounded-xl border border-dashed border-[#CFD9D0] bg-[#F8FAF7] p-6 xl:grid xl:place-items-center"><div className="max-w-48 text-center"><span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-white text-[#759088]"><MessageSquareText size={18} /></span><p className="mt-3 text-xs font-semibold text-[#50645C]">Select a request</p><p className="mt-1 text-[11px] leading-5 text-slate-400">Contact details and travel notes will appear here.</p></div></section>}
    </div>
  </>;
}

function RequestDetail({record, kind, statuses, updating, onStatusChange, onClose}: {record: RequestRecord; kind: RequestKind; statuses: readonly string[]; updating: boolean; onStatusChange: (status: string) => void; onClose: () => void}) {
  const isEnquiry = kind === 'enquiries';
  return <aside className="fixed inset-0 z-30 flex justify-end bg-black/25 xl:sticky xl:top-20.5 xl:block xl:bg-transparent">
    <section className="flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-[#E1E7E1] bg-white shadow-2xl xl:h-auto xl:max-h-[calc(100vh-108px)] xl:max-w-none xl:rounded-xl xl:border xl:shadow-none">
      <div className="flex items-start justify-between border-b border-[#EDF0EC] p-5"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#B64E39]">{isEnquiry ? 'Travel enquiry' : 'Transfer request'}</p><h2 className="mt-1.5 text-lg font-semibold">{record.full_name}</h2><p className="mt-1 text-xs text-slate-500">Received {formatDate(record.created_at)}</p></div><button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close details"><X size={17} /></button></div>
      <div className="flex-1 space-y-5 p-5">
        <div className="flex items-center justify-between"><StatusBadge status={record.status} /><span className="text-[10px] text-slate-400">Ref {record.id.slice(0, 8).toUpperCase()}</span></div>
        <div className="space-y-3 rounded-lg border border-[#E8EDE7] p-3.5"><DetailLine icon={<Mail size={15} />} label="Email" value={record.email} href={`mailto:${record.email}`} /><DetailLine icon={<Users size={15} />} label="Phone" value={record.phone} href={`tel:${record.phone}`} /><DetailLine icon={<MapPin size={15} />} label="Destination" value={record.destination || 'Not specified'} /></div>
        <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{isEnquiry ? 'Travel details' : 'Arrival details'}</p><div className="grid grid-cols-2 gap-2">{isEnquiry ? <><InfoTile label="Service" value={record.service || 'General'} /><InfoTile label="Travel date" value={formatDate(record.travel_date)} /><InfoTile label="Return date" value={formatDate(record.return_date)} /><InfoTile label="Passengers" value={record.passengers || 'Not specified'} /><InfoTile label="Trip type" value={record.trip_type || 'Not specified'} /></> : <><InfoTile label="Airport" value={record.airport || 'Not specified'} /><InfoTile label="Arrival date" value={formatDate(record.arrival_date)} /><InfoTile label="Arrival time" value={record.arrival_time || 'Not specified'} /><InfoTile label="Flight number" value={record.flight_number || 'Not specified'} /><InfoTile label="Passengers" value={String(record.passenger_count ?? 'Not specified')} /><InfoTile label="Vehicle" value={record.vehicle_type || 'Not specified'} /></>}</div></div>
        {isEnquiry && record.message && <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Message</p><p className="whitespace-pre-wrap rounded-lg bg-[#F7F9F6] p-3.5 text-xs leading-5 text-[#45564F]">{record.message}</p></div>}
        {!isEnquiry && record.flight_number && <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Flight number</p><p className="text-sm font-medium">{record.flight_number}</p></div>}
        <div><label htmlFor="request-status" className="mb-2 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Update status</label><div className="relative"><select id="request-status" value={record.status} disabled={updating} onChange={(event) => onStatusChange(event.target.value)} className="h-10 w-full appearance-none rounded-lg border border-[#DCE5DC] bg-white px-3 pr-9 text-xs font-semibold text-[#32473F] outline-none focus:border-[#78A49A] disabled:opacity-50">{statuses.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></div>{updating && <p className="mt-2 text-[11px] text-slate-400">Saving status...</p>}</div>
      </div>
      <div className="border-t border-[#EDF0EC] p-5"><a href={`mailto:${record.email}`} className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#163A35] text-xs font-semibold text-white transition hover:bg-[#20544C]"><Mail size={15} />Reply by email</a><a href={`https://wa.me/${record.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="mt-2 flex h-10 items-center justify-center gap-2 rounded-lg border border-[#DCE5DC] text-xs font-semibold text-[#36534B] transition hover:bg-[#F7FAF6]"><MessageSquareText size={15} />Open WhatsApp</a></div>
    </section>
  </aside>;
}

function DetailLine({icon, label, value, href}: {icon: ReactNode; label: string; value: string; href?: string}) {
  return <div className="flex items-center gap-2.5 text-xs"><span className="text-[#6D8980]">{icon}</span><span className="w-12 shrink-0 text-slate-400">{label}</span>{href ? <a className="truncate font-medium text-[#36534B] hover:underline" href={href}>{value}</a> : <span className="truncate font-medium text-[#344A42]">{value}</span>}</div>;
}

function InfoTile({label, value}: {label: string; value: string}) {
  return <div className="min-w-0 rounded-lg bg-[#F7F9F6] px-3 py-2.5"><span className="block text-[10px] font-medium text-slate-400">{label}</span><span className="mt-1 block truncate text-xs font-semibold text-[#344A42]">{value}</span></div>;
}

function PageHeading({eyebrow, title, description, children}: {eyebrow: string; title: string; description: string; children?: ReactNode}) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#B64E39]">{eyebrow}</p><h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1D2C27] sm:text-[28px]">{title}</h1><p className="mt-1.5 text-xs text-slate-500">{description}</p></div>{children}</div>;
}

function MetricCard({title, value, detail, icon, loading, accent}: {title: string; value?: number; detail: string; icon: ReactNode; loading: boolean; accent: string}) {
  const colors: Record<string, string> = {red: 'bg-[#F9EAE5] text-[#B64E39]', green: 'bg-[#E5F0E7] text-[#39705D]', amber: 'bg-[#F8F0D9] text-[#987120]', blue: 'bg-[#E6EEF0] text-[#426E78]'};
  return <section className="rounded-xl border border-[#E1E7E1] bg-white p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-slate-500">{title}</span><span className={`grid h-9 w-9 place-items-center rounded-lg ${colors[accent]}`}>{icon}</span></div><div className="mt-3 text-3xl font-semibold tracking-tight text-[#1E312A]">{loading ? <span className="inline-block h-8 w-14 animate-pulse rounded bg-slate-100" /> : value ?? 0}</div><p className="mt-1.5 text-[11px] text-slate-400">{detail}</p></section>;
}

function ErrorNotice({message, onRetry}: {message: string; onRetry: () => void}) {
  return <div role="alert" className="mb-4 flex items-center justify-between gap-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"><span>{message}</span><button onClick={onRetry} className="shrink-0 font-bold underline">Retry</button></div>;
}

function AdminRoutes() {
  return <Routes>
    <Route path="/admin/login" element={<AdminLoginPage />} />
    <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminOverview />} />
      <Route path="enquiries" element={<RequestInbox kind="enquiries" />} />
      <Route path="transfers" element={<RequestInbox kind="transfers" />} />
      <Route path="content" element={<Navigate to="/admin/content/flights" replace />} />
      <Route path="content/flights" element={<AdminContent collection="flightRoutes" />} />
      <Route path="content/packages" element={<AdminContent collection="tourPackages" />} />
      <Route path="content/destinations" element={<AdminContent collection="destinations" />} />
      <Route path="content/services" element={<AdminContent collection="services" />} />
      <Route path="content/safari" element={<AdminContent collection="safariContent" />} />
      <Route path="content/gallery" element={<AdminContent collection="galleryItems" />} />
    </Route>
    <Route path="*" element={<Navigate to="/admin" replace />} />
  </Routes>;
}

export {AdminRoutes};
