
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { scanAndProcessPlaybooks } from "@/services/pdf-parser";

export const FileUpload = ({ onUploadComplete }: { onUploadComplete?: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        // Validate file type
        const isValidFile = file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'application/msword' ||
          file.name.toLowerCase().endsWith('.pdf') ||
          file.name.toLowerCase().endsWith('.docx') ||
          file.name.toLowerCase().endsWith('.doc');

        if (!isValidFile) {
          console.error(`Invalid file type: ${file.name}. Only PDF and Word documents are supported.`);
          continue;
        }

        console.log(`Uploading file: ${file.name}`);
        
        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from('playbooks')
          .upload(file.name, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) {
          console.error('Error uploading file:', error);
          throw error;
        }

        console.log('File uploaded successfully:', data);
      }

      // Process uploaded files
      setProcessing(true);
      console.log('Starting to process uploaded files...');
      await scanAndProcessPlaybooks();
      console.log('File processing completed');
      
      if (onUploadComplete) {
        onUploadComplete();
      }

    } catch (error) {
      console.error('Error in file upload process:', error);
    } finally {
      setUploading(false);
      setProcessing(false);
      // Reset the file input
      event.target.value = '';
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-orange-500" />
          Upload Documents
        </CardTitle>
        <CardDescription>
          Upload PDF or Word documents to automatically create interactive playbooks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
            <FileText className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supports: PDF, DOCX, DOC files
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
              onChange={handleFileUpload}
              disabled={uploading || processing}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          {(uploading || processing) && (
            <div className="flex items-center justify-center gap-2 text-orange-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">
                {uploading ? 'Uploading files...' : 'Processing documents with AI...'}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
