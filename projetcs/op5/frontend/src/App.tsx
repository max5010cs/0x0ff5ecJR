import { useState } from 'react';
import ChatRoom from './ChatRoom';
import './App.css';

type Mode = 'initial' | 'created' | 'joined';

function App() {
  const [mode, setMode] = useState<Mode>('initial');
  const [roomId, setRoomId] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');
  const [inputRoomId, setInputRoomId] = useState('');
  const [inputKey, setInputKey] = useState('');

  const createRoom = () => {
    const newRoomId = crypto.randomUUID().slice(0, 6);
    const key = crypto.getRandomValues(new Uint8Array(32));
    const base64Key = btoa(String.fromCharCode(...key));

    setRoomId(newRoomId);
    setEncryptionKey(base64Key);
    setMode('created');
  };

  const joinRoom = () => {
    if (inputRoomId.trim() && inputKey.trim()) {
      setRoomId(inputRoomId.trim());
      setEncryptionKey(inputKey.trim());
      setMode('joined');
    }
  };

  if (mode === 'joined') {
    return <ChatRoom roomId={roomId} encryptionKey={encryptionKey} />;
  }

  return (
    <div className="terminal-container">
      <pre className="ascii-title">
        {`██████╗ ██╗      █████╗  ██████╗██╗  ██╗██╗   ██╗
██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝╚██╗ ██╔╝
██████╔╝██║     ███████║██║     █████╔╝  ╚████╔╝ 
██╔═══╝ ██║     ██╔══██║██║     ██╔═██╗   ╚██╔╝  
██║     ███████╗██║  ██║╚██████╗██║  ██╗   ██║   
╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   `}
      </pre>
      <p className="subtitle">Welcome to ShadowTalk</p>
      <p className="quote">"Motivated by criminals, Jack, Victor, and Mr. Eggs."</p>

      {mode === 'initial' && (
        <div className="form-block">
          <button className="btn" onClick={createRoom}>[ Create Room ]</button>

          <div className="join-form">
            <p>Or join one:</p>
            <input
              className="input"
              type="text"
              placeholder="Room ID"
              value={inputRoomId}
              onChange={(e) => setInputRoomId(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="Encryption Key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
            <button className="btn" onClick={joinRoom}>[ Join Room ]</button>
          </div>
        </div>
      )}

      {mode === 'created' && (
        <div className="created-block">
          <h3>Room Created ✅</h3>
          <p><strong>Room ID:</strong> {roomId}</p>
          <p><strong>Encryption Key:</strong> {encryptionKey}</p>
          <p className="share-text">Share this ID and key securely with your peer.</p>
        </div>
      )}
    </div>
  );
}

export default App; 
