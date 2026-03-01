import { NextResponse } from 'next/server'

export async function GET() {
  // This would connect to your VPS in production
  // For now, return mock data
  return NextResponse.json({
    status: 'online',
    model: 'MiniMax M2.5',
    uptime: '3h 42m',
    messages: 247,
    skills: [
      { name: 'Gmail', status: 'connected' },
      { name: 'Blender', status: 'installed' },
      { name: 'Memory', status: 'active' },
      { name: 'Deep Research', status: 'ready' },
      { name: 'YouTube', status: 'installed' }
    ],
    usage: {
      prompts: 156,
      tokens: '2.7k',
      cost: '$0.0012'
    }
  })
}
