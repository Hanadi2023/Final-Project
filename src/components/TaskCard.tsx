// src/components/TaskCard.tsx (النسخة النهائية والمصححة)

import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Chip, Button, Modal, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Rating } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

// ==================== بداية الإصلاح: إعادة تعريف الواجهات بشكل كامل وصحيح ====================
export interface FieldSupervisorEvaluation {
    finalGrade: number;
    finalNotes: string;
    attendanceAndDiscipline: number;
    initiativeAndCooperation: number;
    overallPerformance: number;
}

export interface Task {
    id: number;
    title: string;
    submissionDate: string;
    status: 'تم التسليم' | 'بانتظار المراجعة' | 'متأخر' | 'تم التقييم' | 'قيد الانتظار';
    description: string;
    fieldSupervisorGrade?: number;
    files?: string[];
    academicSupervisorNotes?: string;
    academicSupervisorRating?: number;
    fieldSupervisorFinalEvaluation?: FieldSupervisorEvaluation;
}
// ==================== نهاية الإصلاح ====================

interface TaskCardProps {
    task: Task;
    onUpdate: (taskId: number, rating: number, notes: string) => void;
}

const getStatusChipColor = (status: Task['status']): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (status) {
        case 'تم التقييم': return 'success';
        case 'بانتظار المراجعة': return 'warning';
        case 'متأخر': return 'error';
        case 'تم التسليم': return 'info';
        case 'قيد الانتظار': return 'default';
        default: return 'info';
    }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
    const [filesModalOpen, setFilesModalOpen] = useState(false);
    const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
    const [currentRating, setCurrentRating] = useState<number | null>(task.academicSupervisorRating || 3);
    const [currentNotes, setCurrentNotes] = useState(task.academicSupervisorNotes || '');

    useEffect(() => {
        setCurrentRating(task.academicSupervisorRating || 3);
        setCurrentNotes(task.academicSupervisorNotes || '');
    }, [task]);

    const handleOpenFilesModal = () => setFilesModalOpen(true);
    const handleCloseFilesModal = () => setFilesModalOpen(false);
    const handleOpenEvaluationModal = () => setEvaluationModalOpen(true);
    const handleCloseEvaluationModal = () => setEvaluationModalOpen(false);
    const handleSaveEvaluation = () => {
        onUpdate(task.id, currentRating || 0, currentNotes);
        handleCloseEvaluationModal();
    };

    return (
        <>
            <Paper sx={{ p: 2, mb: 2, borderLeft: '4px solid', borderColor: `${getStatusChipColor(task.status)}.main` }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" fontWeight="bold">{task.title}</Typography>
                    <Chip label={task.status} color={getStatusChipColor(task.status)} size="small" />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 1, mb: 2 }}>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                    <Typography variant="caption">تاريخ التسليم: {task.submissionDate}</Typography>
                </Box>
                
                {task.academicSupervisorNotes && (
                     <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'action.hover' }}>
                        <Typography variant="subtitle2" fontWeight="bold">تقييمك لهذه المهمة:</Typography>
                        <Rating value={task.academicSupervisorRating} readOnly size="small" sx={{ my: 0.5 }} />
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>{task.academicSupervisorNotes}</Typography>
                    </Paper>
                )}

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                    {task.files && task.files.length > 0 && (
                        <Button variant="outlined" size="small" onClick={handleOpenFilesModal}>
                            عرض الملفات ({task.files.length})
                        </Button>
                    )}
                    
                    <Button 
                        variant="contained" 
                        size="small" 
                        onClick={handleOpenEvaluationModal}
                        disabled={!task.files || task.files.length === 0}
                    >
                        {task.academicSupervisorNotes ? 'تعديل التقييم' : 'تقييم المهمة'}
                    </Button>
                </Box>
            </Paper>

            {/* ==================== بداية الإصلاح: إعادة محتوى المودالات المحذوفة ==================== */}
            <Modal open={filesModalOpen} onClose={handleCloseFilesModal}>
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 600 }, bgcolor: 'background.paper', boxShadow: 24, p: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">الملفات المرفقة لمهمة: "{task.title}"</Typography>
                        <IconButton onClick={handleCloseFilesModal}><CloseIcon /></IconButton>
                    </Box>
                    <List>
                        {task.files?.map((file, index) => (
                            <ListItem key={index} component="a" href={file} target="_blank" rel="noopener noreferrer" sx={{ '&:hover': { backgroundColor: 'action.hover' }}}>
                                <ListItemIcon><ArticleOutlinedIcon /></ListItemIcon>
                                <ListItemText primary={`ملف ${index + 1}`} secondary={file.split('/').pop()} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Modal>

            <Modal open={evaluationModalOpen} onClose={handleCloseEvaluationModal}>
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 500 }, bgcolor: 'background.paper', boxShadow: 24, p: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">تقييم مهمة: "{task.title}"</Typography>
                        <IconButton onClick={handleCloseEvaluationModal}><CloseIcon /></IconButton>
                    </Box>
                    <Typography gutterBottom>التقييم العام للمهمة (من 5 نجوم)</Typography>
                    <Rating name="academic-rating" value={currentRating} onChange={(event, newValue) => { setCurrentRating(newValue); }} sx={{ mb: 2 }} />
                    <TextField fullWidth multiline rows={4} label="الملاحظات على المهمة" placeholder="اكتب ملاحظاتك للطالب هنا..." variant="outlined" value={currentNotes} onChange={(e) => setCurrentNotes(e.target.value)} />
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button variant="outlined" onClick={handleCloseEvaluationModal}>إلغاء</Button>
                        <Button variant="contained" onClick={handleSaveEvaluation}>حفظ التقييم</Button>
                    </Box>
                </Paper>
            </Modal>
            {/* ==================== نهاية الإصلاح ==================== */}
        </>
    );
};

export default TaskCard;
