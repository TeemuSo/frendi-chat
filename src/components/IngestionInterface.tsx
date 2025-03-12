
import { useState } from 'react';
import { Plus, Upload, Check, File, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { IngestedData } from '@/lib/types';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";

interface IngestionInterfaceProps {
  ingestedData: IngestedData[];
  onAddData: (data: IngestedData) => void;
  onDeleteData: (id: string) => void;
}

export function IngestionInterface({ 
  ingestedData,
  onAddData,
  onDeleteData
}: IngestionInterfaceProps) {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newData: IngestedData = {
        id: Math.random().toString(36).substring(2, 9),
        title: title.trim(),
        content: content.trim(),
        type: 'text',
        timestamp: new Date()
      };
      
      onAddData(newData);
      setTitle('');
      setContent('');
      setIsSubmitting(false);
      toast.success('Text has been ingested successfully');
    }, 800);
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !file) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newData: IngestedData = {
        id: Math.random().toString(36).substring(2, 9),
        title: title.trim(),
        content: `File content from ${file.name}`, // Mock file content
        type: 'file',
        timestamp: new Date()
      };
      
      onAddData(newData);
      setTitle('');
      setFile(null);
      setIsSubmitting(false);
      toast.success('File has been ingested successfully');
    }, 1200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      if (!title.trim()) {
        setTitle(e.target.files[0].name.split('.').slice(0, -1).join('.'));
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 p-6">
      <div>
        <div className="flex items-center gap-1 mb-4">
          <Button
            variant={activeTab === 'text' ? 'default' : 'outline'}
            onClick={() => setActiveTab('text')}
            className="flex-1 rounded-r-none"
          >
            Text Input
          </Button>
          <Button
            variant={activeTab === 'file' ? 'default' : 'outline'}
            onClick={() => setActiveTab('file')}
            className="flex-1 rounded-l-none"
          >
            File Upload
          </Button>
        </div>

        <Card className="neural-morphism border-none">
          <CardHeader>
            <CardTitle>Add to Knowledge Base</CardTitle>
            <CardDescription>
              {activeTab === 'text'
                ? 'Enter any text that you want to add to the knowledge base'
                : 'Upload documents to add to your knowledge base'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {activeTab === 'text' ? (
              <form onSubmit={handleTextSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your text a descriptive title"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter the text content here..."
                    className="min-h-[200px]"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add to Knowledge Base
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFileSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="file-title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input
                    id="file-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your file a descriptive title"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="file-upload" className="text-sm font-medium">
                    File
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    {file ? (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <File className="h-6 w-6 text-primary" />
                          <span className="font-medium">{file.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {(file.size / 1024).toFixed(1)} KB
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => setFile(null)}
                        >
                          <Trash className="h-3.5 w-3.5" />
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-center mb-2">
                          <span className="font-medium">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mb-4">
                          PDF, TXT, DOCX, CSV (max. 10MB)
                        </p>
                        <Input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".pdf,.txt,.docx,.csv"
                          onChange={handleFileChange}
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          Select a file
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full gap-2"
                  disabled={!file || isSubmitting}
                >
                  {isSubmitting ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload to Knowledge Base
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Knowledge Base</h3>
        
        {ingestedData.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <File className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-lg font-medium">No data ingested yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Start adding text or uploading files to build your knowledge base
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {ingestedData.map((data) => (
              <Card key={data.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-base">{data.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDeleteData(data.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Badge variant="outline" className="text-xs">
                      {data.type === 'file' ? 'File' : 'Text'}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(data.timestamp)}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {data.content}
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <div className="flex items-center text-xs text-primary">
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Ingested successfully
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
