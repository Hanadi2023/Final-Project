// src/pages/FieldSupervisorDashboard.tsx
import React, { useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Box, Badge } from '@mui/material';
import TaskCard from '../components/TaskCard';

interface Task {
    id: number;
    title: string;
    studentName: string;
    description: string;
    submissionDate: string;
    status: 'تم التسليم' | 'بانتظار المراجعة' | 'متأخر' | 'تم التقييم';
}
interface Notification {
    id: number;
    text: string;
    timestamp: string;
    read: boolean;
}

const initialTasksData: Task[] = [
    { id: 1, studentName: 'علي إبراهيم', title: 'التقرير الأسبوعي الأول', description: 'مراجعة التقرير الأسبوعي الأول.', submissionDate: '2025-11-15', status: 'تم التسليم' },
    { id: 2, studentName: 'نسيبة عبدالرحمن', title: 'تقرير تحليل النظام', description: 'مراجعة تحليل النظام.', submissionDate: '2025-11-14', status: 'بانتظار المراجعة' },
    { id: 3, studentName: 'فاطمة محسن', title: 'تصميم الواجهات', description: 'مراجعة تصميم واجهات المستخدم.', submissionDate: '2025-11-13', status: 'تم التقييم' },
];

interface Props {
    notifications: Notification[];
}

const FieldSupervisorDashboard: React.FC<Props> = ({ notifications }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasksData);

    const handleUpdateTask = (taskId: number, rating: number, notes: string) => {
        console.log(`تحديث المهمة ${taskId} بتقييم ${rating}`);
        setTasks(currentTasks => 
            currentTasks.map(task => 
                task.id === taskId ? { ...task, status: 'تم التقييم' } : task
            )
        );
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ flex: '2 1 600px' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">مهام الطلاب للمراجعة</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {tasks.map((task) => (
                        <Box key={task.id} sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 8px)', lg: 'calc(33.333% - 11px)' } }}>
                            <TaskCard task={task} onUpdate={handleUpdateTask} />
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box sx={{ flex: '1 1 300px' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">آخر الإشعارات</Typography>
                <Paper variant="outlined">
                    <List sx={{ padding: 0 }}>
                        {notifications.map((notification, index) => (
                            <React.Fragment key={notification.id}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Badge variant="dot" color="error" invisible={notification.read} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
                                            <Avatar>{notification.text.charAt(0)}</Avatar>
                                        </Badge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Typography component="span" variant="body2" fontWeight={notification.read ? 'normal' : 'bold'}>{notification.text}</Typography>}
                                        secondary={<Box component="span" sx={{ mt: 1, display: 'block', fontSize: '0.75rem' }}>{notification.timestamp}</Box>}
                                    />
                                </ListItem>
                                {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
                            </React.Fragment>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Box>
    );
};

export default FieldSupervisorDashboard;
