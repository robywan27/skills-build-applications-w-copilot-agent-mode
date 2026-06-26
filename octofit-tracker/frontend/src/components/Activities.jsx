import { useEffect, useState } from 'react';
import { buildApiUrl } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'));
        if (!response.ok) throw new Error('Failed to load activities');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setActivities(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {activities.map((activity) => (
          <li className="list-group-item" key={activity._id || activity.id || activity.title}>
            <strong>{activity.title}</strong> — {activity.type} ({activity.duration})
          </li>
        ))}
      </ul>
    </div>
  );
}
