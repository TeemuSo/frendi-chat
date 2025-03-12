
import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
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
                "flex gap-3 mx-auto max-w-3xl transition-opacity animate-slide-up",
                message.role === 'assistant' ? "opacity-90" : "opacity-100"
              )}
            >
              <div className="flex-shrink-0 pt-1">
                {message.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="font-medium">
                    {message.role === 'user' ? 'You' : 'Assistant'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
                
                <div className={cn(
                  "prose prose-sm max-w-none",
                  message.role === 'assistant' ? "prose-p:leading-relaxed" : ""
                )}>
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-3 mx-auto max-w-3xl animate-slide-up">
            <div className="flex-shrink-0 pt-1">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="font-medium">Assistant</div>
              <div className="h-6 w-12 bg-muted rounded animate-pulse-subtle"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <Textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="resize-none pr-12 min-h-[80px] max-h-[320px] neural-morphism border-none"
              disabled={isLoading}
            />
            <Button
              size="icon"
              className={cn(
                "absolute right-3 bottom-3 rounded-full transition-opacity",
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
    </div>
  );
}
