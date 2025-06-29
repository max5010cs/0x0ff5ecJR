import { useEffect, useState } from 'react';
import { useWebSocket } from './hooks/useWebSocket';
import {
  importKey,
  encryptMessage
} from './crypto';

interface ChatRoomProps {
  roomId: string;
  encryptionKey: string;
}

const ChatRoom = ({ roomId, encryptionKey }: ChatRoomProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [key, setKey] = useState<CryptoKey | null>(null);

  useEffect(() => {
    importKey(encryptionKey)
      .then((importedKey) => {
        console.log('[KEY] Imported');
        setKey(importedKey);
      })
      .catch((err) => {
        console.error('[KEY] Failed to import:', err);
      });
  }, [encryptionKey]);

  const { sendMessage } = useWebSocket(roomId, key, (decryptedMessage: string) => {
    setMessages((prev) => [...prev, `(peer) ${decryptedMessage}`]);
  });

  const handleSend = async () => {
    if (!input.trim() || !key) return;
    try {
      const encrypted = await encryptMessage(input.trim(), key);
      console.log('[ENCRYPT] Sending:', encrypted);
      sendMessage(encrypted);
      setMessages((prev) => [...prev, `(me) ${input}`]);
      setInput('');
    } catch (err) {
      console.error('[ENCRYPT] Failed:', err);
    }
  };

return (
  <div
    style={{
      backgroundColor: '#111',
      color: '#00ff00',
      fontFamily: 'monospace',
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        width: '90%',
        maxWidth: '800px',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #00ff00',
        padding: '1rem',
        boxSizing: 'border-box',
        backgroundColor: '#000',
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h3>Room: {roomId}</h3>
        <p>Encryption: 🔒 Active</p>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#000',
          padding: '1rem',
          border: '1px solid #00ff00',
          marginBottom: '1rem',
          whiteSpace: 'pre-wrap',
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '0.5rem' }}>&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          style={{
            backgroundColor: 'black',
            color: '#00ff00',
            border: 'none',
            outline: 'none',
            fontFamily: 'monospace',
            flex: 1,
            fontSize: '1rem',
          }}
          placeholder="Type and press Enter"
        />
      </div>
    </div>
  </div>
);


};

export default ChatRoom;
