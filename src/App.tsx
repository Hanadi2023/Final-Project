// src/App.tsx

import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

// استيراد الواجهات
import AcademicSupervisorLayout from './layouts/AcademicSupervisorLayout';
import FieldSupervisorLayout from './layouts/FieldSupervisorLayout';

// استيراد الصفحات
import AcademicSupervisorDashboard from './pages/AcademicSupervisorDashboard';
import FieldSupervisorDashboard from './pages/FieldSupervisorDashboard';
import ReportsPage from './pages/ReportsPage';
import NotificationsPage from './pages/NotificationsPage';
import StudentsPage from './pages/StudentsPage';
import SettingsPage from './pages/SettingsPage';
import AddTaskPage from './pages/AddTaskPage';
import AttendancePage from './pages/AttendancePage';
import StudentReportsPage from './pages/StudentReportsPage';
// ==================== بداية التعديل 1: استيراد صفحة التقييمات ====================
import EvaluationsPage from './pages/EvaluationsPage';
// ==================== نهاية التعديل 1 ====================


// --- (إعدادات الـ Cache والـ Theme لا تغيير هنا) ---
const cacheRtl = createCache({ key: 'muirtl', stylisPlugins: [rtlPlugin] });

interface Notification { id: number; text: string; timestamp: string; read: boolean; }
const initialNotifications: Notification[] = [
    { id: 1, text: 'قام الطالب علي إبراهيم بتسليم التقرير الأسبوعي الأول', timestamp: 'منذ 5 دقائق', read: false },
    { id: 2, text: 'لديك تقييم جديد من المشرف الميداني للطالبة نسيبة', timestamp: 'منذ ساعة', read: false },
    { id: 3, text: 'تم قبول طلب الإجازة للطالب محمد', timestamp: 'أمس', read: true },
];

const App: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  // --- ملاحظة: غيرت الدور الافتراضي إلى المشرف الأكاديمي لعرض الصفحة الجديدة ---
  const [currentUserRole, setCurrentUserRole] = useState<'ACADEMIC' | 'FIELD'>('FIELD');

  const markNotificationsAsRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const unreadCount = notifications.filter(n => !n.read).length;
  const toggleColorMode = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  
  const theme = useMemo(() => createTheme({
    direction: 'rtl',
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#dc004e' },
    },
    typography: {
      fontFamily: 'Cairo, sans-serif',
    },
  }), [mode]);

  const Layout = currentUserRole === 'ACADEMIC' ? AcademicSupervisorLayout : FieldSupervisorLayout;

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout unreadCount={unreadCount}>
            <Routes>
              <Route path="/" element={ currentUserRole === 'ACADEMIC' ? <AcademicSupervisorDashboard notifications={notifications} /> : <FieldSupervisorDashboard notifications={notifications} /> } />
              
              {/* مسارات المشرف الأكاديمي */}
              <Route path="/reports" element={<ReportsPage />} /> 
              {/* ==================== بداية التعديل 2: استخدام صفحة التقييمات هنا ==================== */}
              <Route path="/evaluations" element={<EvaluationsPage />} />
              {/* ==================== نهاية التعديل 2 ==================== */}

              {/* مسارات مشتركة */}
              <Route path="/students" element={<StudentsPage />} />
              <Route path="/notifications" element={<NotificationsPage notifications={notifications} onMarkAsRead={markNotificationsAsRead} />} />
              <Route path="/settings" element={<SettingsPage mode={mode} toggleColorMode={toggleColorMode} />} />

              {/* مسارات المشرف الميداني */}
              <Route path="/add-task" element={<AddTaskPage />} />
              <Route path="/student-reports" element={<StudentReportsPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
