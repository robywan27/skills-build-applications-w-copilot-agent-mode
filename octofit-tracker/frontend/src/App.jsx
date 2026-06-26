import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Home() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
        <p className="lead text-muted">
          A multi-tier fitness dashboard powered by a React frontend and an Express API.
        </p>
        <p className="text-muted">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs, or leave it blank to use localhost.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded mb-4">
        <div className="container-fluid">
          <span className="navbar-brand">OctoFit</span>
          <div className="navbar-nav flex-row gap-3">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App
