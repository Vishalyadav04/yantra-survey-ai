import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface PrefillUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  surveyKey: string;
}

export const PrefillUploadDialog: React.FC<PrefillUploadDialogProps> = ({
  isOpen,
  onClose,
  surveyKey
}) => {
  const { toast } = useToast();
  const [jsonData, setJsonData] = useState('');
  const [identifierType, setIdentifierType] = useState<'aadhaar' | 'phone'>('aadhaar');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!jsonData.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON data",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      const entries = JSON.parse(jsonData);
      
      if (!Array.isArray(entries)) {
        throw new Error('JSON must be an array of entries');
      }

      // Transform data to match expected format
      const transformedEntries = entries.map(entry => ({
        identifierType,
        identifierValue: entry.identifier || entry.aadhaar || entry.phone,
        prefillData: entry.data || entry.prefill || entry
      }));

      const { data, error } = await supabase.functions.invoke('upload-prefill-data', {
        body: {
          entries: transformedEntries,
          surveyKey
        }
      });

      if (error) throw error;

      setUploadResult(data);
      toast({
        title: "Upload Complete",
        description: `${data.summary?.successful || 0} entries uploaded successfully`,
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : 'Failed to upload data',
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetDialog = () => {
    setJsonData('');
    setUploadResult(null);
    setIdentifierType('aadhaar');
  };

  const handleClose = () => {
    resetDialog();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Prefill Data
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="identifier-type">Identifier Type</Label>
            <Select value={identifierType} onValueChange={(value: 'aadhaar' | 'phone') => setIdentifierType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aadhaar">Aadhaar Number</SelectItem>
                <SelectItem value="phone">Phone Number</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="json-data">JSON Data</Label>
            <Textarea
              id="json-data"
              placeholder={`Example format:
[
  {
    "identifier": "123456789012",
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30
    }
  }
]`}
              value={jsonData}
              onChange={(e) => setJsonData(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {uploadResult && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Upload Results</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Success: {uploadResult.summary?.successful || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span>Failed: {uploadResult.summary?.failed || 0}</span>
                </div>
                <div>
                  <span>Total: {uploadResult.summary?.total || 0}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Data'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};