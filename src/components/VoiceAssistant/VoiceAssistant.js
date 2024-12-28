import React, { useState, useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { 
  Container, 
  Card, 
  CardContent,
  Typography,
  IconButton,
  Box,
  Paper,
  Button,
  CircularProgress
} from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import { useOpenAI } from '../OpenAI/OpenAIContext';
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [response, setResponse] = useState("");
  const [lastTranscript, setLastTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { generateResponse } = useOpenAI();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Handle transcript changes
  useEffect(() => {
    const processTranscript = async () => {
      if (transcript && transcript !== lastTranscript && !listening) {
        try {
          setIsLoading(true);
          const responseText = await generateResponse(transcript);
          setResponse(responseText);
          
          // Use browser's built-in speech synthesis
          const speech = new SpeechSynthesisUtterance(responseText);
          window.speechSynthesis.speak(speech);
        } catch (error) {
          console.error('Error:', error);
          setResponse("I apologize, but there was an error processing your request.");
        } finally {
          setIsLoading(false);
        }
        setLastTranscript(transcript);
      }
    };

    processTranscript();
  }, [transcript, lastTranscript, listening, generateResponse]);

  const startListening = () => {
    resetTranscript();
    setLastTranscript("");
    setResponse("");
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <Container maxWidth="md">
        <Card className="error-card">
          <CardContent>
            <Typography variant="h6" color="error">
              Browser doesn't support speech recognition. Please try using Chrome.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Card className="voice-assistant-card">
        <CardContent>
          <Typography variant="h4" gutterBottom>AI Voice Assistant</Typography>
          <Box className="microphone-container">
            <IconButton 
              className="mic-button"
              size="large"
              onClick={listening ? stopListening : startListening}
              color={listening ? "secondary" : "primary"}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : listening ? (
                <StopIcon fontSize="large" />
              ) : (
                <MicIcon fontSize="large" />
              )}
            </IconButton>
          </Box>
          
          {transcript && (
            <Paper className="transcript-paper">
              <Typography variant="body1">You said: {transcript}</Typography>
            </Paper>
          )}
          
          {response && (
            <Paper className="response-paper">
              <Typography variant="body1">Assistant: {response}</Typography>
            </Paper>
          )}
          
          <Button 
            variant="outlined" 
            onClick={() => {
              resetTranscript();
              setResponse("");
              setLastTranscript("");
              window.speechSynthesis.cancel(); // Stop any ongoing speech
            }}
            className="clear-button"
          >
            Clear Conversation
          </Button>
          
          <Typography variant="body2" className="helper-text">
            Click the microphone and ask anything about evidence collection, report generation, or training resources.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VoiceAssistant; 