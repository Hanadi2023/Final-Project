// src/layouts/FieldSupervisorLayout.tsx

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, Toolbar, Typography, Avatar, Badge, CssBaseline, IconButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ArticleIcon from '@mui/icons-material/Article';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const drawerWidth = 240;

const menuItems = [
    { text: 'الرئيسية', icon: <HomeIcon />, path: '/' },
    { text: 'إضافة مهمة', icon: <AddTaskIcon />, path: '/add-task' },
    { text: 'تقارير الطلاب', icon: <ArticleIcon />, path: '/student-reports' },
    { text: 'الحضور والغياب', icon: <CoPresentIcon />, path: '/attendance' },
    { text: 'التقييمات والملاحظات', icon: <RuleFolderIcon />, path: '/evaluations' },
    { text: 'الإعدادات', icon: <SettingsOutlinedIcon />, path: '/settings' },
];

interface LayoutProps {
    children: React.ReactNode;
    unreadCount?: number;
}

const FieldSupervisorLayout: React.FC<LayoutProps> = ({ children, unreadCount = 0 }) => {
    const location = useLocation();

    const drawerContent = (
        <Box>
            <Toolbar sx={{ justifyContent: 'center', mb: 2, mt: 1 }}>
                <Typography variant="h5" noWrap sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    المشرف الميداني
                </Typography>
            </Toolbar>
            <List sx={{ px: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                        <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            selected={location.pathname === item.path}
                            sx={{
                                borderRadius: '8px',
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': { backgroundColor: 'primary.dark' },
                                    '& .MuiListItemIcon-root': { color: 'white' }
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* ==================== بداية تعديل الهيدر هنا ==================== */}
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                    // 1. تغيير لون الخلفية إلى الأزرق الأساسي للثيم
                    backgroundColor: 'primary.main',
                    // 2. تغيير لون النص إلى الأبيض ليتناسب مع الخلفية
                    color: 'white',
                    boxShadow: 'none' // إزالة الظل لأنه لم يعد ضرورياً
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* 3. إضافة العنوان المطلوب */}
                    <Typography variant="h6" noWrap>
                        نظام إدارة التدريب الميداني
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton color="inherit" component={RouterLink} to="/notifications">
                            <Badge badgeContent={unreadCount} color="error"><NotificationsNoneOutlinedIcon /></Badge>
                        </IconButton>
                        <Typography>م. عبدالله سالم</Typography>
                        {/* 4. تغيير لون الأفاتار ليتناسب مع الخلفية الجديدة */}
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>ع</Avatar>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* ==================== نهاية تعديل الهيدر ==================== */}
            <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: 'none' }, }}>
                {drawerContent}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default FieldSupervisorLayout;

