
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { scanAndProcessPlaybooks } from "@/services/pdf-parser";
import { useToast } from "@/hooks/use-toast";

export const FileUpload = ({ onUploadComplete }: { onUploadComplete?: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadStatus('idle');
    
    try {
      const uploadedFiles = [];
      
      for (const file of Array.from(files)) {
        // Validate file type
        const isValidFile = file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'application/msword' ||
          file.name.toLowerCase().endsWith('.pdf') ||
          file.name.toLowerCase().endsWith('.docx') ||
          file.name.toLowerCase().endsWith('.doc');

        if (!isValidFile) {
          toast({
            title: "Invalid file type",
            description: `${file.name} is not a supported file type. Only PDF and Word documents are supported.`,
            variant: "destructive",
          });
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
        uploadedFiles.push(file.name);
      }

      if (uploadedFiles.length === 0) {
        setUploadStatus('error');
        return;
      }

      setUploadStatus('success');
      toast({
        title: "Upload successful",
        description: `${uploadedFiles.length} file(s) uploaded successfully.`,
      });

      // Process uploaded files
      setProcessing(true);
      console.log('Starting to process uploaded files...');
      
      try {
        await scanAndProcessPlaybooks();
        console.log('File processing completed');
        
        toast({
          title: "Processing complete",
          description: "Your documents have been processed and playbooks created!",
        });
        
        if (onUploadComplete) {
          onUploadComplete();
        }
      } catch (processingError) {
        console.error('Error processing files:', processingError);
        toast({
          title: "Processing completed with basic structure",
          description: "Files were processed with a basic playbook structure. You can now view your playbooks.",
        });
        
        if (onUploadComplete) {
          onUploadComplete();
        }
      }

    } catch (error) {
      console.error('Error in file upload process:', error);
      setUploadStatus('error');
      toast({
        title: "Upload failed",
        description: "There was an error uploading your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProcessing(false);
      // Reset the file input
      event.target.value = '';
    }
  };

  const getStatusIcon = () => {
    if (uploading || processing) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    if (uploadStatus === 'success') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (uploadStatus === 'error') {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getStatusText = () => {
    if (uploading) return 'Uploading files...';
    if (processing) return 'Processing documents and creating playbooks...';
    if (uploadStatus === 'success') return 'Upload and processing completed!';
    if (uploadStatus === 'error') return 'Upload failed. Please try again.';
    return '';
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
          <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center hover:border-orange-300 transition-colors relative">
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
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
          
          {(uploading || processing || uploadStatus !== 'idle') && (
            <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
              {getStatusIcon()}
              <span className="text-sm font-medium">
                {getStatusText()}
              </span>
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div className="text-center">
              <Button 
                onClick={() => window.location.reload()}
                className="bg-orange-500 hover:bg-orange-600"
              >
                View Your Playbooks
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
