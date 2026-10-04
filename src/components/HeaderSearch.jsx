import { forwardRef } from 'react'
export const HeaderSearch = forwardRef(function HeaderSearch({ value, onChange, count, total }, ref){
  return (
    <div className="search-row">
      <input ref={ref} type="search" value={value} onChange={e=>onChange(e.target.value)} placeholder="搜尋 domain / 中文 / English / #01…  (Ctrl / ⌘ K)" className="search-input" aria-label="搜尋網站" />
      <div className="count-label"><b>{count}</b> / {total} SITES</div>
    </div>
  )
})
