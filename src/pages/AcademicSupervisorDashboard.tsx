// src/pages/AcademicSupervisorDashboard.tsx (النسخة النهائية والمصححة)

import React from 'react';
import { Box, Typography } from '@mui/material';
import SummaryCards from '../components/SummaryCards';
import StudentsStatusTable from '../components/StudentsStatusTable';
import LatestNotifications from '../components/LatestNotifications';
import { DetailedNotification } from '../App';

// 1. تعريف الخصائص التي تستقبلها الصفحة (الإشعارات فقط)
interface Props {
    notifications: DetailedNotification[];
}

const AcademicSupervisorDashboard: React.FC<Props> = ({ notifications }) => {
    return (
        <Box>
            {/* ==================== بداية الترتيب الصحيح ==================== */}

            {/* 1. العنوان الرئيسي للصفحة */}
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                لوحة التحكم الرئيسية
            </Typography>
            
            {/* 2. الكاردات في الأعلى */}
            <Box sx={{ mb: 4 }}>
                <SummaryCards />
            </Box>

            {/* 3. جدول حالة الطلاب في المنتصف */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    متابعة حالة الطلاب
                </Typography>
                <StudentsStatusTable />
            </Box>

            {/* 4. آخر الإشعارات في الأسفل */}
            <Box>
                {/* 
                    مكون LatestNotifications سيعرض الإشعارات مع زر "عرض الكل"
                    الذي سينقل المستخدم إلى صفحة /notifications
                */}
                <LatestNotifications notifications={notifications} />
            </Box>
            
            {/* ==================== نهاية الترتيب الصحيح ==================== */}
        </Box>
    );
};

export default AcademicSupervisorDashboard;
