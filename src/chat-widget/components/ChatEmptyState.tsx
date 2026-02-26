import { MessageCircle } from 'lucide-react';

interface ChatEmptyStateProps {
  isLoading: boolean;
}

export function ChatEmptyState({ isLoading }: ChatEmptyStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary bg-opacity-10">
        <MessageCircle className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium text-gray-900">Ready to Chat</p>
        <p className="text-xs text-textSecondary">
          {isLoading ? 'Connecting to assistant...' : 'Send a message to start the conversation'}
        </p>
      </div>
    </div>
  );
}
