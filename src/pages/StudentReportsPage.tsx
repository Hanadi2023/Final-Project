// src/pages/StudentReportsPage.tsx

import React, { useState } from 'react';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Button, Box, Modal, TextField, ToggleButtonGroup, ToggleButton, Snackbar, Alert,
    Divider, List, ListItem, ListItemText, Card, CardContent, CardHeader
} from '@mui/material';

// --- أنواع البيانات والبيانات الوهمية ---

// 1. نوع بيانات التقرير الحالي في الجدول
interface Report {
    id: number;
    studentId: number; // ID الطالب مهم جداً للربط مع سجله
    studentName: string;
    title: string;
    submissionDate: string;
    status: 'new' | 'approved' | 'rejected';
}

// 2. نوع بيانات المهام السابقة في سجل الطالب
interface PastTask {
    id: number;
    title: string;
    status: 'approved' | 'rejected';
    grade?: number; // الدرجة قد لا تكون موجودة إذا كانت المهمة مرفوضة
}

// 3. بيانات التقارير الجديدة التي ستظهر في الجدول
const initialReportsData: Report[] = [
    { id: 1, studentId: 1, studentName: 'علي إبراهيم', title: 'التقرير الأسبوعي الأول', submissionDate: '2025-11-15', status: 'new' },
    { id: 2, studentId: 2, studentName: 'نسيبة عبدالرحمن', title: 'تقرير تحليل النظام', submissionDate: '2025-11-14', status: 'rejected' },
    { id: 3, studentId: 1, studentName: 'علي إبراهيم', title: 'تصميم الواجهات', submissionDate: '2025-11-12', status: 'new' },
    { id: 4, studentId: 3, studentName: 'فاطمة محسن', title: 'التقرير النهائي', submissionDate: '2025-11-11', status: 'approved' },
];

// 4. بيانات المهام السابقة لكل طالب (قاعدة بيانات وهمية لسجل الطالب)
const studentHistory: { [key: number]: PastTask[] } = {
    1: [ // سجل الطالب "علي إبراهيم"
        { id: 101, title: 'مهمة بناء المكونات', status: 'approved', grade: 5 },
        { id: 102, title: 'مهمة اختبار الواجهات', status: 'approved', grade: 4 },
    ],
    2: [ // سجل الطالبة "نسيبة عبدالرحمن"
        { id: 201, title: 'التقرير الأسبوعي الأول', status: 'rejected' },
        { id: 202, title: 'التقرير الأسبوعي الثاني', status: 'approved', grade: 5 },
    ],
    // الطالبة "فاطمة محسن" (id: 3) ليس لديها سجل سابق في هذه البيانات الوهمية
};

// --- نهاية البيانات ---

// دالة لعرض شريحة الحالة بألوان مختلفة
const getStatusChip = (status: Report['status']) => {
    switch (status) {
        case 'new':
            return <Chip label="جديد" color="primary" size="small" />;
        case 'approved':
            return <Chip label="معتمد" color="success" size="small" />;
        case 'rejected':
            return <Chip label="مرفوض للتعديل" color="error" size="small" />;
        default:
            return <Chip label={status} size="small" />;
    }
};

