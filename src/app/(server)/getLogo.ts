import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'public/logo.png');
    const fileBuffer = fs.readFileSync(filePath);
    const base64Logo = fileBuffer.toString('base64');

    res.status(200).json({ base64: `data:image/png;base64,${base64Logo}` });
  } catch (error) {
    console.error('Failed to load logo:', error);
    res.status(500).json({ error: 'Failed to load logo' });
  }
}
