import { FormEvent, useState } from 'react';

type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512';

const algorithmMap: Record<HashAlgorithm, AlgorithmIdentifier> = {
  'SHA-256': 'SHA-256',
  'SHA-384': 'SHA-384',
  'SHA-512': 'SHA-512'
};

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function hashText(value: string, algorithm: HashAlgorithm) {
  const encoder = new TextEncoder();
  const data = encoder.encode(value);
  const hashBuffer = await crypto.subtle.digest(algorithmMap[algorithm], data);
  return toHex(hashBuffer);
}

export default function HashPage() {
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult('');

    if (!text.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const hashed = await hashText(text, algorithm);
      setResult(hashed);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 520, width: '100%', border: '1px solid #e5e7eb', borderRadius: 16, padding: '2rem', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        <h1 style={{ marginBottom: '1rem' }}>Hash Encryption Page</h1>
        <p style={{ marginBottom: '1.5rem' }}>
          Enter a value, choose a hash algorithm, and click "Encrypt" to display the hashed output.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>Value to encrypt</span>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>Algorithm</span>
            <select
              value={algorithm}
              onChange={(event) => setAlgorithm(event.target.value as HashAlgorithm)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
            >
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-384">SHA-384</option>
              <option value="SHA-513">SHA-513</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', padding: '0.9rem', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
          >
            {isLoading ? 'Encrypting…' : 'Encrypt'}
          </button>
        </form>

        {result ? (
          <div style={{ marginTop: '1.5rem' }}>
            <h2 style={{ marginBottom: '0.75rem' }}>Encrypted result</h2>
            <div style={{ wordBreak: 'break-all', padding: '1rem', borderRadius: 12, background: '#f3f4f6', border: '1px solid #d1d5db' }}>
              {result}
            </div>
          </div>
        ) : null}

        {result ? (
          <div style={{ marginTop: '1.5rem' }}>
            <h2 style={{ marginBottom: '0.75rem' }}>Encrypted result</h2>
            <div style={{ wordBreak: 'break-all', padding: '1rem', borderRadius: 12, background: '#f3f4f6', border: '1px solid #d1d5db' }}>
              {result}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
