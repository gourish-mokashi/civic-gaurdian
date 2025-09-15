import { useEffect, useState } from 'react'
import Badge from './Badge'
import { FiX, FiImage } from 'react-icons/fi'

export default function IssueDetailModal({ issue, onClose, onSave }) {
	const [status, setStatus] = useState(issue?.status || 'New')
	const [department, setDepartment] = useState(issue?.department || '')

	useEffect(() => {
		setStatus(issue?.status || 'New')
		setDepartment(issue?.department || '')
	}, [issue])

		const handleSave = () => {
			if (onSave && issue) {
				onSave({ ...issue, status, department });
			}
		};

	if (!issue) return null

	const imgSrc = issue.photo || issue.imageUrl
	const activities = issue.activityLog || [
		'Report submitted by John Doe - 2023-10-26 10:00 AM',
		'Status changed to In Progress by Admin User - 2023-10-26 02:30 PM',
	]

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

			{/* Dialog */}
			<div
				role="dialog"
				aria-modal="true"
				className="relative z-10 w-full max-w-2xl overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl"
			>
				<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
					<h3 className="text-base font-semibold text-gray-900">Case {issue.id}</h3>
					<button
						type="button"
						onClick={onClose}
						className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
						aria-label="Close"
					>
						<FiX className="w-5 h-5" />
					</button>
				</div>

				<div className="p-4 space-y-4">
					{/* Image */}
					<div className="flex items-center justify-center w-full overflow-hidden bg-gray-100 rounded-md aspect-video">
						{imgSrc ? (
							<img src={imgSrc} alt={`Issue ${issue.id}`} className="object-cover w-full h-full" />
						) : (
							<div className="flex flex-col items-center text-gray-400">
								<FiImage className="w-10 h-10" />
								<span className="mt-2 text-xs">No image available</span>
							</div>
						)}
					</div>

					{/* Description */}
					<div className="text-sm text-gray-700">
						{issue.description || 'No description provided.'}
					</div>

					{/* Details */}
					<div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
						<div>
							<div className="text-gray-500">Category</div>
							<div className="font-medium text-gray-900">{issue.category || '-'}</div>
						</div>
						<div>
							<div className="text-gray-500">Location</div>
							<div className="font-medium text-gray-900">{issue.location || '-'}</div>
						</div>
						<div>
							<div className="text-gray-500">Reported Date</div>
							<div className="font-medium text-gray-900">{issue.reportedDate || '-'}</div>
						</div>
						{issue.status && (
							<div>
								<div className="text-gray-500">Status</div>
								<div className="font-medium text-gray-900"><Badge status={issue.status} /></div>
							</div>
						)}
						<div className="sm:col-span-2">
							<div className="text-gray-500">Reporter</div>
							<div className="font-medium text-gray-900">
								{issue.reporter?.name || '-'}
								{typeof issue.reporter?.credibilityScore === 'number' && (
									<span className="ml-2 text-xs text-gray-500">(Credibility {issue.reporter.credibilityScore}%)</span>
								)}
							</div>
						</div>
					</div>

								{/* Administrative actions */}
								<div className="mt-2 space-y-3">
									<h4 className="text-sm font-semibold text-gray-900">Administrative Actions</h4>
									<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
										<div>
											<label className="block text-sm font-medium text-gray-700">Update Status</label>
											<select
												value={status}
												onChange={(e) => setStatus(e.target.value)}
												className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											>
												{['New', 'In Progress', 'Resolved', 'Rejected', 'On Hold'].map((opt) => (
													<option key={opt} value={opt}>{opt}</option>
												))}
											</select>
										</div>

										<div>
											<label className="block text-sm font-medium text-gray-700">Assign To Department/Team</label>
											<select
												value={department}
												onChange={(e) => setDepartment(e.target.value)}
												className="block w-full px-3 py-2 mt-1 text-sm text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
											>
												<option value="">Unassigned</option>
												{['Public Works', 'Sanitation', 'Electricity'].map((dept) => (
													<option key={dept} value={dept}>{dept}</option>
												))}
											</select>
										</div>
									</div>

									<div className="pt-1">
										<button
											type="button"
											onClick={handleSave}
											className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
										>
											Save Changes
										</button>
									</div>
								</div>

								{/* Activity Log */}
								<div className="mt-4">
									<h4 className="text-sm font-semibold text-gray-900">Activity Log</h4>
									<ul className="mt-2 space-y-2 text-sm">
										{activities.map((a, idx) => (
											<li key={idx} className="flex items-start gap-2 text-gray-700">
												<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
												<span>{a}</span>
											</li>
										))}
									</ul>
								</div>
				</div>
			</div>
		</div>
	)
}

