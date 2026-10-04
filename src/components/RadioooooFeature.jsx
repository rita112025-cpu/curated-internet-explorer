import { radioooooCapsules } from '../data/radioooooCapsules.js'
export function RadioooooFeature(){
  return (
    <section className="featured-section" id="capsules">
      <div className="featured-header">
        <h2 className="section-title">8 組深夜探索配方 · 國家 × 年代 × 情緒</h2>
        <span className="featured-note">策展靈感 · 非 Radiooooo 官方頁面，點擊後在官網手動選國家/年代/心情</span>
      </div>
      <div className="featured-grid">
        {radioooooCapsules.map((c,i)=>(
          <a key={c.id} href="https://radiooooo.com" target="_blank" rel="noopener noreferrer" className={`capsule-card tone-${i%4}`}>
            <div className="capsule-top"><span>{c.flag}</span><span className="pill">{c.decade} · {c.mood}</span></div>
            <div className="capsule-title">{c.title}</div>
            <div className="capsule-desc">{c.desc}</div>
            <div className="capsule-keywords">{c.keywords}</div>
            <div className="capsule-hint">開啟後選 {c.searchHint} ↗</div>
          </a>
        ))}
      </div>
    </section>
  )
}
