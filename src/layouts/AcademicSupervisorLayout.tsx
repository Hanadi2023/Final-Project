// src/layouts/AcademicSupervisorLayout.tsx (النسخة النهائية والمصححة)

import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import { Home, Assessment, People, Notifications, Settings } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

// ==================== بداية التعديل 1: تحديث المسارات لتكون واضحة ====================
const navItems = [
    { text: 'الرئيسية', icon: <Home color="primary" />, path: '/' },
    // استخدام مسارات واضحة ومخصصة للمشرف الأكاديمي
    { text: 'التقارير', icon: <Assessment color="primary" />, path: '/academic/reports' },
    { text: 'إدارة الطلاب', icon: <People color="primary" />, path: '/academic/students' },
    // المسارات المشتركة تبقى كما هي
    { text: 'الإشعارات', icon: <Notifications color="primary" />, path: '/notifications' },
    { text: 'الإعدادات', icon: <Settings color="primary" />, path: '/settings' },
];
// ==================== نهاية التعديل 1 ====================

const AcademicSupervisorLayout: React.FC<{ children: React.ReactNode, unreadCount: number }> = ({ children, unreadCount }) => {
    const location = useLocation();

    const drawerContent = (
        <>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                    المشرف الأكاديمي
                </Typography>
            </Box>
            <Divider />
            
            <List>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
                            <ListItemButton
                                selected={isActive}
                                sx={{
                                    ...(isActive && {
                                        borderRight: '4px solid',
                                        borderColor: 'primary.main',
                                        backgroundColor: 'action.selected'
                                    })
                                }}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );

    return (
        <DashboardLayout drawerContent={drawerContent} unreadCount={unreadCount}>
            {children}
        </DashboardLayout>
    );
};

export default AcademicSupervisorLayout;
