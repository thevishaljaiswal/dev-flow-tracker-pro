
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DevelopmentRequest } from "../pages/Index";
import { toast } from "sonner";

interface RequestFormProps {
  onSubmit: (request: Omit<DevelopmentRequest, "id">) => void;
}

export const RequestForm = ({ onSubmit }: RequestFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    requestedBy: "",
    department: "",
    priority: "Medium" as "Low" | "Medium" | "High" | "Urgent",
    businessJustification: "",
    relatedModule: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.requestedBy || !formData.department || !formData.businessJustification || !formData.relatedModule) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newRequest: Omit<DevelopmentRequest, "id"> = {
      ...formData,
      requestDate: new Date().toISOString().split('T')[0],
      currentStage: "requirement-gathering",
      status: "New Request"
    };

    onSubmit(newRequest);
    toast.success("Development request created successfully!");
    
    // Reset form
    setFormData({
      title: "",
      requestedBy: "",
      department: "",
      priority: "Medium",
      businessJustification: "",
      relatedModule: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-slate-800">Requirement Gathering</CardTitle>
        <p className="text-sm text-slate-600">Phase 1: Initial request information</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-slate-700">
                Title / Summary *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Brief description of the request"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-sm font-medium text-slate-700">
                Priority *
              </Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requestedBy" className="text-sm font-medium text-slate-700">
                Requested By *
              </Label>
              <Input
                id="requestedBy"
                value={formData.requestedBy}
                onChange={(e) => handleInputChange("requestedBy", e.target.value)}
                placeholder="Full name of requestor"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-slate-700">
                Department *
              </Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                placeholder="Department or team"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relatedModule" className="text-sm font-medium text-slate-700">
              Related Module / System *
            </Label>
            <Input
              id="relatedModule"
              value={formData.relatedModule}
              onChange={(e) => handleInputChange("relatedModule", e.target.value)}
              placeholder="System or module affected"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessJustification" className="text-sm font-medium text-slate-700">
              Business Justification *
            </Label>
            <Textarea
              id="businessJustification"
              value={formData.businessJustification}
              onChange={(e) => handleInputChange("businessJustification", e.target.value)}
              placeholder="Explain the business need and expected benefits"
              rows={4}
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1">
              Create Request
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setFormData({
                  title: "",
                  requestedBy: "",
                  department: "",
                  priority: "Medium",
                  businessJustification: "",
                  relatedModule: ""
                });
              }}
              className="flex-1"
            >
              Reset Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
