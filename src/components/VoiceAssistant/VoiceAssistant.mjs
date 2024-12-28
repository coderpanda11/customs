import { useState, useEffect } from "react";
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
import { useOpenAI } from '../OpenAI/OpenAIContext.mjs';
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { generateResponse } = useOpenAI();

  const handleVoiceCommand = async (command) => {
    try {
      setIsLoading(true);
      const responseText = await generateResponse(command);
      setResponse(responseText);
      
      const speech = new SpeechSynthesisUtterance(responseText);
      window.speechSynthesis.speak(speech);
    } catch (error) {
      console.error('Error:', error);
      setResponse("I apologize, but there was an error processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({
    commands: [{
      command: '*',
      callback: (command) => {
        if (!isLoading) {
          handleVoiceCommand(command);
        }
      }
    }]
  });

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error('Browser does not support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  const startListening = async () => {
    try {
      resetTranscript();
      setResponse("");
      window.speechSynthesis.cancel();
      await SpeechRecognition.startListening();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await SpeechRecognition.stopListening();
      if (transcript) {
        handleVoiceCommand(transcript);
      }
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
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
              window.speechSynthesis.cancel();
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