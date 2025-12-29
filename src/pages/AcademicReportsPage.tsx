// src/pages/AcademicReportsPage.tsx (النسخة النهائية والمصححة)

import React, { useState } from 'react';
import { Typography, Paper, Box, TextField, InputAdornment, Chip, Divider, Rating, Button, Alert, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TaskCard, { Task, FieldSupervisorEvaluation } from '../components/TaskCard'; 

// البيانات الوهمية (لا تغيير)
const supervisedStudents = [
    { id: 1, name: 'علي إبراهيم', major: 'نظم معلومات', trainingEntity: 'يمن سوفت' },
    { id: 2, name: 'نسيبة عبدالرحمن', major: 'تقنية معلومات', trainingEntity: 'كاك بنك' },
    { id: 3, name: 'فاطمة محسن', major: 'علوم حاسوب', trainingEntity: 'مجموعة هائل سعيد' },
    { id: 4, name: 'آزاد شائع', major: 'هندسة برمجيات', trainingEntity: 'يمن سوفت' },
];
const fieldEvaluationForStudent1: FieldSupervisorEvaluation = {
    finalGrade: 92,
    finalNotes: 'أظهر علي التزاماً عالياً وكان مبادراً في تعلم التقنيات الجديدة. أداؤه ممتاز ونوصي به بشدة.',
    attendanceAndDiscipline: 5,
    initiativeAndCooperation: 4,
    overallPerformance: 5,
};
const initialTasksData: { [studentId: number]: Task[] } = {
    1: [ 
        { id: 101, title: 'تحليل نظام الإدارة', submissionDate: '2025-11-01', status: 'تم التقييم', description: 'تحليل متطلبات نظام إدارة الموارد البشرية.', fieldSupervisorGrade: 90, files: ['/sample.pdf'], academicSupervisorRating: 5, academicSupervisorNotes: 'تحليل ممتاز وشامل.', fieldSupervisorFinalEvaluation: fieldEvaluationForStudent1 },
        { id: 102, title: 'تصميم واجهات المستخدم', submissionDate: '2025-11-15', status: 'تم التقييم', description: 'تصميم الواجهات الأولية باستخدام Figma.', fieldSupervisorGrade: 85, files: ['/sample.pdf'], academicSupervisorRating: 4, academicSupervisorNotes: 'تصميم جيد.', fieldSupervisorFinalEvaluation: fieldEvaluationForStudent1 },
    ],
    2: [ 
        { id: 201, title: 'إعداد الشبكة الداخلية', submissionDate: '2025-11-05', status: 'تم التقييم', description: 'تجهيز وتركيب أجهزة الشبكة.', fieldSupervisorGrade: 95, files: ['/sample.pdf'], academicSupervisorRating: 5, academicSupervisorNotes: 'عمل متقن.' },
        { id: 202, title: 'تطبيق سياسات الأمان', submissionDate: '2025-11-20', status: 'قيد الانتظار', description: 'تطبيق سياسات الجدار الناري.', files: [] },
    ],
    3: [], 
};
const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95%', sm: 600 },
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    maxHeight: '90vh',
    overflowY: 'auto',
    p: 4,
};


