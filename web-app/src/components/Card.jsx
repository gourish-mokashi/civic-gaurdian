export default function Card({ title, value, icon }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">{value}</div>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-600">
          {icon}
        </div>
      </div>
    </div>
  )
}
