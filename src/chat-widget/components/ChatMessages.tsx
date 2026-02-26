import { RefObject } from 'react';
import { Message } from './ChatPopupTypes';
import { ChatConnectionError } from './ChatConnectionError';
import { ChatEmptyState } from './ChatEmptyState';
import { TypingIndicator } from './ChatTypingIndicator';

interface ChatMessagesProps {
  error: string | null;
  isLoading: boolean;
  showTyping: boolean;
  displayMessages: Message[];
  messagesEndRef: RefObject<HTMLDivElement | null>;
  formatTimestamp: (timestamp: string) => string;
  retryConnection: () => void;
}

export function ChatMessages({
  error,
  isLoading,
  showTyping,
  displayMessages,
  messagesEndRef,
  formatTimestamp,
  retryConnection,
}: ChatMessagesProps) {
  return (
    <div className="flex-1 overscroll-contain space-y-4 overflow-y-auto p-4">
      {error ? (
        <ChatConnectionError error={error} onRetry={retryConnection} />
      ) : displayMessages.length > 0 ? (
        <>
          {displayMessages.map((message, index) => (
            <div key={`${message.role}-${index}-${message.timestamp}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="w-[80%]">
                <div className={`w-fit rounded-2xl px-4 py-2 ${message.role === 'user' ? 'ml-auto bg-primary text-white' : 'bg-gray-100 text-gray-900'}`}>
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  <p className={`mt-1 text-xs ${message.role === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>{formatTimestamp(message.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
          {showTyping && <TypingIndicator />}
        </>
      ) : (
        <ChatEmptyState isLoading={isLoading} />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
