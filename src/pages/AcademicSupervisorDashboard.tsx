// src/pages/AcademicSupervisorDashboard.tsx

import React, { useState } from 'react';
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
    Badge
} from '@mui/material';
import TaskCard from '../components/TaskCard';
import { DetailedNotification } from '../App'; // <-- استيراد النوع الصحيح

// --- (أنواع وبيانات المهام لا تغيير فيها) ---
interface Task {
    id: number;
    title: string;
    studentName: string;
    description: string;
    submissionDate: string;
    status: 'تم التسليم' | 'بانتظار المراجعة' | 'متأخر' | 'تم التقييم';
}
const initialTasksData: Task[] = [
    { id: 1, studentName: 'علي إبراهيم', title: 'التقرير الأسبوعي الأول', description: 'مراجعة التقرير الأسبوعي الأول.', submissionDate: '2025-11-15', status: 'تم التسليم' },
    { id: 2, studentName: 'نسيبة عبدالرحمن', title: 'تقرير تحليل النظام', description: 'مراجعة تحليل النظام.', submissionDate: '2025-11-14', status: 'بانتظار المراجعة' },
];

// ==================== بداية الإصلاح: تحديث الخصائص ====================
interface Props {
    notifications: DetailedNotification[];
}

const AcademicSupervisorDashboard: React.FC<Props> = ({ notifications }) => {
// ==================== نهاية الإصلاح ====================
    const [tasks, setTasks] = useState<Task[]>(initialTasksData);

    const handleUpdateTask = (taskId: number, rating: number, notes: string) => {
        console.log(`تحديث المهمة ${taskId} بالتقييم ${rating} والملاحظات: ${notes}`);
        setTasks(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, status: 'تم التقييم' } : task
            )
        );
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '2 1 600px' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    المهام المستلمة حديثاً
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {tasks.map((task) => (
                        <Box key={task.id} sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 8px)', lg: 'calc(33.333% - 11px)' } }}>
                            <TaskCard task={task} onUpdate={handleUpdateTask} />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* ==================== بداية الإصلاح: تحديث عرض الإشعارات ==================== */}
            <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    آخر الإشعارات
                </Typography>
                <Paper variant="outlined">
                    <List sx={{ padding: 0 }}>
                        {notifications.slice(0, 4).map((notification, index) => ( // عرض 4 إشعارات كحد أقصى
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
                                {index < notifications.slice(0, 4).length - 1 && <Divider component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Box>
            {/* ==================== نهاية الإصلاح ==================== */}
        </Box>
    );
};

export default AcademicSupervisorDashboard;
