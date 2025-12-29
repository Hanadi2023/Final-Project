// src/components/SummaryCards.tsx (النسخة المصححة بالتصميم الجديد)

import React from 'react';
import { Paper, Typography, Box } from '@mui/material'; 
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';

interface CardData {
    title: string;
    value: string;
    IconComponent: React.ElementType;
    color: string;
}

const cardData: CardData[] = [
    { title: 'إجمالي الطلاب', value: '45', IconComponent: PeopleOutlineIcon, color: '#00AB55' }, // استخدام ألوان HEX
    { title: 'التقارير للمراجعة', value: '8', IconComponent: AssignmentOutlinedIcon, color: '#FFC107' },
    { title: 'جهات التدريب النشطة', value: '16', IconComponent: BusinessCenterOutlinedIcon, color: '#FF5722' },
    { title: 'متوسط التقييم', value: '85%', IconComponent: StarBorderOutlinedIcon, color: '#1890FF' },
    { title: 'قصص النجاح', value: '12', IconComponent: AutoStoriesOutlinedIcon, color: '#7850DC' },
];

// ==================== بداية التعديل 1: إضافة دالة تحويل الألوان ====================
// هذه الدالة مأخوذة من FieldSummaryCards.tsx لتحويل لون HEX إلى RGBA للظل
function hexToRgba(hex: string, alpha: number): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
// ==================== نهاية التعديل 1 ====================


const SummaryCards: React.FC = () => {
    return (
        // ==================== بداية التعديل 2: تطبيق نظام Grid ====================
        <Box 
            sx={{ 
                display: 'grid',
                gap: 3,
                mb: 3,
                // توزيع الكاردات بشكل متجاوب (5 في الشاشات الكبيرة، 2 في المتوسطة، 1 في الصغيرة)
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(5, 1fr)',
                },
            }}
        >
        {/* ==================== نهاية التعديل 2 ==================== */}
            {cardData.map((card, index) => (
                // ==================== بداية التعديل 3: تطبيق تصميم الكارد الجديد ====================
                <Paper 
                    key={index} 
                    sx={{ 
                        p: 3, 
                        display: 'flex', 
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 2,
                        // تطبيق الظل الملون بنفس طريقة المشرف الميداني
                        boxShadow: `0 8px 24px 0 ${hexToRgba(card.color, 0.15)}`,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                        }
                    }}
                >
                    {/* الجهة اليسرى: العنوان ثم الرقم */}
                    <Box>
                        <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                            {card.value}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                            {card.title}
                        </Typography>
                    </Box>

                    {/* الجهة اليمنى: الأيقونة */}
                    <Box sx={{ 
                        color: card.color,
                        // تغليف الأيقونة بدائرة ملونة خفيفة
                        backgroundColor: hexToRgba(card.color, 0.12),
                        borderRadius: '50%',
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <card.IconComponent sx={{ fontSize: '32px' }} />
                    </Box>
                </Paper>
                // ==================== نهاية التعديل 3 ====================
            ))}
        </Box>
    );
}

export default SummaryCards;
