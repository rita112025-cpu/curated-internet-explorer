import { forwardRef } from 'react'
export const HeaderSearch = forwardRef(function HeaderSearch({ value, onChange, count, total }, ref){
  return (
    <div className="search-row">
      <input ref={ref} value={value} onChange={e=>onChange(e.target.value)} placeholder="搜尋 domain / 中文 / English / #01... (Ctrl / ⌘ K)" className="search-input" />
      <div className="count-label">{count} / {total} sites</div>
    </div>
  )
})