const AcademicReportsPage: React.FC = () => {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [tasksData, setTasksData] = useState(initialTasksData);
    const [isFinalEvalModalOpen, setFinalEvalModalOpen] = useState(false);
    const [isAcademicEvalSubmitted, setAcademicEvalSubmitted] = useState(false);

    // ==================== بداية التعديل 1: إضافة حالات لتخزين بيانات التقييم الأكاديمي ====================
    const [academicRating1, setAcademicRating1] = useState<number | null>(0);
    const [academicRating2, setAcademicRating2] = useState<number | null>(0);
    const [academicFinalNotes, setAcademicFinalNotes] = useState('');
    // ==================== نهاية التعديل 1 ====================

    const selectedStudent = supervisedStudents.find(s => s.id === selectedStudentId);
    const studentTasks = selectedStudentId ? (tasksData[selectedStudentId] || []) : [];
    
    const finalEvaluationFromField = studentTasks.length > 0 ? studentTasks[0].fieldSupervisorFinalEvaluation : null;
    const allTasksEvaluated = studentTasks.length > 0 && studentTasks.every(task => task.status === 'تم التقييم');

    const handleUpdateTask = (taskId: number, rating: number, notes: string) => {
        if (!selectedStudentId) return;
        setTasksData(prevTasksData => {
            const newTasksData = { ...prevTasksData };
            const studentTasks = newTasksData[selectedStudentId];
            const updatedTasks = studentTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, academicSupervisorRating: rating, academicSupervisorNotes: notes, status: 'تم التقييم' as const };
                }
                return task;
            });
            newTasksData[selectedStudentId] = updatedTasks;
            return newTasksData;
        });
    };

    const handleSaveFinalEvaluation = () => {
        console.log("تم حفظ التقييم النهائي الأكاديمي:", { academicRating1, academicRating2, academicFinalNotes });
        setAcademicEvalSubmitted(true);
        setFinalEvalModalOpen(false);
    };

    // ==================== بداية التعديل 2: دالة لإعادة تعيين كل الحالات عند تغيير الطالب ====================
    const handleSelectStudent = (studentId: number) => {
        setSelectedStudentId(studentId);
        // إعادة تعيين كل الحالات المتعلقة بالتقييم السابق
        setAcademicEvalSubmitted(false);
        setAcademicRating1(0);
        setAcademicRating2(0);
        setAcademicFinalNotes('');
    };
    // ==================== نهاية التعديل 2 ====================

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                مراجعة تقارير الطلاب
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: '1 1 30%', maxWidth: { md: '350px' } }}>
                    <Paper sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>الطلاب تحت إشرافك</Typography>
                        <TextField fullWidth variant="outlined" size="small" placeholder="بحث عن طالب..." InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} sx={{ mb: 2 }} />
                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {supervisedStudents.map(student => (
                                // --- ربط onClick بالدالة الجديدة ---
                                <Paper key={student.id} onClick={() => handleSelectStudent(student.id)} sx={{ p: 2, mb: 1, cursor: 'pointer', backgroundColor: selectedStudentId === student.id ? 'primary.lighter' : 'background.paper', borderRight: selectedStudentId === student.id ? '3px solid' : 'none', borderColor: 'primary.main', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <Typography fontWeight="bold">{student.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{student.major}</Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Paper>
                </Box>

                <Box sx={{ flex: '1 1 70%' }}>
                    <Paper sx={{ p: 3, height: '80vh', overflowY: 'auto' }}>
                        {selectedStudent ? (
                            <Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                                    <Typography variant="h5" fontWeight="bold">
                                        دفتر مهام الطالب: {selectedStudent.name}
                                    </Typography>
                                    {allTasksEvaluated && finalEvaluationFromField && (
                                        <Button variant="contained" color="success" onClick={() => setFinalEvalModalOpen(true)}>
                                            {isAcademicEvalSubmitted 
                                                ? 'تعديل التقييم النهائي وإعلان الجهوزية' 
                                                : 'إجراء التقييم النهائي وإعلان الجهوزية للمناقشة'}
                                        </Button>
                                    )}
                                </Box>
                                <Divider sx={{ mb: 2 }}/>

                                {studentTasks.length > 0 ? (
                                    studentTasks.map(task => (
                                        <TaskCard key={task.id} task={task} onUpdate={handleUpdateTask} />
                                    ))
                                ) : (
                                    <Alert severity="info" sx={{ mt: 4 }}>
                                        لا توجد مهام مسندة لهذا الطالب حتى الآن.
                                    </Alert>
                                )}
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h6" color="text.secondary">
                                    الرجاء اختيار طالب من القائمة لعرض تفاصيله.
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Box>

            <Modal open={isFinalEvalModalOpen} onClose={() => setFinalEvalModalOpen(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        التقييم النهائي للطالب: {selectedStudent?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        بناءً على تقييمك للمهام المسلمة والتقييم الوارد من المشرف الميداني، يرجى وضع تقييمك النهائي.
                    </Typography>

                    {finalEvaluationFromField && (
                        <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: 'action.hover' }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                تقييم المشرف الميداني
                            </Typography>
                            
                            <Box sx={{ my: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography>الالتزام والانضباط:</Typography>
                                    <Rating value={finalEvaluationFromField.attendanceAndDiscipline} readOnly />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography>المبادرة والتعاون:</Typography>
                                    <Rating value={finalEvaluationFromField.initiativeAndCooperation} readOnly />
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>الأداء العام وجودة المخرجات:</Typography>
                                    <Rating value={finalEvaluationFromField.overallPerformance} readOnly />
                                </Box>
                            </Box>
                            <Divider />
                            
                            <Typography variant="body2" sx={{ mt: 2, mb: 2, fontStyle: 'italic' }}>
                                <strong>ملاحظات المشرف:</strong> "{finalEvaluationFromField.finalNotes}"
                            </Typography>
                            <Divider />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                <Typography fontWeight="bold">الدرجة النهائية من الميداني:</Typography>
                                <Chip label={`${finalEvaluationFromField.finalGrade} / 100`} color="primary" sx={{ fontWeight: 'bold' }} />
                            </Box>
                        </Paper>
                    )}

                    <Typography variant="h6" gutterBottom>تقييمك الأكاديمي النهائي</Typography>
                    
                    {/* ==================== بداية التعديل 3: ربط حقول الإدخال بالحالات الجديدة ==================== */}
                    <Box sx={{ mb: 2 }}>
                        <Typography gutterBottom>مدى تحقيق أهداف التدريب</Typography>
                        <Rating 
                            size="large" 
                            value={academicRating1} 
                            onChange={(event, newValue) => setAcademicRating1(newValue)} 
                        />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography gutterBottom>جودة التقارير والتوثيق</Typography>
                        <Rating 
                            size="large" 
                            value={academicRating2} 
                            onChange={(event, newValue) => setAcademicRating2(newValue)} 
                        />
                    </Box>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="الملاحظات والتوصيات النهائية"
                        placeholder="اكتب ملاحظاتك النهائية التي ستظهر في تقرير الطالب..."
                        sx={{ mb: 3 }}
                        value={academicFinalNotes}
                        onChange={(e) => setAcademicFinalNotes(e.target.value)}
                    />
                    {/* ==================== نهاية التعديل 3 ==================== */}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant="outlined" onClick={() => setFinalEvalModalOpen(false)}>إلغاء</Button>
                        <Button variant="contained" onClick={handleSaveFinalEvaluation}>
                            حفظ وإرسال التقييم
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default AcademicReportsPage;
