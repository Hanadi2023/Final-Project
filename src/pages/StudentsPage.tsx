// src/pages/StudentsPage.tsx (النسخة النهائية والمصححة)

import React, { useState, useMemo } from 'react';
import {
    Typography, Paper, Box, Button, TextField, InputAdornment, Alert, MenuItem,
    FormControl, InputLabel, Select,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, IconButton
} from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';
import ReplayIcon from '@mui/icons-material/Replay';
import StudentCard from '../components/StudentCard';
import TrainingEntityCard from '../components/TrainingEntityCard';

// ==================== بداية التعديل 1: تحديث البيانات الوهمية ====================

// 1. تحديث بيانات الطلاب لتعكس أن بعضهم مسند بالفعل
const initialStudentsData = [
    { id: 1, name: 'علي إبراهيم', major: 'نظم معلومات', status: 'جاهز للإسناد' },
    { id: 2, name: 'نسيبة عبدالرحمن', major: 'تقنية معلومات', status: 'مسند' }, // <-- مسند
    { id: 3, name: 'فاطمة محسن', major: 'علوم حاسوب', status: 'جاهز للإسناد' },
    { id: 4, name: 'آزاد شائع', major: 'هندسة برمجيات', status: 'مسند' }, // <-- مسند
    { id: 5, name: 'هنادي أحمد', major: 'نظم معلومات', status: 'مسند' }, // <-- مسند
];

// 2. تحديث بيانات الجهات لتعكس السعة المستخدمة
const initialEntitiesData = [
    { 
        id: 101, name: 'يمن سوفت', details: 'شركة رائدة في تطوير الأنظمة المحاسبية والإدارية.',
        fields: [
            { name: 'تطوير برمجيات', capacity: { used: 1, total: 3 } }, // مستخدم: 1
            { name: 'تحليل أنظمة', capacity: { used: 0, total: 1 } },
            { name: 'قواعد بيانات', capacity: { used: 0, total: 1 } },
        ]
    },
    { 
        id: 102, name: 'كاك بنك', details: 'أحد أكبر البنوك في اليمن، يوفر بيئة عمل متقدمة.',
        fields: [
            { name: 'شبكات', capacity: { used: 1, total: 4 } }, // مستخدم: 1
            { name: 'أمن سيبراني', capacity: { used: 0, total: 2 } },
        ]
    },
    { 
        id: 103, name: 'مجموعة هائل سعيد', details: 'مجموعة تجارية ضخمة تحتاج إلى محللي بيانات ومدراء مشاريع.',
        fields: [
            { name: 'تحليل بيانات', capacity: { used: 1, total: 2 } }, // مستخدم: 1
            { name: 'إدارة مشاريع', capacity: { used: 0, total: 1 } },
        ]
    },
];

type AssignmentStatus = 'pending' | 'approved' | 'rejected';
interface Assignment {
    studentId: number;
    studentName: string;
    entityName: string;
    status: AssignmentStatus;
}

// 3. إضافة بيانات وهمية لجدول الإسناد
const initialAssignments: Assignment[] = [
    { studentId: 2, studentName: 'نسيبة عبدالرحمن', entityName: 'يمن سوفت', status: 'approved' },
    { studentId: 4, studentName: 'آزاد شائع', entityName: 'كاك بنك', status: 'rejected' },
    { studentId: 5, studentName: 'هنادي أحمد', entityName: 'مجموعة هائل سعيد', status: 'pending' },
];
// ==================== نهاية التعديل 1 ====================


const StatusChip: React.FC<{ status: AssignmentStatus }> = ({ status }) => {
    const statusMap = {
        pending: { label: 'قيد الموافقة', color: 'warning' as const },
        approved: { label: 'مقبول', color: 'success' as const },
        rejected: { label: 'مرفوض', color: 'error' as const },
    };
    return <Chip label={statusMap[status].label} color={statusMap[status].color} size="small" />;
};


