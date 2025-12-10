// src/pages/FieldReports.tsx  <-- انتبهي للاسم الجديد

import React, { useState } from 'react';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Button, Box, Modal, TextField, ToggleButtonGroup, ToggleButton, Snackbar, Alert,
    Divider, List, ListItem, ListItemText, Card, CardContent, CardHeader
} from '@mui/material';

// --- أنواع البيانات والبيانات الوهمية ---
interface Report {
    id: number;
    studentId: number;
    studentName: string;
    title: string;
    submissionDate: string;
    status: 'new' | 'approved' | 'rejected';
}
interface PastTask {
    id: number;
    title: string;
    status: 'approved' | 'rejected';
    grade?: number;
}
const initialReportsData: Report[] = [
    { id: 1, studentId: 1, studentName: 'علي إبراهيم', title: 'التقرير الأسبوعي الأول', submissionDate: '2025-11-15', status: 'new' },
    { id: 2, studentId: 2, studentName: 'نسيبة عبدالرحمن', title: 'تقرير تحليل النظام', submissionDate: '2025-11-14', status: 'rejected' },
    { id: 3, studentId: 1, studentName: 'علي إبراهيم', title: 'تصميم الواجهات', submissionDate: '2025-11-12', status: 'new' },
    { id: 4, studentId: 3, studentName: 'فاطمة محسن', title: 'التقرير النهائي', submissionDate: '2025-11-11', status: 'approved' },
];
const studentHistory: { [key: number]: PastTask[] } = {
    1: [ { id: 101, title: 'مهمة بناء المكونات', status: 'approved', grade: 5 }, { id: 102, title: 'مهمة اختبار الواجهات', status: 'approved', grade: 4 }, ],
    2: [ { id: 201, title: 'التقرير الأسبوعي الأول', status: 'rejected' }, { id: 202, title: 'التقرير الأسبوعي الثاني', status: 'approved', grade: 5 }, ],
};
// --- نهاية البيانات ---

const getStatusChip = (status: Report['status']) => {
    switch (status) {
        case 'new': return <Chip label="جديد" color="primary" size="small" />;
        case 'approved': return <Chip label="معتمد" color="success" size="small" />;
        case 'rejected': return <Chip label="مرفوض للتعديل" color="error" size="small" />;
        default: return <Chip label={status} size="small" />;
    }
};

const modalStyle = {
    position: 'absolute' as 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: '80%' }, maxWidth: '1000px', bgcolor: 'background.paper',
    boxShadow: 24, p: 4, borderRadius: 2,
};

const FieldReports: React.FC = () => { // <-- انتبهي للاسم الجديد
    const [reports, setReports] = useState(initialReportsData);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [feedback, setFeedback] = useState('');
    const [taskGrade, setTaskGrade] = useState<number | null>(4);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpenModal = (report: Report) => { setSelectedReport(report); setOpenModal(true); };
    const handleCloseModal = () => { setOpenModal(false); setSelectedReport(null); setFeedback(''); setTaskGrade(4); };
    const handleApproveReview = () => { if (!selectedReport) return; setReports(reports.map(r => r.id === selectedReport.id ? { ...r, status: 'approved' } : r)); setSnackbarMessage('تم اعتماد التقرير بنجاح!'); setSnackbarOpen(true); handleCloseModal(); };
    const handleRejectReview = () => { if (!selectedReport) return; setReports(reports.map(r => r.id === selectedReport.id ? { ...r, status: 'rejected' } : r)); setSnackbarMessage('تم إعادة التقرير للطالب للتعديل.'); setSnackbarOpen(true); handleCloseModal(); };
    const handleSnackbarClose = () => { setSnackbarOpen(false); };
    const handleGradeChange = (event: React.MouseEvent<HTMLElement>, newGrade: number | null) => { if (newGrade !== null) { setTaskGrade(newGrade); } };

    return (
        <Paper sx={{ p: 3, width: '100%' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">تقارير الطلاب (واجهة المشرف الميداني)</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>اسم الطالب</TableCell>
                            <TableCell>عنوان التقرير</TableCell>
                            <TableCell>تاريخ التسليم</TableCell>
                            <TableCell>الحالة</TableCell>
                            <TableCell>إجراء</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id} hover>
                                <TableCell>{report.studentName}</TableCell>
                                <TableCell>{report.title}</TableCell>
                                <TableCell>{report.submissionDate}</TableCell>
                                <TableCell>{getStatusChip(report.status)}</TableCell>
                                <TableCell><Button variant="outlined" size="small" onClick={() => handleOpenModal(report)}>عرض ومراجعة</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={modalStyle}>
                    {selectedReport && (
                        <>
                            <Typography variant="h5">مراجعة: {selectedReport.title}</Typography>
                            <Box sx={{ display: 'flex', gap: 3, mt: 2 }}>
                                <Box sx={{ flex: 2 }}>
                                    <TextField fullWidth multiline rows={4} label="ملاحظاتك" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                                    <Button onClick={handleApproveReview}>اعتماد</Button>
                                    <Button onClick={handleRejectReview}>رفض</Button>
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography>سجل الطالب</Typography>
                                    <List dense>
                                        {(studentHistory[selectedReport.studentId] || []).map(task => (
                                            <ListItem key={task.id}><ListItemText primary={task.title} secondary={task.status} /></ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </Paper>
    );
};

export default FieldReports; // <-- انتبهي للاسم الجديد
