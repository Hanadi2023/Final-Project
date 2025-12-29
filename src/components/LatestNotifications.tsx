// src/components/LatestNotifications.tsx (النسخة النهائية والمصححة)

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
    Button,
    Alert,
    Chip // ==================== بداية الإصلاح: إضافة Chip إلى قائمة الاستيراد ====================
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { DetailedNotification } from '../App';

interface Props {
    notifications: DetailedNotification[];
}

const LatestNotifications: React.FC<Props> = ({ notifications }) => {
    const unreadNotifications = notifications.filter(n => !n.read);
    const latestUnread = unreadNotifications.slice(0, 5);

    return (
        <Paper variant="outlined">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                    آخر الإشعارات (غير المقروءة)
                </Typography>
                <Chip label={unreadNotifications.length} color="error" size="small" />
            </Box>
            <Divider />
            
            <List sx={{ padding: 0 }}>
                {latestUnread.length > 0 ? (
                    latestUnread.map((notification, index) => (
                        <React.Fragment key={notification.id}>
                            <ListItem 
                                alignItems="flex-start" 
                                sx={{ 
                                    backgroundColor: 'action.hover',
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge 
                                        variant="dot" 
                                        color="error" 
                                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    >
                                        <Avatar>{notification.studentName.charAt(0)}</Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography component="span" variant="body2" fontWeight="bold">
                                            {notification.studentName}
                                            <Box component="span" color="text.secondary" fontWeight="normal" sx={{ mx: 0.5 }}>
                                                {notification.actionText}
                                            </Box>
                                        </Typography>
                                    }
                                    secondary={notification.timestamp}
                                />
                            </ListItem>
                            {index < latestUnread.length - 1 && <Divider component="li" />}
                        </React.Fragment>
                    ))
                ) : (
                    <Box sx={{ p: 3 }}>
                        <Alert severity="success" variant="outlined">
                            لا توجد إشعارات جديدة. أنت على اطلاع دائم!
                        </Alert>
                    </Box>
                )}
            </List>

            <Divider />
            <Box sx={{ p: 2, textAlign: 'center' }}>
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
