
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, Database, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FrendiLogo } from '@/components/FrendiLogo';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => (
    <Link to={to} className="flex items-center">
      <Button
        variant="ghost"
        className={cn(
          "relative font-medium transition-all gap-2", 
          isActive(to) 
            ? "text-primary" 
            : "text-muted-foreground hover:text-foreground"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
        {isActive(to) && (
          <span className="absolute h-1 w-6 bg-primary rounded-full bottom-0 left-1/2 transform -translate-x-1/2" />
        )}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <FrendiLogo />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/chat" icon={MessageSquare} label="Chat" />
          <NavLink to="/ingestion" icon={Database} label="Memory" />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden w-full p-4 bg-background border-b animate-fade-in">
          <div className="flex flex-col space-y-3">
            <NavLink to="/chat" icon={MessageSquare} label="Chat" />
            <NavLink to="/ingestion" icon={Database} label="Memory" />
          </div>
        </div>
      )}
    </header>
  );
}
