
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { DevelopmentRequest } from "../pages/Index";
import { toast } from "sonner";
import { 
  FileText, 
  Search, 
  Check, 
  Folder, 
  CheckCircle, 
  Calendar, 
  Zap,
  ArrowLeft,
  Save
} from "lucide-react";

interface RequestDetailsProps {
  request: DevelopmentRequest;
  onUpdate: (request: DevelopmentRequest) => void;
  onBack: () => void;
}

export const RequestDetails = ({ request, onUpdate, onBack }: RequestDetailsProps) => {
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [formData, setFormData] = useState<DevelopmentRequest>(request);

  const phases = [
    { id: "requirement-gathering", label: "Requirement Gathering", icon: FileText },
    { id: "analysis", label: "Analysis", icon: Search },
    { id: "approval", label: "Approval", icon: Check },
    { id: "development", label: "Development", icon: Folder },
    { id: "testing", label: "Testing", icon: CheckCircle },
    { id: "uat", label: "UAT", icon: Calendar },
    { id: "deployment", label: "Deployment", icon: Zap },
    { id: "completed", label: "Post-Deployment", icon: CheckCircle }
  ];

  const handleSave = (phase: string) => {
    onUpdate(formData);
    setEditingPhase(null);
    toast.success(`${phases.find(p => p.id === phase)?.label} updated successfully!`);
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getCurrentPhaseIndex = () => {
    return phases.findIndex(phase => phase.id === request.currentStage);
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      Urgent: "bg-red-500 text-white",
      High: "bg-orange-500 text-white", 
      Medium: "bg-yellow-500 text-white",
      Low: "bg-green-500 text-white"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-500 text-white";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-slate-800">{request.title}</h1>
            <Badge className={getPriorityColor(request.priority)}>
              {request.priority}
            </Badge>
          </div>
          <div className="text-sm text-slate-600">
            Request ID: <span className="font-mono">{request.id}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-600">
          <div><strong>Requested by:</strong> {request.requestedBy}</div>
          <div><strong>Department:</strong> {request.department}</div>
          <div><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</div>
        </div>
      </div>

      {/* Progress Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Development Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 overflow-x-auto pb-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isCompleted = index < getCurrentPhaseIndex();
              const isCurrent = phase.id === request.currentStage;
              
              return (
                <div key={phase.id} className="flex items-center space-x-2 min-w-fit">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isCurrent ? 'bg-blue-500 text-white' :
                    'bg-slate-200 text-slate-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-medium ${
                    isCurrent ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-slate-400'
                  }`}>
                    {phase.label}
                  </span>
                  {index < phases.length - 1 && (
                    <div className={`w-8 h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Phase Details */}
      <Tabs defaultValue="requirement-gathering" className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
          {phases.map((phase) => (
            <TabsTrigger key={phase.id} value={phase.id} className="text-xs">
              {phase.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Phase 1: Requirement Gathering */}
        <TabsContent value="requirement-gathering">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Requirement Gathering</span>
                </CardTitle>
                <p className="text-sm text-slate-600">Initial request information</p>
              </div>
              {editingPhase !== "requirement-gathering" && (
                <Button
                  variant="outline"
                  onClick={() => setEditingPhase("requirement-gathering")}
                >
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editingPhase === "requirement-gathering" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title / Summary</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => handleFieldChange("title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select 
                        value={formData.priority} 
                        onValueChange={(value) => handleFieldChange("priority", value)}
                      >
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
                  <div className="space-y-2">
                    <Label>Business Justification</Label>
                    <Textarea
                      value={formData.businessJustification}
                      onChange={(e) => handleFieldChange("businessJustification", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("requirement-gathering")}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPhase(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>Requested By:</strong> {request.requestedBy}</div>
                    <div><strong>Department:</strong> {request.department}</div>
                    <div><strong>Related Module:</strong> {request.relatedModule}</div>
                    <div><strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <strong>Business Justification:</strong>
                    <p className="mt-1 text-slate-700">{request.businessJustification}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phase 2: Analysis */}
        <TabsContent value="analysis">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Requirement Analysis</span>
                </CardTitle>
                <p className="text-sm text-slate-600">Technical analysis and feasibility study</p>
              </div>
              {editingPhase !== "analysis" && (
                <Button variant="outline" onClick={() => setEditingPhase("analysis")}>
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editingPhase === "analysis" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Requirement Description (Detailed)</Label>
                    <Textarea
                      value={formData.requirementDescription || ""}
                      onChange={(e) => handleFieldChange("requirementDescription", e.target.value)}
                      rows={4}
                      placeholder="Detailed technical requirements..."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Feasibility Status</Label>
                      <Select 
                        value={formData.feasibilityStatus || ""} 
                        onValueChange={(value) => handleFieldChange("feasibilityStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select feasibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Partial">Partial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Estimated Effort (hours)</Label>
                      <Input
                        type="number"
                        value={formData.estimatedEffort || ""}
                        onChange={(e) => handleFieldChange("estimatedEffort", parseInt(e.target.value))}
                        placeholder="Hours or story points"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Assigned Analyst</Label>
                      <Input
                        value={formData.assignedAnalyst || ""}
                        onChange={(e) => handleFieldChange("assignedAnalyst", e.target.value)}
                        placeholder="Analyst name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Impacted Systems</Label>
                      <Textarea
                        value={formData.impactedSystems || ""}
                        onChange={(e) => handleFieldChange("impactedSystems", e.target.value)}
                        rows={2}
                        placeholder="List affected systems..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Dependencies</Label>
                      <Textarea
                        value={formData.dependencies || ""}
                        onChange={(e) => handleFieldChange("dependencies", e.target.value)}
                        rows={2}
                        placeholder="External dependencies..."
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("analysis")}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Analysis
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPhase(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <strong>Requirement Description:</strong>
                    <p className="mt-1 text-slate-700">{request.requirementDescription || "Not provided"}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><strong>Feasibility:</strong> {request.feasibilityStatus || "Pending"}</div>
                    <div><strong>Estimated Effort:</strong> {request.estimatedEffort ? `${request.estimatedEffort} hours` : "Not estimated"}</div>
                    <div><strong>Assigned Analyst:</strong> {request.assignedAnalyst || "Not assigned"}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Impacted Systems:</strong>
                      <p className="mt-1 text-slate-700">{request.impactedSystems || "Not specified"}</p>
                    </div>
                    <div>
                      <strong>Dependencies:</strong>
                      <p className="mt-1 text-slate-700">{request.dependencies || "None specified"}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Continue with other phases... */}
        <TabsContent value="approval">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Check className="w-5 h-5" />
                <span>Approval Stage</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-600">
                <Check className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>Approval phase details can be configured here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Folder className="w-5 h-5" />
                <span>Development Phase</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-600">
                <Folder className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>Development tracking details can be configured here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Testing Phase</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-600">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>Testing phase tracking can be configured here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>User Acceptance Testing</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-600">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>UAT tracking details can be configured here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Deployment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-600">
                <Zap className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>Deployment tracking can be configured here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Post-Deployment Review</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-slate-600">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p>Post-deployment review can be configured here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
