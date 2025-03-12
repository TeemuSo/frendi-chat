
import { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Message, Conversation } from '@/lib/types';
import { cn } from '@/lib/utils';
import { generateResponse } from '@/lib/mockData';

interface ChatInterfaceProps {
  conversation: Conversation;
  onUpdateConversation: (updatedConversation: Conversation) => void;
}

export function ChatInterface({ conversation, onUpdateConversation }: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };
    
    // Update conversation with user message
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, userMessage],
      lastUpdated: new Date()
    };
    
    if (updatedConversation.messages.length === 1) {
      // If this is the first message, update the title
      updatedConversation.title = userMessage.content.substring(0, 30) + (userMessage.content.length > 30 ? '...' : '');
    }
    
    onUpdateConversation(updatedConversation);
    setInputValue('');
    
    // Simulate AI response
    setIsLoading(true);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: Math.random().toString(36).substring(2, 9),
        content: generateResponse(userMessage.content),
        role: 'assistant',
        timestamp: new Date()
      };
      
      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiResponse],
        lastUpdated: new Date()
      };
      
      onUpdateConversation(finalConversation);
      setIsLoading(false);
    }, 1000);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {conversation.messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md mx-auto">
              <h3 className="text-2xl font-semibold">Start a new conversation</h3>
              <p className="text-muted-foreground">
                Ask anything about the data you've ingested or any other question
              </p>
            </div>
          </div>
        ) : (
          conversation.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 transition-opacity animate-slide-up",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 self-end">
                  <img 
                    src="/lovable-uploads/9b64eb18-4ec7-4e76-835b-ea19155a6999.png" 
                    className="w-full h-full object-cover"
                    alt="Assistant avatar"
                  />
                </div>
              )}
              
              <div className={cn(
                message.role === 'user' ? "frendi-bubble-user" : "frendi-bubble-assistant"
              )}>
                <div className="prose prose-sm max-w-none">
                  {message.content}
                </div>
                <div className="text-xs opacity-70 mt-1 text-right">
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 self-end">
                  <User className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3 justify-start animate-slide-up">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 self-end">
              <img 
                src="/lovable-uploads/9b64eb18-4ec7-4e76-835b-ea19155a6999.png" 
                className="w-full h-full object-cover"
                alt="Assistant avatar"
              />
            </div>
            
            <div className="frendi-bubble-assistant">
              <div className="h-6 w-12 bg-primary-foreground/20 rounded animate-pulse-subtle"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4 bg-card">
        <div className="flex items-center rounded-full bg-secondary px-4 py-2">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none border-none bg-transparent min-h-[20px] max-h-[320px] focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            disabled={isLoading}
          />
          <Button
            size="icon"
            className={cn(
              "rounded-full ml-2 bg-primary text-primary-foreground",
              !inputValue.trim() && "opacity-70"
            )}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