// تنسيق النافذة المنبثقة (Modal)
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', md: '80%' }, // نافذة أعرض لتناسب المحتوى
    maxWidth: '1000px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const StudentReportsPage: React.FC = () => {
    const [reports, setReports] = useState(initialReportsData);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [feedback, setFeedback] = useState('');
    const [taskGrade, setTaskGrade] = useState<number | null>(4);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleOpenModal = (report: Report) => {
        setSelectedReport(report);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedReport(null);
        setFeedback('');
        setTaskGrade(4);
    };

    const handleApproveReview = () => {
        if (!selectedReport) return;
        setReports(reports.map(r => r.id === selectedReport.id ? { ...r, status: 'approved' } : r));
        setSnackbarMessage('تم اعتماد التقرير بنجاح!');
        setSnackbarOpen(true);
        handleCloseModal();
    };

    const handleRejectReview = () => {
        if (!selectedReport) return;
        setReports(reports.map(r => r.id === selectedReport.id ? { ...r, status: 'rejected' } : r));
        setSnackbarMessage('تم إعادة التقرير للطالب للتعديل.');
        setSnackbarOpen(true);
        handleCloseModal();
    };

    const handleSnackbarClose = () => { setSnackbarOpen(false); };
    const handleGradeChange = (event: React.MouseEvent<HTMLElement>, newGrade: number | null) => {
        if (newGrade !== null) {
            setTaskGrade(newGrade);
        }
    };

    return (
        <Paper sx={{ p: 3, width: '100%' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                تقارير الطلاب
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="جدول تقارير الطلاب">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>اسم الطالب</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>عنوان التقرير</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>تاريخ التسليم</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>إجراء</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{report.studentName}</TableCell>
                                <TableCell>{report.title}</TableCell>
                                <TableCell>{report.submissionDate}</TableCell>
                                <TableCell>{getStatusChip(report.status)}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <Button variant="outlined" size="small" onClick={() => handleOpenModal(report)}>
                                        عرض ومراجعة
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal open={openModal} onClose={handleCloseModal}>
                <Box sx={modalStyle}>
                    {selectedReport && (
                        <>
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                مراجعة تقرير: {selectedReport.title}
                            </Typography>
                            <Typography sx={{ mt: 1, mb: 3 }} color="text.secondary">
                                الطالب: {selectedReport.studentName}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, gap: 3 }}>
                                
                                {/* القسم الأيسر: مراجعة المهمة الحالية */}
                                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>محتوى التقرير الحالي</Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            هذا هو محتوى التقرير... (نص وهمي) لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.
                                        </Typography>
                                    </Paper>
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>إضافة ملاحظات وتقييم</Typography>
                                        <TextField fullWidth multiline rows={3} label="اكتب ملاحظاتك هنا..." value={feedback} onChange={(e) => setFeedback(e.target.value)} sx={{ mb: 2 }} />
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                            <Typography>تقييم المهمة:</Typography>
                                            <ToggleButtonGroup value={taskGrade} exclusive onChange={handleGradeChange} size="small">
                                                {[1, 2, 3, 4, 5].map((grade) => (
                                                    <ToggleButton key={grade} value={grade} sx={{ '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white' } }}>{grade}</ToggleButton>
                                                ))}
                                            </ToggleButtonGroup>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                                            <Button variant="outlined" onClick={handleCloseModal}>إلغاء</Button>
                                            <Button variant="outlined" color="error" onClick={handleRejectReview} disabled={!feedback}>إعادة للتعديل</Button>
                                            <Button variant="contained" onClick={handleApproveReview} disabled={!feedback}>اعتماد التقرير</Button>
                                        </Box>
                                    </Paper>
                                </Box>

                                {/* القسم الأيمن: سجل الطالب */}
                                <Box sx={{ flex: 1 }}>
                                    <Card variant="outlined" sx={{ height: '100%' }}>
                                        <CardHeader title="سجل مهام الطالب" />
                                        <CardContent>
                                            <List dense>
                                                {(studentHistory[selectedReport.studentId] || []).map(task => (
                                                    <ListItem key={task.id} secondaryAction={
                                                        <Chip 
                                                            label={task.status === 'approved' ? `مقبول (${task.grade}/5)` : 'مرفوض'}
                                                            color={task.status === 'approved' ? 'success' : 'error'}
                                                            size="small"
                                                        />
                                                    }>
                                                        <ListItemText primary={task.title} />
                                                    </ListItem>
                                                ))}
                                                {!(studentHistory[selectedReport.studentId] || []).length && (
                                                    <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 2, p: 1 }}>لا يوجد سجل مهام سابق لهذا الطالب.</Typography>
                                                )}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default StudentReportsPage;
