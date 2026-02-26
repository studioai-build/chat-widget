export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[80%] rounded-2xl bg-gray-100 px-4 py-3">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: '0ms' }}
            />
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: '150ms' }}
            />
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: '300ms' }}
            />
          </div>
          <span className="ml-2 text-xs text-gray-500">Assistant is typing...</span>
        </div>
      </div>
    </div>
  );
}
