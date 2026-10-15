export interface Session {
  id: string;
  type: 'Extended' | 'Full Day';
  date: string;
  dayName: string;
  time: string;
  price: string;
  url: string;
  badge?: string;
}

export interface SessionRow {
  id: string;
  session_date: string;
  type: 'Extended' | 'Full Day';
  time: string;
  price: string;
  url: string;
}

const ordinal = (day: number): string => {
  if (day >= 11 && day <= 13) return 'th';
  return ['th', 'st', 'nd', 'rd'][Math.min(day % 10, 4)] ?? 'th';
};

const toLocalDate = (isoDate: string) => new Date(`${isoDate}T00:00:00`);

export const formatSessionDate = (isoDate: string): string => {
  const d = toLocalDate(isoDate);
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'short' });
  const month = d.toLocaleDateString('en-GB', { month: 'short' });
  return `${weekday} ${d.getDate()}${ordinal(d.getDate())} ${month} ${d.getFullYear()}`;
};

export const dayNameFromDate = (isoDate: string): string =>
  toLocalDate(isoDate).toLocaleDateString('en-GB', { weekday: 'long' });

export const rowToSession = (row: SessionRow): Session => ({
  id: row.id,
  type: row.type,
  date: formatSessionDate(row.session_date),
  dayName: dayNameFromDate(row.session_date),
  time: row.time,
  price: row.price,
  url: row.url,
});

export const fetchSessions = async (): Promise<Session[] | null> => {
  const { supabase } = await import('./supabase');
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .order('session_date', { ascending: true })
    .order('type', { ascending: true });
  if (error) {
    console.error('Failed to load sessions from Supabase:', error.message);
    return null;
  }
  return (data as SessionRow[]).map(rowToSession);
};
