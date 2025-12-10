// src/components/LatestNotifications.tsx

import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Box, Divider, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

interface LatestNotificationsProps {
    notifications: Array<{ id: number; text: string; timestamp: string; read: boolean; }>;
}

const LatestNotifications: React.FC<LatestNotificationsProps> = ({ notifications }) => {
    const latest = notifications.slice(0, 3);

    return (
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                آخر الإشعارات
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List sx={{ flexGrow: 1 }}>
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
            
            <Box sx={{ mt: 'auto', pt: 2, textAlign: 'center' }}>
                <Button
                    component={RouterLink}
                    to="/notifications"
                    endIcon={<ArrowForwardIcon />}
                >
                    عرض كل الإشعارات
                </Button>
            </Box>
        </Paper>
    );
};

export default LatestNotifications;
