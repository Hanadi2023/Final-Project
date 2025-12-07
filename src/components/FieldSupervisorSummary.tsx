// src/components/FieldSupervisorSummary.tsx

import React from 'react';
// ==================== بداية التصحيح: إزالة Grid من الاستيراد ====================
import { Paper, Typography, Box } from '@mui/material';
// ==================== نهاية التصحيح ====================
import PeopleIcon from '@mui/icons-material/People';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const stats = [
    { title: 'الطلاب المتدربون', value: '12', icon: <PeopleIcon fontSize="large" />, color: '#2196f3' },
    { title: 'التقارير المستلمة', value: '35', icon: <AssignmentTurnedInIcon fontSize="large" />, color: '#4caf50' },
    { title: 'تقارير قيد المراجعة', value: '8', icon: <RateReviewIcon fontSize="large" />, color: '#ff9800' },
    { title: 'التقارير المعتمدة', value: '27', icon: <CheckCircleIcon fontSize="large" />, color: '#f44336' },
];

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactElement; color: string }> = ({ title, value, icon, color }) => (
    // ==================== بداية التصحيح: استخدام Box مع خصائص Flexbox ====================
    <Box
        sx={{
            width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' }, // حساب العرض مع المسافات
            mb: 3, // مسافة سفلية
        }}
    >
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `4px solid ${color}`, height: '100%' }}>
            <Box>
                <Typography color="text.secondary" gutterBottom>{title}</Typography>
                <Typography variant="h4" component="div" fontWeight="bold">{value}</Typography>
            </Box>
            <Box sx={{ color }}>{icon}</Box>
        </Paper>
    </Box>
    // ==================== نهاية التصحيح ====================
);

const FieldSupervisorSummary: React.FC = () => {
    return (
        // ==================== بداية التصحيح: استخدام حاوية Flexbox ====================
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap', // السماح للعناصر بالانتقال إلى سطر جديد
                justifyContent: 'space-between', // توزيع المسافات
                gap: '24px', // المسافة بين العناصر (يمكن تعديلها)
                mb: 4,
            }}
        >
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </Box>
        // ==================== نهاية التصحيح ====================
    );
};

export default FieldSupervisorSummary;
