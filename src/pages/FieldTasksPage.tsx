// src/pages/FieldReports.tsx

import React, { useState } from 'react';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Chip, Button, Box, Modal, TextField, ToggleButtonGroup, ToggleButton, Snackbar, Alert,
    Divider, List, ListItem, ListItemText, Card, CardContent, CardHeader,
    // ==================== بداية التعديل 1: استيراد أيقونات ومكونات جديدة ====================
    IconButton, Link
} from '@mui/material';
import { Download, OpenInNew } from '@mui/icons-material';
// ==================== نهاية التعديل 1 ====================


// --- أنواع البيانات والبيانات الوهمية (مع دعم الملفات) ---

// 1. نوع بيانات التقرير الحالي (مع رابط للملف)
interface Report {
    id: number;
    studentId: number;
    studentName: string;
    title: string;
    submissionDate: string;
    status: 'new' | 'approved' | 'rejected';
    fileUrl: string; // <-- إضافة رابط الملف
}

// 2. نوع بيانات المهام السابقة (مع رابط للملف)
interface PastTask {
    id: number;
    title: string;
    status: 'approved' | 'rejected';
    grade?: number;
    fileUrl: string; // <-- إضافة رابط الملف
}

// 3. بيانات التقارير الجديدة (مع روابط وهمية)
const initialReportsData: Report[] = [
    { id: 1, studentId: 1, studentName: 'علي إبراهيم', title: 'التقرير الأسبوعي الأول', submissionDate: '2025-11-15', status: 'new', fileUrl: '/files/report-1.pdf' },
    { id: 2, studentId: 2, studentName: 'نسيبة عبدالرحمن', title: 'تقرير تحليل النظام', submissionDate: '2025-11-14', status: 'rejected', fileUrl: '/files/report-2.pdf' },
    { id: 3, studentId: 1, studentName: 'علي إبراهيم', title: 'تصميم الواجهات', submissionDate: '2025-11-12', status: 'new', fileUrl: '/files/report-3.pdf' },
];

// 4. بيانات المهام السابقة (مع روابط وهمية)
const studentHistory: { [key: number]: PastTask[] } = {
    1: [ 
        { id: 101, title: 'مهمة بناء المكونات', status: 'approved', grade: 5, fileUrl: '/files/history-101.pdf' },
        { id: 102, title: 'مهمة اختبار الواجهات', status: 'approved', grade: 4, fileUrl: '/files/history-102.pdf' },
    ],
    2: [ 
        { id: 201, title: 'التقرير الأسبوعي الأول', status: 'rejected', fileUrl: '/files/history-201.pdf' },
    ],
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

const FieldReports: React.FC = () => {
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
            <Typography variant="h4" gutterBottom fontWeight="bold">تقارير الطلاب</Typography>
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
                                
                                <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                                    {/* ==================== بداية التعديل 2: عرض زر تحميل الملف ==================== */}
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>محتوى التقرير الحالي</Typography>
                                        <Button 
                                            variant="contained" 
                                            startIcon={<Download />}
                                            href={selectedReport.fileUrl}
                                            target="_blank" // لفتح الملف في نافذة جديدة
                                            rel="noopener noreferrer"
                                        >
                                            تحميل ملف التقرير
                                        </Button>
                                    </Paper>
                                    {/* ==================== نهاية التعديل 2 ==================== */}
                                    
                                    <Paper variant="outlined" sx={{ p: 2 }}>
                                        <Typography variant="h6" gutterBottom>إضافة ملاحظات وتقييم</Typography>
                                        <TextField 
                                            fullWidth 
                                            multiline 
                                            rows={3} 
                                            label="اكتب ملاحظاتك هنا..." 
                                            value={feedback} 
                                            onChange={(e) => setFeedback(e.target.value)} 
                                            sx={{ mb: 2 }} 
                                        />
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                                            <Typography>تقييم المهمة:</Typography>
                                            <ToggleButtonGroup value={taskGrade} exclusive onChange={handleGradeChange} size="small">
                                                {[1, 2, 3, 4, 5].map((grade) => (
                                                    <ToggleButton 
                                                        key={grade} 
                                                        value={grade} 
                                                        sx={{ '&.Mui-selected': { backgroundColor: 'primary.main', color: 'white', '&:hover': {backgroundColor: 'primary.dark'} } }}
                                                    >
                                                        {grade}
                                                    </ToggleButton>
                                                ))}
                                            </ToggleButtonGroup>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                                            <Button variant="outlined" onClick={handleCloseModal}>إلغاء</Button>
                                            <Button 
                                                variant="outlined" 
                                                color="error" 
                                                onClick={handleRejectReview} 
                                                disabled={!feedback}
                                            >
                                                إعادة للتعديل
                                            </Button>
                                            <Button 
                                                variant="contained" 
                                                onClick={handleApproveReview} 
                                                disabled={!feedback}
                                            >
                                                اعتماد التقرير
                                            </Button>
                                        </Box>
                                    </Paper>
                                </Box>

                                <Box sx={{ flex: 1 }}>
                                    <Card variant="outlined" sx={{ height: '100%' }}>
                                        <CardHeader title="سجل مهام الطالب" />
                                        <CardContent>
                                            {/* ==================== بداية التعديل 3: جعل السجل قابلاً للنقر ==================== */}
                                            <List dense>
                                                {(studentHistory[selectedReport.studentId] || []).map(task => (
                                                    <ListItem
                                                        key={task.id}
                                                        component={Link}
                                                        href={task.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{ textDecoration: 'none', color: 'inherit', '&:hover': { backgroundColor: 'action.hover' }, borderRadius: 1, mb: 0.5 }}
                                                        secondaryAction={
                                                            <IconButton edge="end" aria-label="open file">
                                                                <OpenInNew fontSize="small" />
                                                            </IconButton>
                                                        }
                                                    >
                                                        <ListItemText 
                                                            primary={task.title} 
                                                            secondary={task.status === 'approved' ? `مقبول (${task.grade}/5)` : 'مرفوض'}
                                                        />
                                                    </ListItem>
                                                ))}
                                                {!(studentHistory[selectedReport.studentId] || []).length && (
                                                    <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 2, p: 1 }}>لا يوجد سجل مهام سابق لهذا الطالب.</Typography>
                                                )}
                                            </List>
                                            {/* ==================== نهاية التعديل 3 ==================== */}
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

export default FieldReports;
