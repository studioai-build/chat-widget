import { useEffect, useRef, useState } from 'react';
import { ChatInput } from '@/chat-widget/components/chat-input';
import { ChatMessages } from '@/chat-widget/components/chat-messages';
import { ChatMobileBackdrop } from '@/chat-widget/components/chat-mobile-backdrop';
import { ChatPopupHeader } from '@/chat-widget/components/chat-popup-header';
import { ChatPopupProps, ChatSession, Message } from '@/chat-widget/components/chat-popup-types';

export default function ChatPopup({ isOpen, onClose, agentId }: ChatPopupProps) {
  const [chatSession, setChatSession] = useState<ChatSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatSession?.messages, optimisticMessages, showTyping]);

  // Start chat session in background when popup opens
  const startChatSession = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://platform.api.simplifyx.app/api/v1/chat-agents/start', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });

      if (response.ok) {
        const sessionData: ChatSession = await response.json();
        setChatSession(sessionData);
      } else {
        const errorText = await response.text();
        setError(`Failed to start chat session: ${response.statusText}`);
        console.error('Failed to start chat session:', errorText);
      }
    } catch (err) {
      setError('Unable to connect to chat service. Please try again.');
      console.error('Error starting chat session:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && !chatSession && !isLoading) {
      startChatSession();
    }
  }, [isOpen, chatSession, isLoading]);

  // Auto-focus input when popup opens
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Prevent body scroll on mobile when open
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
      }
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !chatSession || isSending) return;

    setIsSending(true);
    setError(null);
    const messageToSend = newMessage.trim();
    setNewMessage('');

    const optimisticUserMessage: Message = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date().toISOString(),
    };

    setOptimisticMessages([optimisticUserMessage]);
    setShowTyping(true);

    try {
      const response = await fetch('https://platform.api.simplifyx.app/api/v1/chat-agents/chat', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          process_id: chatSession.process_id,
          message: messageToSend,
        }),
      });

      if (response.ok) {
        const updatedSession: ChatSession = await response.json();
        setChatSession(updatedSession);
        setOptimisticMessages([]);
      } else {
        const errorText = await response.text();
        setError('Failed to send message. Please try again.');
        console.error('Failed to send message:', response.statusText, errorText);
        setOptimisticMessages([]);
        setNewMessage(messageToSend);
      }
    } catch (err) {
      setError('Unable to send message. Please check your connection.');
      console.error('Error sending message:', err);
      setOptimisticMessages([]);
      setNewMessage(messageToSend);
    } finally {
      setIsSending(false);
      setShowTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const retryConnection = () => {
    setError(null);
    if (!chatSession) {
      startChatSession();
    }
  };

  const displayMessages = [
    ...(chatSession?.messages || []),
    ...optimisticMessages,
  ];

  return (
    <>
      <ChatMobileBackdrop isOpen={isOpen} onClose={onClose} />

      <div
        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[400px] sm:h-[600px] z-[9999] transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100' : 'scale-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full w-full flex-col bg-white sm:rounded-2xl sm:shadow-2xl">
          <ChatPopupHeader
            showTyping={showTyping}
            chatSession={chatSession}
            isLoading={isLoading}
            onClose={onClose}
          />
          <ChatMessages
            error={error}
            isLoading={isLoading}
            showTyping={showTyping}
            displayMessages={displayMessages}
            messagesEndRef={messagesEndRef}
            formatTimestamp={formatTimestamp}
            retryConnection={retryConnection}
          />
          <ChatInput
            inputRef={inputRef}
            newMessage={newMessage}
            isSending={isSending}
            isLoading={isLoading}
            error={error}
            chatSession={chatSession}
            onChange={setNewMessage}
            onSend={sendMessage}
            onKeyPress={handleKeyPress}
          />
        </div>
      </div>
    </>
  );
}
