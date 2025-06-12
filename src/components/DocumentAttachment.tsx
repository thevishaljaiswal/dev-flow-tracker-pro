
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Upload, Trash2, Download, Eye } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedDate: string;
  url?: string; // For actual file storage, this would be a proper URL
}

interface DocumentAttachmentProps {
  title: string;
  documents: Document[];
  onUpdate: (documents: Document[]) => void;
  allowUpload?: boolean;
}

export const DocumentAttachment = ({ title, documents, onUpdate, allowUpload = true }: DocumentAttachmentProps) => {
  const [uploadedBy, setUploadedBy] = useState("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    if (!uploadedBy.trim()) {
      toast.error("Please enter your name before uploading");
      return;
    }

    const newDocuments: Document[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newDoc: Document = {
        id: `doc-${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedBy: uploadedBy.trim(),
        uploadedDate: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file) // In real app, this would be uploaded to server
      };
      newDocuments.push(newDoc);
    }

    onUpdate([...documents, ...newDocuments]);
    toast.success(`${newDocuments.length} document(s) uploaded successfully`);
    
    // Reset file input
    event.target.value = "";
  };

  const handleDelete = (id: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    onUpdate(updatedDocuments);
    toast.success("Document deleted successfully");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileTypeColor = (type: string) => {
    if (type.includes("pdf")) return "bg-red-500";
    if (type.includes("image")) return "bg-green-500";
    if (type.includes("word") || type.includes("document")) return "bg-blue-500";
    if (type.includes("excel") || type.includes("sheet")) return "bg-green-600";
    if (type.includes("text")) return "bg-gray-500";
    return "bg-purple-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>{title}</span>
          <Badge variant="outline">{documents.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {allowUpload && (
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <div className="space-y-2">
              <div className="space-y-2">
                <Label>Uploaded By</Label>
                <Input
                  value={uploadedBy}
                  onChange={(e) => setUploadedBy(e.target.value)}
                  placeholder="Enter your name"
                  className="max-w-xs mx-auto"
                />
              </div>
              <div>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="max-w-xs mx-auto"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.png,.jpg,.jpeg"
                />
              </div>
              <p className="text-sm text-slate-500">
                Upload documents (PDF, Word, Excel, Images, Text files)
              </p>
            </div>
          </div>
        )}

        {documents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.name}</TableCell>
                  <TableCell>
                    <Badge className={`${getFileTypeColor(doc.type)} text-white`}>
                      {doc.type.split('/')[1]?.toUpperCase() || 'FILE'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(doc.size)}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{new Date(doc.uploadedDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {doc.url && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => window.open(doc.url, '_blank')}
                            title="View document"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = doc.url!;
                              link.download = doc.name;
                              link.click();
                            }}
                            title="Download document"
                          >
                            <Download className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      {allowUpload && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(doc.id)}
                          title="Delete document"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No documents attached yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
