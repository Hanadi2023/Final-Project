// src/layouts/AcademicSupervisorLayout.tsx
import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Assessment, People, Notifications, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const navItems = [
    { text: 'الرئيسية', icon: <Home />, path: '/' },
    { text: 'التقارير', icon: <Assessment />, path: '/reports' },
    { text: 'الطلاب', icon: <People />, path: '/students' },
    { text: 'الإشعارات', icon: <Notifications />, path: '/notifications' },
    { text: 'الإعدادات', icon: <Settings />, path: '/settings' },
];

const AcademicSupervisorLayout: React.FC<{ children: React.ReactNode, unreadCount: number }> = ({ children, unreadCount }) => {
    const drawerContent = (
        <List>
            {navItems.map((item) => (
                <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
                    <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );

    return (
        <DashboardLayout drawerContent={drawerContent} unreadCount={unreadCount}>
            {children}
        </DashboardLayout>
    );
};

export default AcademicSupervisorLayout;
