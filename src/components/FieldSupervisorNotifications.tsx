// src/components/FieldSupervisorNotifications.tsx

import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

interface NotificationsProps {
    notifications: Array<{ id: number; text: string; timestamp: string; read: boolean; }>;
}

const FieldSupervisorNotifications: React.FC<NotificationsProps> = ({ notifications }) => {
    const latest = notifications.slice(0, 4); // يمكن عرض عدد مختلف هنا إذا أردت

    return (
        <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                آخر الإشعارات
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
                {latest.length > 0 ? (
                    latest.map((notification, index) => (
                        <React.Fragment key={notification.id}>
                            <ListItem>
                                <ListItemText
                                    primary={notification.text}
                                    secondary={notification.timestamp}
                                    primaryTypographyProps={{ fontWeight: notification.read ? 'normal' : 'bold', fontSize: '0.9rem' }}
                                />
                            </ListItem>
                            {index < latest.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))
                ) : (
                    <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
                        لا توجد إشعارات جديدة.
                    </Typography>
                )}
            </List>
        </Paper>
    );
};

export default FieldSupervisorNotifications;
