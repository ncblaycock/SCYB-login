import Link from 'next/link';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}>
      <header style={{ width: '100%', background: '#111827', color: '#fff', padding: '1rem 2rem', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Login App</div>
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            <Link href="/" style={navLinkStyle}>Home</Link>
            <Link href="/login" style={navLinkStyle}>Login</Link>
            <Link href="/hash" style={navLinkStyle}>Hash</Link>
            <Link href="/rbac" style={navLinkStyle}>RBAC</Link>
            <Link href="/external-sources" style={navLinkStyle}>External Sources</Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1, width: '100%', maxWidth: 1200, margin: '0 auto', padding: '2rem', boxSizing: 'border-box' }}>
        {children}
      </main>

      <footer style={{ background: '#f3f4f6', padding: '1rem 2rem', textAlign: 'center' }}>
        <span style={{ color: '#374151' }}>Built with Next.js</span>
      </footer>

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          min-height: 100%;
          width: 100%;
        }
        body {
          box-sizing: border-box;
        }
        *, *::before, *::after {
          box-sizing: inherit;
        }
      `}</style>
    </div>
  );
}

const navLinkStyle: React.CSSProperties = {
  color: '#fff',
  textDecoration: 'none',
  padding: '0.5rem 0.75rem',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.08)',
};