const StudentsPage: React.FC = () => {
    const [students, setStudents] = useState(initialStudentsData);
    // ==================== بداية التعديل 2: استخدام البيانات الوهمية الجديدة ====================
    const [entities, setEntities] = useState(initialEntitiesData); // <-- استخدام حالة للجهات
    const [assignments, setAssignments] = useState(initialAssignments); // <-- استخدام البيانات الوهمية
    // ==================== نهاية التعديل 2 ====================

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

    // ==================== بداية التعديل 3: تعديل دالة الإسناد لتحديث السعة ====================
    const handleAssignClick = () => {
        if (!selectedEntityId || !selectedField) return;
        const entity = entities.find(e => e.id === selectedEntityId);
        if (!entity) return;

        const newAssignments: Assignment[] = [];
        const updatedStudents = students.map(student => {
            if (selectedStudentIds.has(student.id)) {
                newAssignments.push({
                    studentId: student.id,
                    studentName: student.name,
                    entityName: entity.name,
                    status: 'pending'
                });
                return { ...student, status: 'مسند' };
            }
            return student;
        });

        // تحديث السعة المستخدمة في الجهة
        const updatedEntities = entities.map(e => {
            if (e.id === selectedEntityId) {
                const updatedFields = e.fields.map(f => {
                    if (f.name === selectedField) {
                        return { ...f, capacity: { ...f.capacity, used: f.capacity.used + selectedStudentIds.size } };
                    }
                    return f;
                });
                return { ...e, fields: updatedFields };
            }
            return e;
        });

        setAssignments(prev => [...prev, ...newAssignments]);
        setStudents(updatedStudents);
        setEntities(updatedEntities); // <-- تحديث حالة الجهات

        setAssignmentSuccess(true);
        setSelectedStudentIds(new Set());
        setSelectedEntityId(null);
        setSelectedField('');
    };
    // ==================== نهاية التعديل 3 ====================

    const handleReassign = (studentId: number) => {
        // هذا الجزء يحتاج إلى تعديل مستقبلاً ليعيد السعة للجهة التي تم رفض الطالب منها
        setAssignments(assignments.filter(a => a.studentId !== studentId));
        setStudents(students.map(s => s.id === studentId ? { ...s, status: 'جاهز للإسناد' } : s));
    };

    const filteredStudents = useMemo(() => 
        students.filter(s => 
            s.status === 'جاهز للإسناد' && 
            (s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.major.toLowerCase().includes(studentSearch.toLowerCase()))
        ), 
        [students, studentSearch]
    );

    // ==================== بداية التعديل 4: استخدام حالة الجهات الجديدة ====================
    const filteredEntities = useMemo(() => entities.filter(e => e.name.toLowerCase().includes(entitySearch.toLowerCase()) || e.fields.some(f => f.name.toLowerCase().includes(entitySearch.toLowerCase()))), [entities, entitySearch]);
    const selectedEntity = entities.find(e => e.id === selectedEntityId);
    // ==================== نهاية التعديل 4 ====================

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

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 4 }}>
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
                                            <MenuItem key={field.name} value={field.name} disabled={field.capacity.used >= field.capacity.total}>
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

            <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                حالة إسناد الطلاب
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                            <TableCell>اسم الطالب</TableCell>
                            <TableCell>جهة التدريب</TableCell>
                            <TableCell>الحالة</TableCell>
                            <TableCell align="center">إجراء</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assignments.map(assignment => (
                            <TableRow key={assignment.studentId} hover>
                                <TableCell>{assignment.studentName}</TableCell>
                                <TableCell>{assignment.entityName}</TableCell>
                                <TableCell><StatusChip status={assignment.status} /></TableCell>
                                <TableCell align="center">
                                    {assignment.status === 'rejected' && (
                                        <IconButton color="primary" size="small" onClick={() => handleReassign(assignment.studentId)} title="إعادة الطالب لقائمة الإسناد">
                                            <ReplayIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                        {assignments.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <Typography color="text.secondary" sx={{ p: 3 }}>
                                        لا يوجد طلاب مسندون حالياً.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default StudentsPage;
