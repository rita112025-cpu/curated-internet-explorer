import { useState, useEffect, useRef, useMemo } from 'react'
import { sites, categories } from './data/sites.js'
import { HeaderSearch } from './components/HeaderSearch.jsx'
import { CategoryFilter } from './components/CategoryFilter.jsx'
import { SiteCard } from './components/SiteCard.jsx'
import { RadioooooFeature } from './components/RadioooooFeature.jsx'
import { EmptyState } from './components/EmptyState.jsx'

function loadFavorites(){
  try{
    const raw = JSON.parse(localStorage.getItem('rabbit-favorites') ?? '[]');
    if(!Array.isArray(raw)) return [];
    const validIds = new Set(sites.map(s=>s.id));
    return raw.filter(id=> Number.isInteger(id) && validIds.has(id));
  }catch{ return [] }
}

export default function App(){
  const [q,setQ]=useState('')
  const [cat,setCat]=useState('全部')
  const [favs,setFavs]=useState(()=>loadFavorites())
  const searchRef=useRef(null)

  useEffect(()=>{
    const h=e=>{ if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){ e.preventDefault(); searchRef.current?.focus() } }
    window.addEventListener('keydown',h); return()=>window.removeEventListener('keydown',h)
  },[])

  useEffect(()=>{ localStorage.setItem('rabbit-favorites', JSON.stringify(favs)) },[favs])

  const filtered=useMemo(()=>{
    const qq=q.trim().toLowerCase();
    return sites.filter(s=>{
      if(cat==='★ 收藏') return favs.includes(s.id);
      if(cat!=='全部' && s.category!==cat) return false;
      if(!qq) return true;
      const idText=[s.id, `#${s.id}`, `#${String(s.id).padStart(2,'0')}`].join(' ');
      const hay=`${idText} ${s.domain} ${s.zhDesc} ${s.enDesc} ${s.category} ${s.url}`.toLowerCase();
      return hay.includes(qq)
    })
  },[q,cat,favs])

  const showFeatured=(cat==='全部'||cat==='音樂探索')&&!q
  const toggleFav=id=> setFavs(p=> p.includes(id)? p.filter(x=>x!==id): [...p,id])

  const gridRef=useRef(null)
  const goGrid=()=> gridRef.current?.scrollIntoView({behavior:'smooth',block:'start'})
  const showFavs=()=>{ setCat('★ 收藏'); goGrid() }
  const focusSearch=()=>{ searchRef.current?.focus(); searchRef.current?.scrollIntoView({behavior:'smooth',block:'center'}) }
  const ticker=[`${sites.length} SITES`,`${categories.length} CATEGORIES`,'8 RADIO CAPSULES','NO ADS · NO TRACKING','OPEN IN ONE CLICK','CHECKED 2026-09-18']

  return (
    <div className="app-root">
      <header className="topbar">
        <a className="brand" href="#top"><span className="pac" aria-hidden="true"></span><span className="brand-name">RABBIT_HOLE</span></a>
        <nav className="topnav" aria-label="主選單">
          <a href="#maze">MAZE_INDEX</a>
          {showFeatured && <a href="#capsules">NIGHT_RADIO</a>}
          <button type="button" onClick={showFavs}>HIGH_SCORES{favs.length>0?` (${favs.length})`:''}</button>
        </nav>
        <button type="button" className="btn-coin" onClick={focusSearch}>INSERT COIN</button>
      </header>

      <main className="page-container" id="top">
        <section className="hero">
          <span className="stage-tag">STAGE 1: READY</span>
          <h1 className="hero-title">DIVE INTO <span className="hero-red">LEGENDARY</span> RABBIT HOLES</h1>
          <p className="hero-sub">50 個你會花上好幾個小時逛的網路兔子洞。穿過迷宮、吃掉小點，一路逛到天亮。</p>
          <div className="hero-cta">
            <button type="button" className="btn btn-yellow" onClick={goGrid}><span className="dot"></span>ENTER THE MAZE</button>
            <button type="button" className="btn btn-ghost" onClick={showFavs}>VIEW FAVORITES</button>
          </div>
          <div className="hero-lane" aria-hidden="true"><span className="pac chase"></span><span className="pellets"></span><span className="ghost g-red chase-g"></span></div>
        </section>

        <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1].map(k=><div key={k} className="ticker-set">{ticker.map(t=><span key={t+k}>{t}<i></i></span>)}</div>)}</div></div>

        <div className="sticky-bar" id="maze" ref={gridRef}>
          <HeaderSearch ref={searchRef} value={q} onChange={setQ} count={filtered.length} total={sites.length} />
          <CategoryFilter categories={categories} active={cat} onSelect={setCat} favCount={favs.length} />
        </div>
        {showFeatured && <RadioooooFeature />}
        <div className="site-grid">{filtered.map((s,i)=><SiteCard key={s.id} site={s} tone={categories.indexOf(s.category)} isFav={favs.includes(s.id)} onToggleFav={toggleFav} />)}</div>
        {filtered.length===0 && <EmptyState />}
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="brand"><span className="pac" aria-hidden="true"></span><span className="brand-name">RABBIT_HOLE</span></div>
          <p>50 sites · 點擊直接開啟 · 純靜態前端 · GitHub Pages ready</p>
          <p>Ctrl / ⌘ K 搜尋 · checkedAt 2026-09-18</p>
        </div>
      </footer>
    </div>
  )
}
