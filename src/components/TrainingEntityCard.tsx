// src/components/TrainingEntityCard.tsx

import React from 'react';
import { Box, Typography, Paper, LinearProgress, Chip } from '@mui/material';

interface TrainingEntityCardProps {
    name: string;
    fields: string[];
    capacity: { used: number; total: number };
    isSelected: boolean;
    onClick: () => void;
}

const TrainingEntityCard: React.FC<TrainingEntityCardProps> = ({ name, fields, capacity, isSelected, onClick }) => {
    const capacityPercentage = capacity.total > 0 ? (capacity.used / capacity.total) * 100 : 0;

    return (
        <Paper
            onClick={onClick}
            sx={{
                p: 2,
                mb: 2,
                cursor: 'pointer',
                border: '2px solid',
                borderColor: isSelected ? 'primary.main' : 'transparent',
                backgroundColor: isSelected ? 'rgba(25, 118, 210, 0.04)' : 'background.paper',
                transition: 'all 0.2s',
                '&:hover': {
                    borderColor: 'primary.light',
                },
            }}
        >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>{name}</Typography>
            
            {/* عرض المجالات باستخدام شرائح Chip */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {fields.map(field => (
                    <Chip key={field} label={field} size="small" />
                ))}
            </Box>

            {/* شريط السعة الإجمالية */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LinearProgress
                    variant="determinate"
                    value={capacityPercentage}
                    sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    {capacity.used} / {capacity.total}
                </Typography>
            </Box>
        </Paper>
    );
};

export default TrainingEntityCard;
