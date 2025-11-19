// src/pages/NotificationsPage.tsx

import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box, Divider } from '@mui/material';

// تعريف نوع بيانات الإشعار
interface Notification {
    id: number;
    text: string;
    timestamp: string;
    read: boolean;
}

// تعريف الخصائص (Props) التي سيستقبلها المكون
interface NotificationsPageProps {
    notifications: Notification[];
    onMarkAsRead: () => void;
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({ notifications, onMarkAsRead }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    الإشعارات
                </Typography>
                <Button 
                    variant="contained" 
                    onClick={onMarkAsRead}
                    disabled={unreadCount === 0}
                >
                    تعيين الكل كمقروء
                </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ p: 0 }}> {/* p: 0 لإزالة الحشو الافتراضي للقائمة */}
                {notifications.length > 0 ? (
                    // ==================== بداية التعديل ====================
                    notifications.map((notification, index) => (
                        <React.Fragment key={notification.id}>
                            <ListItem 
                                sx={{ 
                                    // إزالة الهامش السفلي من هنا لأن الفاصل سيقوم بالمهمة
                                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                                    borderRadius: 1,
                                    transition: 'background-color 0.3s',
                                    py: 1.5 // إضافة حشو عمودي لتحسين المظهر
                                }}
                            >
                                <ListItemText
                                    primary={notification.text}
                                    secondary={notification.timestamp}
                                />
                            </ListItem>
                            {/* نضيف الفاصل بعد كل عنصر ما عدا العنصر الأخير */}
                            {index < notifications.length - 1 && <Divider />}
                        </React.Fragment>
                    ))
                    // ==================== نهاية التعديل ====================
                ) : (
                    <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                        لا توجد إشعارات لعرضها.
                    </Typography>
                )}
            </List>
        </Paper>
    );
};

export default NotificationsPage;
