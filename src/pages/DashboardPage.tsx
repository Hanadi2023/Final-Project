// src/pages/DashboardPage.tsx

import React from 'react';
import { Box } from '@mui/material';
import SummaryCards from '../components/SummaryCards';
import StudentsStatusTable from '../components/StudentsStatusTable';
import NotificationsList from '../components/NotificationsList';

const DashboardPage: React.FC = () => {
    return (
        <Box>
            {/* الجزء العلوي: بطاقات الملخص */}
            <SummaryCards />

            {/* الجزء السفلي: الأعمدة */}
            <Box 
                sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' }, // أعمدة على الشاشات الكبيرة، وصف فوق بعض على الصغيرة
                    gap: 3 
                }}
            >
                {/* العمود الأيمن (الأكبر حجماً) */}
                <Box sx={{ flex: '2 1 0%' }}>
                    <StudentsStatusTable />
                </Box>

                {/* العمود الأيسر (الأصغر حجماً) */}
                <Box sx={{ flex: '1 1 0%' }}>
                    <NotificationsList />
                </Box>
            </Box>
        </Box>
    );
};

export default DashboardPage;
