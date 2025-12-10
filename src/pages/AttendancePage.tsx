// src/pages/AttendancePage.tsx

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Button,
    List,
    ListItem,
    ListItemText,
    Avatar,
    ToggleButtonGroup,
    ToggleButton,
    TextField,
    Divider,
    Snackbar,
    Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// ==================== بداية الإصلاح: إضافة البيانات والنوع الصحيح ====================
interface Student {
    id: number;
    name: string;
    avatar: string;
}

const supervisedStudents: Student[] = [
    { id: 1, name: 'علي إبراهيم', avatar: 'A' },
    { id: 2, name: 'نسيبة عبدالرحمن', avatar: 'N' },
    { id: 3, name: 'فاطمة محسن', avatar: 'F' },
    { id: 4, name: 'آزاد شائع', avatar: 'A' },
    { id: 5, name: 'هنادي أحمد', avatar: 'H' },
    { id: 6, name: 'محمد قاسم', avatar: 'M' },
];
// ==================== نهاية الإصلاح ====================

type AttendanceStatus = 'present' | 'absent' | 'permission';

const AttendancePage: React.FC = () => {
    const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>({});
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleStatusChange = (studentId: number, newStatus: AttendanceStatus | null) => {
        if (newStatus) {
            setAttendance(prev => ({ ...prev, [studentId]: newStatus }));
        }
    };

    const handleSaveAttendance = () => {
        const attendanceData = { date: attendanceDate, records: attendance };
        // [ للربط مع الباكاند ]: هنا يجب إرسال الطلب لحفظ سجل الحضور في قاعدة البيانات
        console.log("بيانات الحضور المرسلة:", attendanceData);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const allStudentsMarked = Object.keys(attendance).length === supervisedStudents.length;

    return (
        <Paper sx={{ p: 3, maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                تسجيل الحضور والغياب
            </Typography>

            <TextField
                fullWidth
                label="تاريخ الحضور"
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
            />

            <List>
                {supervisedStudents.map((student) => (
                    <React.Fragment key={student.id}>
                        <ListItem sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{student.avatar}</Avatar>
                                <ListItemText primary={student.name} />
                            </Box>
                            <ToggleButtonGroup
                                value={attendance[student.id] || null}
                                exclusive
                                onChange={(event, newStatus) => handleStatusChange(student.id, newStatus)}
                                size="small"
                            >
                                <ToggleButton value="present" color="success">
                                    <CheckCircleIcon sx={{ mr: 1 }} />
                                    حاضر
                                </ToggleButton>
                                <ToggleButton value="absent" color="error">
                                    <CancelIcon sx={{ mr: 1 }} />
                                    غائب
                                </ToggleButton>
                                <ToggleButton value="permission" color="warning">
                                    <AccessTimeIcon sx={{ mr: 1 }} />
                                    مستأذن
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>

            <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
                onClick={handleSaveAttendance}
                disabled={!allStudentsMarked}
            >
                حفظ سجل الحضور
            </Button>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    تم حفظ سجل الحضور بنجاح!
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default AttendancePage;
