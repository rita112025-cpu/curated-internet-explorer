export function CategoryFilter({ categories, active, onSelect, favCount }){
  const all=["全部","★ 收藏",...categories];
  return (
    <div className="category-bar">
      {all.map(cat=>{
        const isActive=active===cat;
        const label=cat==="★ 收藏"?`${cat} ${favCount>0?`(${favCount})`:''}`:cat;
        return <button key={cat} onClick={()=>onSelect(cat)} className={isActive?'cat-btn active':'cat-btn'}>{label}</button>
      })}
    </div>
  )
}
