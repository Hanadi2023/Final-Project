// src/components/SummaryCards.tsx

import React from 'react';
import { Paper, Typography, Box } from '@mui/material'; 
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'; // <-- 1. استيراد أيقونة جديدة

interface CardData {
    title: string;
    value: string;
    IconComponent: React.ElementType;
    color: string;
}

// ==================== بداية التعديل ====================
// 2. إضافة بيانات البطاقة الجديدة إلى المصفوفة
const cardData: CardData[] = [
    { title: 'إجمالي الطلاب', value: '45', IconComponent: PeopleOutlineIcon, color: 'rgb(0, 171, 85)' },
    { title: 'التقارير للمراجعة', value: '8', IconComponent: AssignmentOutlinedIcon, color: 'rgb(255, 193, 7)' },
    { title: 'جهات التدريب النشطة', value: '16', IconComponent: BusinessCenterOutlinedIcon, color: 'rgb(255, 87, 34)' },
    { title: 'متوسط التقييم', value: '85%', IconComponent: StarBorderOutlinedIcon, color: 'rgb(24, 144, 255)' },
    { title: 'قصص النجاح', value: '12', IconComponent: AutoStoriesOutlinedIcon, color: 'rgb(120, 80, 220)' }, // <-- 3. البطاقة الجديدة
];
// ==================== نهاية التعديل ====================


const SummaryCards: React.FC = () => {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                mb: 3 
            }}
        >
            {cardData.map((card, index) => (
                <Box 
                    key={index} 
                    sx={{ 
                        flex: '1 1 200px', // <-- 4. تعديل بسيط هنا لضمان التجاوب الأفضل مع 5 بطاقات
                        minWidth: '180px'  // <-- 
                    }}
                >
                    <Paper 
                        sx={{ 
                            p: 3, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'space-between', 
                            height: '100%',
                            borderTop: `4px solid ${card.color}`
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                {card.title}
                            </Typography>
                            <Box sx={{ color: card.color, lineHeight: 1 }}>
                                <card.IconComponent sx={{ fontSize: '32px' }} />
                            </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right', mt: 3 }}>
                            <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                                {card.value}
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
}

export default SummaryCards;
