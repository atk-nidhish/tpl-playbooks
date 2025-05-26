
import { useEffect, useState } from 'react';
import { scanAndProcessPlaybooks } from '@/services/pdf-parser';

export const usePlaybookScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState<Date | null>(null);

  const scanPlaybooks = async () => {
    if (isScanning) return;
    
    setIsScanning(true);
    try {
      await scanAndProcessPlaybooks();
      setLastScan(new Date());
    } catch (error) {
      console.error('Error scanning playbooks:', error);
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    // Scan for playbooks when the hook is first used
    scanPlaybooks();
    
    // Set up periodic scanning every 30 seconds
    const interval = setInterval(scanPlaybooks, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    isScanning,
    lastScan,
    scanPlaybooks
  };
};
