import type { NextApiRequest, NextApiResponse } from 'next';

type LoginResponse = {
  message?: string;
  error?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<LoginResponse>) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let email: string | undefined;
  let password: string | undefined;

  if (req.method === 'GET') {
    email = Array.isArray(req.query.email) ? req.query.email[0] : req.query.email;
    password = Array.isArray(req.query.password) ? req.query.password[0] : req.query.password;
  } else {
    ({ email, password } = req.body || {});
  }

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  console.log('Received login:', { method: req.method, email, password });

  return res.status(200).json({ message: `Login received for ${email}.` });
}
