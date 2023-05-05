import React, { useState, useRef, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import {Box, Button, Grid, TextField} from '@mui/material';
const socket: Socket = io('http://localhost:5000');

type MessageType = {
    text: string;
    isBot: boolean;
};

function GtpChatPage(): JSX.Element {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const messageRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: message, isBot: true },
            ]);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!messageRef.current || messageRef.current.value === '') {
            return;
        }
        const message = messageRef.current.value;
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, isBot: false },
        ]);
        socket.emit('message', message);
        messageRef.current.value = '';
    };
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid sx={{marginLeft: 'auto',marginRight: 'auto', padding: '10px 60px 100px 30px', width: '100%'}}>
                {messages.map((message, index) => (
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            '&.user': {
                                div: {
                                    marginLeft: '60px',
                                },
                            },
                            '&.bot': {
                                justifyContent: 'flex-start',
                                div: {
                                    marginRight: '60px',
                                    background: '#1976d2',
                                },
                            },
                            '&:not(:last-child)': {
                                marginBottom: 1,
                            },
                        }}
                        className={`message ${message.isBot ? 'bot' : 'user'}`}
                        key={index}
                    >
                        <Grid
                            sx={{
                                backgroundColor: "#1976d2",
                                color: "white",
                                padding: 1,
                                borderRadius: 3
                            }}
                        >{message.text}</Grid>
                    </Grid>
                ))}
                <div ref={messagesEndRef} />
            </Grid>
            <Grid
                sx={{
                    marginTop: 'auto',
                    width: '100%',
                    backgroundColor: '#fff',
                    // borderTop: '1px solid #1976d2',
                    padding: '10px',
                    boxSizing: 'border-box',
                    position: 'fixed',
                    bottom: 0
                }}
            >
                {' '}
                <form onSubmit={handleSubmit}>
                    <Box display="flex">
                        <TextField
                            fullWidth
                            placeholder="Type your message here"
                            inputRef={messageRef}
                        />
                        <Button type="submit" variant="contained" sx={{ ml: 2 }}>
                            Send
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
}
export default GtpChatPage;