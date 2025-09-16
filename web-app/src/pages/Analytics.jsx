import { useMemo } from "react";
import { mockIssues } from "../data/mockIssues";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { FiAlertTriangle, FiCheckCircle, FiUsers, FiMapPin } from "react-icons/fi";

const statusColors = {
  "New": "#22c55e",
  "In Progress": "#f59e0b",
  "Resolved": "#3b82f6",
};

const categoryColors = [
  "#2563eb", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ef4444", "#84cc16"
];

export default function Dashboard() {
  // Data calculations
  const {
    statusMap,
    categoryMap,
    wardMap,
    recentIssues,
    dailyPoints,
    topReporters,
    statusData,
    categoryData,
    wardData,
  } = useMemo(() => {
    const statusMap = mockIssues.reduce((acc, i) => {
      acc[i.status] = (acc[i.status] || 0) + 1;
      return acc;
    }, {});
    const categoryMap = mockIssues.reduce((acc, i) => {
      acc[i.category] = (acc[i.category] || 0) + 1;
      return acc;
    }, {});
    const wardMap = mockIssues.reduce((acc, i) => {
      acc[i.location] = (acc[i.location] || 0) + 1;
      return acc;
    }, {});
    const recentIssues = [...mockIssues].sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate)).slice(0, 6);
    const dailyCounts = {};
    for (const it of mockIssues) {
      dailyCounts[it.reportedDate] = (dailyCounts[it.reportedDate] || 0) + 1;
    }
    const dailyPoints = Object.entries(dailyCounts)
      .sort((a, b) => new Date(a[0]) - new Date(b[0]))
      .map(([date, value]) => ({ date, value }));
    const reporters = {};
    for (const i of mockIssues) {
      const name = i.reporter?.name || "Unknown";
      reporters[name] = Math.max(reporters[name] || 0, i.reporter?.credibilityScore || 0);
    }
    const topReporters = Object.entries(reporters)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, score]) => ({ name, score }));
    const statusData = Object.entries(statusMap).map(([name, value]) => ({ name, value }));
    const categoryData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    const wardData = Object.entries(wardMap).map(([name, value]) => ({ name, value }));
    return { statusMap, categoryMap, wardMap, recentIssues, dailyPoints, topReporters, statusData, categoryData, wardData };
  }, []);

  // KPIs
  const totalIssues = mockIssues.length;
  const openIssues = (statusMap["New"] || 0) + (statusMap["In Progress"] || 0);
  const resolvedIssues = statusMap["Resolved"] || 0;
  const activeWards = Object.keys(wardMap).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of civic issues, trends, and activity.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 shadow rounded-2xl">
          <FiAlertTriangle className="w-8 h-8 text-yellow-500" />
          <div>
            <div className="text-sm text-gray-500">Open Issues</div>
            <div className="text-2xl font-bold text-gray-900">{openIssues}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 shadow rounded-2xl">
          <FiCheckCircle className="w-8 h-8 text-blue-600" />
          <div>
            <div className="text-sm text-gray-500">Resolved Issues</div>
            <div className="text-2xl font-bold text-gray-900">{resolvedIssues}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 shadow rounded-2xl">
          <FiMapPin className="w-8 h-8 text-green-500" />
          <div>
            <div className="text-sm text-gray-500">Active Wards</div>
            <div className="text-2xl font-bold text-gray-900">{activeWards}</div>
          </div>
        </div>
        <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 shadow rounded-2xl">
          <FiUsers className="w-8 h-8 text-purple-600" />
          <div>
            <div className="text-sm text-gray-500">Top Reporter</div>
            <div className="text-2xl font-bold text-gray-900">{topReporters[0]?.name || "-"}</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Status Pie */}
        <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
          <h3 className="mb-3 font-semibold text-gray-900">Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={statusData} innerRadius={55} outerRadius={85} paddingAngle={2} label>
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(statusColors)[index % Object.values(statusColors).length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Category Bar */}
        <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
          <h3 className="mb-3 font-semibold text-gray-900">Issues by Category</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={categoryData.sort((a, b) => b.value - a.value)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value">
                  {categoryData.map((_, index) => (
                    <Cell key={`bar-${index}`} fill={categoryColors[index % categoryColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Daily Line */}
        <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
          <h3 className="mb-3 font-semibold text-gray-900">Daily Issues Trend</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={dailyPoints}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Issues Table */}
      <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
        <h3 className="mb-4 font-semibold text-gray-900">Recent Issues</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-semibold text-left text-gray-600">ID</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Category</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Location</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Date</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Status</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Reporter</th>
              </tr>
            </thead>
            <tbody>
              {recentIssues.map((i) => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">{i.id}</td>
                  <td className="px-4 py-2 text-gray-700">{i.category}</td>
                  <td className="px-4 py-2 text-gray-700">{i.location}</td>
                  <td className="px-4 py-2 text-gray-700">{i.reportedDate}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${i.status === "Resolved" ? "bg-blue-100 text-blue-700" : i.status === "In Progress" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {i.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-700">{i.reporter?.name || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Reporters */}
      <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
        <h3 className="mb-4 font-semibold text-gray-900">Top Reporters</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {topReporters.map((r) => (
            <div key={r.name} className="flex flex-col items-center p-4 shadow bg-blue-50 rounded-xl">
              <FiUsers className="w-8 h-8 mb-2 text-blue-600" />
              <div className="font-semibold text-gray-900">{r.name}</div>
              <div className="text-sm text-gray-600">Credibility: <span className="font-bold text-blue-700">{r.score}%</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}