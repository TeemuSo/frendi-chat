
import { useState } from 'react';
import { Search, Plus, MessageSquare, MoreVertical, Trash } from 'lucide-react';
import { Conversation } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation
}: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conversation =>
    conversation.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex flex-col gap-4">
        <Button 
          onClick={onNewConversation}
          className="w-full justify-start gap-2 transition-all"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-auto px-3 pb-3">
        {filteredConversations.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No conversations found
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "flex items-center justify-between group cursor-pointer p-2 rounded-lg transition-all",
                  activeConversationId === conversation.id 
                    ? "bg-primary/10 hover:bg-primary/15" 
                    : "hover:bg-secondary"
                )}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MessageSquare className={cn(
                    "h-5 w-5 flex-shrink-0",
                    activeConversationId === conversation.id ? "text-primary" : "text-muted-foreground"
                  )} />
                  
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{conversation.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(conversation.lastUpdated)}
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive flex gap-2 items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteConversation(conversation.id);
                      }}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
