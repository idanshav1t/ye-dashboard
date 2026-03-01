'use client'

import { useState } from 'react'

type View = 'home' | 'skills' | 'memory' | 'permissions' | 'email' | 'tasks'

const skills = [
  { name: 'Gmail', status: 'working', desc: 'Read & send emails' },
  { name: 'Blender', status: 'installed', desc: 'Python scripts, guidance only' },
  { name: 'Memory', status: 'working', desc: 'I remember everything between sessions' },
  { name: 'Deep Research', status: 'installed', desc: 'Web research capability' },
  { name: 'YouTube', status: 'installed', desc: 'Transcript fetching' },
  { name: 'DDG Search', status: 'installed', desc: 'DuckDuckGo CLI' },
]

const possiblePermissions = [
  { name: 'Control Blender', status: 'needs_local', desc: 'Requires OpenClaw on your machine' },
  { name: 'Browser Control', status: 'needs_extension', desc: 'Chrome extension not connected' },
  { name: 'Calendar', status: 'needs_reauth', desc: 'OAuth scopes expired' },
  { name: 'Drive', status: 'available', desc: 'Can access if needed' },
  { name: 'Web Search', status: 'needs_api', desc: 'Brave Search API not connected ($5/mo)' },
]

const memory = [
  { category: 'Identity', items: ['Name: Ye', 'Vibe: Casual & professional', 'Emoji: 🖖'] },
  { category: 'You', items: ['Creative: After Effects, VFX, Motion Design', '3D: Blender (current), C4D, UE (past)', 'AI Video: Used Higgsfield for TV commercials', 'Music: FL Studio for fun', 'Website: idanshavit.com'] },
  { category: 'Setup', items: ['Timezone: GMT+2', 'Platform: VPS (Linux)', 'Channel: Telegram', 'Model: MiniMax M2.5'] },
  { category: 'Dashboard', items: ['GitHub: @idanshav1t', 'Vercel: ye-dashboard.vercel.app', 'Gmail: idanshavit100@gmail.com'] },
]

export default function Dashboard() {
  const [view, setView] = useState<View>('home')
  const [emailTo, setEmailTo] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [sending, setSending] = useState(false)
  const [response, setResponse] = useState('')

  const navItems = [
    { key: 'home', icon: '◉', label: 'Home' },
    { key: 'skills', icon: '⚡', label: 'Skills' },
    { key: 'memory', icon: '🧠', label: 'Memory' },
    { key: 'permissions', icon: '🔐', label: 'Access' },
    { key: 'email', icon: '✉️', label: 'Email' },
    { key: 'tasks', icon: '✓', label: 'Tasks' },
  ]

  const sendEmail = async () => {
    if (!emailTo || !emailSubject) return
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setResponse('✓ Sent')
    setEmailTo('')
    setEmailSubject('')
    setEmailBody('')
    setTimeout(() => setResponse(''), 3000)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'working': return 'bg-green-500'
      case 'installed': return 'bg-yellow-500'
      case 'available': return 'bg-green-500'
      case 'needs_local': return 'bg-red-500'
      case 'needs_extension': return 'bg-red-500'
      case 'needs_reauth': return 'bg-orange-500'
      case 'needs_api': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col ios-app">
      {/* Header - Mobile */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#1F1F1F] safe-area-top">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8F67F5] to-[#D0C4F2] flex items-center justify-center text-xl">
            🖖
          </div>
          <div>
            <h1 className="text-lg font-bold">Ye</h1>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-[#1F1F1F] rounded text-xs">M2.5</span>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        {view === 'home' && (
          <div className="grid grid-cols-2 gap-3">
            {navItems.filter(n => n.key !== 'home').map(item => (
              <button
                key={item.key}
                onClick={() => setView(item.key as View)}
                className="bg-[#1F1F1F] hover:bg-[#252525] border border-[#2A2A2A] rounded-2xl p-6 text-left transition-all active:scale-95"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-bold">{item.label}</div>
              </button>
            ))}
          </div>
        )}

        {view === 'skills' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Skills</h2>
            <div className="space-y-2">
              {skills.map(skill => (
                <div key={skill.name} className="bg-[#1F1F1F] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold">{skill.name}</div>
                    <div className="text-gray-500 text-xs">{skill.desc}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(skill.status)}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'memory' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Memory</h2>
            <div className="space-y-3">
              {memory.map(section => (
                <div key={section.category} className="bg-[#1F1F1F] rounded-xl p-4">
                  <h3 className="text-[#8F67F5] font-bold text-sm mb-2">{section.category}</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    {section.items.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'permissions' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Permissions</h2>
            <div className="space-y-2">
              {possiblePermissions.map(perm => (
                <div key={perm.name} className="bg-[#1F1F1F] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold">{perm.name}</div>
                    <div className="text-gray-500 text-xs">{perm.desc}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    perm.status === 'available' ? 'bg-green-500/20 text-green-400' : 
                    perm.status === 'needs_reauth' ? 'bg-orange-500/20 text-orange-400' : 
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {perm.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'email' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Email</h2>
            <div className="space-y-3">
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="To"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#8F67F5]"
              />
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Subject"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#8F67F5]"
              />
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Message"
                rows={5}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-base focus:outline-none focus:border-[#8F67F5] resize-none"
              />
              <button
                onClick={sendEmail}
                disabled={sending || !emailTo || !emailSubject}
                className="w-full bg-[#8F67F5] py-4 rounded-xl font-bold disabled:opacity-50 active:scale-95 transition"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
              {response && <p className="text-green-400 text-center">{response}</p>}
            </div>
          </div>
        )}

        {view === 'tasks' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Tasks</h2>
            <div className="space-y-2">
              {[
                { name: 'Morning Report', time: '8:00 AM', enabled: true },
                { name: 'Weather', time: '7:00 AM', enabled: true },
                { name: 'Calendar Summary', time: '9:00 AM', enabled: false },
              ].map((task, i) => (
                <div key={i} className="bg-[#1F1F1F] rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="font-bold">{task.name}</div>
                    <div className="text-gray-500 text-xs">{task.time}</div>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition ${task.enabled ? 'bg-[#8F67F5]' : 'bg-[#2A2A2A]'}`}>
                    <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${task.enabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D]/95 backdrop-blur border-t border-[#1F1F1F] safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setView(item.key as View)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                view === item.key ? 'text-[#8F67F5]' : 'text-gray-500'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
