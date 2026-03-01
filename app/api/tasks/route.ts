import { NextResponse } from 'next/server'

let tasks = [
  { id: 1, name: 'Morning Report', time: '08:00', frequency: 'daily', enabled: true },
]

export async function GET() {
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newTask = { id: Date.now(), ...body, enabled: true }
  tasks.push(newTask)
  return NextResponse.json(newTask)
}

export async function PUT(request: Request) {
  const body = await request.json()
  tasks = tasks.map(t => t.id === body.id ? { ...t, ...body } : t)
  return NextResponse.json({ success: true })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = parseInt(searchParams.get('id') || '0')
  tasks = tasks.filter(t => t.id !== id)
  return NextResponse.json({ success: true })
}
