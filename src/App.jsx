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

  return (
    <div className="app-root">
      <div className="page-container">
        <header className="header"><h1 className="header-title">50 legendary internet rabbit holes</h1><p className="header-sub">你會花幾小時逛的網路兔子洞 · V1.0 Final · vanilla CSS · system fonts only</p></header>
        <div className="sticky-bar">
          <HeaderSearch ref={searchRef} value={q} onChange={setQ} count={filtered.length} total={sites.length} />
          <CategoryFilter categories={categories} active={cat} onSelect={setCat} favCount={favs.length} />
        </div>
        {showFeatured && <RadioooooFeature />}
        <div className="site-grid-wrapper"><div className="site-grid">{filtered.map(s=><SiteCard key={s.id} site={s} isFav={favs.includes(s.id)} onToggleFav={toggleFav} />)}</div></div>
        {filtered.length===0 && <EmptyState />}
        <footer className="footer"><span>50 sites · 點擊直接開啟 · 純靜態前端 · system fonts only · vanilla CSS · GitHub Pages ready</span><span>Ctrl / ⌘ K 搜尋 · checkedAt 2026-09-18</span></footer>
      </div>
    </div>
  )
}
