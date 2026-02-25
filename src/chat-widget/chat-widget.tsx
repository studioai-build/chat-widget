import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatPopup from './components/chat-popup';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:opacity-80 hover:shadow-xl ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
        data-name="chat-toggle-button"
        data-description="Button to open the chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      <ChatPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        agentId="2f32ca87-3a51-4ac8-8e3e-c19ce2505207"
      />
    </>
  );
}
