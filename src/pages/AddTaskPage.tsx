// src/pages/AddTaskPage.tsx

import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Chip,
    Snackbar,
    Alert,
    Checkbox,
    ListItemText,
    Divider,
    ListSubheader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const supervisedStudents = [
    { id: 1, name: 'علي إبراهيم' },
    { id: 2, name: 'نسيبة عبدالرحمن' },
    { id: 3, name: 'فاطمة محسن' },
    { id: 4, name: 'آزاد شائع' },
    { id: 5, name: 'هنادي أحمد' },
    { id: 6, name: 'محمد قاسم' },
];

const AddTaskPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isConfirmOpen, setConfirmOpen] = useState(false);

    const handleSelectAll = () => {
        if (selectedStudentIds.length === supervisedStudents.length) {
            setSelectedStudentIds([]);
        } else {
            setSelectedStudentIds(supervisedStudents.map(s => s.id));
        }
    };

    const handleToggleStudent = (studentId: number) => {
        const currentIndex = selectedStudentIds.indexOf(studentId);
        const newSelectedIds = [...selectedStudentIds];

        if (currentIndex === -1) {
            newSelectedIds.push(studentId);
        } else {
            newSelectedIds.splice(currentIndex, 1);
        }
        setSelectedStudentIds(newSelectedIds);
    };

    const filteredStudents = useMemo(() => 
        supervisedStudents.filter(student => 
            student.name.toLowerCase().includes(searchText.toLowerCase())
        ), 
        [searchText]
    );

    const handleAddTaskClick = () => {
        setConfirmOpen(true);
    };

    const handleConfirmAddTask = () => {
        const taskData = { title, description, startDate, endDate, studentIds: selectedStudentIds };
        console.log("بيانات المهمة المرسلة:", taskData);
        
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setSelectedStudentIds([]);
        
        setConfirmOpen(false);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => { setSnackbarOpen(false); };
    const canAddTask = title && description && startDate && endDate && selectedStudentIds.length > 0;

    return (
        <Paper sx={{ p: 4, maxWidth: '700px', mx: 'auto' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                إضافة مهمة جديدة
            </Typography>

            <Box component="form" noValidate autoComplete="off">
                <TextField fullWidth label="عنوان المهمة" variant="outlined" sx={{ mb: 3 }} value={title} onChange={(e) => setTitle(e.target.value)} />
                <TextField fullWidth label="وصف المهمة" variant="outlined" multiline rows={4} sx={{ mb: 3 }} value={description} onChange={(e) => setDescription(e.target.value)} />
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <TextField fullWidth label="تاريخ بدء المهمة" type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <TextField fullWidth label="تاريخ انتهاء المهمة" type="date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </Box>
                
                <FormControl fullWidth sx={{ mb: 4 }}>
                    <InputLabel id="student-select-label">إسناد إلى الطلاب</InputLabel>
                    <Select
                        labelId="student-select-label"
                        label="إسناد إلى الطلاب"
                        multiple
                        value={selectedStudentIds}
                        input={<OutlinedInput label="إسناد إلى الطلاب" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((id) => {
                                    const student = supervisedStudents.find(s => s.id === id);
                                    return <Chip key={id} label={student?.name || ''} />;
                                })}
                            </Box>
                        )}
                        MenuProps={{ autoFocus: false }}
                    >
                        <ListSubheader>
                            <TextField
                                size="small"
                                autoFocus
                                placeholder="ابحث عن طالب..."
                                fullWidth
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                        </ListSubheader>

                        <MenuItem onClick={handleSelectAll}>
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <ListItemText primary="تحديد الكل" sx={{ fontWeight: 'bold' }} />
                                <Checkbox
                                    icon={<CheckBoxOutlineBlankIcon />}
                                    checkedIcon={<CheckBoxIcon />}
                                    indeterminateIcon={<IndeterminateCheckBoxIcon />}
                                    checked={selectedStudentIds.length === supervisedStudents.length}
                                    indeterminate={selectedStudentIds.length > 0 && selectedStudentIds.length < supervisedStudents.length}
                                />
                            </Box>
                        </MenuItem>
                        <Divider />

                        {filteredStudents.map(student => (
                            <MenuItem key={student.id} onClick={() => handleToggleStudent(student.id)}>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <ListItemText primary={student.name} />
                                    <Checkbox
                                        icon={<RadioButtonUncheckedIcon />}
                                        checkedIcon={<CheckCircleIcon color="primary" />}
                                        checked={selectedStudentIds.indexOf(student.id) > -1}
                                    />
                                </Box>
                            </MenuItem>
                        ))}
                        
                        {filteredStudents.length === 0 && (
                            <MenuItem disabled>لا توجد نتائج</MenuItem>
                        )}
                    </Select>
                </FormControl>

                <Button variant="contained" size="large" fullWidth onClick={handleAddTaskClick} disabled={!canAddTask}>
                    إضافة المهمة
                </Button>
            </Box>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    تم إضافة المهمة بنجاح!
                </Alert>
            </Snackbar>

            <Dialog
                open={isConfirmOpen}
                onClose={() => setConfirmOpen(false)}
            >
                <DialogTitle>تأكيد إضافة المهمة</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        هل أنت متأكد من رغبتك في إضافة هذه المهمة وإسنادها إلى {selectedStudentIds.length} طالب؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>إلغاء</Button>
                    <Button onClick={handleConfirmAddTask} variant="contained" autoFocus>
                        تأكيد الإضافة
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default AddTaskPage;
