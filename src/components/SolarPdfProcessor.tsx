
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Loader2, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const SolarPdfProcessor = () => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const processPdf = async () => {
    setProcessing(true);
    setResult(null);
    
    try {
      console.log('Starting Solar Engineering PDF processing...');
      
      const { data, error } = await supabase.functions.invoke('process-solar-engineering-pdf', {
        body: {},
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (error) {
        throw error;
      }

      console.log('PDF processing completed:', data);
      setResult(data);
      
      if (data.success) {
        toast.success("PDF processed successfully! Playbook chapters have been updated.");
      } else {
        toast.error("PDF processing failed: " + data.error);
      }
      
    } catch (error) {
      console.error('Error processing PDF:', error);
      setResult({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      });
      toast.error("Failed to process PDF: " + (error.message || 'Unknown error'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-500" />
          Process Solar Engineering PDF
        </CardTitle>
        <CardDescription>
          Extract content from Digital_Solar_Engineering.pdf and automatically update playbook chapters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <p><strong>File:</strong> Digital_Solar_Engineering.pdf</p>
            <p><strong>Bucket:</strong> documents</p>
            <p><strong>Action:</strong> Replace existing chapters with PDF content</p>
          </div>
          <Button 
            onClick={processPdf}
            disabled={processing}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
          >
            {processing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Process PDF
              </>
            )}
          </Button>
        </div>

        {processing && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
            <span className="text-sm text-blue-700">
              Extracting content from PDF and updating playbook chapters...
            </span>
          </div>
        )}

        {result && (
          <div className={`flex items-start gap-2 p-3 rounded-lg ${
            result.success ? 'bg-green-50' : 'bg-red-50'
          }`}>
            {result.success ? (
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
            )}
            <div className="text-sm">
              {result.success ? (
                <div className="text-green-700">
                  <p className="font-medium">Processing completed successfully!</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Chapters processed: {result.chaptersProcessed}</li>
                    <li>• Process steps added: {result.processStepsAdded}</li>
                    <li>• RACI entries added: {result.raciEntriesAdded}</li>
                    <li>• Process map entries added: {result.processMapEntriesAdded}</li>
                  </ul>
                </div>
              ) : (
                <div className="text-red-700">
                  <p className="font-medium">Processing failed</p>
                  <p>{result.error}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 border-t pt-3">
          <p><strong>Note:</strong> This will replace existing chapters found in the PDF while preserving other chapters.</p>
        </div>
      </CardContent>
    </Card>
  );
};
