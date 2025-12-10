// src/components/FieldSummaryCards.tsx

import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

interface CardData {
    title: string;
    value: string | number;
    icon: React.ReactElement;
    color: string;
}

interface FieldSummaryCardsProps {
    cards: CardData[];
}

const FieldSummaryCards: React.FC<FieldSummaryCardsProps> = ({ cards }) => {
    return (
        <Box 
            sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: `repeat(${Math.min(cards.length, 4)}, 1fr)`,
                },
            }}
        >
            {cards.map((card, index) => (
                // ==================== بداية التصميم العمودي بالترتيب الصحيح ====================
                <Paper 
                    key={index}
                    sx={{ 
                        p: 3, 
                        display: 'flex', 
                        flexDirection: 'row', // أفقي لتوزيع المحتوى
                        alignItems: 'center',
                        justifyContent: 'space-between', 
                        minHeight: '150px', // إعادة الحجم السابق
                        borderRadius: 2,
                        boxShadow: `0 8px 24px 0 ${hexToRgba(card.color, 0.15)}`,
                    }}
                >
                    {/* الجهة اليسرى: العنوان ثم الرقم */}
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body1" color="text.secondary">
                            {card.title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {card.value}
                        </Typography>
                    </Box>

                    {/* الجهة اليمنى: الأيقونة */}
                    <Box sx={{ 
                        color: card.color,
                        '& .MuiSvgIcon-root': {
                            fontSize: '48px'
                        }
                    }}>
                        {card.icon}
                    </Box>
                </Paper>
                // ==================== نهاية التصميم العمودي بالترتيب الصحيح ====================
            ))}
        </Box>
    );
};

// دالة مساعدة لتحويل لون hex إلى rgba
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

export default FieldSummaryCards;
