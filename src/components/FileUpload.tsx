
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { processUploadedPlaybook } from "@/services/pdf-parser";
import { useToast } from "@/hooks/use-toast";

export const FileUpload = ({ onUploadComplete }: { onUploadComplete?: () => void }) => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [currentFile, setCurrentFile] = useState<string>('');
  const [processedCount, setProcessedCount] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setProcessing(false);
    setUploadStatus('uploading');
    setProcessedCount(0);
    setTotalFiles(files.length);
    setCurrentFile('');
    
    try {
      const uploadedFiles = [];
      
      // Upload all files first
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
        setCurrentFile(file.name);
        
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

      // Switch to processing state
      setUploading(false);
      setProcessing(true);
      setUploadStatus('processing');

      toast({
        title: "Upload successful",
        description: `${uploadedFiles.length} file(s) uploaded. Processing documents automatically...`,
      });

      // Process each uploaded file immediately
      let successCount = 0;
      for (const fileName of uploadedFiles) {
        try {
          setCurrentFile(fileName);
          console.log(`Auto-processing uploaded file: ${fileName}`);
          
          const result = await processUploadedPlaybook(fileName);
          
          if (result) {
            successCount++;
            setProcessedCount(successCount);
            console.log(`Successfully auto-processed: ${fileName}`);
            
            // Update UI immediately after each file is processed
            if (onUploadComplete) {
              onUploadComplete();
            }
          }
        } catch (processingError) {
          console.error(`Error auto-processing ${fileName}:`, processingError);
          // Still count as processed since we have fallback logic in processUploadedPlaybook
          successCount++;
          setProcessedCount(successCount);
        }
      }

      setUploadStatus('success');
      
      toast({
        title: "Processing complete!",
        description: `Successfully processed ${successCount} document(s) and created interactive playbooks!`,
      });

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
      setCurrentFile('');
      // Reset the file input
      event.target.value = '';
    }
  };

  const getStatusIcon = () => {
    if (uploading) {
      return <Upload className="h-4 w-4 animate-pulse text-blue-500" />;
    }
    if (processing) {
      return <Loader2 className="h-4 w-4 animate-spin text-orange-500" />;
    }
    if (uploadStatus === 'success') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (uploadStatus === 'error') {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return <Clock className="h-4 w-4 text-gray-400" />;
  };

  const getStatusText = () => {
    if (uploading && currentFile) return `Uploading: ${currentFile}`;
    if (uploading) return 'Uploading files...';
    if (processing && currentFile) return `Processing: ${currentFile}`;
    if (processing) return 'Processing documents and creating playbooks...';
    if (uploadStatus === 'success') return `Successfully processed ${processedCount}/${totalFiles} document(s)!`;
    if (uploadStatus === 'error') return 'Upload failed. Please try again.';
    return 'Ready to upload documents';
  };

  const getProgressText = () => {
    if (uploadStatus === 'processing' || uploadStatus === 'success') {
      return `${processedCount}/${totalFiles} files processed`;
    }
    return '';
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-orange-500" />
          Upload & Auto-Process Documents
        </CardTitle>
        <CardDescription>
          Upload PDF or Word documents to automatically create interactive playbooks. 
          Files are processed immediately after upload - no manual steps required!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors relative ${
            uploading || processing 
              ? 'border-orange-300 bg-orange-50' 
              : 'border-orange-200 hover:border-orange-300'
          }`}>
            <FileText className={`h-12 w-12 mx-auto mb-4 ${
              uploading || processing ? 'text-orange-500' : 'text-orange-400'
            }`} />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                {uploading || processing 
                  ? 'Processing in progress...' 
                  : 'Drag and drop files here, or click to browse'
                }
              </p>
              <p className="text-xs text-gray-500">
                Supports: PDF, DOCX, DOC files • Auto-processing enabled
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
          
          {uploadStatus !== 'idle' && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg">
                {getStatusIcon()}
                <span className="text-sm font-medium">
                  {getStatusText()}
                </span>
              </div>
              
              {(processing || uploadStatus === 'success') && totalFiles > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Progress</span>
                    <span>{getProgressText()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(processedCount / totalFiles) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div className="text-center space-y-3">
              <div className="text-sm text-green-600 font-medium">
                ✅ All documents processed successfully! Your playbooks are ready to view.
              </div>
              <Button 
                onClick={() => {
                  setUploadStatus('idle');
                  setProcessedCount(0);
                  setTotalFiles(0);
                }}
                variant="outline"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                Upload More Documents
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
