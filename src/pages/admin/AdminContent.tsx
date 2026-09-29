import {useEffect, useState} from 'react';
import {Check, FilePlus2, Image, LoaderCircle, Plus, Save, Trash2} from 'lucide-react';
import {apiGet, apiPut} from '../../lib/api';

type ContentCollection = 'flightRoutes' | 'tourPackages' | 'destinations' | 'services' | 'safariContent' | 'galleryItems';
type ContentRecord = Record<string, unknown>;
type ContentBundle = Record<string, unknown>;

const collections: {key: ContentCollection; label: string; description: string; noun: string}[] = [
  {key: 'flightRoutes', label: 'Flights', description: 'Popular connections shown on the Flights page.', noun: 'route'},
  {key: 'tourPackages', label: 'Packages', description: 'Tour offers, itineraries, highlights, and included services.', noun: 'package'},
  {key: 'destinations', label: 'Destinations', description: 'Destination cards and travel information.', noun: 'destination'},
  {key: 'services', label: 'Services', description: 'Services displayed across the website.', noun: 'service'},
  {key: 'safariContent', label: 'Safari', description: 'Safari introduction, featured parks, wildlife, and statistics.', noun: 'safari content'},
  {key: 'galleryItems', label: 'Gallery', description: 'Photos and captions in the public gallery.', noun: 'gallery image'},
];

function asRecord(value: unknown): ContentRecord | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as ContentRecord : null;
}

function getRows(bundle: ContentBundle | null, collection: ContentCollection): ContentRecord[] {
  if (!bundle) return [];
  const value = bundle[collection];
  if (collection === 'safariContent') {
    const record = asRecord(value);
    return record ? [record] : [];
  }
  return Array.isArray(value) ? value.map(asRecord).filter((record): record is ContentRecord => record !== null) : [];
}

function formatLabel(key: string) {
  const special: Record<string, string> = {id: 'ID', image: 'Image URL', from: 'Origin', to: 'Destination', bestTimeToVisit: 'Best time to visit', bestSeason: 'Best season', idealDuration: 'Ideal duration', shortDesc: 'Short description', fullDesc: 'Full description', heroBadge: 'Hero label', heroTitle: 'Hero title', heroDescription: 'Hero description', scientificName: 'Scientific name', keySpecies: 'Key species', animalSummary: 'Species summary', priceStarting: 'Starting price', tripType: 'Trip type'};
  return special[key] ?? key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (letter) => letter.toUpperCase());
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isComplex(value: unknown): boolean {
  return Array.isArray(value) ? !isStringList(value) : typeof value === 'object' && value !== null;
}

function createTemplate(collection: ContentCollection): ContentRecord {
  const id = `new-${Date.now()}`;
  const templates: Record<ContentCollection, ContentRecord> = {
    flightRoutes: {id, from: '', to: '', duration: '', note: ''},
    tourPackages: {id, name: '', duration: '', category: 'Sri Lanka', priceStarting: 'Request Quote', destinations: [], image: '', summary: '', highlights: [], itinerary: [], includes: []},
    destinations: {id, name: '', tagline: '', category: 'Culture', description: '', image: '', highlights: [], bestTimeToVisit: '', idealDuration: ''},
    services: {id, num: '', title: '', shortDesc: '', fullDesc: '', image: '', link: '/'},
    galleryItems: {id, title: '', category: 'Destinations', image: '', location: ''},
    safariContent: {heroBadge: '', heroTitle: '', heroDescription: '', sectionHeading: '', parks: [], keySpecies: [], stats: [], featuredSpecies: {name: '', scientificName: '', status: '', location: '', image: ''}},
  };
  return structuredClone(templates[collection]);
}

function useContentEditorState(record: ContentRecord | undefined, collection: ContentCollection, creating: boolean) {
  const [draft, setDraft] = useState<ContentRecord>({});
  const [complexFields, setComplexFields] = useState<string[]>([]);
  const [complexValues, setComplexValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const next = creating ? createTemplate(collection) : record;
    if (!next) return;
    const complex = Object.entries(next).filter(([, value]) => isComplex(value)).map(([key]) => key);
    setDraft(next);
    setComplexFields(complex);
    setComplexValues(Object.fromEntries(complex.map((key) => [key, JSON.stringify(next[key], null, 2)])));
  }, [collection, creating, record]);

  function getValidatedDraft(): ContentRecord {
    const result = {...draft};
    for (const key of complexFields) {
      result[key] = JSON.parse(complexValues[key] ?? 'null') as unknown;
    }
    return result;
  }

  return {draft, setDraft, complexFields, complexValues, setComplexValues, getValidatedDraft};
}

