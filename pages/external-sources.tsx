import Link from 'next/link';

const sources = [
  {
    title: 'GitHub - NoorQureshi/kali-linux-cheatsheet: Kali Linux Cheat Sheet for Penetration Testers',
    description:
      'A penetration testing cheat sheet with quick references, commands, and techniques for reconnaissance, enumeration, password attacks, exploit research, shells, Metasploit, networking, and more.',
    href: 'https://github.com/noorqureshi/kali-linux-cheatsheet',
  },
  {
    title: 'Kali Linux Cheat Sheet',
    description:
      'A beginner-friendly Kali Linux command cheat sheet covering terminal commands, user privileges, file navigation, Kali tools, scanning, Metasploit, package management, best practices, and shortcuts.',
    href: 'https://www.ubuntuguard.co.za/cyber-toolkit/linux-cheat-sheet.html',
  },
];

export default function ExternalSources() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 760, width: '100%' }}>
        <h1>External Sources</h1>
        <p style={{ marginTop: '1rem', lineHeight: 1.6, textAlign: 'center' }}>
          Helpful external references and related cyber learning resources.
        </p>
        <div style={{ display: 'grid', gap: '1rem', marginTop: '2rem' }}>
          {sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'block',
                padding: '1.25rem',
                border: '1px solid #d1d5db',
                borderRadius: 8,
                color: 'inherit',
                textDecoration: 'none',
                background: '#fff',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.35 }}>{source.title}</h2>
              <p style={{ margin: '0.75rem 0 0', lineHeight: 1.6, color: '#4b5563' }}>
                {source.description}
              </p>
              <span style={{ display: 'block', marginTop: '0.75rem', color: '#2563eb', wordBreak: 'break-word' }}>
                {source.href}
              </span>
            </a>
          ))}
        </div>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            marginTop: '1.5rem',
            padding: '0.75rem 1.25rem',
            borderRadius: 8,
            background: '#2563eb',
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
