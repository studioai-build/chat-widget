import { X } from 'lucide-react';

interface ChatConnectionErrorProps {
  error: string;
  onRetry: () => void;
}

export function ChatConnectionError({ error, onRetry }: ChatConnectionErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
        <X className="h-6 w-6 text-red-500" />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium text-gray-900">Connection Error</p>
        <p className="mb-3 text-xs text-textSecondary">{error}</p>
        <button
          onClick={onRetry}
          className="rounded-full bg-primary px-4 py-2 text-sm text-white transition-colors hover:bg-purple-700"
          data-name="chat-retry-button"
          data-description="Button to retry chat connection"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
