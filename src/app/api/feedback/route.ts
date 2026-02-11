import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const data = await req.json();
  
  // Store feedback in a JSON file (simple for MVP)
  // In production, this would go to a database
  const feedbackDir = path.join(process.cwd(), 'feedback');
  const feedbackFile = path.join(feedbackDir, 'submissions.json');
  
  try {
    await fs.mkdir(feedbackDir, { recursive: true });
    
    let existing: any[] = [];
    try {
      const content = await fs.readFile(feedbackFile, 'utf-8');
      existing = JSON.parse(content);
    } catch {
      // File doesn't exist yet
    }
    
    existing.push({
      ...data,
      id: Date.now(),
      status: 'new',
    });
    
    await fs.writeFile(feedbackFile, JSON.stringify(existing, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to save feedback:', err);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function GET() {
  const feedbackFile = path.join(process.cwd(), 'feedback', 'submissions.json');
  
  try {
    const content = await fs.readFile(feedbackFile, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json([]);
  }
}
