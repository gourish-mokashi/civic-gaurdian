import { mockIssues } from "../data/mockIssues";
import { FiAlertTriangle, FiMapPin, FiTrendingUp, FiCheckCircle } from "react-icons/fi";

function getWardAlerts(issues) {
  // Aggregate high-priority, unresolved issues by ward
  const alerts = {};
  for (const issue of issues) {
    if (issue.status !== "Resolved" && issue.priority === "High") {
      alerts[issue.location] = (alerts[issue.location] || 0) + 1;
    }
  }
  return Object.entries(alerts)
    .sort((a, b) => b[1] - a[1])
    .map(([ward, count]) => ({ ward, count }));
}

function getUrgentIssues(issues) {
  // List high-priority, unresolved issues
  return issues.filter(
    (i) => i.status !== "Resolved" && i.priority === "High"
  );
}

export default function PredictiveAlerts() {
  const wardAlerts = getWardAlerts(mockIssues);
  const urgentIssues = getUrgentIssues(mockIssues);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="flex items-center gap-2 mb-1 text-2xl font-bold text-gray-900">
          <FiTrendingUp className="text-blue-600" /> Predictive Alerts
        </h2>
        <p className="text-gray-600">
          AI-powered insights to help you prioritize and act on the most critical civic issues.
        </p>
      </div>

            {/* Recommendations */}
      <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
        <h3 className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
          <FiCheckCircle className="text-green-500" /> Recommended Actions
        </h3>
        <ul className="pl-6 space-y-2 text-gray-700 list-disc">
          <li>Allocate additional resources to <span className="font-bold text-blue-700">{wardAlerts[0]?.ward || "critical wards"}</span> for immediate resolution.</li>
          <li>Review and escalate unresolved high-priority issues listed above.</li>
          <li>Monitor wards with frequent new issues for emerging patterns.</li>
          <li>Engage top reporters for more accurate and timely information.</li>
        </ul>
      </div>

      {/* Ward Priority Alerts */}
      <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
        <h3 className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
          <FiMapPin className="text-green-600" /> High-Priority Wards
        </h3>
        <p className="mb-4 text-gray-500">
          Wards with the most unresolved high-priority issues. Consider allocating resources here first.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {wardAlerts.length === 0 ? (
            <div className="text-gray-500">No urgent wards detected.</div>
          ) : (
            wardAlerts.map((alert) => (
              <div key={alert.ward} className="flex flex-col items-center p-4 shadow bg-blue-50 rounded-xl">
                <FiMapPin className="w-8 h-8 mb-2 text-blue-600" />
                <div className="font-semibold text-gray-900">{alert.ward}</div>
                <div className="text-sm text-gray-600">
                  <span className="font-bold text-blue-700">{alert.count}</span> urgent issues
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Urgent Issues List */}
      <div className="p-6 bg-white border border-gray-200 shadow rounded-2xl">
        <h3 className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
          <FiAlertTriangle className="text-red-500" /> Urgent Issues
        </h3>
        <p className="mb-4 text-gray-500">
          These high-priority issues need immediate attention.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 font-semibold text-left text-gray-600">ID</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Category</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Location</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Reported Date</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Reporter</th>
                <th className="px-4 py-2 font-semibold text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {urgentIssues.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">
                    No urgent issues at this time.
                  </td>
                </tr>
              ) : (
                urgentIssues.map((i) => (
                  <tr key={i.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium text-gray-900">{i.id}</td>
                    <td className="px-4 py-2 text-gray-700">{i.category}</td>
                    <td className="px-4 py-2 text-gray-700">{i.location}</td>
                    <td className="px-4 py-2 text-gray-700">{i.reportedDate}</td>
                    <td className="px-4 py-2 text-gray-700">{i.reporter?.name || "-"}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${i.status === "Resolved" ? "bg-blue-100 text-blue-700" : i.status === "In Progress" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                        {i.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}