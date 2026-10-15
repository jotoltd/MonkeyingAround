import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Pencil, Trash2, Plus, LogOut, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SessionRow, formatSessionDate } from '../lib/sessions';

const CREDS_KEY = 'ma_admin_creds';

interface SessionForm {
  session_date: string;
  type: 'Extended' | 'Full Day';
  time: string;
  price: string;
  url: string;
}

const EMPTY_FORM: SessionForm = {
  session_date: '',
  type: 'Full Day',
  time: '9am - 4pm',
  price: '£29.50',
  url: '',
};

const loadCreds = (): { u: string; p: string } | null => {
  try {
    const raw = sessionStorage.getItem(CREDS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AdminPage: React.FC = () => {
  const [authed, setAuthed] = useState(() => loadCreds() !== null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [form, setForm] = useState<SessionForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  const loadSessions = async () => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('session_date', { ascending: true })
      .order('type', { ascending: true });
    if (!error && data) setSessions(data as SessionRow[]);
  };

  useEffect(() => {
    if (authed) loadSessions();
  }, [authed]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setAuthError('');
    const { data, error } = await supabase.rpc('verify_admin', {
      p_username: username,
      p_password: password,
    });
    if (error || data !== true) {
      setAuthError('Incorrect username or password.');
    } else {
      sessionStorage.setItem(CREDS_KEY, JSON.stringify({ u: username, p: password }));
      setAuthed(true);
    }
    setBusy(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(CREDS_KEY);
    setAuthed(false);
    setUsername('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const creds = loadCreds();
    if (!creds) return handleLogout();
    setBusy(true);
    setMessage('');
    const { error } = await supabase.rpc('admin_save_session', {
      p_username: creds.u,
      p_password: creds.p,
      p_id: editingId,
      p_session_date: form.session_date,
      p_type: form.type,
      p_time: form.time,
      p_price: form.price,
      p_url: form.url,
    });
    if (error) {
      setMessage(`Error: ${error.message}`);
      if (error.message.includes('Invalid credentials')) handleLogout();
    } else {
      setMessage(editingId ? 'Session updated.' : 'Session added.');
      setForm(EMPTY_FORM);
      setEditingId(null);
      await loadSessions();
    }
    setBusy(false);
  };

  const handleEdit = (s: SessionRow) => {
    setEditingId(s.id);
    setForm({
      session_date: s.session_date,
      type: s.type,
      time: s.time,
      price: s.price,
      url: s.url,
    });
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (s: SessionRow) => {
    const creds = loadCreds();
    if (!creds) return handleLogout();
    if (!window.confirm(`Delete ${formatSessionDate(s.session_date)} (${s.type})?`)) return;
    setBusy(true);
    const { error } = await supabase.rpc('admin_delete_session', {
      p_username: creds.u,
      p_password: creds.p,
      p_id: s.id,
    });
    setMessage(error ? `Error: ${error.message}` : 'Session deleted.');
    if (!error) await loadSessions();
    setBusy(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#16001e] text-white flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm border-2 border-[#610f7f] rounded-3xl p-8 bg-[#16001e]/90 shadow-[0_4px_25px_rgba(255,0,252,0.15)]"
        >
          <h1 className="text-3xl font-display font-extrabold mb-1">Admin Login</h1>
          <p className="text-white/60 text-sm mb-6">Monkeying Around session manager</p>

          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8081ff] mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[#16001e] border-2 border-[#610f7f] focus:border-[#ff00fc] outline-none text-white"
          />

          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8081ff] mb-1.5">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            className="w-full mb-5 px-4 py-3 rounded-xl bg-[#16001e] border-2 border-[#610f7f] focus:border-[#ff00fc] outline-none text-white"
          />

          {authError && <p className="text-red-400 text-sm mb-4">{authError}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full px-6 py-3.5 bg-gradient-to-r from-[#ff00fc] to-[#a100ff] hover:from-[#ff43fd] hover:to-[#bd33ff] text-white font-display font-black rounded-2xl border border-white/20 transition-all disabled:opacity-50 cursor-pointer"
          >
            {busy ? 'Signing in…' : 'Sign In'}
          </button>

          <a href="/" className="block text-center text-xs text-white/50 hover:text-[#ff00fc] mt-5">
            ← Back to website
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#16001e] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold">Session Manager</h1>
            <p className="text-white/60 text-sm mt-1">
              Cards update on the live site as soon as you save.
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#610f7f] text-white/80 hover:border-[#ff00fc]/60 hover:text-white text-sm font-bold transition-all"
            >
              <ArrowLeft size={16} /> View site
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#610f7f] text-white/80 hover:border-red-400/60 hover:text-red-300 text-sm font-bold transition-all cursor-pointer"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>

        {/* Add / Edit form */}
        <form
          onSubmit={handleSubmit}
          className="border-2 border-[#610f7f] rounded-3xl p-6 md:p-8 bg-[#16001e]/90 mb-10"
        >
          <h2 className="text-xl font-display font-extrabold mb-5 flex items-center gap-2">
            {editingId ? <Pencil size={20} className="text-[#ff00fc]" /> : <Plus size={20} className="text-[#ff00fc]" />}
            {editingId ? 'Edit Session' : 'Add New Session'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8081ff] mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={form.session_date}
                onChange={e => setForm({ ...form, session_date: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#16001e] border-2 border-[#610f7f] focus:border-[#ff00fc] outline-none text-white [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8081ff] mb-1.5">
                Session Type
              </label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value as SessionForm['type'] })}
                className="w-full px-4 py-3 rounded-xl bg-[#16001e] border-2 border-[#610f7f] focus:border-[#ff00fc] outline-none text-white cursor-pointer"
              >
                <option value="Full Day">Full Day</option>
                <option value="Extended">Extended</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8081ff] mb-1.5">
                Time
              </label>
              <input
                type="text"
                value={form.time}
                onChange={e => setForm({ ...form, time: e.target.value })}
                placeholder="9am - 4pm"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#16001e] border-2 border-[#610f7f] focus:border-[#ff00fc] outline-none text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8081ff] mb-1.5">
                Price
              </label>
              <input
                type="text"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="£29.50"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#16001e] border-2 border-[#610f7f] focus:border-[#ff00fc] outline-none text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8081ff] mb-1.5">
                Bookaby Session URL
              </label>
              <input
                type="url"
                value={form.url}
                onChange={e => setForm({ ...form, url: e.target.value })}
                placeholder="https://bookaby.me/monkeying-around-ltd/whats-on/session/…"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#16001e] border-2 border-[#610f7f] focus:border-[#ff00fc] outline-none text-white"
              />
            </div>
          </div>

          {form.session_date && (
            <p className="text-white/60 text-sm mt-4">
              Will display as: <strong className="text-white">{formatSessionDate(form.session_date)}</strong>
            </p>
          )}

          {message && (
            <p className={`text-sm mt-4 ${message.startsWith('Error') ? 'text-red-400' : 'text-emerald-400'}`}>
              {message}
            </p>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={busy}
              className="px-6 py-3 bg-gradient-to-r from-[#ff00fc] to-[#a100ff] hover:from-[#ff43fd] hover:to-[#bd33ff] text-white font-display font-black rounded-2xl border border-white/20 transition-all disabled:opacity-50 cursor-pointer"
            >
              {busy ? 'Saving…' : editingId ? 'Save Changes' : 'Add Session'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(EMPTY_FORM);
                  setMessage('');
                }}
                className="px-6 py-3 rounded-2xl border-2 border-[#610f7f] text-white/80 hover:text-white font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Sessions list */}
        <h2 className="text-xl font-display font-extrabold mb-4">
          Current Sessions ({sessions.length})
        </h2>
        <div className="space-y-3">
          {sessions.map(s => (
            <div
              key={s.id}
              className="border-2 border-[#610f7f]/60 rounded-2xl p-4 md:p-5 bg-[#16001e]/90 flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="min-w-0">
                <p className="font-display font-bold text-lg flex items-center gap-2 flex-wrap">
                  <Calendar size={16} className="text-[#ff00fc] shrink-0" />
                  {formatSessionDate(s.session_date)}
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-mono font-extrabold uppercase rounded-full border ${
                      s.type === 'Extended'
                        ? 'bg-[#ff00fc]/15 text-[#ff00fc] border-[#ff00fc]/40'
                        : 'bg-[#8081ff]/15 text-[#8081ff] border-[#8081ff]/40'
                    }`}
                  >
                    {s.type === 'Extended' ? 'Extended Day' : 'Full Day'}
                  </span>
                </p>
                <p className="text-white/60 text-sm mt-1 flex items-center gap-2 flex-wrap">
                  <Clock size={14} className="text-[#8081ff] shrink-0" />
                  {s.time} · {s.price}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(s)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8081ff]/15 border border-[#8081ff]/40 text-[#8081ff] hover:bg-[#8081ff]/25 text-sm font-bold transition-all cursor-pointer"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(s)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500/20 text-sm font-bold transition-all cursor-pointer"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
          {sessions.length === 0 && (
            <p className="text-white/50 text-sm border-2 border-dashed border-[#610f7f]/40 rounded-2xl p-6 text-center">
              No sessions yet — add your first one above.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
