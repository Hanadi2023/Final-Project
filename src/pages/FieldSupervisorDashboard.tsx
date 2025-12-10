// src/pages/FieldSupervisorDashboard.tsx

import React from 'react';
import {
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Box,
    Badge,
    IconButton,
    Tooltip
} from '@mui/material';
import FieldSummaryCards from '../components/FieldSummaryCards';
import { People, Description, RateReview, CheckCircle, MarkEmailRead, MarkEmailUnread } from '@mui/icons-material';
import { DetailedNotification } from '../App'; // <-- استيراد النوع من App.tsx

// ==================== بداية التحسينات ====================
// 1. تعريف الخصائص التي سيستقبلها المكون
interface Props {
    notifications: DetailedNotification[];
    onToggleRead: (id: number) => void;
    onNotificationClick: (id: number, link: string) => void;
}

// 2. البيانات الوهمية للبطاقات (تبقى هنا لأنها خاصة بهذه الصفحة فقط)
const summaryCardsData = [
    { title: "الطلاب المتدربون", value: 12, icon: <People />, color: "#1976d2" },
    { title: "التقارير المستلمة", value: 8, icon: <Description />, color: "#388e3c" },
    { title: "تقارير قيد المراجعة", value: 3, icon: <RateReview />, color: "#f57c00" },
    { title: "التقارير المعتمدة", value: 5, icon: <CheckCircle />, color: "#d32f2f" },
];

// 3. المكون الآن يستقبل الخصائص من App.tsx
const FieldSupervisorDashboard: React.FC<Props> = ({ notifications, onToggleRead, onNotificationClick }) => {
    // لم يعد هناك أي "حالة" (useState) داخل هذا المكون
    // ==================== نهاية التحسينات ====================

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ mb: 4 }}>
                <FieldSummaryCards cards={summaryCardsData} />
            </Box>

            <Typography variant="h5" gutterBottom fontWeight="bold">
                آخر الإشعارات
            </Typography>
            <Paper variant="outlined">
                <List sx={{ padding: 0 }}>
                    {notifications.map((notification, index) => (
                        <React.Fragment key={notification.id}>
                            <ListItem
                                secondaryAction={
                                    <Tooltip title={notification.read ? "تمييز كغير مقروء" : "تمييز كمقروء"}>
                                        {/* استدعاء الدالة من الـ props */}
                                        <IconButton edge="end" onClick={(e) => { e.stopPropagation(); onToggleRead(notification.id); }}>
                                            {notification.read ? <MarkEmailUnread fontSize="small" /> : <MarkEmailRead fontSize="small" color="primary" />}
                                        </IconButton>
                                    </Tooltip>
                                }
                                sx={{
                                    backgroundColor: notification.read ? 'transparent' : 'action.hover',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'action.selected'
                                    }
                                }}
                                // استدعاء الدالة من الـ props
                                onClick={() => onNotificationClick(notification.id, notification.link)}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        variant="dot"
                                        color="error"
                                        invisible={notification.read}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    >
                                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                                            {notification.studentName.charAt(0)}
                                        </Avatar>
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
        </Box>
    );
};

export default FieldSupervisorDashboard;
