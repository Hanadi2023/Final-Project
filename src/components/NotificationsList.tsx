// src/components/NotificationsList.tsx

import React from 'react';
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Box,
    Button // <-- 1. استيراد مكون الزر
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // <-- 2. استيراد مكون الرابط
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

interface Notification {
    id: number;
    text: string;
    time: string;
    Icon: React.ElementType;
    color: string;
}

const notifications: Notification[] = [
    { id: 1, text: 'تقرير جديد من علي إبراهيم', time: 'قبل ساعة', Icon: ReportProblemOutlinedIcon, color: 'primary.main' },
    { id: 2, text: 'رسالة من فاطمة محسن', time: 'قبل ساعتين', Icon: MailOutlineIcon, color: 'primary.main' },
    { id: 3, text: 'أكملت نسيبة عبدالرحمن التدريب', time: 'قبل 3 ساعات', Icon: CheckCircleOutlineIcon, color: 'primary.main' },
];

const NotificationsList: React.FC = () => {
    return (
        // 3. تعديل بسيط في Paper لضمان التخطيط الصحيح
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                آخر الإشعارات
            </Typography>
            {/* 4. جعل القائمة قابلة للتمرير وتأخذ المساحة المتاحة */}
            <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {notifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemIcon sx={{ color: notification.color, minWidth: 'auto', mt: 0.5, mr: 1.5 }}>
                                <notification.Icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={notification.text}
                                secondary={notification.time}
                            />
                        </ListItem>
                        {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                ))}
            </List>
            {/* ==================== بداية الإضافة الجديدة ==================== */}
            {/* 5. إضافة زر "عرض الكل" في الأسفل */}
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                <Button 
                    fullWidth 
                    variant="text" 
                    component={RouterLink} 
                    to="/notifications"
                >
                    عرض كل الإشعارات
                </Button>
            </Box>
            {/* ==================== نهاية الإضافة الجديدة ==================== */}
        </Paper>
    );
};

export default NotificationsList;
