import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit, FileText } from "lucide-react";
import { toast } from "sonner";
import { DocumentAttachment } from "./DocumentAttachment";

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedBy: string;
  uploadedDate: string;
  url?: string;
}

interface BugTask {
  id: string;
  type: "Bug" | "Task";
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  assignedTo: string;
  reportedBy: string;
  reportedDate: string;
  resolvedDate?: string;
  phase: "Testing" | "UAT" | "Post-Deployment";
  documents?: Document[];
}

interface BugTaskTrackerProps {
  phase: "Testing" | "UAT" | "Post-Deployment";
  requestId: string;
  items: BugTask[];
  onUpdate: (items: BugTask[]) => void;
}

export const BugTaskTracker = ({ phase, requestId, items, onUpdate }: BugTaskTrackerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [viewingDocuments, setViewingDocuments] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<BugTask>>({
    type: "Bug",
    severity: "Medium",
    status: "Open",
    phase,
    reportedDate: new Date().toISOString().split('T')[0],
    documents: []
  });

  const handleAdd = () => {
    if (!formData.title || !formData.description || !formData.assignedTo || !formData.reportedBy) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newItem: BugTask = {
      id: `${phase.toLowerCase()}-${Date.now()}`,
      type: formData.type as "Bug" | "Task",
      title: formData.title,
      description: formData.description,
      severity: formData.severity as "Low" | "Medium" | "High" | "Critical",
      status: formData.status as "Open" | "In Progress" | "Resolved" | "Closed",
      assignedTo: formData.assignedTo,
      reportedBy: formData.reportedBy,
      reportedDate: formData.reportedDate || new Date().toISOString().split('T')[0],
      resolvedDate: formData.resolvedDate,
      phase,
      documents: formData.documents || []
    };

    onUpdate([...items, newItem]);
    setFormData({
      type: "Bug",
      severity: "Medium",
      status: "Open",
      phase,
      reportedDate: new Date().toISOString().split('T')[0],
      documents: []
    });
    setIsAdding(false);
    toast.success(`${formData.type} added successfully`);
  };

  const handleEdit = (item: BugTask) => {
    setFormData(item);
    setEditingId(item.id);
    setIsAdding(true);
  };

  const handleUpdate = () => {
    if (!formData.title || !formData.description || !formData.assignedTo || !formData.reportedBy) {
      toast.error("Please fill in all required fields");
      return;
    }

    const updatedItems = items.map(item => 
      item.id === editingId ? { ...item, ...formData } as BugTask : item
    );
    onUpdate(updatedItems);
    setFormData({
      type: "Bug",
      severity: "Medium",
      status: "Open",
      phase,
      reportedDate: new Date().toISOString().split('T')[0],
      documents: []
    });
    setIsAdding(false);
    setEditingId(null);
    toast.success(`${formData.type} updated successfully`);
  };

  const handleDelete = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    onUpdate(updatedItems);
    toast.success("Item deleted successfully");
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      Low: "bg-green-500",
      Medium: "bg-yellow-500",
      High: "bg-orange-500",
      Critical: "bg-red-500"
    };
    return colors[severity as keyof typeof colors] || "bg-gray-500";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      Open: "bg-red-500",
      "In Progress": "bg-blue-500",
      Resolved: "bg-green-500",
      Closed: "bg-gray-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const handleDocumentUpdate = (documents: Document[]) => {
    setFormData(prev => ({ ...prev, documents }));
  };

  const handleItemDocumentUpdate = (itemId: string, documents: Document[]) => {
    const updatedItems = items.map(item => 
      item.id === itemId ? { ...item, documents } : item
    );
    onUpdate(updatedItems);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{phase} - Bug & Task Tracker</CardTitle>
          <Button onClick={() => setIsAdding(true)} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add {phase === "Testing" ? "Bug/Task" : phase === "UAT" ? "Issue" : "Issue"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {isAdding && (
            <Card className="bg-slate-50">
              <CardContent className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select 
                      value={formData.type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "Bug" | "Task" }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bug">Bug</SelectItem>
                        <SelectItem value="Task">Task</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select 
                      value={formData.severity} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value as "Low" | "Medium" | "High" | "Critical" }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as "Open" | "In Progress" | "Resolved" | "Closed" }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Resolved">Resolved</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Title *</Label>
                  <Input
                    value={formData.title || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief title describing the issue"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    placeholder="Detailed description of the issue"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Assigned To *</Label>
                    <Input
                      value={formData.assignedTo || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                      placeholder="Person responsible for fixing"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Reported By *</Label>
                    <Input
                      value={formData.reportedBy || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, reportedBy: e.target.value }))}
                      placeholder="Person who reported the issue"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Reported Date</Label>
                    <Input
                      type="date"
                      value={formData.reportedDate || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, reportedDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Resolved Date</Label>
                    <Input
                      type="date"
                      value={formData.resolvedDate || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, resolvedDate: e.target.value }))}
                    />
                  </div>
                </div>

                <DocumentAttachment
                  title="Attach Supporting Documents"
                  documents={formData.documents || []}
                  onUpdate={handleDocumentUpdate}
                  allowUpload={true}
                />

                <div className="flex space-x-2">
                  <Button onClick={editingId ? handleUpdate : handleAdd}>
                    {editingId ? "Update" : "Add"} {formData.type}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                      setFormData({
                        type: "Bug",
                        severity: "Medium",
                        status: "Open",
                        phase,
                        reportedDate: new Date().toISOString().split('T')[0],
                        documents: []
                      });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {items.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Reported Date</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Badge variant="outline">{item.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>
                      <Badge className={`${getSeverityColor(item.severity)} text-white`}>
                        {item.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(item.status)} text-white`}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.assignedTo}</TableCell>
                    <TableCell>{new Date(item.reportedDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {item.documents && item.documents.length > 0 ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setViewingDocuments(viewingDocuments === item.id ? null : item.id)}
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          {item.documents.length}
                        </Button>
                      ) : (
                        <span className="text-slate-400">None</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No {phase.toLowerCase()} issues tracked yet.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Document viewer for selected items */}
      {viewingDocuments && (
        <DocumentAttachment
          title={`Documents for ${items.find(item => item.id === viewingDocuments)?.title || 'Item'}`}
          documents={items.find(item => item.id === viewingDocuments)?.documents || []}
          onUpdate={(documents) => handleItemDocumentUpdate(viewingDocuments, documents)}
          allowUpload={true}
        />
      )}
    </div>
  );
};
