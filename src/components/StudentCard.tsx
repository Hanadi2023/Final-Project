// src/components/StudentCard.tsx

import React from 'react';
import { Paper, Typography, Box, Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// 1. تعريف الخصائص (Props) التي سيستقبلها المكون
interface StudentCardProps {
    name: string;
    major: string;
    status: string;
    isSelected: boolean;
    onToggle: () => void; // دالة سيتم استدعاؤها عند النقر
}

const StudentCard: React.FC<StudentCardProps> = ({ name, major, status, isSelected, onToggle }) => {
    return (
        // 2. استخدام Paper كحاوية للبطاقة مع تغييرات في التنسيق عند الاختيار
        <Paper
            onClick={onToggle} // 3. استدعاء دالة onToggle عند النقر على البطاقة بأكملها
            sx={{
                p: 2,
                mb: 2,
                cursor: 'pointer',
                border: '2px solid',
                // 4. تغيير لون الحدود والخلفية بناءً على حالة الاختيار (isSelected)
                borderColor: isSelected ? 'primary.main' : 'transparent',
                backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.04)' : 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                    borderColor: 'primary.light',
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{name}</Typography>
                    <Typography variant="body2" color="text.secondary">{major}</Typography>
                </Box>
                {/* 5. استخدام Checkbox مخصص لإظهار حالة الاختيار بشكل جميل */}
                <Checkbox
                    checked={isSelected}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                />
            </Box>
        </Paper>
    );
};

export default StudentCard;
