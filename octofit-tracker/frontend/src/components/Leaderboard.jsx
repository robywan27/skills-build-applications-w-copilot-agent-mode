import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) throw new Error('Failed to load leaderboard');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setEntries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul className="list-group">
        {entries.map((entry) => (
          <li className="list-group-item" key={entry._id || entry.id || entry.user}>
            <strong>{entry.user}</strong> — {entry.score} pts
          </li>
        ))}
      </ul>
    </div>
  );
}
