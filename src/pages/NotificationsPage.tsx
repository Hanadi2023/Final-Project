// src/pages/NotificationsPage.tsx

import React from 'react';
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Box,
    Badge,
    Button
} from '@mui/material';
import { DetailedNotification } from '../App'; // <-- استيراد النوع الصحيح من App.tsx

// ==================== بداية الإصلاح النهائي ====================
// الخصائص الآن تتطابق تماماً مع ما يتم إرساله من App.tsx
interface Props {
    notifications: DetailedNotification[];
    onMarkAsRead: () => void;
}

const NotificationsPage: React.FC<Props> = ({ notifications, onMarkAsRead }) => {
// ==================== نهاية الإصلاح النهائي ====================
    return (
        <Paper sx={{ p: 3, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    كل الإشعارات
                </Typography>
                <Button variant="text" onClick={onMarkAsRead}>
                    تمييز الكل كمقروء
                </Button>
            </Box>
            
            <List sx={{ padding: 0 }}>
                {notifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                        <ListItem alignItems="flex-start" sx={{ backgroundColor: notification.read ? 'transparent' : 'action.hover' }}>
                            <ListItemAvatar>
                                <Badge variant="dot" color="error" invisible={notification.read} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                                    <Avatar>{notification.studentName.charAt(0)}</Avatar>
                                </Badge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography component="span" variant="body2" fontWeight={notification.read ? 'normal' : 'bold'}>
                                        <Box component="span" fontWeight="bold">{notification.studentName}</Box>
                                        <Box component="span" color="text.secondary" sx={{ mx: 0.5 }}>({notification.studentMajor})</Box>
                                        {notification.actionText}
                                    </Typography>
                                }
                                secondary={notification.timestamp}
                            />
                        </ListItem>
                        {index < notifications.length - 1 && <Divider component="li" />}
                    </React.Fragment>
                ))}
            </List>
        </Paper>
    );
};

export default NotificationsPage;
