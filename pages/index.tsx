import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <h1>Welcome to the Login App</h1>
        <p>Click below to go to the login page or the hash encryption page.</p>
        <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
          <Link
            href="/login"
            style={{ display: 'inline-block', padding: '0.75rem 1.25rem', borderRadius: 8, background: '#2563eb', color: '#fff', textDecoration: 'none' }}
          >
            Go to Login
          </Link>
          <Link
            href="/hash"
            style={{ display: 'inline-block', padding: '0.75rem 1.25rem', borderRadius: 8, background: '#10b981', color: '#fff', textDecoration: 'none' }}
          >
            Go to Hash Page
          </Link>
          <Link
            href="/hydra"
            style={{ display: 'inline-block', padding: '0.75rem 1.25rem', borderRadius: 8, background: '#7c3aed', color: '#fff', textDecoration: 'none' }}
          >
            Go to Hydra Page
          </Link>
          <Link
            href="/external-sources"
            style={{ display: 'inline-block', padding: '0.75rem 1.25rem', borderRadius: 8, background: '#f59e0b', color: '#fff', textDecoration: 'none' }}
          >
            Go to External Sources
          </Link>
        </div>
      </div>
    </main>
  );
}
