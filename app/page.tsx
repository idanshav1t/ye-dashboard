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
  const [log, setLog] = useState<string[]>([])

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
    // In production, this would call the VPS API
    setLog(prev => [...prev, `📧 Sending email to ${email}...`])
    setTimeout(() => {
      setLog(prev => [...prev, `✅ Email sent!`])
      setSending(false)
      setEmail('')
      setSubject('')
      setBody('')
    }, 1500)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading Ye...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
              🖖
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-400 to-p-to-r from-purpleink-400 bg-clip-text text-transparent">
                Ye
              </h1>
              <p className="text-xs text-gray-500">AI Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-green-400 text-sm font-medium">Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard icon="🧠" label="Model" value={data?.model || 'MiniMax M2.5'} />
          <StatCard icon="⏱️" label="Uptime" value={data?.uptime || '3h 42m'} />
          <StatCard icon="💬" label="Messages" value={data?.messages?.toString() || '247'} />
          <StatCard icon="💰" label="Cost" value={data?.usage?.cost || '$0.00'} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                ⚡ Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <ActionButton icon="📧" label="Send Email" onClick={() => document.getElementById('email-section')?.scrollIntoView({ behavior: 'smooth' })} />
                <ActionButton icon="🔍" label="Research" />
                <ActionButton icon="🧠" label="Memory" />
                <ActionButton icon="📁" label="Files" />
              </div>
            </section>

            {/* Skills */}
            <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                🧩 Skills
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
                  {data?.skills?.length || 0} installed
                </span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {data?.skills?.map((skill: any) => (
                  <div key={skill.name} className="bg-gray-800 rounded px-4 py-2 flex items-lg-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${skill.status === 'connected' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Email Section */}
            <section id="email-section" className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📧 Send Email
              </h2>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="To: email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500"
                />
                <textarea
                  placeholder="Message..."
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 resize-none"
                />
                <button
                  onClick={sendEmail}
                  disabled={sending || !email || !subject}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
                >
                  {sending ? 'Sending...' : 'Send Email ✈️'}
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Activity Log */}
            <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                📜 Activity Log
              </h2>
              <div className="space-y-2 text-sm text-gray-400 max-h-64 overflow-y-auto">
                <p className="text-gray-500">No recent activity</p>
              </div>
            </section>

            {/* System Info */}
            <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4">ℹ️ System Info</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Platform</span>
                  <span>VPS (Linux)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Timezone</span>
                  <span>GMT+2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Channel</span>
                  <span>Telegram</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Connected</span>
                  <span>Mar 1, 2026</span>
                </div>
              </div>
            </section>

            {/* Cron Jobs */}
            <section className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                ⏰ Scheduled Tasks
              </h2>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Morning Report</p>
                    <p className="text-xs text-gray-500">Every day at 8:00 AM</p>
                  </div>
                  <button className="w-10 h-6 bg-green-500 rounded-full relative">
                    <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Weather Check</p>
                    <p className="text-xs text-gray-500">Every day at 7:00 AM</p>
                  </div>
                  <button className="w-10 h-6 bg-gray-600 rounded-full relative">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></span>
                  </button>
                </div>
              </div>
              <button className="w-full mt-4 border border-dashed border-gray-700 rounded-lg py-3 text-gray-500 hover:border-gray-500 hover:text-gray-400 transition">
                + Add Scheduled Task
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <span className="text-gray-400 text-sm">{label}</span>
      </div>
      <p className="text-xl font-bold truncate">{value}</p>
    </div>
  )
}

function ActionButton({ icon, label, onClick }: { icon: string; label: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:scale-105"
    >
      <span className="text-2xl">{icon}</span>
      <span className="text-sm text-gray-300">{label}</span>
    </button>
  )
}
