// src/pages/StudentReportsPage.tsx

import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    Box,
    Modal,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Snackbar,
    Alert
} from '@mui/material';

// ==================== بداية التعديل 1: إضافة حالة "مرفوض" ====================
interface Report {
    id: number;
    studentName: string;
    title: string;
    submissionDate: string;
    status: 'new' | 'reviewed' | 'approved' | 'rejected'; // <-- إضافة الحالة الجديدة
}
// ==================== نهاية التعديل 1 ====================

const initialReportsData: Report[] = [
    { id: 1, studentName: 'علي إبراهيم', title: 'التقرير الأسبوعي الأول', submissionDate: '2025-11-15', status: 'new' },
    { id: 2, studentName: 'نسيبة عبدالرحمن', title: 'تقرير تحليل النظام', submissionDate: '2025-11-14', status: 'rejected' }, // <-- مثال على الحالة الجديدة
    { id: 3, studentName: 'فاطمة محسن', title: 'التقرير الأسبوعي الأول', submissionDate: '2025-11-13', status: 'approved' },
    { id: 4, studentName: 'آزاد شائع', title: 'تقرير تصميم الواجهات', submissionDate: '2025-11-12', status: 'new' },
];

// ==================== بداية التعديل 2: تحديث دالة عرض الحالة ====================
const getStatusChip = (status: Report['status']) => {
    switch (status) {
        case 'new':
            return <Chip label="جديد" color="primary" size="small" />;
        case 'reviewed':
            return <Chip label="قيد المراجعة" color="warning" size="small" />;
        case 'approved':
            return <Chip label="معتمد" color="success" size="small" />;
        case 'rejected':
            return <Chip label="مرفوض للتعديل" color="error" size="small" />; // <-- إضافة لون الحالة الجديدة
        default:
            return <Chip label={status} size="small" />;
    }
};
// ==================== نهاية التعديل 2 ====================

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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
    const [snackbarMessage, setSnackbarMessage] = useState(''); // <-- رسالة ديناميكية

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

    // دالة الاعتماد
    const handleApproveReview = () => {
        if (!selectedReport) return;

        const reviewData = { reportId: selectedReport.id, feedback, grade: taskGrade, status: 'approved' };
        console.log("بيانات الاعتماد المرسلة:", reviewData);

        setReports(reports.map(r => 
            r.id === selectedReport.id ? { ...r, status: 'approved' } : r
        ));
        
        setSnackbarMessage('تم اعتماد التقرير بنجاح!');
        setSnackbarOpen(true);
        handleCloseModal();
    };

    // ==================== بداية التعديل 3: إضافة دالة الرفض ====================
    const handleRejectReview = () => {
        if (!selectedReport) return;

        const rejectionData = { reportId: selectedReport.id, feedback, status: 'rejected' };
        console.log("بيانات الرفض المرسلة:", rejectionData);

        setReports(reports.map(r => 
            r.id === selectedReport.id ? { ...r, status: 'rejected' } : r
        ));
        
        setSnackbarMessage('تم إعادة التقرير للطالب للتعديل.');
        setSnackbarOpen(true);
        handleCloseModal();
    };
    // ==================== نهاية التعديل 3 ====================

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>اسم الطالب</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>عنوان التقرير</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>تاريخ التسليم</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>إجراءات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.studentName}</TableCell>
                                <TableCell>{report.title}</TableCell>
                                <TableCell>{report.submissionDate}</TableCell>
                                <TableCell>{getStatusChip(report.status)}</TableCell>
                                <TableCell>
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

                            <Paper variant="outlined" sx={{ p: 2, mb: 3, maxHeight: 150, overflowY: 'auto' }}>
                                <Typography variant="body1">
                                    هذا هو محتوى التقرير... (نص وهمي)
                                      

                                    لوريم إيبسوم هو ببساطة نص شكلي يستخدم في صناعة الطباعة والتنضيد.
                                </Typography>
                            </Paper>

                            <Typography gutterBottom>إضافة ملاحظات وتقييم:</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="اكتب ملاحظاتك هنا..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            {/* ==================== بداية التعديل 4: تحسين تصميم أزرار التقييم ==================== */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Typography>تقييم المهمة:</Typography>
                                <ToggleButtonGroup
                                    value={taskGrade}
                                    exclusive
                                    onChange={handleGradeChange}
                                    size="small"
                                >
                                    {[1, 2, 3, 4, 5].map((grade) => (
                                        <ToggleButton 
                                            key={grade} 
                                            value={grade}
                                            sx={{
                                                fontWeight: 'bold',
                                                '&.Mui-selected': {
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark',
                                                    },
                                                },
                                            }}
                                        >
                                            {grade}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Box>
                            {/* ==================== نهاية التعديل 4 ==================== */}

                            {/* ==================== بداية التعديل 5: تحديث أزرار الإجراءات ==================== */}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
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
                            {/* ==================== نهاية التعديل 5 ==================== */}
                        </>
                    )}
                </Box>
            </Modal>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default StudentReportsPage;
