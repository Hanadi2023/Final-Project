// src/pages/EvaluationsPage.tsx

import React, { useState } from 'react';
import {
    Paper, Typography, Box, Card, CardContent, Avatar, Chip, Button,
    TextField, Divider, List, ListItem, ListItemText, IconButton, CardHeader,
    ToggleButton, ToggleButtonGroup
} from '@mui/material';
import { CheckCircleOutline, ArrowBack } from '@mui/icons-material';
import { BarChart } from '@mui/x-charts/BarChart';

// --- (أنواع البيانات والبيانات الوهمية لا تغيير هنا) ---
interface Student { id: number; name: string; major: string; avatar: string; }
interface Task { title: string; grade: number; }
const studentsData: Student[] = [
    { id: 1, name: 'علي إبراهيم', major: 'هندسة برمجيات', avatar: 'A' },
    { id: 2, name: 'نسيبة عبدالرحمن', major: 'علوم حاسب', avatar: 'N' },
    { id: 3, name: 'فاطمة محسن', major: 'نظم معلومات', avatar: 'F' },
];
const studentTasksData = { 1: 5, 2: 8, 3: 2 };
const evaluationCriteria = [
    { id: 'attendance', label: 'الالتزام بالحضور' },
    { id: 'behavior', label: 'السلوك والانضباط' },
    { id: 'initiative', label: 'المبادرة والتفاعل' },
    { id: 'collaboration', label: 'التعاون مع الفريق' },
];
const studentDetailedTasks: { [key: number]: Task[] } = {
    1: [
        { title: 'التقرير الأسبوعي الأول', grade: 5 },
        { title: 'تصميم واجهة الدخول', grade: 4 },
        { title: 'بناء المكونات الرئيسية', grade: 5 },
        { title: 'اختبار الواجهات', grade: 3 },
        { title: 'رفع المشروع', grade: 5 },
    ],
    2: [{ title: 'تقرير تحليل النظام', grade: 5 }, { title: 'التقرير الأسبوعي الثاني', grade: 5 }],
    3: [{ title: 'مهمة 1', grade: 2 }],
};
// --- (نهاية البيانات الوهمية) ---


const StudentDetailView: React.FC<{ student: Student, onBack: () => void }> = ({ student, onBack }) => {
    const [generalRatings, setGeneralRatings] = useState<{ [key: string]: number | null }>({});
    const [finalNotes, setFinalNotes] = useState('');
    const [finalGrade, setFinalGrade] = useState<number | ''>('');

    const tasks: Task[] = studentDetailedTasks[student.id] || [];
    const taskAverage = tasks.length > 0 ? tasks.reduce((sum, task) => sum + task.grade, 0) / tasks.length : 0;

    return (
        <Box>
            {/* --- رأس الصفحة (لا تغيير هنا) --- */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={onBack} sx={{ mr: 1 }}><ArrowBack /></IconButton>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>{student.avatar}</Avatar>
                <Box>
                    <Typography variant="h4" fontWeight="bold">{student.name}</Typography>
                    <Typography variant="body1" color="text.secondary">{student.major}</Typography>
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Card variant="outlined">
                        <CardHeader title="تقييم المعايير العامة" sx={{ pb: 0 }} />
                        <CardContent>
                            {evaluationCriteria.map(criterion => (
                                <Box key={criterion.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 0 } }}>
                                    <Typography variant="body1">{criterion.label}</Typography>
                                    <ToggleButtonGroup
                                        value={generalRatings[criterion.id] || null}
                                        exclusive
                                        size="small"
                                        onChange={(e, newValue) => {
                                            if (newValue !== null) {
                                                setGeneralRatings(prev => ({ ...prev, [criterion.id]: newValue }));
                                            }
                                        }}
                                    >
                                        {/* ==================== بداية التعديل: إضافة sx للأزرار ==================== */}
                                        {[1, 2, 3, 4, 5].map((grade) => (
                                            <ToggleButton 
                                                key={grade} 
                                                value={grade}
                                                sx={{
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
                                        {/* ==================== نهاية التعديل ==================== */}
                                    </ToggleButtonGroup>
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                    {/* --- بطاقة التقييم النهائي (لا تغيير هنا) --- */}
                    <Card variant="outlined">
                        <CardHeader title="التقييم النهائي" />
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField label="الدرجة النهائية (من 100)" type="number" value={finalGrade} onChange={(e) => { const val = parseInt(e.target.value); setFinalGrade(val >= 0 && val <= 100 ? val : ''); }} />
                            <TextField multiline rows={4} label="اكتب ملاحظاتك النهائية هنا..." value={finalNotes} onChange={(e) => setFinalNotes(e.target.value)} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Button variant="contained" size="large" disabled={finalGrade === ''}>حفظ التقييم</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* --- العمود الأيسر (لا تغيير هنا) --- */}
                <Box sx={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardHeader title="ملخص درجات المهام" subheader={`المتوسط: ${taskAverage.toFixed(1)} / 5`} />
                        <CardContent sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '300px' }}>
                            {tasks.length > 0 ? (
                                <List dense>
                                    {tasks.map((task, i) => <ListItem key={i} secondaryAction={<Chip label={`${task.grade}/5`} color="primary" size="small" />}> <ListItemText primary={task.title} /> </ListItem>)}
                                </List>
                            ) : <Typography sx={{ px: 2 }}>لا توجد مهام مقيّمة.</Typography>}
                        </CardContent>
                        <Divider />
                        {tasks.length > 0 && (
                            <Box sx={{ p: 2 }}>
                                <BarChart series={[{ data: tasks.map(t => t.grade) }]} height={200} xAxis={[{ data: tasks.map(t => t.title), scaleType: 'band', tickLabelStyle: { display: 'none' } }]} margin={{ top: 10, bottom: 20, left: 30, right: 10 }} />
                            </Box>
                        )}
                    </Card>
                </Box>
            </Box>
        </Box>
    );
};


// --- (المكون الرئيسي للصفحة لا تغيير هنا) ---
const EvaluationsPage: React.FC = () => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    if (selectedStudent) {
        return <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%' }}><StudentDetailView student={selectedStudent} onBack={() => setSelectedStudent(null)} /></Paper>;
    }
    return (
        <Paper sx={{ p: { xs: 1, sm: 2, md: 3 }, width: '100%', backgroundColor: 'grey.50' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">متابعة إنجاز الطلاب</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>استعراض سريع لجميع الطلاب الخاضعين لإشرافك. انقر على بطاقة الطالب لعرض تقييمه التفصيلي.</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {studentsData.map((student) => {
                    const completedTasks = studentTasksData[student.id as keyof typeof studentTasksData] || 0;
                    return (
                        <Box key={student.id} sx={{ flexBasis: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.333% - 16px)' }, display: 'flex' }}>
                            <Card onClick={() => setSelectedStudent(student)} sx={{ width: '100%', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 } }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mr: 2 }}>{student.avatar}</Avatar><Box><Typography variant="h6" component="div" fontWeight="bold">{student.name}</Typography><Typography variant="body2" color="text.secondary">{student.major}</Typography></Box></Box>
                                    <Chip icon={<CheckCircleOutline />} label={`أنجز ${completedTasks} مهمة`} variant="outlined" color={completedTasks > 0 ? "success" : "default"} sx={{ mt: 2, width: '100%' }} />
                                </CardContent>
                            </Card>
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default EvaluationsPage;
