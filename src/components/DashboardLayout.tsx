// src/components/DashboardLayout.tsx

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
    AppBar, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
    ListItemText, Toolbar, Typography, Avatar, Badge, CssBaseline
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const drawerWidth = 240;

const DashboardLayout: React.FC<{ children: React.ReactNode; unreadCount: number; }> = ({ children, unreadCount }) => {
    const location = useLocation();

    const menuItems = [
        { text: 'لوحة التحكم', icon: <DashboardOutlinedIcon />, path: '/' },
        { text: 'إدارة الطلاب', icon: <PeopleOutlineIcon />, path: '/students' },
        { text: 'مراجعة التقارير', icon: <AssignmentOutlinedIcon />, path: '/reports' },
        { 
            text: 'الإشعارات', 
            icon: (
                <Badge badgeContent={unreadCount} color="error">
                    <NotificationsNoneOutlinedIcon />
                </Badge>
            ), 
            path: '/notifications' 
        },
        { text: 'الإعدادات', icon: <SettingsOutlinedIcon />, path: '/settings' },
    ];

    const drawerContent = (
        <div>
            <Toolbar sx={{ justifyContent: 'center', mb: 2, mt: 1 }}>
                <Typography variant="h5" noWrap sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                    نظام التدريب
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
                            {/* ==================== بداية التعديل: تغيير لون الأيقونة ==================== */}
                            <ListItemIcon sx={{ color: 'primary.main' }}>
                                {item.icon}
                            </ListItemIcon>
                            {/* ==================== نهاية التعديل ==================== */}
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar 
                position="fixed" 
                sx={{ 
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'primary.main',
                    color: 'white',
                    boxShadow: 'none'
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" noWrap>
                        نظام إدارة التدريب الميداني
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography>د. أحمد محمد</Typography>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>أ</Avatar>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
