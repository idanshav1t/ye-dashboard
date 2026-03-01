'use client'

import { useState, useEffect, useRef } from 'react'

type View = 'home' | 'email' | 'tasks' | 'skills' | 'memory' | 'files'

export default function Dashboard() {
  const [view, setView] = useState<View>('home')
  const [command, setCommand] = useState('')
  const [response, setResponse] = useState('')
  const [emailTo, setEmailTo] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [sending, setSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const quickActions = [
    { key: 'e', label: 'Email', icon: '✉️', view: 'email' as View },
    { key: 't', label: 'Tasks', icon: '✓', view: 'tasks' as View },
    { key: 's', label: 'Skills', icon: '⚡', view: 'skills' as View },
    { key: 'm', label: 'Memory', icon: '🧠', view: 'memory' as View },
    { key: 'f', label: 'Files', icon: '📁', view: 'files' as View },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setView('home')
      if (e.key === 'e' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT') {
        setView('email')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const sendEmail = async () => {
    if (!emailTo || !emailSubject) return
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setResponse('✓ Email sent')
    setEmailTo('')
    setEmailSubject('')
    setEmailBody('')
    setTimeout(() => setResponse(''), 3000)
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex">
      {/* Sidebar */}
      <aside className="w-20 flex flex-col items-center py-8 border-r border-[#1F1F1F]">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8F67F5] to-[#D0C4F2] flex items-center justify-center text-2xl mb-12">
          🖖
        </div>
        
        <nav className="flex flex-col gap-4">
          {quickActions.map(action => (
            <button
              key={action.key}
              onClick={() => setView(action.view)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200 ${
                view === action.view 
                  ? 'bg-[#8F67F5] shadow-lg shadow-[#8F67F5]/30' 
                  : 'hover:bg-[#1F1F1F]'
              }`}
            >
              {action.icon}
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <button 
            onClick={() => setView('home')}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${
              view === 'home' ? 'bg-[#1F1F1F]' : 'hover:bg-[#1F1F1F]'
            }`}
          >
            ◉
          </button>
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold">Ye</h1>
            <p className="text-gray-500">AI Assistant • Online</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-[#1F1F1F] rounded-full text-sm">M2.5</span>
            <span className="px-3 py-1 bg-[#1F1F1F] rounded-full text-sm">3h 42m</span>
          </div>
        </header>

        {/* Command Input */}
        <div className="mb-12">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type a command..."
              className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-[#8F67F5] transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              ⌘K
            </span>
          </div>
        </div>

        {/* Views */}
        {view === 'home' && (
          <div className="grid grid-cols-3 gap-6">
            {quickActions.map(action => (
              <button
                key={action.key}
                onClick={() => setView(action.view)}
                className="bg-[#1F1F1F] hover:bg-[#252525] border border-[#2A2A2A] rounded-2xl p-8 text-left transition-all hover:scale-[1.02] group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{action.icon}</div>
                <div className="font-bold text-lg">{action.label}</div>
                <div className="text-gray-500 text-sm mt-1">Press {action.key}</div>
              </button>
            ))}
          </div>
        )}

        {view === 'email' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-8">Send Email</h2>
            <div className="space-y-4">
              <input
                type="email"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
                placeholder="To"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-5 py-4 focus:outline-none focus:border-[#8F67F5]"
              />
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Subject"
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-5 py-4 focus:outline-none focus:border-[#8F67F5]"
              />
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Message"
                rows={6}
                className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-xl px-5 py-4 focus:outline-none focus:border-[#8F67F5] resize-none"
              />
              <button
                onClick={sendEmail}
                disabled={sending || !emailTo || !emailSubject}
                className="w-full bg-[#8F67F5] py-4 rounded-xl font-bold disabled:opacity-50 hover:opacity-90 transition"
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
              {response && <p className="text-green-400 text-center">{response}</p>}
            </div>
          </div>
        )}

        {view === 'tasks' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-8">Scheduled Tasks</h2>
            <div className="space-y-3">
              {[
                { name: 'Morning Report', time: '8:00 AM', enabled: true },
                { name: 'Weather', time: '7:00 AM', enabled: true },
                { name: 'Calendar', time: '9:00 AM', enabled: false },
              ].map((task, i) => (
                <div key={i} className="bg-[#1F1F1F] rounded-xl p-5 flex items-center justify-between">
                  <div>
                    <div className="font-bold">{task.name}</div>
                    <div className="text-gray-500 text-sm">{task.time}</div>
                  </div>
                  <button className={`w-12 h-6 rounded-full transition ${task.enabled ? 'bg-[#8F67F5]' : 'bg-[#2A2A2A]'}`}>
                    <span className={`block w-4 h-4 bg-white rounded-full transition-transform ${task.enabled ? 'translate-x-7' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'skills' && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {['Gmail', 'Blender', 'Memory', 'Deep Research', 'YouTube', 'GitHub', 'Calendar'].map(skill => (
                <span key={skill} className="px-5 py-2 bg-[#1F1F1F] rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {view === 'memory' && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Memory</h2>
            <div className="bg-[#1F1F1F] rounded-2xl p-6">
              <p className="text-gray-400">Your AI remembers:</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>• You're in GMT+2</li>
                <li>• You work with After Effects, Blender, UE5</li>
                <li>• You've made commercials with Higgsfield AI</li>
                <li>• Your website is idanshavit.com</li>
              </ul>
            </div>
          </div>
        )}

        {view === 'files' && (
          <div>
            <h2 className="text-2xl font-bold mb-8">Files</h2>
            <div className="space-y-2">
              {['robot_script.py', 'YE.md', 'memory/', 'skills/'].map(file => (
                <div key={file} className="bg-[#1F1F1F] rounded-lg p-4 flex items-center gap-3">
                  <span>📄</span>
                  <span>{file}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
