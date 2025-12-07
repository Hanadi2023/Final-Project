// src/pages/AcademicSupervisorDashboard.tsx

import React from 'react';
import { Box } from '@mui/material';
// ==================== بداية التصحيح: تعديل المسارات هنا ====================
import SummaryCards from '../components/SummaryCards';
import StudentStatusTable from '../components/StudentsStatusTable';
import LatestNotifications from '../components/LatestNotifications';
// ==================== نهاية التصحيح ====================

interface DashboardProps {
    notifications: Array<{ id: number; text: string; timestamp: string; read: boolean; }>;
}

const AcademicSupervisorDashboard: React.FC<DashboardProps> = ({ notifications }) => {
    return (
        <>
            <SummaryCards />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 4 }}>
                <Box sx={{ width: '100%', flex: '2 1 0' }}><StudentStatusTable /></Box>
                <Box sx={{ width: '100%', flex: '1 1 0' }}><LatestNotifications notifications={notifications} /></Box>
            </Box>
        </>
    );
};

export default AcademicSupervisorDashboard;
