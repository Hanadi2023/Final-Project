// src/pages/FieldSupervisorDashboard.tsx

import React from 'react';
import { Box } from '@mui/material';
import FieldSupervisorSummary from '../components/FieldSupervisorSummary';
import LatestNotifications from '../components/LatestNotifications'; // سنعيد استخدام نفس مكون الإشعارات

// تعريف الخصائص التي سيستقبلها المكون
interface DashboardProps {
    notifications: Array<{ id: number; text: string; timestamp: string; read: boolean; }>;
}

const FieldSupervisorDashboard: React.FC<DashboardProps> = ({ notifications }) => {
    return (
        <Box>
            {/* 1. عرض بطاقات الإحصائيات الجديدة */}
            <FieldSupervisorSummary />

            {/* 2. عرض قائمة الإشعارات (مكون مشترك) */}
            <LatestNotifications notifications={notifications} />
        </Box>
    );
};

export default FieldSupervisorDashboard;
