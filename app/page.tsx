'use client'

import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Filter,
  LayoutDashboard,
  Menu,
  Search,
  Settings2,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  X,
} from 'lucide-react'

const jobs = [
  { title: 'Senior Frontend Engineer', company: 'Linear', location: 'Remote · Europe', type: 'Full-time', match: 94, accent: 'bg-cyan-400', logo: 'L', skills: ['React', 'TypeScript', 'GraphQL'], salary: '€95k–120k' },
  { title: 'Product Engineer', company: 'Vercel', location: 'Remote · Worldwide', type: 'Full-time', match: 87, accent: 'bg-white', logo: '▲', skills: ['Next.js', 'AI SDK', 'Node.js'], salary: '€85k–110k' },
  { title: 'Frontend Developer', company: 'Raycast', location: 'Berlin · Hybrid', type: 'Full-time', match: 81, accent: 'bg-orange-400', logo: 'R', skills: ['React', 'Electron', 'CSS'], salary: '€75k–95k' },
]

const learning = [
  { label: 'Mastering GraphQL APIs', meta: 'Frontend Masters · 4h', done: true },
  { label: 'Build an AI-powered app', meta: 'Vercel Academy · 2h', done: false },
  { label: 'Advanced TypeScript patterns', meta: 'Total TypeScript · 6h', done: false },
]

function Metric({ icon: Icon, label, value, detail, positive = true }: { icon: typeof Target; label: string; value: string; detail: string; positive?: boolean }) {
  return <div className="metric"><div className="metric-icon"><Icon size={17} /></div><div><p className="eyebrow">{label}</p><strong>{value}</strong><span className={positive ? 'positive' : 'neutral'}>{detail}</span></div></div>
}

export default function Page() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState<string[]>([])
  const [done, setDone] = useState(learning.map((item) => item.done))
  const [mobileNav, setMobileNav] = useState(false)
  const filteredJobs = useMemo(() => jobs.filter((job) => `${job.title} ${job.company} ${job.skills.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query])

  return <div className="app-shell">
    <aside className={mobileNav ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><div className="brand-mark"><Sparkles size={17} /></div><span>pathfinder</span></div>
      <div className="profile"><div className="avatar">AK</div><div><strong>Alex Kim</strong><span>Frontend Engineer</span></div><ChevronRight size={15} /></div>
      <nav>{[['Overview', LayoutDashboard], ['Job matches', BriefcaseBusiness], ['Skill map', Target], ['Learning plan', BookOpen]].map(([label, Icon]) => <button key={label as string} className={activeNav === label ? 'nav-item active' : 'nav-item'} onClick={() => { setActiveNav(label as string); setMobileNav(false) }}><Icon size={18} /><span>{label as string}</span>{label === 'Job matches' && <b>12</b>}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings2 size={18} /><span>Settings</span></button><button className="nav-item"><CircleHelp size={18} /><span>Help center</span></button><div className="sidebar-status"><span className="status-dot" /> Agent is active</div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Menu"><Menu size={20} /></button><div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{activeNav}</strong></div><div className="top-actions"><div className="search"><Search size={16} /><input aria-label="Search jobs" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></div><button className="icon-button" aria-label="Notifications"><Bell size={18} /><i /></button><div className="mini-avatar">AK</div></div></header>
      <div className="content-wrap">
        <section className="welcome-row"><div><p className="eyebrow cyan">MONDAY, AUGUST 25, 2026</p><h1>Good morning, Alex<span className="cyan">.</span></h1><p className="subhead">Here&apos;s what your career agent found while you were away.</p></div><button className="outline-button"><Settings2 size={16} /> Customize view</button></section>
        <section className="metrics"><Metric icon={Target} label="Career match" value="82%" detail="+6.4% this month" /><Metric icon={TrendingUp} label="Profile visibility" value="1,284" detail="+18% this week" /><Metric icon={BriefcaseBusiness} label="New matches" value="12" detail="3 high confidence" /><Metric icon={BookOpen} label="Learning streak" value="7 days" detail="Keep it going" positive={false} /></section>
        <div className="dashboard-grid"><section className="panel matches-panel"><div className="panel-header"><div><h2>Top job matches</h2><p>Curated by your agent based on your goals</p></div><button className="text-button" onClick={() => setActiveNav('Job matches')}>View all <ArrowUpRight size={15} /></button></div><div className="job-list">{filteredJobs.map((job) => <article className="job-card" key={job.title}><div className={`company-logo ${job.accent}`}>{job.logo}</div><div className="job-info"><div className="job-title-row"><div><h3>{job.title}</h3><p>{job.company} <span>·</span> {job.location}</p></div><div className="match-score"><strong>{job.match}%</strong><span>match</span></div></div><div className="job-tags">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}<span className="salary">{job.salary}</span></div><div className="job-footer"><span><Clock3 size={13} /> Posted 2 days ago</span><button className={saved.includes(job.title) ? 'save-button saved' : 'save-button'} onClick={() => setSaved(saved.includes(job.title) ? saved.filter((item) => item !== job.title) : [...saved, job.title])}>{saved.includes(job.title) ? <Check size={14} /> : null}{saved.includes(job.title) ? 'Saved' : 'Save job'}</button></div></div></article>)}</div></section>
          <aside className="right-column"><section className="panel agent-card"><div className="agent-top"><div className="agent-orb"><Sparkles size={20} /></div><span className="live-label"><i /> LIVE</span></div><h2>Your agent is on it.</h2><p>Scanning 240+ sources for roles that fit your next move.</p><div className="scan-line"><span>Last scan</span><strong>8 minutes ago</strong></div><div className="scan-line"><span>Next scan</span><strong>in 52 minutes</strong></div><button className="dark-button">View activity <ArrowUpRight size={15} /></button></section><section className="panel learning-card"><div className="panel-header compact"><div><h2>Continue learning</h2><p>Close your top skill gaps</p></div><button className="round-button" aria-label="Open learning plan"><ArrowUpRight size={15} /></button></div><div className="learning-list">{learning.map((item, index) => <button className="learning-item" key={item.label} onClick={() => setDone(done.map((value, i) => i === index ? !value : value))}><span className={done[index] ? 'check-circle completed' : 'check-circle'}>{done[index] && <Check size={13} />}</span><span><strong>{item.label}</strong><small>{item.meta}</small></span><ChevronRight size={15} /></button>)}</div></section></aside>
        </div>
        <footer className="footer"><span><Code2 size={14} /> Powered by Pathfinder AI</span><span>Last synced just now <span className="sync-dot" /></span></footer>
      </div>
    </main>
  </div>
}
