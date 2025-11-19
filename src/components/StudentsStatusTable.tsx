// src/components/StudentsStatusTable.tsx

import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip
} from '@mui/material';

// ==================== بداية التعديل 1: تحديث أنواع الحالات والبيانات ====================

// 1. تعريف نوع بيانات الحالة الجديدة
type TrainingStatus = 'بانتظار التدريب' | 'قيد التدريب' | 'أكمل التدريب';

// 2. بيانات مؤقتة جديدة تشمل "جهة التدريب" والحالات الجديدة
const students = [
    { id: 1, name: 'علي إبراهيم', major: 'نظم معلومات', trainingEntity: 'يمن سوفت', status: 'أكمل التدريب' as TrainingStatus },
    { id: 2, name: 'نسيبة عبدالرحمن', major: 'تقنية معلومات', trainingEntity: 'كاك بنك', status: 'قيد التدريب' as TrainingStatus },
    { id: 3, name: 'فاطمة محسن', major: 'علوم حاسوب', trainingEntity: 'مجموعة هائل سعيد', status: 'أكمل التدريب' as TrainingStatus },
    { id: 4, name: 'آزاد شائع', major: 'هندسة برمجيات', trainingEntity: 'يمن سوفت', status: 'قيد التدريب' as TrainingStatus },
    { id: 5, name: 'محمد عبدالله', major: 'نظم معلومات', trainingEntity: 'يمن موبايل', status: 'بانتظار التدريب' as TrainingStatus },
];

// ==================== نهاية التعديل 1 ====================


// ==================== بداية التعديل 2: تحديث دالة الألوان لتناسب الحالات الجديدة ====================
const getStatusChipColor = (status: TrainingStatus): 'success' | 'info' | 'warning' => {
    switch (status) {
        case 'أكمل التدريب':
            return 'success'; // أخضر للذي أكمل
        case 'قيد التدريب':
            return 'info';    // أزرق للذي لا يزال يتدرب
        case 'بانتظار التدريب':
            return 'warning'; // أصفر للذي لم يبدأ بعد
        default:
            return 'warning';
    }
};
// ==================== نهاية التعديل 2 ====================

const StudentStatusTable: React.FC = () => {
    return (
        <Paper sx={{ p: 2, overflowX: 'auto' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                حالة الطلاب
            </Typography>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="student status table">
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            {/* ==================== بداية التعديل 3: تحديث أعمدة الجدول ==================== */}
                            <TableCell>اسم الطالب</TableCell>
                            <TableCell>التخصص</TableCell>
                            <TableCell>جهة التدريب</TableCell>
                            <TableCell>الحالة</TableCell>
                            {/* ==================== نهاية التعديل 3 ==================== */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Typography fontWeight="bold">{student.name}</Typography>
                                </TableCell>
                                <TableCell>{student.major}</TableCell>
                                {/* ==================== بداية التعديل 4: إضافة بيانات العمود الجديد ==================== */}
                                <TableCell>{student.trainingEntity}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={student.status} 
                                        color={getStatusChipColor(student.status)} 
                                        size="small" 
                                    />
                                </TableCell>
                                {/* ==================== نهاية التعديل 4 ==================== */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default StudentStatusTable;
