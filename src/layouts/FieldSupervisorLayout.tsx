// src/layouts/FieldSupervisorLayout.tsx

import React from 'react';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import { Home, AddTask, Assessment, EventAvailable, FactCheck, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const navItems = [
    { text: 'الرئيسية', icon: <Home color="primary" />, path: '/' },
    { text: 'إضافة مهمة', icon: <AddTask color="primary" />, path: '/add-task' },
    { text: 'تقارير الطلاب', icon: <Assessment color="primary" />, path: '/reports' },
    { text: 'الحضور والغياب', icon: <EventAvailable color="primary" />, path: '/attendance' },
    { text: 'التقييمات والملاحظات', icon: <FactCheck color="primary" />, path: '/evaluations' },
    { text: 'الإعدادات', icon: <Settings color="primary" />, path: '/settings' },
];

const FieldSupervisorLayout: React.FC<{ children: React.ReactNode, unreadCount: number }> = ({ children, unreadCount }) => {
    const drawerContent = (
        <>
            {/* ==================== بداية التنفيذ الصحيح ==================== */}
            {/* هذا الصندوق سيحتوي على العنوان المستقل */}
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                    المشرف الميداني
                </Typography>
            </Box>
            <Divider />
            {/* ==================== نهاية التنفيذ الصحيح ==================== */}
            
            {/* قائمة العناصر تبدأ من هنا */}
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
        </>
    );

    return (
        <DashboardLayout drawerContent={drawerContent} unreadCount={unreadCount}>
            {children}
        </DashboardLayout>
    );
};

export default FieldSupervisorLayout;
