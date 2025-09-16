import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Default center over Sankeshwar (can be overridden via props)
const DEFAULT_CENTER = [13.1167, 77.6347]

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
	{ id: 'A', position: [13.1167, 77.6347], title: 'Overflowing garbage bin' },
	{ id: 'B', position: [13.1190, 77.6000], title: 'Pothole reported' },
	{ id: 'C', position: [13.1150, 77.6400], title: 'Street light not working' },
	{ id: 'D', position: [13.1100, 77.6300], title: 'Water leakage' },
	{ id: 'E', position: [13.1200, 77.6200], title: 'Illegal dumping' },
	{ id: 'F', position: [13.1180, 77.6100], title: 'Noise complaint' },
	{ id: 'G', position: [13.1130, 77.6250], title: 'Traffic signal malfunction' },
	{ id: 'H', position: [13.1175, 77.6150], title: 'Graffiti on public property' },		
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

