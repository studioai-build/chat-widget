import { MessageCircle, X } from 'lucide-react';
import { ChatSession } from './chat-popup-types';

interface ChatPopupHeaderProps {
  showTyping: boolean;
  chatSession: ChatSession | null;
  isLoading: boolean;
  onClose: () => void;
}

export function ChatPopupHeader({ showTyping, chatSession, isLoading, onClose }: ChatPopupHeaderProps) {
  const statusText = showTyping
    ? 'Typing...'
    : chatSession
      ? 'Online now'
      : isLoading
        ? 'Connecting...'
        : 'Ready to chat';

  return (
    <div className="flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-white p-4 sm:rounded-t-2xl">
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900" data-name="chat-header-title" data-description="Chat popup header title">
            Assistant
          </h3>
          <p className="text-sm text-textSecondary">{statusText}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="rounded-full p-2 transition-colors hover:bg-gray-100"
        data-name="chat-close-button"
        data-description="Button to close the chat popup"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}
