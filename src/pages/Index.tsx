
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquare, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="text-center space-y-4 mb-10">
            <h1 className="text-5xl font-bold tracking-tight">
              <span className="text-primary">Memory</span>Chat
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Chat with your data. Upload documents, add text, and create a personalized knowledge base.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <FeatureCard
              title="Chat Interface"
              description="Interact with your knowledge base through a familiar chat interface"
              icon={MessageSquare}
              onClick={() => navigate('/chat')}
            />
            <FeatureCard
              title="Data Ingestion"
              description="Upload files or add text to build your personalized knowledge base"
              icon={Database}
              onClick={() => navigate('/ingestion')}
            />
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className="gap-2 group" 
              onClick={() => navigate('/chat')}
            >
              Get Started
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick: () => void;
}

const FeatureCard = ({ title, description, icon: Icon, onClick }: FeatureCardProps) => (
  <div 
    className={cn(
      "group cursor-pointer neural-morphism rounded-xl p-6",
      "transition-all duration-300 hover:-translate-y-1"
    )}
    onClick={onClick}
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
    <div className="mt-4 flex items-center text-primary font-medium">
      Explore
      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

export default Index;
