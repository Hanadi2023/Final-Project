// src/pages/AddTaskPage.tsx

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    OutlinedInput,
    Chip,
    Snackbar,
    Alert,
    // ==================== بداية التعديل 1: استيراد مكونات جديدة ====================
    FormHelperText,
    Link
    // ==================== نهاية التعديل 1 ====================
} from '@mui/material';

const supervisedStudents = [
    { id: 1, name: 'علي إبراهيم' },
    { id: 2, name: 'نسيبة عبدالرحمن' },
    { id: 3, name: 'فاطمة محسن' },
    { id: 4, name: 'آزاد شائع' },
    { id: 5, name: 'هنادي أحمد' },
    { id: 6, name: 'محمد قاسم' },
];

const AddTaskPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleStudentChange = (event: SelectChangeEvent<typeof selectedStudentIds>) => {
        const { target: { value } } = event;
        setSelectedStudentIds(typeof value === 'string' ? value.split(',').map(Number) : value);
    };

    // ==================== بداية التعديل 2: إضافة دالة تحديد الكل ====================
    const handleSelectAll = () => {
        // إذا كان عدد الطلاب المحددين أقل من العدد الكلي، قم بتحديد الكل
        if (selectedStudentIds.length < supervisedStudents.length) {
            setSelectedStudentIds(supervisedStudents.map(s => s.id));
        } else {
            // وإلا، قم بإلغاء تحديد الكل
            setSelectedStudentIds([]);
        }
    };
    // ==================== نهاية التعديل 2 ====================

    const handleAddTask = () => {
        const taskData = { title, description, startDate, endDate, studentIds: selectedStudentIds };
        console.log("بيانات المهمة المرسلة:", taskData);
        setSnackbarOpen(true);
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setSelectedStudentIds([]);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const canAddTask = title && description && startDate && endDate && selectedStudentIds.length > 0;

    return (
        <Paper sx={{ p: 4, maxWidth: '700px', mx: 'auto' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                إضافة مهمة جديدة
            </Typography>

            <Box component="form" noValidate autoComplete="off">
                <TextField fullWidth label="عنوان المهمة" variant="outlined" sx={{ mb: 3 }} value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField fullWidth label="وصف المهمة" variant="outlined" multiline rows={4} sx={{ mb: 3 }} value={description} onChange={(e) => setDescription(e.target.value)} />
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField fullWidth label="تاريخ بدء المهمة" type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <TextField fullWidth label="تاريخ انتهاء المهمة" type="date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Box>

                {/* ==================== بداية التعديل 3: إضافة الزر بجانب العنوان ==================== */}
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <InputLabel shrink={selectedStudentIds.length > 0} id="student-select-label">إسناد إلى الطلاب</InputLabel>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleSelectAll}
                            underline="hover"
                        >
                            {selectedStudentIds.length < supervisedStudents.length ? 'تحديد الكل' : 'إلغاء تحديد الكل'}
                        </Link>
                    </Box>
                    <Select
                        labelId="student-select-label"
                        multiple
                        value={selectedStudentIds}
                        onChange={handleStudentChange}
                        input={<OutlinedInput notched={selectedStudentIds.length > 0} />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((id) => {
                                    const student = supervisedStudents.find(s => s.id === id);
                                    return <Chip key={id} label={student?.name || ''} />;
                                })}
                            </Box>
                        )}
                    >
                        {supervisedStudents.map(student => (
                            <MenuItem key={student.id} value={student.id}>
                                {student.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* ==================== نهاية التعديل 3 ==================== */}

                <Button variant="contained" size="large" fullWidth onClick={handleAddTask} disabled={!canAddTask}>
                    إضافة المهمة
                </Button>
            </Box>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    تم إضافة المهمة بنجاح!
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default AddTaskPage;
