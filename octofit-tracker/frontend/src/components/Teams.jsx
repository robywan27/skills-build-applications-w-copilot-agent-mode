import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../utils/api';

// API endpoint: https://codespace-8000.app.github.dev/api/teams/
export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTeams() {
      try {
        const endpoint = getApiEndpoint('teams');
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to load teams');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Teams</h2>
      <ul className="list-group">
        {teams.map((team) => (
          <li className="list-group-item" key={team._id || team.id || team.name}>
            <strong>{team.name}</strong> — {team.sport}
          </li>
        ))}
      </ul>
    </div>
  );
}
