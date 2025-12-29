// src/layouts/FieldSupervisorLayout.tsx (النسخة النهائية والمصححة)

import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import { Home, AddTask, Assessment, EventAvailable, FactCheck, Settings, Contacts } from '@mui/icons-material';
// ==================== بداية التعديل 1: استيراد useLocation ====================
import { Link, useLocation } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
// ==================== نهاية التعديل 1 ====================

const navItems = [
    { text: 'الرئيسية', icon: <Home color="primary" />, path: '/' },
    { text: 'إضافة مهمة', icon: <AddTask color="primary" />, path: '/add-task' },
    { text: 'تقارير الطلاب', icon: <Assessment color="primary" />, path: '/student-reports' },
    { text: 'الحضور والغياب', icon: <EventAvailable color="primary" />, path: '/attendance' },
    { text: 'التقييمات والملاحظات', icon: <FactCheck color="primary" />, path: '/evaluations' },
    { text: 'التواصل', icon: <Contacts color="primary" />, path: '/contact' },
    { text: 'الإعدادات', icon: <Settings color="primary" />, path: '/settings' },
];

const FieldSupervisorLayout: React.FC<{ children: React.ReactNode, unreadCount: number }> = ({ children, unreadCount }) => {
    
    // ==================== بداية التعديل 2: إضافة منطق الصفحة النشطة ====================
    const location = useLocation();
    // ==================== نهاية التعديل 2 ====================

    const drawerContent = (
        <>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                    المشرف الميداني
                </Typography>
            </Box>
            <Divider />
            
            <List>
                {navItems.map((item) => {
                    // ==================== بداية التعديل 3: التحقق من الصفحة النشطة ====================
                    const isActive = location.pathname === item.path;
                    // ==================== نهاية التعديل 3 ====================

                    return (
                        <ListItem key={item.text} disablePadding component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
                            {/* ==================== بداية التعديل 4: تطبيق التظليل على العنصر النشط ==================== */}
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
                            {/* ==================== نهاية التعديل 4 ==================== */}
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

export default FieldSupervisorLayout;
