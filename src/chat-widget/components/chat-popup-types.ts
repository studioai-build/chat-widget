export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatSession {
  process_id: string;
  current_node_id: string;
  messages: Message[];
  output: unknown;
  status: string;
  trace_id: string;
  parent_span_id: string;
}

export interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
}
