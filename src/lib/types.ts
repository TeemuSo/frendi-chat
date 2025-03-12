
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  lastUpdated: Date;
}

export interface IngestedData {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'file';
  timestamp: Date;
}