export function AdminContent({collection}: {collection: ContentCollection}) {
  const [bundle, setBundle] = useState<ContentBundle | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const rows = getRows(bundle, collection);
  const selectedRecord = creating ? undefined : rows[selectedIndex];
  const {draft, setDraft, complexFields, complexValues, setComplexValues, getValidatedDraft} = useContentEditorState(selectedRecord, collection, creating);
  const config = collections.find((item) => item.key === collection)!;

  async function loadContent() {
    setLoading(true);
    setError('');
    try {
      setBundle(await apiGet<ContentBundle>('/api/content'));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load website content.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadContent(); }, []);

  function startNew() {
    if (collection === 'safariContent') return;
    setSelectedIndex(rows.length);
    setCreating(true);
    setError('');
    setNotice('');
  }

  function updateSimpleField(key: string, value: string) {
    const previousValue = draft[key];
    if (isStringList(previousValue)) {
      setDraft((current) => ({...current, [key]: value.split('\n').map((item) => item.trim()).filter(Boolean)}));
      return;
    }
    setDraft((current) => ({...current, [key]: value}));
  }

  async function saveRecord() {
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const record = getValidatedDraft();
      const nextValue = collection === 'safariContent'
        ? record
        : creating
          ? [...rows, record]
          : rows.map((item, index) => index === selectedIndex ? record : item);
      await apiPut(`/api/admin/content/${collection}`, nextValue);
      setBundle((current) => current ? {...current, [collection]: nextValue} : current);
      if (creating) setSelectedIndex(rows.length);
      setCreating(false);
      setNotice('Changes saved and published.');
    } catch (saveError) {
      setError(saveError instanceof SyntaxError ? 'Check that every JSON field contains valid JSON.' : saveError instanceof Error ? saveError.message : 'Could not save content.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteRecord() {
    if (collection === 'safariContent' || !window.confirm(`Delete this ${config.noun}? This removes it from the public website.`)) return;
    setSaving(true);
    setError('');
    setNotice('');
    try {
      const nextValue = rows.filter((_, index) => index !== selectedIndex);
      await apiPut(`/api/admin/content/${collection}`, nextValue);
      setBundle((current) => current ? {...current, [collection]: nextValue} : current);
      setSelectedIndex(Math.max(0, selectedIndex - 1));
      setNotice(`${formatLabel(config.noun)} deleted.`);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Could not delete content.');
    } finally {
      setSaving(false);
    }
  }

  return <>
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#B64E39]">Website content</p><h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-[#1D2C27] sm:text-[28px]">Manage {config.label}</h1><p className="mt-1.5 text-xs text-slate-500">Changes are saved to the database and appear on the public website.</p></div>
    </div>
    <div className="mb-4 flex items-center justify-between gap-4"><div><h2 className="text-sm font-bold text-[#263832]">{config.label}</h2><p className="mt-1 text-xs text-slate-500">{config.description}</p></div><span className="rounded-full border border-[#DCE5DC] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#50645C]">{loading ? 'Loading...' : collection === 'safariContent' ? 'Shared page content' : `${rows.length} ${config.noun}${rows.length === 1 ? '' : 's'}`}</span></div>
    {error && <div role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">{error}</div>}
    {notice && <div role="status" className="mb-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800"><Check size={15} />{notice}</div>}
    <div className="grid items-start gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
      <section className="overflow-hidden rounded-xl border border-[#E1E7E1] bg-white">
        <div className="flex items-center justify-between border-b border-[#EDF0EC] px-4 py-3"><span className="text-xs font-bold">{config.label} items</span>{collection !== 'safariContent' && <button onClick={startNew} className="grid h-8 w-8 place-items-center rounded-lg bg-[#163A35] text-white hover:bg-[#20544C]" aria-label={`Add ${config.noun}`} title={`Add ${config.noun}`}><Plus size={16} /></button>}</div>
        {loading ? <p className="px-4 py-10 text-center text-xs text-slate-400">Loading content...</p> : rows.length === 0 ? <div className="px-4 py-9 text-center"><Image className="mx-auto text-slate-300" size={22} /><p className="mt-3 text-xs font-semibold text-slate-600">No items yet</p><button onClick={startNew} className="mt-3 text-xs font-bold text-[#2B6A5F] hover:underline">Add the first {config.noun}</button></div> : <div className="max-h-[68vh] divide-y divide-[#EDF0EC] overflow-y-auto">{rows.map((row, index) => <button key={String(row.id ?? row.name ?? index)} onClick={() => {setSelectedIndex(index); setCreating(false); setError(''); setNotice('');}} className={`block w-full px-4 py-3 text-left transition hover:bg-[#F8FAF7] ${!creating && selectedIndex === index ? 'border-l-2 border-[#2B6A5F] bg-[#F1F6F1]' : ''}`}><span className="block truncate text-xs font-semibold text-[#2D4039]">{String(row.name ?? row.title ?? row.from ?? (collection === 'safariContent' ? row.heroTitle : '') ?? 'Untitled')}</span><span className="mt-1 block truncate text-[10px] text-slate-400">{String(row.id ?? row.to ?? row.heroBadge ?? '')}</span></button>)}</div>}
      </section>
      <section className="rounded-xl border border-[#E1E7E1] bg-white">
        {Object.keys(draft).length === 0 ? <div className="grid min-h-64 place-items-center p-6 text-center"><div><FilePlus2 className="mx-auto text-[#88A198]" size={24} /><p className="mt-3 text-sm font-semibold text-[#344A42]">Choose content to edit</p><p className="mt-1 text-xs text-slate-400">Select an item or add a new one.</p></div></div> : <>
          <div className="flex items-start justify-between gap-4 border-b border-[#EDF0EC] px-5 py-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#B64E39]">{creating ? `New ${config.noun}` : 'Edit content'}</p><h3 className="mt-1 text-sm font-bold">{String(draft.name ?? draft.title ?? draft.from ?? (collection === 'safariContent' ? draft.heroTitle : '') ?? (creating ? `New ${config.noun}` : 'Content item'))}</h3></div>{!creating && collection !== 'safariContent' && <button onClick={() => void deleteRecord()} disabled={saving} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#F0D9D2] text-[#A74732] hover:bg-[#FBF2EF] disabled:opacity-50" aria-label={`Delete ${config.noun}`} title={`Delete ${config.noun}`}><Trash2 size={16} /></button>}</div>
          <div className="grid gap-4 p-5 sm:grid-cols-2">{Object.entries(draft).map(([key, value]) => {
            const isJsonField = complexFields.includes(key);
            const isListField = isStringList(value);
            const isLongText = typeof value === 'string' && /(description|summary|shortDesc|fullDesc)/i.test(key);
            const wide = isJsonField || isListField || isLongText;
            const textAreaValue = isJsonField ? complexValues[key] ?? '' : isListField ? value.join('\n') : String(value ?? '');
            return <label key={key} className={`block text-[11px] font-semibold text-[#50645C] ${wide ? 'sm:col-span-2' : ''}`}>
              {formatLabel(key)}
              {isJsonField || isListField || isLongText ? <textarea rows={isJsonField ? 8 : isListField ? Math.min(7, Math.max(3, value.length + 1)) : 4} value={textAreaValue} onChange={(event) => isJsonField ? setComplexValues((current) => ({...current, [key]: event.target.value})) : isListField ? updateSimpleField(key, event.target.value) : setDraft((current) => ({...current, [key]: event.target.value}))} className={`mt-1.5 w-full rounded-lg border border-[#DCE5DC] bg-[#FAFBF9] px-3 py-2.5 text-xs font-normal text-[#263832] outline-none focus:border-[#78A49A] ${isJsonField ? 'font-mono' : ''}`} /> : <input value={String(value ?? '')} onChange={(event) => updateSimpleField(key, event.target.value)} className="mt-1.5 h-10 w-full rounded-lg border border-[#DCE5DC] bg-[#FAFBF9] px-3 text-xs font-normal text-[#263832] outline-none focus:border-[#78A49A]" />}
              {isJsonField && <span className="mt-1 block text-[10px] font-normal text-slate-400">Edit this structured field as JSON.</span>}
              {isListField && <span className="mt-1 block text-[10px] font-normal text-slate-400">Enter one item per line.</span>}
            </label>;
          })}</div>
          <div className="flex flex-col-reverse justify-between gap-3 border-t border-[#EDF0EC] px-5 py-4 sm:flex-row sm:items-center"><span className="text-[10px] text-slate-400">Content saves directly to the live site.</span><button onClick={() => void saveRecord()} disabled={saving} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#163A35] px-4 text-xs font-semibold text-white hover:bg-[#20544C] disabled:cursor-wait disabled:opacity-55">{saving ? <LoaderCircle size={15} className="animate-spin" /> : creating ? <FilePlus2 size={15} /> : <Save size={15} />}{saving ? 'Saving...' : creating ? `Create ${config.noun}` : 'Save changes'}</button></div>
        </>}
      </section>
    </div>
  </>;
}
