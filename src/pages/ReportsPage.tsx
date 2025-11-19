// src/pages/ReportsPage.tsx

import React, { useState } from 'react';
import { Typography, Paper, Box, TextField, InputAdornment, Chip, Divider, Rating } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TaskCard, { Task, FieldSupervisorEvaluation } from '../components/TaskCard'; 

// بيانات الطلاب (سنبقيها هنا مؤقتاً لتستخدمها الصفحة)
const supervisedStudents = [
    { id: 1, name: 'علي إبراهيم', major: 'نظم معلومات', trainingEntity: 'يمن سوفت' },
    { id: 2, name: 'نسيبة عبدالرحمن', major: 'تقنية معلومات', trainingEntity: 'كاك بنك' },
    { id: 3, name: 'فاطمة محسن', major: 'علوم حاسوب', trainingEntity: 'مجموعة هائل سعيد' },
    { id: 4, name: 'آزاد شائع', major: 'هندسة برمجيات', trainingEntity: 'يمن سوفت' },
];

// (باقي بيانات المهام والأنواع لم تتغير)
const fieldEvaluationForStudent1: FieldSupervisorEvaluation = {
    finalGrade: 92,
    finalNotes: 'أظهر علي التزاماً عالياً وكان مبادراً في تعلم التقنيات الجديدة. أداؤه ممتاز ونوصي به بشدة.',
    attendanceAndDiscipline: 5,
    initiativeAndCooperation: 5,
    overallPerformance: 5,
};

const initialTasksData: { [studentId: number]: Task[] } = {
    1: [ 
        { id: 101, title: 'تحليل نظام الإدارة', submissionDate: '2025-11-01', status: 'تم التقييم', description: 'تحليل متطلبات نظام إدارة الموارد البشرية.', fieldSupervisorGrade: 90, files: ['/sample.pdf'], academicSupervisorRating: 5, academicSupervisorNotes: 'تحليل ممتاز وشامل.', fieldSupervisorFinalEvaluation: fieldEvaluationForStudent1 },
        { id: 102, title: 'تصميم واجهات المستخدم', submissionDate: '2025-11-15', status: 'تم التقييم', description: 'تصميم الواجهات الأولية باستخدام Figma.', fieldSupervisorGrade: 85, files: ['/sample.pdf'], academicSupervisorRating: 4, academicSupervisorNotes: 'تصميم جيد.', fieldSupervisorFinalEvaluation: fieldEvaluationForStudent1 },
    ],
    2: [ 
        { id: 201, title: 'إعداد الشبكة الداخلية', submissionDate: '2025-11-05', status: 'تم التقييم', description: 'تجهيز وتركيب أجهزة الشبكة.', fieldSupervisorGrade: 95, files: ['/sample.pdf'], academicSupervisorRating: 5, academicSupervisorNotes: 'عمل متقن.' },
        { id: 202, title: 'تطبيق سياسات الأمان', submissionDate: '2025-11-20', status: 'بانتظار المراجعة', description: 'تطبيق سياسات الجدار الناري.', files: [] },
    ],
    3: [], 
};

const ReportsPage: React.FC = () => {
    const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
    const [tasksData, setTasksData] = useState(initialTasksData);

    const selectedStudent = supervisedStudents.find(s => s.id === selectedStudentId);
    const studentTasks = selectedStudentId ? (tasksData[selectedStudentId] || []) : [];

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

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                مراجعة تقارير الطلاب
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* ==================== بداية التعديل: تبسيط عمود الطلاب ==================== */}
                <Box sx={{ flex: '1 1 30%', maxWidth: { md: '350px' } }}>
                    <Paper sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>الطلاب تحت إشرافك</Typography>
                        <TextField fullWidth variant="outlined" size="small" placeholder="بحث عن طالب..." InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} sx={{ mb: 2 }} />
                        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                            {supervisedStudents.map(student => (
                                <Paper key={student.id} onClick={() => setSelectedStudentId(student.id)} sx={{ p: 2, mb: 1, cursor: 'pointer', backgroundColor: selectedStudentId === student.id ? 'primary.lighter' : 'background.paper', borderRight: selectedStudentId === student.id ? '3px solid' : 'none', borderColor: 'primary.main', '&:hover': { backgroundColor: 'action.hover' } }}>
                                    <Typography fontWeight="bold">{student.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{student.major}</Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>جهة التدريب: {student.trainingEntity}</Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Paper>
                </Box>
                {/* ==================== نهاية التعديل ==================== */}

                <Box sx={{ flex: '1 1 70%' }}>
                    <Paper sx={{ p: 3, height: '80vh', overflowY: 'auto' }}>
                        {selectedStudent ? (
                            <Box>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    دفتر مهام الطالب: {selectedStudent.name}
                                </Typography>
                                {studentTasks.length > 0 ? (
                                    studentTasks.map(task => (
                                        <TaskCard key={task.id} task={task} onUpdate={handleUpdateTask} />
                                    ))
                                ) : (
                                    <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                                        لا توجد مهام مسندة لهذا الطالب حتى الآن.
                                    </Typography>
                                )}
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h6" color="text.secondary">
                                    الرجاء اختيار طالب من القائمة لعرض تفاصيله ودفتر مهامه.
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default ReportsPage;
