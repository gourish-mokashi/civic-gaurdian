import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Default center over Sankeshwar (can be overridden via props)
const DEFAULT_CENTER = [16.26, 74.45]

// Fix default icon paths issue in Leaflet when bundling
// We provide a custom icon anyway, but this avoids broken images
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Custom issue pin icon
const issueIcon = L.icon({
	iconUrl:
		'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
	iconRetinaUrl:
		'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
})

const DEFAULT_MARKERS = [
	{ id: 'A', position: [13.1167, 77.6347], title: 'Overflowing garbage bin' }
	//{ id: 'B', position: [16.255, 74.44], title: 'Pothole reported' },
	//{ id: 'C', position: [16.268, 74.458], title: 'Streetlight outage' },
]

export default function InteractiveMap({ center = DEFAULT_CENTER, markers = DEFAULT_MARKERS, className = 'h-80 w-full' }) {
	return (
		<div className={`${className} overflow-hidden rounded-md`}>
			<MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full">
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{markers.map((m) => (
					<Marker key={m.id} position={m.position} icon={issueIcon}>
						<Popup>{m.title}</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	)
}

