// Import necessary libraries
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useSpeechRecognition, useSpeechSynthesis } from "react-speech-kit";
import "./App.css";

// AI Voice Assistant Component
function VoiceAssistant() {
  const { speak } = useSpeechSynthesis();
  const { listen, stop, listening } = useSpeechRecognition({
    onResult: (result) => {
      handleVoiceCommand(result);
    },
  });

  const handleVoiceCommand = (command) => {
    if (command.includes("evidence")) {
      speak({ text: "Here is the guide for evidence collection." });
    } else if (command.includes("report")) {
      speak({ text: "Here is the guide for report generation." });
    } else {
      speak({ text: "I am sorry, I didn't understand that." });
    }
  };

  return (
    <div className="voice-assistant">
      <h2>AI Voice Assistant</h2>
      <button onClick={listening ? stop : listen}>
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
    </div>
  );
}

// Evidence Collection Guide Component
function EvidenceCollection() {
  return (
    <div>
      <h2>Evidence Collection Guide</h2>
      <p>Step-by-step guide for physical and digital evidence collection.</p>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/example"
        title="Evidence Collection Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

// Case Studies Component
function CaseStudies() {
  return (
    <div>
      <h2>Case Studies</h2>
      <ul>
        <li><a href="https://example.com/case1" target="_blank">Case Study 1</a></li>
        <li><a href="https://example.com/case2" target="_blank">Case Study 2</a></li>
      </ul>
    </div>
  );
}

// Report Generation Guide Component
function ReportGeneration() {
  return (
    <div>
      <h2>Report Generation Guide</h2>
      <p>Step-by-step instructions for generating reports.</p>
    </div>
  );
}

// Training Links Component
function TrainingLinks() {
  return (
    <div>
      <h2>Training Links</h2>
      <ul>
        <li><a href="https://example.com/training1" target="_blank">Training 1</a></li>
        <li><a href="https://example.com/training2" target="_blank">Training 2</a></li>
      </ul>
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Evidence Collection Hub</h1>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/voice-assistant">Voice Assistant</Link></li>
              <li><Link to="/evidence-collection">Evidence Collection</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/report-generation">Report Generation</Link></li>
              <li><Link to="/training">Training Links</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<h2>Welcome to the Evidence Collection Hub</h2>} />
            <Route path="/voice-assistant" element={<VoiceAssistant />} />
            <Route path="/evidence-collection" element={<EvidenceCollection />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/report-generation" element={<ReportGeneration />} />
            <Route path="/training" element={<TrainingLinks />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
