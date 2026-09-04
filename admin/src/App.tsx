import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RequireAuth from './routes/RequireAuth'
import ConsoleLayout from './routes/ConsoleLayout'
import LoginPage from './routes/LoginPage'
import OverviewPage from './routes/OverviewPage'
import QuotesListPage from './routes/QuotesListPage'
import QuoteDetailPage from './routes/QuoteDetailPage'
import MessagesListPage from './routes/MessagesListPage'
import MessageDetailPage from './routes/MessageDetailPage'
import SettingsPage from './routes/SettingsPage'
import ProfilePage from './routes/ProfilePage'
import ServicesListPage from './routes/website/ServicesListPage'
import ServiceDetailPage from './routes/website/ServiceDetailPage'
import ServiceNewPage from './routes/website/ServiceNewPage'
import JobsListPage from './routes/website/JobsListPage'
import JobDetailPage from './routes/website/JobDetailPage'
import JobNewPage from './routes/website/JobNewPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route element={<ConsoleLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/quotes" element={<QuotesListPage />} />
            <Route path="/quotes/:id" element={<QuoteDetailPage />} />
            <Route path="/messages" element={<MessagesListPage />} />
            <Route path="/messages/:id" element={<MessageDetailPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/website/services" element={<ServicesListPage />} />
            <Route path="/website/services/new" element={<ServiceNewPage />} />
            <Route path="/website/services/:id" element={<ServiceDetailPage />} />
            <Route path="/website/jobs" element={<JobsListPage />} />
            <Route path="/website/jobs/new" element={<JobNewPage />} />
            <Route path="/website/jobs/:id" element={<JobDetailPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
