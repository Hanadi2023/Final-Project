// src/App.tsx

import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

// استيراد الواجهات والصفحات
import AcademicSupervisorLayout from './layouts/AcademicSupervisorLayout';
import FieldSupervisorLayout from './layouts/FieldSupervisorLayout';
import AcademicSupervisorDashboard from './pages/AcademicSupervisorDashboard';
import FieldSupervisorDashboard from './pages/FieldSupervisorDashboard';
import ReportsPage from './pages/ReportsPage';
import NotificationsPage from './pages/NotificationsPage';
import StudentsPage from './pages/StudentsPage';
import SettingsPage from './pages/SettingsPage';
import AddTaskPage from './pages/AddTaskPage';
import AttendancePage from './pages/AttendancePage';
// import StudentReportsPage from './pages/StudentReportsPage'; // <-- لن نستخدم هذا مؤقتاً
import EvaluationsPage from './pages/EvaluationsPage';
import FieldReports from './pages/FieldReports'; // <-- استيراد الصفحة الجديدة والنظيفة

const cacheRtl = createCache({ key: 'muirtl', stylisPlugins: [rtlPlugin] });

export interface DetailedNotification {
    id: number;
    studentName: string;
    studentMajor: string;
    actionText: string;
    timestamp: string;
    read: boolean;
    link: string;
}

const initialNotifications: DetailedNotification[] = [
    { id: 1, studentName: 'علي إبراهيم', studentMajor: 'هندسة برمجيات', actionText: 'قام بتسليم مهمة "التقرير الأسبوعي الأول".', timestamp: 'منذ 5 دقائق', read: false, link: '/student-reports/1' },
    { id: 2, studentName: 'نسيبة عبدالرحمن', studentMajor: 'علوم حاسب', actionText: 'قامت بتحديث تقرير "تحليل النظام".', timestamp: 'منذ ساعة', read: false, link: '/student-reports/2' },
    { id: 3, studentName: 'فاطمة محسن', studentMajor: 'نظم معلومات', actionText: 'تم تقييم مهمتها "تصميم الواجهات".', timestamp: 'أمس', read: true, link: '/evaluations/3' },
    { id: 4, studentName: 'آزاد شائع', studentMajor: 'هندسة برمجيات', actionText: 'قام بتسليم مهمة "بناء قاعدة البيانات".', timestamp: 'منذ يومين', read: true, link: '/student-reports/4' },
];

const App: React.FC = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [currentUserRole, setCurrentUserRole] = useState<'ACADEMIC' | 'FIELD'>('FIELD');

    const toggleReadStatus = (id: number) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n =>
                n.id === id ? { ...n, read: !n.read } : n
            )
        );
    };

    const handleNotificationClick = (id: number, link: string) => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n =>
                n.id === id ? { ...n, read: true } : n
            )
        );
        console.log(`سيتم الانتقال إلى: ${link}`);
    };
    
    const markAllAsRead = () => {
        setNotifications(currentNotifications =>
            currentNotifications.map(n => ({ ...n, read: true }))
        );
    };

    const unreadCount = notifications.filter(n => !n.read).length;
    const toggleColorMode = () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  
    const theme = useMemo(() => createTheme({
        direction: 'rtl',
        palette: { mode, primary: { main: '#1976d2' }, secondary: { main: '#dc004e' } },
        typography: { fontFamily: 'Cairo, sans-serif' },
    }), [mode]);

    const Layout = currentUserRole === 'ACADEMIC' ? AcademicSupervisorLayout : FieldSupervisorLayout;

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Layout unreadCount={unreadCount}>
                        <Routes>
                            <Route path="/" element={ 
                                currentUserRole === 'ACADEMIC' 
                                ? <AcademicSupervisorDashboard notifications={notifications} /> 
                                : <FieldSupervisorDashboard 
                                    notifications={notifications} 
                                    onToggleRead={toggleReadStatus} 
                                    onNotificationClick={handleNotificationClick} 
                                  /> 
                            } />
                            
                            <Route path="/reports" element={<ReportsPage />} /> 
                            <Route path="/evaluations" element={<EvaluationsPage />} />
                            <Route path="/students" element={<StudentsPage />} />
                            
                            <Route path="/notifications" element={<NotificationsPage notifications={notifications} onMarkAsRead={markAllAsRead} />} />

                            <Route path="/settings" element={<SettingsPage mode={mode} toggleColorMode={toggleColorMode} />} />
                            <Route path="/add-task" element={<AddTaskPage />} />
                            
                            {/* ==================== هذا هو السطر المصحح ==================== */}
                            <Route path="/student-reports" element={<FieldReports />} />
                            {/* ========================================================== */}

                            <Route path="/attendance" element={<AttendancePage />} />
                        </Routes>
                    </Layout>
                </Router>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default App;
