
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { IngestionInterface } from '@/components/IngestionInterface';
import { IngestedData } from '@/lib/types';
import { mockIngestedData } from '@/lib/mockData';

const Ingestion = () => {
  const [ingestedData, setIngestedData] = useState<IngestedData[]>([]);
  
  // Initialize with mock data
  useEffect(() => {
    setIngestedData(mockIngestedData);
  }, []);
  
  const handleAddData = (data: IngestedData) => {
    setIngestedData([data, ...ingestedData]);
  };
  
  const handleDeleteData = (id: string) => {
    setIngestedData(ingestedData.filter(item => item.id !== id));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container animate-fade-in">
          <div className="py-6">
            <h1 className="text-3xl font-bold mb-1">Memory Center</h1>
            <p className="text-muted-foreground">
              Add text or upload files to build your personalized memory graph
            </p>
          </div>
          
          <IngestionInterface 
            ingestedData={ingestedData}
            onAddData={handleAddData}
            onDeleteData={handleDeleteData}
          />
        </div>
      </main>
    </div>
  );
};

export default Ingestion;
