// src/pages/SettingsPage.tsx

import React from 'react';
import {
    Box, Typography, Paper, TextField, Button, Divider, Avatar,
    Switch, FormControlLabel, FormGroup, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

interface SettingsPageProps {
    mode: 'light' | 'dark';
    toggleColorMode: () => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ mode, toggleColorMode }) => {
    const currentUser = { name: 'د. أحمد محمد', email: 'ahmed.mohammed@university.edu', avatar: '' };

    return (
        <Box>
            <Typography variant="h4" gutterBottom fontWeight="bold">الإعدادات</Typography>

            <Paper sx={{ p: 3, mt: 2 }}>
                <Typography variant="h6" gutterBottom>إعدادات الحساب الشخصي</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                    <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }} src={currentUser.avatar}>{currentUser.name.charAt(0)}</Avatar>
                    <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
                        تغيير الصورة
                        <input type="file" hidden accept="image/*" />
                    </Button>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                    <TextField fullWidth label="الاسم الكامل" defaultValue={currentUser.name} variant="outlined" sx={{ mb: 2 }} />
                    <TextField fullWidth label="البريد الإلكتروني" defaultValue={currentUser.email} variant="outlined" disabled sx={{ mb: 3 }} />
                    <Button variant="contained" sx={{ mr: 1 }}>حفظ التغييرات</Button>
                    <Button variant="outlined">تغيير كلمة المرور</Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>إعدادات الإشعارات</Typography>
                <Divider sx={{ mb: 2 }} />
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked />} label="تفعيل الإشعارات عبر البريد الإلكتروني" sx={{ mb: 1 }} />
                    <Divider sx={{ my: 1 }} />
                    <Typography color="text.secondary" sx={{ mb: 1 }}>أعلمني عند:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        <FormControlLabel control={<Switch defaultChecked size="small" />} label="تسليم طالب لتقرير جديد" />
                        <FormControlLabel control={<Switch defaultChecked size="small" />} label="إرسال مشرف ميداني لتقييم" />
                        <FormControlLabel control={<Switch size="small" />} label="اقتراب موعد نهائي لتسليم مهمة" />
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <FormControlLabel control={<Switch />} label="إرسال ملخص أسبوعي بالأنشطة" />
                </FormGroup>
                <Box sx={{ mt: 3, textAlign: 'right' }}><Button variant="contained">حفظ تفضيلات الإشعارات</Button></Box>
            </Paper>

            <Paper sx={{ p: 3, mt: 3 }}>
                <Typography variant="h6" gutterBottom>إعدادات الواجهة والتفضيلات</Typography>
                <Divider sx={{ mb: 3 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <FormControlLabel control={<Switch checked={mode === 'dark'} onChange={toggleColorMode} />} label="الوضع الليلي (Dark Mode)" />
                    <FormControl fullWidth>
                        <InputLabel>لغة الواجهة</InputLabel>
                        <Select defaultValue="ar" label="لغة الواجهة">
                            <MenuItem value="ar">العربية</MenuItem>
                            <MenuItem value="en">English</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>عدد العناصر الافتراضي في الجداول</InputLabel>
                        <Select defaultValue={10} label="عدد العناصر الافتراضي في الجداول">
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ mt: 3, textAlign: 'right' }}><Button variant="contained">حفظ التفضيلات</Button></Box>
            </Paper>
        </Box>
    );
};

export default SettingsPage;
