import { useEffect, useRef } from 'react';
import { decryptMessage } from '../crypto';

export function useWebSocket(
  roomId: string,
  key: CryptoKey | null,
  onDecryptedMessage: (message: string) => void
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId || !key) return;
    const ws = new WebSocket('wss://chatty-backend-nsog.onrender.com');
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('[WS] Connected to server');
      ws.send(JSON.stringify({ type: 'join', roomId }));
    };

    ws.onmessage = async (event) => {
      console.log('[WS] Raw message from server:', event.data);
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message' && data.payload) {
          const decrypted = await decryptMessage(data.payload, key);
          console.log('[WS] Decrypted:', decrypted);
          onDecryptedMessage(decrypted);
        }
      } catch (err) {
        console.error('[WS] Failed to decrypt or handle message:', err);
        onDecryptedMessage('⚠️ decryption failed');
      }
    };

    ws.onclose = () => {
      console.log('[WS] Disconnected from server');
    };

    return () => {
      ws.close();
    };
  }, [roomId, key]);

  function sendMessage(encryptedPayload: string) {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ type: 'message', roomId, payload: encryptedPayload })
      );
    }
  }

  return { sendMessage };
}
