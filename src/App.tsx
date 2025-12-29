// src/App.tsx (النسخة النهائية والمصححة)

import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react'; 
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

// ... (باقي استيرادات الصفحات لا تتغير)
import AcademicSupervisorLayout from './layouts/AcademicSupervisorLayout';
import FieldSupervisorLayout from './layouts/FieldSupervisorLayout';
import AcademicSupervisorDashboard from './pages/AcademicSupervisorDashboard';
import FieldSupervisorDashboard from './pages/FieldSupervisorDashboard';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import ContactPage from './pages/ContactPage';
import AcademicReportsPage from './pages/AcademicReportsPage';
import StudentsPage from './pages/StudentsPage';
import AddTaskPage from './pages/AddTaskPage';
import AttendancePage from './pages/AttendancePage';
import FieldTasksPage from './pages/FieldTasksPage';
import EvaluationsPage from './pages/EvaluationsPage';


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
    { id: 1, studentName: 'علي إبراهيم', studentMajor: 'هندسة برمجيات', actionText: 'قام بتسليم مهمة "التقرير الأسبوعي الأول".', timestamp: 'منذ 5 دقائق', read: false, link: '/field/tasks' },
    { id: 2, studentName: 'نسيبة عبدالرحمن', studentMajor: 'علوم حاسب', actionText: 'قامت بتحديث تقرير "تحليل النظام".', timestamp: 'منذ ساعة', read: false, link: '/academic/reports' },
    { id: 3, studentName: 'فاطمة محسن', studentMajor: 'نظم معلومات', actionText: 'تم تقييم مهمتها "تصميم الواجهات".', timestamp: 'أمس', read: true, link: '/academic/reports' },
];

const App: React.FC = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [currentUserRole, setCurrentUserRole] = useState<'ACADEMIC' | 'FIELD'>('ACADEMIC');

    const toggleReadStatus = (id: number) => { /* ... */ };
    const handleNotificationClick = (id: number, link: string) => { /* ... */ };
    
    // ==================== بداية التعديل ====================
    const markAllAsRead = () => {
        // إنشاء نسخة جديدة من مصفوفة الإشعارات مع تغيير 'read' إلى 'true'
        const allRead = notifications.map(n => ({ ...n, read: true }));
        // تحديث الحالة بالنسخة الجديدة
        setNotifications(allRead);
    };
    // ==================== نهاية التعديل ====================

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
                            {/* --- المسارات المشتركة --- */}
                            <Route path="/" element={ 
                                currentUserRole === 'ACADEMIC' 
                                ? <AcademicSupervisorDashboard notifications={notifications} /> 
                                : <FieldSupervisorDashboard notifications={notifications} onToggleRead={toggleReadStatus} onNotificationClick={handleNotificationClick} /> 
                            } />
                            <Route path="/notifications" element={<NotificationsPage notifications={notifications} onMarkAsRead={markAllAsRead} />} />
                            <Route path="/settings" element={<SettingsPage mode={mode} toggleColorMode={toggleColorMode} />} />
                            <Route path="/contact" element={<ContactPage />} />

                            {/* --- مسارات المشرف الأكاديمي --- */}
                            <Route path="/academic/reports" element={<AcademicReportsPage />} />
                            <Route path="/academic/students" element={<StudentsPage />} />

                            {/* --- مسارات المشرف الميداني --- */}
                            <Route path="/field/tasks" element={<FieldTasksPage />} />
                            <Route path="/add-task" element={<AddTaskPage />} />
                            <Route path="/attendance" element={<AttendancePage />} />
                            <Route path="/evaluations" element={<EvaluationsPage />} />
                        </Routes>
                    </Layout>
                </Router>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default App;
