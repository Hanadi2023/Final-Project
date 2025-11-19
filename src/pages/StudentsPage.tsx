// src/pages/StudentsPage.tsx

import React, { useState, useMemo } from 'react';
import { Typography, Paper, Box, Button, TextField, InputAdornment, Alert, MenuItem, FormControl, InputLabel, Select } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';
import StudentCard from '../components/StudentCard';
import TrainingEntityCard from '../components/TrainingEntityCard';

// ==================== بداية التصحيح: إعادة البيانات الوهمية التي تم حذفها ====================
const studentsData = [
    { id: 1, name: 'علي إبراهيم', major: 'نظم معلومات', status: 'جاهز للإسناد' },
    { id: 2, name: 'نسيبة عبدالرحمن', major: 'تقنية معلومات', status: 'جاهز للإسناد' },
    { id: 3, name: 'فاطمة محسن', major: 'علوم حاسوب', status: 'جاهز للإسناد' },
    { id: 4, name: 'آزاد شائع', major: 'هندسة برمجيات', status: 'جاهز للإسناد' },
    { id: 5, name: 'هنادي أحمد', major: 'نظم معلومات', status: 'جاهز للإسناد' },
];
const entitiesData = [
    { 
        id: 101, name: 'يمن سوفت', details: 'شركة رائدة في تطوير الأنظمة المحاسبية والإدارية.',
        fields: [
            { name: 'تطوير برمجيات', capacity: { used: 1, total: 3 } },
            { name: 'تحليل أنظمة', capacity: { used: 1, total: 1 } },
            { name: 'قواعد بيانات', capacity: { used: 0, total: 1 } },
        ]
    },
    { 
        id: 102, name: 'كاك بنك', details: 'أحد أكبر البنوك في اليمن، يوفر بيئة عمل متقدمة.',
        fields: [
            { name: 'شبكات', capacity: { used: 4, total: 4 } },
            { name: 'أمن سيبراني', capacity: { used: 0, total: 2 } },
        ]
    },
    { 
        id: 103, name: 'مجموعة هائل سعيد', details: 'مجموعة تجارية ضخمة تحتاج إلى محللي بيانات ومدراء مشاريع.',
        fields: [
            { name: 'تحليل بيانات', capacity: { used: 0, total: 2 } },
            { name: 'إدارة مشاريع', capacity: { used: 0, total: 1 } },
        ]
    },
];
// ==================== نهاية التصحيح ====================

