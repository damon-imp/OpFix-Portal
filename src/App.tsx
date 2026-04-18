import { Routes, Route, Navigate, Link } from 'react-router-dom';
import DemoPortal from './demo/DemoPortal';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/demo" replace />} />
      <Route path="/demo" element={<DemoPortal />} />
      <Route path="/client/*" element={<PlaceholderView title="Client Portal" phase="Phase 2 build" />} />
      <Route path="/admin/*" element={<PlaceholderView title="Internal Admin" phase="Phase 3 build" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function PlaceholderView({ title, phase }: { title: string; phase: string }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0A',
      color: '#FFFFFF',
      fontFamily: '"DM Sans", sans-serif',
      padding: 24,
    }}>
      <div style={{ maxWidth: 500, textAlign: 'center' }}>
        <div style={{
          fontFamily: '"Space Grotesk", sans-serif',
          fontSize: 48,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          marginBottom: 8,
        }}>
          <span style={{ color: '#FFFFFF' }}>Op</span>
          <span style={{ color: '#3B82F6', fontStyle: 'italic' }}>Fix</span>
        </div>
        <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          {title}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>
          This path is reserved for production. {phase}.
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
          For now, check the interactive demo.
        </p>
        <Link to="/demo" style={{
          display: 'inline-block',
          background: '#3B82F6',
          color: 'white',
          padding: '10px 20px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          textDecoration: 'none',
        }}>
          Open Demo
        </Link>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0A0A0A',
      color: '#FFFFFF',
      fontFamily: '"DM Sans", sans-serif',
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: '"Space Grotesk", sans-serif', fontSize: 32 }}>404</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Route not found.</p>
        <Link to="/demo" style={{ color: '#3B82F6' }}>Go to demo</Link>
      </div>
    </div>
  );
}
