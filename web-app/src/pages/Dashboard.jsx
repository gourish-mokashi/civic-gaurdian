import Card from "../components/Card"
import { FiFilePlus, FiClock, FiCheckCircle, FiAlertCircle } from "react-icons/fi"
import InteractiveMap from '../components/InteractiveMap';

export default function Dashboard() {
  const kpis = [
    { title: 'New Reports', value: '128', icon: <FiFilePlus className="h-5 w-5" /> },
    { title: 'In Progress', value: '76', icon: <FiClock className="h-5 w-5" /> },
    { title: 'Resolved Today', value: '42', icon: <FiCheckCircle className="h-5 w-5" /> },
    { title: 'Overdue Issues', value: '9', icon: <FiAlertCircle className="h-5 w-5" /> },
  ]

  const alerts = [
    { id: 1, title: 'Garbage overflow near Market Road', time: '5m ago', severity: 'High' },
    { id: 2, title: 'Water leakage detected in Ward 12', time: '18m ago', severity: 'Medium' },
    { id: 3, title: 'Streetlight outage predicted in Sector 7', time: '43m ago', severity: 'Low' },
    { id: 4, title: 'Traffic congestion expected at Ring Road', time: '1h ago', severity: 'Medium' },
  ]

  const badgeClasses = (severity) => {
    switch (severity) {
      case 'High':
        return 'bg-red-50 text-red-700'
      case 'Medium':
        return 'bg-amber-50 text-amber-700'
      default:
        return 'bg-emerald-50 text-emerald-700'
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <Card key={k.title} title={k.title} value={k.value} icon={k.icon} />
        ))}
      </div>

      {/* Two-column section: Map (2/3) and Alerts (1/3) */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left: Map placeholder spans 2 cols on large screens */}
        <div className="lg:col-span-2 rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-medium text-gray-900">Live Issues Map</h3>
          </div>
          <div className="mt-4 h-80 rounded-md border border-dashed border-gray-300 bg-gray-100 text-gray-500 flex items-center justify-center">
            <InteractiveMap />
          </div>
        </div>

        {/* Right: Latest Predictive Alerts */}
        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Latest Predictive Alerts</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {alerts.map((a) => (
              <li key={a.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-gray-900">{a.title}</p>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${badgeClasses(a.severity)}`}>
                    {a.severity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">{a.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
