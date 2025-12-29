// src/pages/ContactPage.tsx (المحتوى الجديد لمعلومات التواصل)

import React from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Link,
    IconButton
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

// بيانات وهمية لمعلومات التواصل
const contactInfo = {
    phone: '+967 777 123 456',
    email: 'field.supervisor@university.edu.ye',
    linkedin: 'https://www.linkedin.com/in/fieldsupervisor',
    facebook: 'https://www.facebook.com/fieldsupervisor',
    twitter: 'https://www.twitter.com/fieldsupervisor',
};

const ContactPage: React.FC = ( ) => {
    return (
        <Paper sx={{ p: 4, maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                معلومات التواصل
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                يمكن للجامعة والطلاب استخدام المعلومات التالية للتواصل مع المشرف الميداني.
            </Typography>

            <List>
                {/* --- رقم الهاتف --- */}
                <ListItem>
                    <ListItemIcon>
                        <PhoneIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                        primary="رقم الهاتف" 
                        secondary={
                            <Link href={`tel:${contactInfo.phone}`} sx={{ textDecoration: 'none', color: 'text.primary', fontSize: '1.1rem' }}>
                                {contactInfo.phone}
                            </Link>
                        } 
                    />
                </ListItem>
                <Divider component="li" sx={{ my: 1 }} />

                {/* --- البريد الإلكتروني --- */}
                <ListItem>
                    <ListItemIcon>
                        <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                        primary="البريد الإلكتروني" 
                        secondary={
                            <Link href={`mailto:${contactInfo.email}`} sx={{ textDecoration: 'none', color: 'text.primary', fontSize: '1.1rem' }}>
                                {contactInfo.email}
                            </Link>
                        } 
                    />
                </ListItem>
                <Divider component="li" sx={{ my: 1 }} />

                {/* --- وسائل التواصل الاجتماعي --- */}
                <ListItem>
                    <ListItemIcon>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>التواصل الاجتماعي</Typography>
                    </ListItemIcon>
                    <ListItemText 
                        primary={
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton component={Link} href={contactInfo.linkedin} target="_blank" color="primary" aria-label="LinkedIn">
                                    <LinkedInIcon fontSize="large" />
                                </IconButton>
                                <IconButton component={Link} href={contactInfo.facebook} target="_blank" color="primary" aria-label="Facebook">
                                    <FacebookIcon fontSize="large" />
                                </IconButton>
                                <IconButton component={Link} href={contactInfo.twitter} target="_blank" color="primary" aria-label="Twitter">
                                    <TwitterIcon fontSize="large" />
                                </IconButton>
                            </Box>
                        } 
                    />
                </ListItem>
            </List>
        </Paper>
    );
};

export default ContactPage;
