
import { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { Menu } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { ChatInterface } from '@/components/ChatInterface';
import { ConversationList } from '@/components/ConversationList';
import { Conversation } from '@/lib/types';
import { mockConversations, createNewConversation } from '@/lib/mockData';

const Chat = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Initialize conversations from mock data
  useEffect(() => {
    setConversations(mockConversations);
    if (mockConversations.length > 0) {
      setActiveConversationId(mockConversations[0].id);
    }
  }, []);

  const activeConversation = conversations.find(c => c.id === activeConversationId) || 
    (conversations.length > 0 ? conversations[0] : null);

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleNewConversation = () => {
    const newConversation = createNewConversation();
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newConversation.id);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(conversations.filter(c => c.id !== id));
    
    if (activeConversationId === id) {
      const remainingConversations = conversations.filter(c => c.id !== id);
      if (remainingConversations.length > 0) {
        setActiveConversationId(remainingConversations[0].id);
      } else {
        setActiveConversationId(null);
      }
    }
  };

  const handleUpdateConversation = (updatedConversation: Conversation) => {
    setConversations(
      conversations.map(c => 
        c.id === updatedConversation.id ? updatedConversation : c
      )
    );
  };

  // If no conversations exist or no conversation is selected, create a new one
  useEffect(() => {
    if (conversations.length === 0) {
      handleNewConversation();
    }
  }, [conversations]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar - Shown on desktop, hidden on mobile */}
        {!isMobile && (
          <div className="w-80 border-r bg-sidebar h-full hidden md:block">
            <ConversationList
              conversations={conversations}
              activeConversationId={activeConversationId}
              onSelectConversation={handleSelectConversation}
              onNewConversation={handleNewConversation}
              onDeleteConversation={handleDeleteConversation}
            />
          </div>
        )}
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Mobile conversation toggle */}
          {isMobile && (
            <div className="border-b p-2 flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDrawerOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h2 className="text-lg font-medium truncate flex-1 text-center">
                {activeConversation?.title || 'New Chat'}
              </h2>
              <div className="w-9" /> {/* Spacer for alignment */}
            </div>
          )}
          
          {/* Chat Interface */}
          {activeConversation ? (
            <ChatInterface 
              conversation={activeConversation}
              onUpdateConversation={handleUpdateConversation}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button onClick={handleNewConversation}>Start a New Chat</Button>
            </div>
          )}
        </div>
        
        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
              <Drawer.Content className="bg-background flex flex-col rounded-t-[10px] h-[90%] mt-24 fixed bottom-0 left-0 right-0 z-50">
                <div className="p-4 bg-muted/50 rounded-t-[10px] flex-shrink-0">
                  <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted-foreground/20" />
                </div>
                <div className="flex-1 overflow-auto">
                  <ConversationList
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    onSelectConversation={handleSelectConversation}
                    onNewConversation={handleNewConversation}
                    onDeleteConversation={handleDeleteConversation}
                  />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        )}
      </div>
    </div>
  );
}

export default Chat;
