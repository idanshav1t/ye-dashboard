import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ye Dashboard 🖖',
  description: 'Control panel for Ye AI Assistant',
}

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Ye 🖖</h1>
          <p className="text-xl text-purple-300">Your AI Assistant</p>
        </header>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatusCard 
            title="Status" 
            value="Online" 
            icon="🟢" 
            color="bg-green-500"
          />
          <StatusCard 
            title="Model" 
            value="MiniMax M2.5" 
            icon="🧠" 
            color="bg-blue-500"
          />
          <StatusCard 
            title="Messages" 
            value="247" 
            icon="💬" 
            color="bg-purple-500"
          />
        </div>

        {/* Quick Actions */}
        <section className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ActionButton icon="📧" label="Send Email" />
            <ActionButton icon="📅" label="Calendar" />
            <ActionButton icon="🔍" label="Search" />
            <ActionButton icon="🧠" label="Memory" />
          </div>
        </section>

        {/* Skills */}
        <section className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">🧩 Installed Skills</h2>
          <div className="flex flex-wrap gap-2">
            <SkillBadge name="Gmail" />
            <SkillBadge name="Blender" />
            <SkillBadge name="Memory" />
            <SkillBadge name="Deep Research" />
            <SkillBadge name="YouTube" />
          </div>
        </section>

        {/* Info */}
        <section className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">ℹ️ Information</h2>
          <div className="space-y-2 text-gray-300">
            <p><strong>Timezone:</strong> GMT+2</p>
            <p><strong>Platform:</strong> VPS (Linux)</p>
            <p><strong>Channel:</strong> Telegram</p>
            <p><strong>Connected:</strong> March 1, 2026</p>
          </div>
        </section>
      </div>
    </main>
  )
}

function StatusCard({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl p-4 text-center">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${color} mb-2`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  )
}

function ActionButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="bg-white/5 hover:bg-white/20 transition rounded-xl p-4 flex flex-col items-center gap-2">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  )
}

function SkillBadge({ name }: { name: string }) {
  return (
    <span className="bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full text-sm">
      {name}
    </span>
  )
}
