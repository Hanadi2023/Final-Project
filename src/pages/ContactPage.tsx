// src/pages/ContactPage.tsx

import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
    TextField,
    IconButton,
    Badge,
    // ==================== بداية الإصلاح: استيراد ListItemButton ====================
    ListItemButton
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

// --- أنواع البيانات والبيانات الوهمية (لا تغيير هنا) ---
interface Contact { id: number; name: string; avatar: string; lastMessage: string; timestamp: string; online: boolean; }
interface Message { id: number; text: string; sender: 'me' | 'them'; timestamp: string; }
const contactsData: Contact[] = [
    { id: 1, name: 'علي إبراهيم', avatar: 'A', lastMessage: 'تمام، سأقوم بالتعديل.', timestamp: '10:30 ص', online: true },
    { id: 2, name: 'نسيبة عبدالرحمن', avatar: 'N', lastMessage: 'شكراً لك يا مشرف.', timestamp: '9:15 ص', online: false },
    { id: 3, name: 'فاطمة محسن', avatar: 'F', lastMessage: 'تم إرسال التقرير.', timestamp: 'أمس', online: true },
    { id: 4, name: 'المشرف الأكاديمي د.خالد', avatar: 'K', lastMessage: 'يرجى مراجعة تقييم الطالب...', timestamp: 'أمس', online: false },
];
const conversationsData: { [key: number]: Message[] } = {
    1: [
        { id: 1, text: 'مرحباً علي، كيف حال تقريرك الأسبوعي؟', sender: 'me', timestamp: '10:28 ص' },
        { id: 2, text: 'أهلاً مشرف، أنا أعمل عليه الآن.', sender: 'them', timestamp: '10:29 ص' },
        { id: 3, text: 'تمام، سأقوم بالتعديل.', sender: 'them', timestamp: '10:30 ص' },
    ],
    2: [ { id: 1, text: 'شكراً لك يا مشرف.', sender: 'them', timestamp: '9:15 ص' }, ],
};
// --- نهاية البيانات ---


const ContactPage: React.FC = () => {
    const [selectedContactId, setSelectedContactId] = useState<number>(1);
    const [messages, setMessages] = useState<Message[]>(conversationsData[1] || []);
    const [newMessage, setNewMessage] = useState('');

    const handleSelectContact = (contactId: number) => {
        setSelectedContactId(contactId);
        setMessages(conversationsData[contactId] || []);
    };

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const newMsg: Message = {
            id: Date.now(),
            text: newMessage,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const selectedContact = contactsData.find(c => c.id === selectedContactId);

    return (
        <Paper sx={{ height: 'calc(100vh - 120px)', display: 'flex', overflow: 'hidden' }}>
            
            <Box sx={{ width: '300px', borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>جهات الاتصال</Typography>
                <Divider />
                <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                    {contactsData.map((contact) => (
                        // ==================== بداية الإصلاح: استخدام ListItemButton ====================
                        <ListItem key={contact.id} disablePadding>
                            <ListItemButton
                                selected={selectedContactId === contact.id}
                                onClick={() => handleSelectContact(contact.id)}
                            >
                                <ListItemAvatar>
                                    <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" sx={{ '& .MuiBadge-dot': { backgroundColor: contact.online ? '#44b700' : '#bdbdbd' } }}>
                                        <Avatar>{contact.avatar}</Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText primary={contact.name} secondary={contact.lastMessage} />
                            </ListItemButton>
                        </ListItem>
                        // ==================== نهاية الإصلاح ====================
                    ))}
                </List>
            </Box>

            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* ... (باقي الكود لا يتغير) ... */}
            </Box>
        </Paper>
    );
};

export default ContactPage;
