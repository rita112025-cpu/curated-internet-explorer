export function SiteCard({ site, tone=0, isFav, onToggleFav }){
  return (
    <div className={`site-card tone-${Math.max(tone,0)%5}`}>
      <a href={site.url} target="_blank" rel="noopener noreferrer" className="site-card-link">
        <div className="site-card-meta">
          <span className="site-id">#{String(site.id).padStart(2,'0')}</span>
          <span className="site-cat">{site.category}</span>
        </div>
        <div className="site-domain">{site.domain}</div>
        <div className="site-zh">{site.zhDesc}</div>
        <div className="site-en">{site.enDesc}</div>
        <div className="site-url">{site.url}</div>
      </a>
      <button onClick={(e)=>{e.preventDefault(); e.stopPropagation(); onToggleFav(site.id)}} aria-label={isFav?`移除收藏 ${site.domain}`:`收藏 ${site.domain}`} aria-pressed={isFav} className={isFav?'fav-btn active':'fav-btn'}>★</button>
    </div>
  )
}