const StudentsPage: React.FC = () => {
    const [selectedStudentIds, setSelectedStudentIds] = useState<Set<number>>(new Set());
    const [selectedEntityId, setSelectedEntityId] = useState<number | null>(null);
    const [selectedField, setSelectedField] = useState<string>('');
    const [studentSearch, setStudentSearch] = useState('');
    const [entitySearch, setEntitySearch] = useState('');
    const [assignmentSuccess, setAssignmentSuccess] = useState(false);

    const handleStudentToggle = (studentId: number) => {
        setAssignmentSuccess(false);
        setSelectedStudentIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(studentId)) { newSet.delete(studentId); } else { newSet.add(studentId); }
            return newSet;
        });
    };

    const handleEntitySelect = (entityId: number) => {
        setAssignmentSuccess(false);
        const newEntityId = selectedEntityId === entityId ? null : entityId;
        setSelectedEntityId(newEntityId);
        setSelectedField(''); 
    };

    const handleAssignClick = () => {
        setAssignmentSuccess(true);
        setSelectedStudentIds(new Set());
        setSelectedEntityId(null);
        setSelectedField('');
    };

    const filteredStudents = useMemo(() => studentsData.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.major.toLowerCase().includes(studentSearch.toLowerCase())), [studentSearch]);
    const filteredEntities = useMemo(() => entitiesData.filter(e => e.name.toLowerCase().includes(entitySearch.toLowerCase()) || e.fields.some(f => f.name.toLowerCase().includes(entitySearch.toLowerCase()))), [entitySearch]);
    const selectedEntity = entitiesData.find(e => e.id === selectedEntityId);
    const availableCapacity = useMemo(() => {
        if (!selectedEntity || !selectedField) return 0;
        const fieldData = selectedEntity.fields.find(f => f.name === selectedField);
        return fieldData ? fieldData.capacity.total - fieldData.capacity.used : 0;
    }, [selectedEntity, selectedField]);
    const canAssign = selectedStudentIds.size > 0 && selectedEntityId !== null && selectedField !== '' && selectedStudentIds.size <= availableCapacity;

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
                إدارة وتوزيع الطلاب
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                {/* عمود الطلاب */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Paper sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>الطلاب المؤهلون ({filteredStudents.length})</Typography>
                        <TextField fullWidth variant="outlined" size="small" placeholder="بحث بالاسم أو التخصص..." value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} sx={{ mb: 2 }} />
                        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                            {filteredStudents.map((student) => (
                                <StudentCard key={student.id} name={student.name} major={student.major} status={student.status} isSelected={selectedStudentIds.has(student.id)} onToggle={() => handleStudentToggle(student.id)} />
                            ))}
                        </Box>
                    </Paper>
                </Box>

                {/* عمود الجهات */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Paper sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>جهات التدريب المتاحة ({filteredEntities.length})</Typography>
                        <TextField fullWidth variant="outlined" size="small" placeholder="بحث بالاسم أو المجال..." value={entitySearch} onChange={(e) => setEntitySearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} sx={{ mb: 2 }} />
                        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                            {filteredEntities.map((entity) => (
                                <TrainingEntityCard key={entity.id} name={entity.name} fields={entity.fields.map(f => f.name)} capacity={{ used: entity.fields.reduce((sum, f) => sum + f.capacity.used, 0), total: entity.fields.reduce((sum, f) => sum + f.capacity.total, 0) }} isSelected={selectedEntityId === entity.id} onClick={() => handleEntitySelect(entity.id)} />
                            ))}
                        </Box>
                    </Paper>
                </Box>

                {/* عمود الإسناد */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Paper sx={{ p: 2, height: '80vh', position: 'sticky', top: '88px' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>تفاصيل الجهة والإسناد</Typography>
                        
                        {assignmentSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                تم إسناد الطلاب بنجاح!
                            </Alert>
                        )}

                        {selectedEntity ? (
                            <Box>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>{selectedEntity.name}</Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{selectedEntity.details}</Typography>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel>اختر المجال</InputLabel>
                                    <Select
                                        value={selectedField}
                                        label="اختر المجال"
                                        onChange={(e) => setSelectedField(e.target.value)}
                                    >
                                        {selectedEntity.fields.map(field => (
                                            <MenuItem key={field.name} value={field.name}>
                                                {`${field.name} (المتاح: ${field.capacity.total - field.capacity.used})`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Box sx={{ mt: 2, p: 2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                                    <Typography sx={{ mb: 2 }}>تم تحديد <strong>{selectedStudentIds.size}</strong> طالب.</Typography>
                                    <Button variant="contained" fullWidth disabled={!canAssign} onClick={handleAssignClick}>
                                        إسناد {selectedStudentIds.size} طالب إلى "{selectedField}"
                                    </Button>
                                    {!canAssign && selectedStudentIds.size > availableCapacity && selectedField && (
                                        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                                            عدد الطلاب ({selectedStudentIds.size}) يتجاوز السعة المتاحة للمجال ({availableCapacity}).
                                        </Typography>
                                    )}
                                </Box>
                            </Box>
                        ) : (
                            !assignmentSuccess && (
                                <Typography color="text.secondary">الرجاء اختيار جهة تدريب لعرض تفاصيلها.</Typography>
                            )
                        )}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
};

export default StudentsPage;
