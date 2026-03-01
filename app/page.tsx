'use client'

import { useState, useEffect } from 'react'

interface Status {
  status: string
  model: string
  uptime: string
  messages: number
  skills: { name: string; status: string }[]
  usage: { prompts: number; tokens: string; cost: string }
}

export default function Dashboard() {
  const [data, setData] = useState<Status | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status')
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const sendEmail = async () => {
    if (!email || !subject || !body) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      alert('Email sent! (Demo)')
      setEmail('')
      setSubject('')
      setBody('')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF9F4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#8F67F5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDF9F4] text-[#1A1A1A] relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#D0C4F2] opacity-30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#EBE6F8] opacity-40 rounded-full blur-[80px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-[#8F67F5] opacity-10 rounded-full blur-[60px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl">🖖</span>
          <div>
            <h1 className="text-2xl font-bold">Ye</h1>
            <p className="text-sm text-gray-500">AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-green-600 text-sm font-medium">Online</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <p className="text-lg text-gray-500 mb-2">Your AI Assistant</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to <span className="text-[#8F67F5]">Ye</span>
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            A powerful AI assistant helping you with creative work, research, automation, and more.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard icon="🧠" label={data?.model || 'Model'} value="MiniMax M2.5" />
          <StatCard icon="⏱️" label="Uptime" value={data?.uptime || '3h 42m'} />
          <StatCard icon="💬" label="Messages" value={data?.messages?.toString() || '247'} />
          <StatCard icon="💰" label="Cost" value={data?.usage?.cost || '$0.00'} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6">⚡ Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton icon="📧" label="Send Email" />
            <ActionButton icon="🔍" label="Research" />
            <ActionButton icon="🧠" label="Memory" />
            <ActionButton icon="📁" label="Files" />
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-bold mb-4">🧩 Skills</h3>
          <div className="flex flex-wrap gap-2">
            {data?.skills?.map((skill: any) => (
              <span 
                key={skill.name} 
                className="px-4 py-2 bg-[#EBE6F8] text-[#1A1A1A] rounded-full text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Email Form */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-bold mb-6">📧 Send Email</h3>
          <div className="space-y-4">
            <input
              type="email"
              placeholder="To: email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FDF9F4] border border-[#EBE6F8] rounded-2xl px-5 py-4 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#8F67F5] transition"
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-[#FDF9F4] border border-[#EBE6F8] rounded-2xl px-5 py-4 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#8F67F5] transition"
            />
            <textarea
              placeholder="Message..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="w-full bg-[#FDF9F4] border border-[#EBE6F8] rounded-2xl px-5 py-4 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#8F67F5] transition resize-none"
            />
            <button
              onClick={sendEmail}
              disabled={sending || !email || !subject}
              className="w-full bg-[#8F67F5] text-white font-bold py-4 rounded-2xl hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {sending ? 'Sending...' : 'Send Email'} <span>+</span>
            </button>
          </div>
        </div>

        {/* Scheduled Tasks */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 mb-8 shadow-sm">
          <h3 className="text-xl font-bold mb-4">⏰ Scheduled Tasks</h3>
          <div className="space-y-3">
            <TaskRow name="Morning Report" time="Every day at 8:00 AM" enabled={true} />
            <TaskRow name="Weather Check" time="Every day at 7:00 AM" enabled={false} />
          </div>
        </div>

        {/* Info */}
        <div className="text-center text-gray-500 text-sm">
          <p>Platform: VPS (Linux) • Timezone: GMT+2 • Channel: Telegram</p>
          <p className="mt-1">Connected: March 1, 2026</p>
        </div>

      </main>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center shadow-sm">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-bold text-sm truncate">{value}</p>
    </div>
  )
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="bg-[#EBE6F8] hover:bg-[#D0C4F2] rounded-2xl p-4 flex flex-col items-center gap-2 transition hover:scale-105">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function TaskRow({ name, time, enabled }: { name: string; time: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between bg-[#FDF9F4] rounded-xl p-4">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
      <button className={`w-12 h-6 rounded-full relative transition ${enabled ? 'bg-[#8F67F5]' : 'bg-gray-300'}`}>
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition ${enabled ? 'right-1' : 'left-1'}`}></span>
      </button>
    </div>
  )
}
