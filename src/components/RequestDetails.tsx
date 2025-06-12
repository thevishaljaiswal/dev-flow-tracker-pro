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
import { BugTaskTracker } from "./BugTaskTracker";
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

  // Bug/Task tracking state
  const [testingBugs, setTestingBugs] = useState<any[]>([]);
  const [uatIssues, setUatIssues] = useState<any[]>([]);
  const [postDeploymentIssues, setPostDeploymentIssues] = useState<any[]>([]);

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

        {/* Phase 3: Approval */}
        <TabsContent value="approval">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Check className="w-5 h-5" />
                  <span>Approval Stage</span>
                </CardTitle>
                <p className="text-sm text-slate-600">Management approval and budget allocation</p>
              </div>
              {editingPhase !== "approval" && (
                <Button variant="outline" onClick={() => setEditingPhase("approval")}>
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editingPhase === "approval" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Approval Status</Label>
                      <Select 
                        value={formData.approvalStatus || ""} 
                        onValueChange={(value) => handleFieldChange("approvalStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select approval status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                          <SelectItem value="On Hold">On Hold</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Approved Date</Label>
                      <Input
                        type="date"
                        value={formData.approvedDate || ""}
                        onChange={(e) => handleFieldChange("approvedDate", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Budget Allocation</Label>
                    <Input
                      type="number"
                      value={formData.budgetAllocation || ""}
                      onChange={(e) => handleFieldChange("budgetAllocation", parseFloat(e.target.value))}
                      placeholder="Budget amount"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Approver Comments</Label>
                    <Textarea
                      value={formData.approverComments || ""}
                      onChange={(e) => handleFieldChange("approverComments", e.target.value)}
                      rows={3}
                      placeholder="Comments from approver..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("approval")}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Approval
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPhase(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Approval Status:</strong> 
                      <Badge className={`ml-2 ${
                        request.approvalStatus === "Approved" ? "bg-green-500" :
                        request.approvalStatus === "Rejected" ? "bg-red-500" :
                        request.approvalStatus === "On Hold" ? "bg-yellow-500" :
                        "bg-gray-500"
                      } text-white`}>
                        {request.approvalStatus || "Pending"}
                      </Badge>
                    </div>
                    <div><strong>Approved Date:</strong> {request.approvedDate ? new Date(request.approvedDate).toLocaleDateString() : "Not set"}</div>
                    <div><strong>Budget Allocation:</strong> {request.budgetAllocation ? `$${request.budgetAllocation.toLocaleString()}` : "Not allocated"}</div>
                  </div>
                  <div>
                    <strong>Approver Comments:</strong>
                    <p className="mt-1 text-slate-700">{request.approverComments || "No comments provided"}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phase 4: Development */}
        <TabsContent value="development">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Folder className="w-5 h-5" />
                  <span>Development Phase</span>
                </CardTitle>
                <p className="text-sm text-slate-600">Code development and implementation</p>
              </div>
              {editingPhase !== "development" && (
                <Button variant="outline" onClick={() => setEditingPhase("development")}>
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editingPhase === "development" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Assigned Developer</Label>
                      <Input
                        value={formData.assignedDeveloper || ""}
                        onChange={(e) => handleFieldChange("assignedDeveloper", e.target.value)}
                        placeholder="Developer name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={formData.startDate || ""}
                        onChange={(e) => handleFieldChange("startDate", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Completion Date</Label>
                    <Input
                      type="date"
                      value={formData.targetCompletionDate || ""}
                      onChange={(e) => handleFieldChange("targetCompletionDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Development Notes</Label>
                    <Textarea
                      value={formData.developmentNotes || ""}
                      onChange={(e) => handleFieldChange("developmentNotes", e.target.value)}
                      rows={4}
                      placeholder="Development progress notes, technical decisions, blockers..."
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("development")}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Development
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPhase(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>Assigned Developer:</strong> {request.assignedDeveloper || "Not assigned"}</div>
                    <div><strong>Start Date:</strong> {request.startDate ? new Date(request.startDate).toLocaleDateString() : "Not set"}</div>
                    <div><strong>Target Completion:</strong> {request.targetCompletionDate ? new Date(request.targetCompletionDate).toLocaleDateString() : "Not set"}</div>
                  </div>
                  <div>
                    <strong>Development Notes:</strong>
                    <p className="mt-1 text-slate-700">{request.developmentNotes || "No notes provided"}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phase 5: Testing - Enhanced with Bug Tracker */}
        <TabsContent value="testing">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Testing Phase</span>
                  </CardTitle>
                  <p className="text-sm text-slate-600">Quality assurance and testing</p>
                </div>
                {editingPhase !== "testing" && (
                  <Button variant="outline" onClick={() => setEditingPhase("testing")}>
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {editingPhase === "testing" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Test Case Reference</Label>
                        <Input
                          value={formData.testCaseReference || ""}
                          onChange={(e) => handleFieldChange("testCaseReference", e.target.value)}
                          placeholder="Test case ID or reference"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Test Status</Label>
                        <Select 
                          value={formData.testStatus || ""} 
                          onValueChange={(value) => handleFieldChange("testStatus", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select test status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pass">Pass</SelectItem>
                            <SelectItem value="Fail">Fail</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Test Start Date</Label>
                        <Input
                          type="date"
                          value={formData.testStartDate || ""}
                          onChange={(e) => handleFieldChange("testStartDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Test Completion Date</Label>
                        <Input
                          type="date"
                          value={formData.testCompletionDate || ""}
                          onChange={(e) => handleFieldChange("testCompletionDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Bugs Reported</Label>
                      <Textarea
                        value={formData.bugsReported || ""}
                        onChange={(e) => handleFieldChange("bugsReported", e.target.value)}
                        rows={3}
                        placeholder="List of bugs found during testing..."
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="reworkNeeded"
                        checked={formData.reworkNeeded || false}
                        onCheckedChange={(checked) => handleFieldChange("reworkNeeded", checked)}
                      />
                      <Label htmlFor="reworkNeeded">Rework Needed</Label>
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleSave("testing")}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Testing
                      </Button>
                      <Button variant="outline" onClick={() => setEditingPhase(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Test Case Reference:</strong> {request.testCaseReference || "Not specified"}</div>
                      <div>
                        <strong>Test Status:</strong> 
                        <Badge className={`ml-2 ${
                          request.testStatus === "Pass" ? "bg-green-500" :
                          request.testStatus === "Fail" ? "bg-red-500" :
                          "bg-yellow-500"
                        } text-white`}>
                          {request.testStatus || "Pending"}
                        </Badge>
                      </div>
                      <div><strong>Test Start Date:</strong> {request.testStartDate ? new Date(request.testStartDate).toLocaleDateString() : "Not set"}</div>
                      <div><strong>Test Completion:</strong> {request.testCompletionDate ? new Date(request.testCompletionDate).toLocaleDateString() : "Not set"}</div>
                      <div><strong>Rework Needed:</strong> {request.reworkNeeded ? "Yes" : "No"}</div>
                    </div>
                    <div>
                      <strong>Bugs Reported:</strong>
                      <p className="mt-1 text-slate-700">{request.bugsReported || "No bugs reported"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bug & Task Tracker for Testing */}
            <BugTaskTracker 
              phase="Testing"
              requestId={request.id}
              items={testingBugs}
              onUpdate={setTestingBugs}
            />
          </div>
        </TabsContent>

        {/* Phase 6: UAT - Enhanced with Issue Tracker */}
        <TabsContent value="uat">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>User Acceptance Testing</span>
                  </CardTitle>
                  <p className="text-sm text-slate-600">Business user validation and acceptance</p>
                </div>
                {editingPhase !== "uat" && (
                  <Button variant="outline" onClick={() => setEditingPhase("uat")}>
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {editingPhase === "uat" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>UAT Status</Label>
                        <Select 
                          value={formData.uatStatus || ""} 
                          onValueChange={(value) => handleFieldChange("uatStatus", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select UAT status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Accepted">Accepted</SelectItem>
                            <SelectItem value="Rejected">Rejected</SelectItem>
                            <SelectItem value="Changes Required">Changes Required</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>UAT Completion Date</Label>
                        <Input
                          type="date"
                          value={formData.uatCompletionDate || ""}
                          onChange={(e) => handleFieldChange("uatCompletionDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>UAT Feedback</Label>
                      <Textarea
                        value={formData.uatFeedback || ""}
                        onChange={(e) => handleFieldChange("uatFeedback", e.target.value)}
                        rows={4}
                        placeholder="Business user feedback and comments..."
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleSave("uat")}>
                        <Save className="w-4 h-4 mr-2" />
                        Save UAT
                      </Button>
                      <Button variant="outline" onClick={() => setEditingPhase(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>UAT Status:</strong> 
                        <Badge className={`ml-2 ${
                          request.uatStatus === "Accepted" ? "bg-green-500" :
                          request.uatStatus === "Rejected" ? "bg-red-500" :
                          request.uatStatus === "Changes Required" ? "bg-yellow-500" :
                          "bg-gray-500"
                        } text-white`}>
                          {request.uatStatus || "Pending"}
                        </Badge>
                      </div>
                      <div><strong>UAT Completion Date:</strong> {request.uatCompletionDate ? new Date(request.uatCompletionDate).toLocaleDateString() : "Not set"}</div>
                    </div>
                    <div>
                      <strong>UAT Feedback:</strong>
                      <p className="mt-1 text-slate-700">{request.uatFeedback || "No feedback provided"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Issue Tracker for UAT */}
            <BugTaskTracker 
              phase="UAT"
              requestId={request.id}
              items={uatIssues}
              onUpdate={setUatIssues}
            />
          </div>
        </TabsContent>

        {/* Phase 7: Deployment */}
        <TabsContent value="deployment">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Deployment</span>
                </CardTitle>
                <p className="text-sm text-slate-600">Production deployment and release</p>
              </div>
              {editingPhase !== "deployment" && (
                <Button variant="outline" onClick={() => setEditingPhase("deployment")}>
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editingPhase === "deployment" ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Deployment Date</Label>
                      <Input
                        type="date"
                        value={formData.deploymentDate || ""}
                        onChange={(e) => handleFieldChange("deploymentDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Deployed By</Label>
                      <Input
                        value={formData.deployedBy || ""}
                        onChange={(e) => handleFieldChange("deployedBy", e.target.value)}
                        placeholder="DevOps engineer or admin name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Deployment Type</Label>
                      <Select 
                        value={formData.deploymentType || ""} 
                        onValueChange={(value) => handleFieldChange("deploymentType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select deployment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hotfix">Hotfix</SelectItem>
                          <SelectItem value="Minor Release">Minor Release</SelectItem>
                          <SelectItem value="Major Release">Major Release</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Environment</Label>
                      <Select 
                        value={formData.environment || ""} 
                        onValueChange={(value) => handleFieldChange("environment", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select environment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dev">Dev</SelectItem>
                          <SelectItem value="UAT">UAT</SelectItem>
                          <SelectItem value="Prod">Prod</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rollbackPlan"
                      checked={formData.rollbackPlan || false}
                      onCheckedChange={(checked) => handleFieldChange("rollbackPlan", checked)}
                    />
                    <Label htmlFor="rollbackPlan">Rollback Plan Documented</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("deployment")}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Deployment
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPhase(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><strong>Deployment Date:</strong> {request.deploymentDate ? new Date(request.deploymentDate).toLocaleDateString() : "Not deployed"}</div>
                    <div><strong>Deployed By:</strong> {request.deployedBy || "Not specified"}</div>
                    <div><strong>Deployment Type:</strong> {request.deploymentType || "Not specified"}</div>
                    <div><strong>Environment:</strong> {request.environment || "Not specified"}</div>
                    <div><strong>Rollback Plan:</strong> {request.rollbackPlan ? "Documented" : "Not documented"}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Phase 8: Post-Deployment - Enhanced with Issue Tracker */}
        <TabsContent value="completed">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Post-Deployment Review</span>
                  </CardTitle>
                  <p className="text-sm text-slate-600">Final review and project closure</p>
                </div>
                {editingPhase !== "completed" && (
                  <Button variant="outline" onClick={() => setEditingPhase("completed")}>
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {editingPhase === "completed" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Outcome</Label>
                        <Select 
                          value={formData.outcome || ""} 
                          onValueChange={(value) => handleFieldChange("outcome", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select outcome" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Successful">Successful</SelectItem>
                            <SelectItem value="Issues Found">Issues Found</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Close Date</Label>
                        <Input
                          type="date"
                          value={formData.closeDate || ""}
                          onChange={(e) => handleFieldChange("closeDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Final Status</Label>
                      <Select 
                        value={formData.finalStatus || ""} 
                        onValueChange={(value) => handleFieldChange("finalStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select final status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Closed">Closed</SelectItem>
                          <SelectItem value="Pending Rework">Pending Rework</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Issues (if any)</Label>
                      <Textarea
                        value={formData.issues || ""}
                        onChange={(e) => handleFieldChange("issues", e.target.value)}
                        rows={3}
                        placeholder="Post-deployment issues found..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Lessons Learned</Label>
                      <Textarea
                        value={formData.lessonsLearned || ""}
                        onChange={(e) => handleFieldChange("lessonsLearned", e.target.value)}
                        rows={3}
                        placeholder="Key learnings from this project..."
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => handleSave("completed")}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Review
                      </Button>
                      <Button variant="outline" onClick={() => setEditingPhase(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>Outcome:</strong> 
                        <Badge className={`ml-2 ${
                          request.outcome === "Successful" ? "bg-green-500" :
                          request.outcome === "Issues Found" ? "bg-red-500" :
                          "bg-yellow-500"
                        } text-white`}>
                          {request.outcome || "Pending"}
                        </Badge>
                      </div>
                      <div><strong>Close Date:</strong> {request.closeDate ? new Date(request.closeDate).toLocaleDateString() : "Not closed"}</div>
                      <div>
                        <strong>Final Status:</strong> 
                        <Badge className={`ml-2 ${
                          request.finalStatus === "Closed" ? "bg-green-500" : "bg-yellow-500"
                        } text-white`}>
                          {request.finalStatus || "Open"}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <strong>Issues:</strong>
                      <p className="mt-1 text-slate-700">{request.issues || "No issues reported"}</p>
                    </div>
                    <div>
                      <strong>Lessons Learned:</strong>
                      <p className="mt-1 text-slate-700">{request.lessonsLearned || "No lessons documented"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Issue Tracker for Post-Deployment */}
            <BugTaskTracker 
              phase="Post-Deployment"
              requestId={request.id}
              items={postDeploymentIssues}
              onUpdate={setPostDeploymentIssues}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
