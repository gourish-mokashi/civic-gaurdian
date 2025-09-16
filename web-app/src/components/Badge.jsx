export default function Badge({ status, kind = 'status', children }) {
  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium'

  const cls = (() => {
    if (kind === 'priority') {
      switch (status) {
        case 'High':
          return `${base} bg-rose-50 text-rose-700`
        case 'Medium':
          return `${base} bg-yellow-50 text-yellow-700`
        case 'Low':
          return `${base} bg-slate-100 text-slate-700`
        default:
          return `${base} bg-gray-100 text-gray-700`
      }
    }
    switch (status) {
      case 'New':
        return `${base} bg-blue-50 text-blue-700`
      case 'In Progress':
        return `${base} bg-amber-50 text-amber-700`
      case 'Resolved':
        return `${base} bg-emerald-50 text-emerald-700`
      default:
        return `${base} bg-gray-100 text-gray-700`
    }
  })()

  return <span className={cls}>{children ?? status}</span>
}
