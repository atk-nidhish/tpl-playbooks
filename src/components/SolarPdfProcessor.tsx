
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const SolarPdfProcessor = () => {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const processPdf = async () => {
    setProcessing(true);
    setResult(null);
    
    try {
      console.log('Starting PDF processing workflow...');
      toast.info("Processing Digital_Solar_Engineering.pdf...");
      
      const { data, error } = await supabase.functions.invoke('process-solar-engineering-pdf', {
        body: {},
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (error) {
        console.error('Error processing PDF:', error);
        toast.error(`Failed to process PDF: ${error.message}`);
        return;
      }

      console.log('PDF processing result:', data);
      setResult(data);
      
      if (data.success) {
        toast.success("PDF processed successfully! Playbook chapters have been updated.");
      } else {
        toast.error("PDF processing failed. Please check the logs.");
      }
      
    } catch (error) {
      console.error('Error in PDF processing:', error);
      toast.error("An unexpected error occurred during PDF processing.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-orange-600" />
          PDF Content Processor
        </CardTitle>
        <CardDescription>
          Process Digital_Solar_Engineering.pdf from storage to automatically populate playbook chapters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Processing Rules:</p>
              <ul className="space-y-1 text-xs">
                <li>• Chapters will be matched to top-level headings in the PDF</li>
                <li>• Existing chapters found in PDF will be replaced</li>
                <li>• Chapters not in PDF will be preserved</li>
                <li>• Bullet points and numbered lists will be preserved</li>
                <li>• Page numbers, headers, and footers will be ignored</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button 
            onClick={processPdf}
            disabled={processing}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
          >
            {processing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Process Digital_Solar_Engineering.pdf
              </>
            )}
          </Button>
          
          {result && (
            <div className={`border rounded-lg p-4 ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.success && (
                    <div className="mt-2 text-sm text-green-700">
                      <p>Chapters processed: {result.chaptersProcessed || 0}</p>
                      <p>Process steps created: {result.processStepsCreated || 0}</p>
                      <p>RACI entries created: {result.raciEntriesCreated || 0}</p>
                      <p>Extracted text length: {result.extractedTextLength || 0} characters</p>
                      {result.note && <p className="italic">Note: {result.note}</p>}
                    </div>
                  )}
                  {result.error && (
                    <div className="mt-2 text-sm text-red-700">
                      <p>Error: {result.error}</p>
                      {result.details && <p>Details: {result.details}</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
