import { useEffect, useState } from 'react';
import { getApiEndpoint } from '../utils/api';

// API endpoint: https://codespace-8000.app.github.dev/api/users/
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const endpoint = getApiEndpoint('users');
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to load users');
        const payload = await response.json();
        const data = Array.isArray(payload) ? payload : payload.data ?? [];
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item" key={user._id || user.id || user.email}>
            <strong>{user.name}</strong> — {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
