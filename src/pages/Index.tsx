
import { useState, useEffect } from "react";
import { DashboardOverview } from "../components/DashboardOverview";
import { RequestList } from "../components/RequestList";
import { RequestForm } from "../components/RequestForm";
import { RequestDetails } from "../components/RequestDetails";
import { Navigation } from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface DevelopmentRequest {
  id: string;
  title: string;
  requestDate: string;
  requestedBy: string;
  department: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  businessJustification: string;
  relatedModule: string;
  currentStage: "requirement-gathering" | "analysis" | "approval" | "development" | "testing" | "uat" | "deployment" | "completed";
  status: string;
  requirementDescription?: string;
  feasibilityStatus?: "Yes" | "No" | "Partial";
  estimatedEffort?: number;
  assignedAnalyst?: string;
  impactedSystems?: string;
  dependencies?: string;
  approvalStatus?: "Approved" | "Rejected" | "On Hold" | "Pending";
  approvedDate?: string;
  approverComments?: string;
  budgetAllocation?: number;
  assignedDeveloper?: string;
  startDate?: string;
  targetCompletionDate?: string;
  developmentNotes?: string;
  testCaseReference?: string;
  testStartDate?: string;
  testCompletionDate?: string;
  testStatus?: "Pass" | "Fail" | "Pending";
  bugsReported?: string;
  reworkNeeded?: boolean;
  uatStatus?: "Accepted" | "Rejected" | "Changes Required" | "Pending";
  uatCompletionDate?: string;
  uatFeedback?: string;
  deploymentDate?: string;
  deployedBy?: string;
  deploymentType?: "Hotfix" | "Minor Release" | "Major Release";
  environment?: "Dev" | "UAT" | "Prod";
  rollbackPlan?: boolean;
  outcome?: "Successful" | "Issues Found" | "Pending";
  issues?: string;
  lessonsLearned?: string;
  closeDate?: string;
  finalStatus?: "Closed" | "Pending Rework";
}

const Index = () => {
  const [activeView, setActiveView] = useState<"dashboard" | "requests" | "new-request">("dashboard");
  const [selectedRequest, setSelectedRequest] = useState<DevelopmentRequest | null>(null);
  const [requests, setRequests] = useState<DevelopmentRequest[]>([
    {
      id: "REQ-001",
      title: "User Authentication Enhancement",
      requestDate: "2024-06-01",
      requestedBy: "John Smith",
      department: "Security",
      priority: "High",
      businessJustification: "Improve security and user experience",
      relatedModule: "Authentication System",
      currentStage: "development",
      status: "In Progress",
      approvalStatus: "Approved",
      assignedDeveloper: "Alice Johnson"
    },
    {
      id: "REQ-002", 
      title: "Inventory Management Bug Fix",
      requestDate: "2024-06-05",
      requestedBy: "Sarah Wilson",
      department: "Operations",
      priority: "Medium",
      businessJustification: "Fix critical inventory calculation errors",
      relatedModule: "Inventory System",
      currentStage: "testing",
      status: "Testing Phase",
      approvalStatus: "Approved"
    }
  ]);

  const handleCreateRequest = (newRequest: Omit<DevelopmentRequest, "id">) => {
    const id = `REQ-${String(requests.length + 1).padStart(3, "0")}`;
    setRequests([...requests, { ...newRequest, id }]);
    setActiveView("requests");
  };

  const handleUpdateRequest = (updatedRequest: DevelopmentRequest) => {
    setRequests(requests.map(req => 
      req.id === updatedRequest.id ? updatedRequest : req
    ));
    setSelectedRequest(updatedRequest);
  };

  if (selectedRequest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation 
          activeView="request-details" 
          onViewChange={() => {}} 
          onBack={() => setSelectedRequest(null)}
        />
        <RequestDetails 
          request={selectedRequest} 
          onUpdate={handleUpdateRequest}
          onBack={() => setSelectedRequest(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      <main className="container mx-auto px-4 py-8">
        {activeView === "dashboard" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">IT Development Tracker</h1>
                <p className="text-slate-600">Track and manage IT development lifecycle from requirements to deployment</p>
              </div>
              <Button 
                onClick={() => setActiveView("new-request")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </div>
            <DashboardOverview requests={requests} />
          </>
        )}

        {activeView === "requests" && (
          <>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Development Requests</h1>
                <p className="text-slate-600">View and manage all development requests</p>
              </div>
              <Button 
                onClick={() => setActiveView("new-request")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </div>
            <RequestList 
              requests={requests} 
              onSelectRequest={setSelectedRequest}
            />
          </>
        )}

        {activeView === "new-request" && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">New Development Request</h1>
              <p className="text-slate-600">Create a new IT development request</p>
            </div>
            <RequestForm onSubmit={handleCreateRequest} />
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
