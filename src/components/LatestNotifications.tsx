// src/components/LatestNotifications.tsx

import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface Notification {
    id: number;
    text: string;
    timestamp: string;
    read: boolean;
}

interface LatestNotificationsProps {
    notifications: Notification[];
}

const LatestNotifications: React.FC<LatestNotificationsProps> = ({ notifications }) => {
    const latestUnread = notifications.filter(n => !n.read).slice(0, 3);
    const notificationsToShow = latestUnread.length > 0 ? latestUnread : notifications.slice(0, 3);

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom>آخر الإشعارات</Typography>
            <Divider sx={{ mb: 1 }} />
            <List sx={{ flexGrow: 1, py: 0 }}> {/* py: 0 لإزالة الحشو العمودي الافتراضي */}
                {notificationsToShow.length > 0 ? (
                    // ==================== بداية التعديل ====================
                    notificationsToShow.map((notification, index) => (
                        // نستخدم React.Fragment للسماح بوجود عنصرين (ListItem و Divider) داخل map
                        <React.Fragment key={notification.id}>
                            <ListItem sx={{ py: 1.5 }}> {/* إضافة حشو عمودي بسيط */}
                                <ListItemText
                                    primary={notification.text}
                                    secondary={notification.timestamp}
                                    primaryTypographyProps={{
                                        style: {
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }
                                    }}
                                />
                            </ListItem>
                            {/* نضيف الفاصل بعد كل عنصر ما عدا العنصر الأخير */}
                            {index < notificationsToShow.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))
                    // ==================== نهاية التعديل ====================
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Typography color="text.secondary">لا توجد إشعارات جديدة.</Typography>
                    </Box>
                )}
            </List>
            <Divider sx={{ mt: 1 }} />
            <Button component={RouterLink} to="/notifications" fullWidth sx={{ mt: 1 }}>
                عرض كل الإشعارات
            </Button>
        </Paper>
    );
};

export default LatestNotifications;
