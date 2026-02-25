interface ChatMobileBackdropProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatMobileBackdrop({ isOpen, onClose }: ChatMobileBackdropProps) {
  return (
    <div
      className={`fixed inset-0 z-[9998] bg-black bg-opacity-50 transition-opacity duration-300 sm:hidden ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
    />
  );
}
