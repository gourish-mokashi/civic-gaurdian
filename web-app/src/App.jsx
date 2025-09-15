import { Routes, Route, Navigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import IssueManagement from './pages/IssueManagement'
import PredictiveAlerts from './pages/PredictiveAlerts'
import Analytics from './pages/Analytics'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/issues"
        element={
          <MainLayout>
            <IssueManagement />
          </MainLayout>
        }
      />
      <Route
        path="/alerts"
        element={
          <MainLayout>
            <PredictiveAlerts />
          </MainLayout>
        }
      />
      <Route
        path="/analytics"
        element={
          <MainLayout>
            <Analytics />
          </MainLayout>
        }
      />
      {/* Fallback to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App