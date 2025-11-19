// src/components/TaskCard.tsx

import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Chip, Button, Modal, IconButton, List, ListItem, ListItemIcon, ListItemText, TextField, Rating, Divider } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

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
    status: 'تم التسليم' | 'بانتظار المراجعة' | 'متأخر' | 'تم التقييم';
    description: string;
    fieldSupervisorGrade?: number;
    files?: string[];
    academicSupervisorNotes?: string;
    academicSupervisorRating?: number;
    fieldSupervisorFinalEvaluation?: FieldSupervisorEvaluation;
}

interface TaskCardProps {
    task: Task;
    onUpdate: (taskId: number, rating: number, notes: string) => void;
}

const getStatusChipColor = (status: Task['status']): 'success' | 'warning' | 'error' | 'info' => {
    switch (status) {
        case 'تم التقييم': return 'success';
        case 'بانتظار المراجعة': return 'warning';
        case 'متأخر': return 'error';
        default: return 'info';
    }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
    const [filesModalOpen, setFilesModalOpen] = useState(false);
    const [evaluationModalOpen, setEvaluationModalOpen] = useState(false);
    const [finalEvalModalOpen, setFinalEvalModalOpen] = useState(false);
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
    const handleOpenFinalEvalModal = () => setFinalEvalModalOpen(true);
    const handleCloseFinalEvalModal = () => setFinalEvalModalOpen(false);
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
                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 1 }}>
                    <CalendarTodayOutlinedIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                    <Typography variant="caption">تاريخ التسليم: {task.submissionDate}</Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>{task.description}</Typography>
                {task.fieldSupervisorGrade && (<Typography variant="body2" sx={{ fontWeight: 'bold', mb: 2 }}>تقييم المشرف الميداني للمهمة: {task.fieldSupervisorGrade} / 100</Typography>)}
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
                    {task.fieldSupervisorFinalEvaluation && (
                        <Button variant="outlined" color="primary" size="small" onClick={handleOpenFinalEvalModal}>
                            التقييم النهائي (الميداني)
                        </Button>
                    )}
                    <Button variant="contained" size="small" onClick={handleOpenEvaluationModal}>
                        {task.academicSupervisorNotes ? 'تعديل تقييم المهمة' : 'تقييم المهمة'}
                    </Button>
                </Box>
            </Paper>

            {/* ==================== بداية التصحيح: إعادة محتوى المودالات المحذوفة ==================== */}
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
            {/* ==================== نهاية التصحيح ==================== */}

            <Modal open={finalEvalModalOpen} onClose={handleCloseFinalEvalModal}>
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 600 }, bgcolor: 'background.paper', boxShadow: 24, p: 3, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                            التقييم النهائي من المشرف الميداني
                        </Typography>
                        <IconButton onClick={handleCloseFinalEvalModal}><CloseIcon /></IconButton>
                    </Box>
                    
                    {task.fieldSupervisorFinalEvaluation ? (
                        <>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>تقييم المعايير</Typography>
                            <Paper variant="outlined" sx={{ p: 2, mb: 2.5 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                    <Typography>الالتزام والانضباط:</Typography>
                                    <Typography fontWeight="bold">{task.fieldSupervisorFinalEvaluation.attendanceAndDiscipline} / 5</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                                    <Typography>المبادرة والتعاون:</Typography>
                                    <Typography fontWeight="bold">{task.fieldSupervisorFinalEvaluation.initiativeAndCooperation} / 5</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography>الأداء العام وجودة المخرجات:</Typography>
                                    <Typography fontWeight="bold">{task.fieldSupervisorFinalEvaluation.overallPerformance} / 5</Typography>
                                </Box>
                            </Paper>

                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>ملاحظات المشرف</Typography>
                            <Typography variant="body1" sx={{ mb: 2.5, whiteSpace: 'pre-wrap', fontStyle: 'italic', bgcolor: 'action.hover', p: 1.5, borderRadius: 1 }}>
                                "{task.fieldSupervisorFinalEvaluation.finalNotes}"
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'primary.lighter', borderRadius: 1 }}>
                                <Typography variant="h6" fontWeight="bold" color="primary.dark">الدرجة النهائية</Typography>
                                <Typography variant="h4" fontWeight="bold" color="primary.dark">
                                    {task.fieldSupervisorFinalEvaluation.finalGrade} <span style={{fontSize: '1rem'}}>/ 100</span>
                                </Typography>
                            </Box>
                        </>
                    ) : (
                        <Typography>لا يوجد تقييم نهائي متاح حالياً.</Typography>
                    )}
                </Paper>
            </Modal>
        </>
    );
};

export default TaskCard;
