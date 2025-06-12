
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
      requestDate: "2024-04-15",
      requestedBy: "John Smith",
      department: "Security",
      priority: "High",
      businessJustification: "Improve security and user experience with multi-factor authentication",
      relatedModule: "Authentication System",
      currentStage: "completed",
      status: "Completed",
      approvalStatus: "Approved",
      approvedDate: "2024-04-20",
      assignedDeveloper: "Alice Johnson",
      startDate: "2024-04-25",
      testStartDate: "2024-05-10",
      testCompletionDate: "2024-05-15",
      testStatus: "Pass",
      uatStatus: "Accepted",
      uatCompletionDate: "2024-05-20",
      deploymentDate: "2024-05-25",
      environment: "Prod",
      closeDate: "2024-05-30",
      finalStatus: "Closed"
    },
    {
      id: "REQ-002", 
      title: "Inventory Management Bug Fix",
      requestDate: "2024-05-05",
      requestedBy: "Sarah Wilson",
      department: "Operations",
      priority: "Medium",
      businessJustification: "Fix critical inventory calculation errors affecting stock reports",
      relatedModule: "Inventory System",
      currentStage: "testing",
      status: "Testing Phase",
      approvalStatus: "Approved",
      approvedDate: "2024-05-08",
      assignedDeveloper: "Bob Martinez",
      startDate: "2024-05-12",
      testStartDate: "2024-05-28",
      testStatus: "Pass"
    },
    {
      id: "REQ-003",
      title: "Customer Portal Mobile Optimization",
      requestDate: "2024-06-01",
      requestedBy: "Mike Chen",
      department: "Customer Service",
      priority: "High",
      businessJustification: "Optimize customer portal for mobile devices to improve user experience",
      relatedModule: "Customer Portal",
      currentStage: "development",
      status: "In Development",
      approvalStatus: "Approved",
      approvedDate: "2024-06-05",
      assignedDeveloper: "Emma Davis",
      startDate: "2024-06-10"
    },
    {
      id: "REQ-004",
      title: "Payroll System Integration",
      requestDate: "2024-07-10",
      requestedBy: "Lisa Rodriguez",
      department: "HR",
      priority: "Urgent",
      businessJustification: "Integrate new payroll system with existing HR management platform",
      relatedModule: "HR System",
      currentStage: "analysis",
      status: "Under Analysis",
      approvalStatus: "Pending"
    },
    {
      id: "REQ-005",
      title: "Financial Reporting Dashboard",
      requestDate: "2024-08-15",
      requestedBy: "David Thompson",
      department: "Finance",
      priority: "Medium",
      businessJustification: "Create comprehensive dashboard for financial KPI tracking",
      relatedModule: "Financial System",
      currentStage: "requirement-gathering",
      status: "Requirements Gathering",
      approvalStatus: "Pending"
    },
    {
      id: "REQ-006",
      title: "Supply Chain Analytics",
      requestDate: "2024-09-03",
      requestedBy: "Jennifer Lee",
      department: "Supply Chain",
      priority: "Low",
      businessJustification: "Implement analytics for supply chain optimization",
      relatedModule: "Supply Chain System",
      currentStage: "approval",
      status: "Awaiting Approval",
      approvalStatus: "On Hold"
    },
    {
      id: "REQ-007",
      title: "Email Notification System",
      requestDate: "2024-10-12",
      requestedBy: "Robert Garcia",
      department: "IT",
      priority: "Medium",
      businessJustification: "Automated email notifications for system alerts and updates",
      relatedModule: "Notification System",
      currentStage: "uat",
      status: "User Acceptance Testing",
      approvalStatus: "Approved",
      approvedDate: "2024-10-15",
      assignedDeveloper: "Sarah Kim",
      startDate: "2024-10-20",
      testStartDate: "2024-11-01",
      testStatus: "Pass",
      uatStatus: "Changes Required"
    },
    {
      id: "REQ-008",
      title: "Data Backup Automation",
      requestDate: "2024-11-08",
      requestedBy: "Kevin Park",
      department: "IT",
      priority: "High",
      businessJustification: "Automate daily data backups to ensure business continuity",
      relatedModule: "Backup System",
      currentStage: "deployment",
      status: "Ready for Deployment",
      approvalStatus: "Approved",
      approvedDate: "2024-11-10",
      assignedDeveloper: "Tom Wilson",
      startDate: "2024-11-15",
      testStartDate: "2024-11-25",
      testStatus: "Pass",
      uatStatus: "Accepted",
      uatCompletionDate: "2024-12-01",
      deploymentDate: "2024-12-05",
      environment: "UAT"
    },
    {
      id: "REQ-009",
      title: "Performance Monitoring Tool",
      requestDate: "2024-12-01",
      requestedBy: "Amy Foster",
      department: "Operations",
      priority: "Medium",
      businessJustification: "Monitor application performance and identify bottlenecks",
      relatedModule: "Monitoring System",
      currentStage: "development",
      status: "In Development",
      approvalStatus: "Approved",
      approvedDate: "2024-12-03",
      assignedDeveloper: "Chris Brown",
      startDate: "2024-12-08"
    },
    {
      id: "REQ-010",
      title: "Customer Feedback Portal",
      requestDate: "2025-01-15",
      requestedBy: "Nancy White",
      department: "Customer Service",
      priority: "Low",
      businessJustification: "Centralized portal for collecting and managing customer feedback",
      relatedModule: "Customer Portal",
      currentStage: "requirement-gathering",
      status: "Requirements Gathering",
      approvalStatus: "Pending"
    },
    {
      id: "REQ-011",
      title: "Vendor Management System",
      requestDate: "2025-02-20",
      requestedBy: "Mark Johnson",
      department: "Procurement",
      priority: "High",
      businessJustification: "Streamline vendor onboarding and management processes",
      relatedModule: "Vendor System",
      currentStage: "analysis",
      status: "Under Analysis",
      approvalStatus: "Pending"
    },
    {
      id: "REQ-012",
      title: "Training Management Platform",
      requestDate: "2025-03-10",
      requestedBy: "Rachel Green",
      department: "HR",
      priority: "Medium",
      businessJustification: "Digital platform for employee training and certification tracking",
      relatedModule: "Training System",
      currentStage: "approval",
      status: "Awaiting Approval",
      approvalStatus: "Approved",
      approvedDate: "2025-03-15"
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
