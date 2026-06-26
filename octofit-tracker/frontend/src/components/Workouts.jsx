import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../utils/api';

// API endpoint: https://codespace-8000.app.github.dev/api/workouts/
export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const endpoint = getApiEndpoint('workouts');
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to load workouts');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul className="list-group">
        {workouts.map((workout) => (
          <li className="list-group-item" key={workout._id || workout.id || workout.name}>
            <strong>{workout.name}</strong> — {workout.focus} ({workout.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}
