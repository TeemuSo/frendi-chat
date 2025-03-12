
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageSquare, Database, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FrendiLogo } from '@/components/FrendiLogo';
import { Navbar } from '@/components/Navbar';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-4xl animate-fade-in">
          <div className="text-center space-y-6 mb-12">
            <FrendiLogo size="lg" className="mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-6">
              Chat your way to a smoother life
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Unleash the power of conversation and transform your world with our AI-powered chatbots. 
              Meet your new digital companions, ready to guide, support, and empower you.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <FeatureCard
              title="Personalize"
              description="Chatbots will get to know you - thanks to our sharp-edge memory technology. That is why your experience gets better - one chat at a time."
              icon={Brain}
              onClick={() => navigate('/ingestion')}
            />
            <FeatureCard
              title="Be efficient"
              description="Open, select, chat - how could it be easier? We have been spending time, just to save yours."
              icon={MessageSquare}
              onClick={() => navigate('/chat')}
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
      "group cursor-pointer border border-border rounded-xl p-6 bg-card",
      "transition-all duration-300 hover:-translate-y-1 hover:border-primary/50"
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
