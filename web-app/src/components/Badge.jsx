export default function Badge({ status, children }) {
  const base = 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium'
  const cls = (() => {
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
