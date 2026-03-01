'use client'

import { useState, useEffect, useRef } from 'react'

interface Status {
  status: string
  model: string
  uptime: string
  messages: number
  skills: { name: string; status: string }[]
  usage: { prompts: number; tokens: string; cost: string }
}

interface Task {
  id: number
  name: string
  time: string
  enabled: boolean
}

export default function Dashboard() {
  const [data, setData] = useState<Status | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchStatus()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height
        })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status')
      const json = await res.json()
      setData(json)
    } catch (e) {
      console.error(e)
    } finally {
      setTimeout(() => setLoading(false), 800)
    }
  }

  const sendEmail = async () => {
    if (!email || !subject || !body) return
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setEmail('')
    setSubject('')
    setBody('')
  }

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Morning Report', time: 'Every day at 8:00 AM', enabled: true },
    { id: 2, name: 'Weather Check', time: 'Every day at 7:00 AM', enabled: false },
    { id: 3, name: 'Calendar Summary', time: 'Every Monday at 9:00 AM', enabled: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF9F4] flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#8F67F5] to-[#D0C4F2] blur-xl opacity-30 animate-pulse"></div>
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#8F67F5] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-center mt-6 text-gray-500 font-medium animate-pulse">Loading Ye...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDF9F4] text-[#1A1A1A] relative overflow-x-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 transition-all duration-1000 ease-out blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #8F67F5 0%, transparent 70%)',
            top: `${20 - mousePos.y * 20}%`,
            right: `${10 - mousePos.x * 20}%`,
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 transition-all duration-1000 ease-out blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #D0C4F2 0%, transparent 70%)',
            bottom: `${10 - mousePos.y * 10}%`,
            left: `${5 - mousePos.x * 10}%`,
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 transition-all duration-1000 ease-out blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #8F67F5 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating Shapes */}
        <FloatingShape delay={0} top="15%" left="10%" />
        <FloatingShape delay={2000} top="70%" left="85%" />
        <FloatingShape delay={4000} top="80%" left="15%" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 backdrop-blur-sm bg-[#FDF9F4]/80 sticky top-0 border-b border-[#EBE6F8]/50">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8F67F5] to-[#D0C4F2] flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            🖖
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Ye</h1>
            <p className="text-xs text-gray-400">AI Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <NavLink active={activeSection === 'hero'} onClick={() => setActiveSection('hero')}>Home</NavLink>
          <NavLink active={activeSection === 'stats'} onClick={() => setActiveSection('stats')}>Stats</NavLink>
          <NavLink active={activeSection === 'actions'} onClick={() => setActiveSection('actions')}>Actions</NavLink>
          <NavLink active={activeSection === 'schedule'} onClick={() => setActiveSection('schedule')}>Schedule</NavLink>
          
          <div className="flex items-center gap-2 ml-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-600">Online</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-8 py-16">
        
        {/* Hero Section */}
        <section className="text-center mb-24 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-[#EBE6F8] rounded-full text-sm font-medium text-[#8F67F5] mb-6 animate-slide-up">
            ✨ Your Personal AI Assistant
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Meet <span className="bg-gradient-to-r from-[#8F67F5] to-[#D0C4F2] bg-clip-text text-transparent">Ye</span>
          </h1>
          
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-12">
            A powerful, intelligent assistant designed to help you with creative work, 
            research, automation, and everything in between.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button primary icon="🚀">Get Started</Button>
            <Button icon="📊">View Demo</Button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-24">
          <SectionHeader title="System Status" subtitle="Real-time performance metrics" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard 
              icon="🧠" 
              label="Model" 
              value={data?.model || 'MiniMax M2.5'} 
              delay={0}
            />
            <StatCard 
              icon="⏱️" 
              label="Uptime" 
              value={data?.uptime || '3h 42m'} 
              delay={100}
            />
            <StatCard 
              icon="💬" 
              label="Messages" 
              value={data?.messages?.toString() || '247'} 
              delay={200}
            />
            <StatCard 
              icon="💎" 
              label="Cost" 
              value={data?.usage?.cost || '$0.00'} 
              delay={300}
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-24">
          <SectionHeader title="Quick Actions" subtitle="What can I do for you?" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionCard icon="📧" label="Send Email" description="Compose & send" delay={0} />
            <ActionCard icon="🔍" label="Research" description="Deep dive into topics" delay={100} />
            <ActionCard icon="🧠" label="Memory" description="Recall past info" delay={200} />
            <ActionCard icon="📁" label="Files" description="Browse workspace" delay={300} />
            <ActionCard icon="🎨" label="Create" description="Generate content" delay={400} />
            <ActionCard icon="📅" label="Calendar" description="Check schedules" delay={500} />
            <ActionCard icon="🌐" label="Web Search" description="Find anything" delay={600} />
            <ActionCard icon="💻" label="Code" description="Write scripts" delay={700} />
          </div>
        </section>

        {/* Skills */}
        <section className="mb-24">
          <SectionHeader title="Installed Skills" subtitle="Capabilities at your fingertips" />
          
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex flex-wrap gap-3">
              {data?.skills?.map((skill, i) => (
                <SkillBadge key={skill.name} name={skill.name} status={skill.status} delay={i * 50} />
              ))}
            </div>
          </div>
        </section>

        {/* Email Form */}
        <section className="mb-24">
          <SectionHeader title="Send Email" subtitle="Quick communication" />
          
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="space-y-5">
              <input
                type="email"
                placeholder="To: email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FDF9F4] border-2 border-[#EBE6F8] rounded-2xl px-6 py-4 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#8F67F5] focus:shadow-lg transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#FDF9F4] border-2 border-[#EBE6F8] rounded-2xl px-6 py-4 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#8F67F5] focus:shadow-lg transition-all duration-300"
              />
              <textarea
                placeholder="Write your message..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                className="w-full bg-[#FDF9F4] border-2 border-[#EBE6F8] rounded-2xl px-6 py-4 text-[#1A1A1A] placeholder-gray-400 focus:outline-none focus:border-[#8F67F5] focus:shadow-lg transition-all duration-300 resize-none"
              />
              <button
                onClick={sendEmail}
                disabled={sending || !email || !subject}
                className="w-full bg-gradient-to-r from-[#8F67F5] to-[#9F77F6] text-white font-bold py-5 rounded-2xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 text-lg"
              >
                {sending ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Email
                    <span className="text-xl">✈️</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Scheduled Tasks */}
        <section className="mb-24">
          <SectionHeader title="Scheduled Tasks" subtitle="Automate your workflow" />
          
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 space-y-4">
            {tasks.map((task, i) => (
              <TaskRow key={task.id} task={task} toggle={() => toggleTask(task.id)} delay={i * 100} />
            ))}
            
            <button className="w-full mt-6 py-4 border-2 border-dashed border-[#D0C4F2] rounded-2xl text-[#8F67F5] font-medium hover:bg-[#EBE6F8] hover:border-[#8F67F5] transition-all duration-300">
              + Add New Task
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-[#EBE6F8]/50">
          <p className="text-gray-400">
            Ye AI Assistant • VPS (Linux) • GMT+2 • Telegram
          </p>
          <p className="text-gray-300 text-sm mt-2">
            Connected since March 1, 2026
          </p>
        </footer>

      </main>
    </div>
  )
}

// Components

function FloatingShape({ delay, top, left }: { delay: number; top: string; left: string }) {
  const shapes = ['◆', '◇', '△', '○', '□']
  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  const size = Math.random() * 30 + 20
  
  return (
    <div 
      className="absolute text-[#8F67F5] opacity-20 animate-float"
      style={{
        top,
        left,
        fontSize: `${size}px`,
        animationDelay: `${delay}ms`,
      }}
    >
      {shape}
    </div>
  )
}

function NavLink({ children, active, onClick }: { children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative text-sm font-medium transition-all duration-300 ${
        active ? 'text-[#8F67F5]' : 'text-gray-500 hover:text-[#8F67F5]'
      }`}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#8F67F5] to-[#D0C4F2] rounded-full"></span>
      )}
    </button>
  )
}

function Button({ children, primary, icon }: { children: React.ReactNode; primary?: boolean; icon?: string }) {
  return (
    <button className={`
      px-8 py-4 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2
      ${primary 
        ? 'bg-gradient-to-r from-[#8F67F5] to-[#9F77F6] text-white shadow-xl shadow-[#8F67F5]/30 hover:shadow-2xl hover:scale-105' 
        : 'bg-white text-[#1A1A1A] border-2 border-[#EBE6F8] hover:border-[#8F67F5] hover:shadow-xl'
      }
    `}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  )
}

function StatCard({ icon, label, value, delay }: { icon: string; label: string; value: string; delay: number }) {
  return (
    <div 
      className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xl font-bold truncate">{value}</p>
    </div>
  )
}

function ActionCard({ icon, label, description, delay }: { icon: string; label: string; description: string; delay: number }) {
  return (
    <button 
      className="group bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 hover:shadow-2xl hover:scale-105 hover:bg-[#EBE6F8]/30 transition-all duration-500 text-left animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="font-bold mb-1">{label}</h3>
      <p className="text-xs text-gray-400">{description}</p>
    </button>
  )
}

function SkillBadge({ name, status, delay }: { name: string; status: string; delay: number }) {
  const isConnected = status === 'connected'
  return (
    <span 
      className={`
        px-5 py-2.5 rounded-full text-sm font-medium animate-slide-in
        ${isConnected 
          ? 'bg-gradient-to-r from-[#8F67F5] to-[#9F77F6] text-white shadow-lg shadow-[#8F67F5]/30' 
          : 'bg-[#EBE6F8] text-[#1A1A1A]'
        }
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isConnected && <span className="mr-2">●</span>}
      {name}
    </span>
  )
}

function TaskRow({ task, toggle, delay }: { task: Task; toggle: () => void; delay: number }) {
  return (
    <div 
      className="flex items-center justify-between bg-[#FDF9F4] rounded-2xl p-5 hover:shadow-lg transition-all duration-300 animate-slide-in group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div>
        <h4 className="font-bold mb-1">{task.name}</h4>
        <p className="text-xs text-gray-400">{task.time}</p>
      </div>
      <button 
        onClick={toggle}
        className={`
          w-14 h-7 rounded-full relative transition-all duration-300 shadow-inner
          ${task.enabled ? 'bg-gradient-to-r from-[#8F67F5] to-[#9F77F6]' : 'bg-gray-200'}
        `}
      >
        <span 
          className={`
            absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all duration-300
            ${task.enabled ? 'left-8' : 'left-1'}
          `}
        />
      </button>
    </div>
  )
}
