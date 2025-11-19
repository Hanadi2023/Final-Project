// src/App.tsx

import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

import DashboardLayout from './components/DashboardLayout';
import SummaryCards from './components/SummaryCards';
import StudentStatusTable from './components/StudentsStatusTable';
import LatestNotifications from './components/LatestNotifications';
import ReportsPage from './pages/ReportsPage';
import NotificationsPage from './pages/NotificationsPage';
import StudentsPage from './pages/StudentsPage';
import SettingsPage from './pages/SettingsPage';

const cacheRtl = createCache({ key: 'muirtl', stylisPlugins: [rtlPlugin] });

const initialNotifications = [
    { id: 1, text: "قام الطالب 'علي إبراهيم' بتسليم مهمة.", timestamp: 'منذ 5 دقائق', read: false },
    { id: 2, text: "قام المشرف الميداني بإرسال تقييم نهائي.", timestamp: 'منذ ساعتين', read: false },
    { id: 3, text: "لديك تقرير جديد من 'نسيبة عبدالرحمن' بانتظار المراجعة.", timestamp: 'منذ يوم', read: true },
];

const App: React.FC = () => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [notifications, setNotifications] = useState(initialNotifications);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const markNotificationsAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const theme = useMemo(() => createTheme({
        direction: 'rtl',
        palette: {
            mode,
            ...(mode === 'light'
                ? { primary: { main: '#1976d2' }, background: { default: '#f4f6f8', paper: '#ffffff' } }
                : { primary: { main: '#90caf9' }, background: { default: '#121212', paper: '#1e1e1e' } }),
        },
        typography: { fontFamily: 'Tajawal, sans-serif', fontWeightBold: 700 },
    }), [mode]);

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <DashboardLayout unreadCount={unreadCount}>
                        <Routes>
                            <Route path="/" element={
                                <>
                                    <SummaryCards />
                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 4 }}>
                                        <Box sx={{ width: '100%', flex: '2 1 0' }}><StudentStatusTable /></Box>
                                        <Box sx={{ width: '100%', flex: '1 1 0' }}><LatestNotifications notifications={notifications} /></Box>
                                    </Box>
                                </>
                            } />
                            <Route path="/reports" element={<ReportsPage />} />
                            <Route path="/notifications" element={<NotificationsPage notifications={notifications} onMarkAsRead={markNotificationsAsRead} />} />
                            <Route path="/students" element={<StudentsPage />} />
                            <Route path="/settings" element={<SettingsPage mode={mode} toggleColorMode={toggleColorMode} />} />
                        </Routes>
                    </DashboardLayout>
                </Router>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default App;
