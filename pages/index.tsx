import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 420, width: '100%', textAlign: 'center' }}>
        <h1>Welcome to the Login App</h1>
        <p>Click below to go to the login page.</p>
        <Link
          href="/login"
          style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.25rem', borderRadius: 8, background: '#2563eb', color: '#fff', textDecoration: 'none' }}
        >
          Go to Login
        </Link>
      </div>
    </main>
  );
}
