
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { reprocessExistingPlaybooks } from "@/services/playbook-reprocessor";

export const PlaybookReprocessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleReprocess = async () => {
    setIsProcessing(true);
    
    try {
      toast({
        title: "Starting reprocessing",
        description: "Populating existing playbooks with enhanced content...",
      });

      await reprocessExistingPlaybooks();
      
      toast({
        title: "Reprocessing complete!",
        description: "All existing playbooks now have enhanced content. Please refresh the page to see the updates.",
      });
      
      // Auto-refresh after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Error reprocessing playbooks:', error);
      toast({
        title: "Reprocessing failed",
        description: "There was an error reprocessing the playbooks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-orange-500" />
          Enhance Existing Playbooks
        </CardTitle>
        <CardDescription>
          Populate existing playbooks with detailed process steps, RACI matrices, and process maps
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={handleReprocess}
          disabled={isProcessing}
          className="bg-orange-500 hover:bg-orange-600"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Enhance All Playbooks
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
