// src/components/StudentsList.tsx

import React from 'react';
import { Typography, Paper, Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// بيانات الطلاب المؤقتة
const supervisedStudents = [
    { id: 1, name: 'علي إبراهيم', major: 'نظم معلومات', trainingEntity: 'يمن سوفت' },
    { id: 2, name: 'نسيبة عبدالرحمن', major: 'تقنية معلومات', trainingEntity: 'كاك بنك' },
    { id: 3, name: 'فاطمة محسن', major: 'علوم حاسوب', trainingEntity: 'مجموعة هائل سعيد' },
    { id: 4, name: 'آزاد شائع', major: 'هندسة برمجيات', trainingEntity: 'يمن سوفت' },
];

const StudentsList: React.FC = () => {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
                الطلاب تحت إشرافك
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="بحث عن طالب..."
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                }}
                sx={{ mb: 2 }}
            />
            <Box>
                {supervisedStudents.map(student => (
                    <Paper 
                        key={student.id} 
                        sx={{ p: 2, mb: 1, cursor: 'pointer', '&:hover': { backgroundColor: 'action.hover' } }}
                    >
                        <Typography fontWeight="bold">{student.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{student.major}</Typography>
                    </Paper>
                ))}
            </Box>
        </Paper>
    );
};

export default StudentsList;
