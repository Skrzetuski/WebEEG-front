import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import DashboardLayout from './layouts/DashboardLayout';
import SessionPage from './pages/dashboard/SessionPage';
import TaggingPage from './pages/dashboard/TaggingPage';
import MLPage from './pages/dashboard/MLPage';
import DesignPage from './pages/dashboard/DesignPage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';



function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />} >
          <Route index element={<DashboardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="session" element={<SessionPage />} />
          <Route path="tagging" element={<TaggingPage />} />
          <Route path="ml" element={<MLPage />} />
          <Route path="design" element={<DesignPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
