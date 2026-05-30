import { FormEvent, useState } from 'react';

type Message = {
  type: 'success' | 'error';
  text: string;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState<'GET' | 'POST'>('POST');
  const [message, setMessage] = useState<Message | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    try {
      const requestMethod = method;
      const url = requestMethod === 'GET'
        ? `/api/login?${new URLSearchParams({ email, password }).toString()}`
        : '/api/login';

      const options: RequestInit = {
        method: requestMethod,
        headers: requestMethod === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
        body: requestMethod === 'POST' ? JSON.stringify({ email, password }) : undefined
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.error || 'Login failed.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Unable to reach server.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: 420, width: '100%', border: '1px solid #e5e7eb', borderRadius: 16, padding: '2rem', boxShadow: '0 10px 30px rgba(15, 23, 42, 0.08)' }}>
        <h1 style={{ marginBottom: '1rem' }}>Log In</h1>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: '0.75rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
            />
          </label>

          <label style={{ display: 'block', marginBottom: '1rem' }}>
            <span style={{ display: 'block', marginBottom: '0.5rem' }}>Request method</span>
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value as 'GET' | 'POST')}
              style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
            </select>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ width: '100%', padding: '0.9rem', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        {message ? (
          <div style={{ marginTop: '1rem', padding: '1rem', borderRadius: 8, background: message.type === 'success' ? '#d1fae5' : '#fee2e2', color: message.type === 'success' ? '#065f46' : '#991b1b' }}>
            {message.text}
          </div>
        ) : null}
      </div>
    </main>
  );
}
