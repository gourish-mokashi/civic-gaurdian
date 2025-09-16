import { useMemo } from "react"
import { mockIssues } from "../data/mockIssues"

function groupBy(array, getKey) {
  return array.reduce((acc, item) => {
    const key = getKey(item)
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
}

function getDateCounts(data) {
  const counts = {}
  for (const it of data) {
    counts[it.reportedDate] = (counts[it.reportedDate] || 0) + 1
  }
  // sort by date asc
  const entries = Object.entries(counts).sort((a, b) => new Date(a[0]) - new Date(b[0]))
  return entries.map(([date, value]) => ({ date, value }))
}

function formatNumber(n) {
  return new Intl.NumberFormat().format(n)
}

// Simple Donut Chart SVG
function DonutChart({ dataMap, colors, size = 180, strokeWidth = 22, title }) {
  const entries = Object.entries(dataMap)
  const total = entries.reduce((s, [, v]) => s + v, 0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let cumulative = 0

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">Total: {formatNumber(total)}</span>
      </div>
      <div className="flex items-center gap-6">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            <circle r={radius} fill="none" stroke="#eef2ff" strokeWidth={strokeWidth} />
            {entries.map(([key, value], i) => {
              const fraction = value / total
              const dashArray = fraction * circumference
              const dashOffset = circumference * (1 - cumulative)
              cumulative += fraction
              return (
                <circle
                  key={key}
                  r={radius}
                  fill="none"
                  stroke={colors[key] || "#3b82f6"}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90)"
                />
              )
            })}
            <text textAnchor="middle" dominantBaseline="middle" className="fill-gray-900" fontSize="18" fontWeight="600">
              {Math.round((entries[0]?.[1] || 0) / (total || 1) * 100)}%
            </text>
          </g>
        </svg>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {entries.map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: colors[k] || "#3b82f6" }} />
              <span className="text-gray-700">{k}</span>
              <span className="ml-auto font-medium text-gray-900">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Simple Bar Chart (vertical)
function BarChart({ dataEntries, title, barColor = "#2563eb" }) {
  const max = Math.max(...dataEntries.map(([, v]) => v), 1)
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">Max: {formatNumber(max)}</span>
      </div>
      <div className="h-56 flex items-end gap-3">
        {dataEntries.map(([label, value]) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full rounded-t-md" style={{ height: `${(value / max) * 100}%`, background: barColor }} />
            <div className="text-xs text-gray-600 text-center leading-tight break-words">{label}</div>
            <div className="text-xs font-medium text-gray-800">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Simple Line Chart
function LineChart({ points, title }) {
  const width = 520
  const height = 200
  const padding = 24
  const xs = points.map((_, i) => i)
  const ys = points.map(p => p.value)
  const xMax = Math.max(...xs, 1)
  const yMax = Math.max(...ys, 1)
  const toX = (i) => padding + (i / xMax) * (width - padding * 2)
  const toY = (v) => height - padding - (v / yMax) * (height - padding * 2)
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(p.value)}`).join(" ")

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500">Days: {points.length}</span>
      </div>
      <svg width={width} height={height} className="w-full">
        <defs>
          <linearGradient id="lineGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d={path} fill="none" stroke="#2563eb" strokeWidth="2" />
        {/* area fill */}
        <path d={`${path} L ${toX(points.length - 1)},${height - padding} L ${toX(0)},${height - padding} Z`} fill="url(#lineGradient)" />
        {points.map((p, i) => (
          <circle key={p.date} cx={toX(i)} cy={toY(p.value)} r="3" fill="#1d4ed8" />
        ))}
      </svg>
      <div className="mt-2 grid grid-cols-6 gap-2 text-xs text-gray-600">
        {points.map((p) => (
          <div key={p.date} className="truncate">{p.date.slice(5)}</div>
        ))}
      </div>
    </div>
  )
}

export default function Analytics() {
  const { statusMap, categoryMap, wardMap, dailyPoints, topReporters } = useMemo(() => {
    const statusMap = groupBy(mockIssues, (i) => i.status)
    const categoryMap = groupBy(mockIssues, (i) => i.category)
    const wardMap = groupBy(mockIssues, (i) => i.location)
    const dailyPoints = getDateCounts(mockIssues)
    const reporters = {}
    for (const i of mockIssues) {
      const name = i.reporter?.name || "Unknown"
      reporters[name] = Math.max(reporters[name] || 0, i.reporter?.credibilityScore || 0)
    }
    const topReporters = Object.entries(reporters)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    return { statusMap, categoryMap, wardMap, dailyPoints, topReporters }
  }, [])

  const statusColors = {
    "New": "#22c55e",
    "In Progress": "#f59e0b",
    "Resolved": "#3b82f6",
  }

  const categoryEntries = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])
  const wardEntries = Object.entries(wardMap).sort((a, b) => b[1] - a[1])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Analytics Overview</h2>
        <p className="text-gray-600">Key trends and metrics derived from recent issue reports.</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Total Issues</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{formatNumber(mockIssues.length)}</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Open (New + In Progress)</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{formatNumber((statusMap["New"] || 0) + (statusMap["In Progress"] || 0))}</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Resolved</div>
          <div className="mt-1 text-2xl font-semibold text-blue-700">{formatNumber(statusMap["Resolved"] || 0)}</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-500">Active Wards</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{formatNumber(wardEntries.length)}</div>
        </div>
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DonutChart title="Status Distribution" dataMap={statusMap} colors={statusColors} />
        <BarChart title="Issues by Category" dataEntries={categoryEntries} />
        <LineChart title="Daily Issues Trend" points={dailyPoints} />
      </div>

      {/* Ward distribution and reporters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-3">Issues by Ward</h3>
          <div className="space-y-2">
            {wardEntries.map(([ward, count]) => (
              <div key={ward} className="flex items-center gap-3">
                <div className="w-28 text-sm text-gray-600">{ward}</div>
                <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${(count / wardEntries[0][1]) * 100}%` }} />
                </div>
                <div className="w-10 text-right text-sm font-medium text-gray-900">{count}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-3">Top Reporters (credibility)</h3>
          <div className="space-y-2">
            {topReporters.map(([name, score]) => (
              <div key={name} className="flex items-center justify-between">
                <span className="text-gray-700 text-sm">{name}</span>
                <span className="text-gray-900 font-medium">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
