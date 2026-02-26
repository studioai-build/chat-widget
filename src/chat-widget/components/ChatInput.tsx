import { Send } from 'lucide-react';
import { KeyboardEvent, RefObject } from 'react';
import { ChatSession } from './ChatPopupTypes';

interface ChatInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  newMessage: string;
  isSending: boolean;
  isLoading: boolean;
  error: string | null;
  chatSession: ChatSession | null;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export function ChatInput({
  inputRef,
  newMessage,
  isSending,
  isLoading,
  error,
  chatSession,
  onChange,
  onSend,
  onKeyPress,
}: ChatInputProps) {
  return (
    <div className="flex-shrink-0 border-t border-gray-200 bg-white p-4 sm:rounded-b-2xl">
      <div className="flex space-x-2">
        <input ref={inputRef} type="text" value={newMessage} onChange={(e) => onChange(e.target.value)} onKeyPress={onKeyPress} placeholder="Type your message..." className="mr-2 flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-50 disabled:text-gray-400" disabled={isSending} data-name="chat-message-input" data-description="Input field for typing chat messages" />
        <button onClick={onSend} disabled={!newMessage.trim() || isSending || !chatSession || isLoading} className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-300" data-name="chat-send-button" data-description="Button to send chat message">
          {isSending ? <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
      {error && !isLoading && <p className="mt-2 px-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
