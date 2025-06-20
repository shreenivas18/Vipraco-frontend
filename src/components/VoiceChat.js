import React, { useState, useEffect, useRef } from 'react';
import { voiceApi } from '../api';
import Orb from './Orb';
import './VoiceChat.css';

const VoiceChat = () => {
    const [voiceState, setVoiceState] = useState('initializing');
    const [responseText, setResponseText] = useState('');
    const [permission, setPermission] = useState(false);

    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);
    const streamRef = useRef(null); // Ref to hold the stream

    // Effect for permission check and cleanup
    useEffect(() => {
        const getMicrophonePermission = async () => {
            if ('MediaRecorder' in window) {
                try {
                    // Get stream to trigger permission prompt, then immediately stop it
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    stream.getTracks().forEach(track => track.stop());
                    setPermission(true);
                    setVoiceState('idle');
                } catch (err) {
                    console.error('Microphone permission denied:', err);
                    setVoiceState('permission_denied');
                }
            } else {
                setVoiceState('unsupported');
            }
        };
        getMicrophonePermission();

        // Cleanup function to stop stream on component unmount
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const startRecording = async () => {
        setVoiceState('recording');
        audioChunks.current = [];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream; // Store the stream
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.current.push(event.data);
                }
            };
            mediaRecorder.current.onstop = sendAudio;
            mediaRecorder.current.start();
        } catch (error) {
            console.error('Could not start recording:', error);
            setVoiceState('permission_denied');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
            setVoiceState('processing');
        }
    };

    const sendAudio = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.webm');

        try {
            const response = await voiceApi.post('/voice-query', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setResponseText(response.data.responseText || 'Your request has been processed.');
            setVoiceState('result');
        } catch (error) {
            console.error('Error sending audio:', error);
            setResponseText('Sorry, there was an error processing your request.');
            setVoiceState('result');
        } finally {
            // Ensure the stream is stopped after processing
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        }
    };

    const handleMicClick = () => {
        if (!permission) return;

        if (voiceState === 'idle') {
            startRecording();
        } else if (voiceState === 'recording') {
            stopRecording();
        }
    };
    
    const resetToIdle = () => {
        setResponseText('');
        setVoiceState('idle');
    };

    const renderContent = () => {
        switch (voiceState) {
            case 'recording':
                return (
                    <div
                        className="mic-orb-container"
                        onClick={handleMicClick}
                        role="button"
                        aria-label="Stop recording"
                    >
                        <div className="orb-wrapper">
                            <Orb forceHoverState={true} />
                        </div>
                        <span className="material-symbols-outlined mic-icon-overlay">mic</span>
                    </div>
                );
            case 'processing':
                return <p className="voice-chat-prompt">Processing your request...</p>;
            case 'result':
                return (
                    <div className="result-container">
                        <p className="result-text">{responseText}</p>
                        <button onClick={resetToIdle} className="record-again-button">Record Again</button>
                    </div>
                );
            case 'idle':
                return (
                    <button
                        className="mic-button-small"
                        onClick={handleMicClick}
                        aria-label="Start recording"
                    >
                        <span className="material-symbols-outlined">mic</span>
                    </button>
                );
            case 'permission_denied':
                return <p className="voice-chat-prompt">Microphone permission is required.</p>;
            case 'unsupported':
                return <p className="voice-chat-prompt">Audio recording is not supported on this browser.</p>;
            case 'initializing':
            default:
                return <p className="voice-chat-prompt">Initializing...</p>;
        }
    };

    return (
        <main className="voice-chat-container">
            {voiceState === 'idle' && <p className="voice-chat-prompt">Click the mic to start recording</p>}
            {voiceState === 'recording' && <p className="voice-chat-prompt">Listening...</p>}
            {renderContent()}
        </main>
    );
};

export default VoiceChat;
