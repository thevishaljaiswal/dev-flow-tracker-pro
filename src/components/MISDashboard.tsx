
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DevelopmentRequest } from "../pages/Index";
import { 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3
} from "lucide-react";

interface MISDashboardProps {
  requests: DevelopmentRequest[];
}

export const MISDashboard = ({ requests }: MISDashboardProps) => {
  const getLastMonthData = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return requests.filter(req => {
      const reqDate = new Date(req.requestDate);
      return reqDate >= lastMonth && reqDate < currentMonth;
    });
  };

  const getProjectActivities = () => {
    const activities: Array<{
      requestId: string;
      title: string;
      department: string;
      activities: Array<{
        phase: string;
        action: string;
        date: string;
        status: string;
      }>;
    }> = [];

    requests.forEach(req => {
      const projectActivities = [];

      // Check each phase for activities in the last month
      const phases = [
        { id: "requirement-gathering", label: "Requirement Gathering", date: req.requestDate },
        { id: "analysis", label: "Analysis", date: req.requestDate },
        { id: "approval", label: "Approval", date: req.approvedDate },
        { id: "development", label: "Development", date: req.startDate },
        { id: "testing", label: "Testing", date: req.testStartDate },
        { id: "uat", label: "UAT", date: req.uatCompletionDate },
        { id: "deployment", label: "Deployment", date: req.deploymentDate },
        { id: "completed", label: "Post-Deployment", date: req.closeDate }
      ];

      phases.forEach(phase => {
        if (phase.date && isLastMonth(phase.date)) {
          projectActivities.push({
            phase: phase.label,
            action: getPhaseAction(phase.id, req),
            date: phase.date,
            status: getPhaseStatus(phase.id, req)
          });
        }
      });

      if (projectActivities.length > 0) {
        activities.push({
          requestId: req.id,
          title: req.title,
          department: req.department,
          activities: projectActivities
        });
      }
    });

    return activities;
  };

  const isLastMonth = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return date >= lastMonth && date < currentMonth;
  };

  const getPhaseAction = (phaseId: string, req: DevelopmentRequest) => {
    const actions = {
      "requirement-gathering": "Requirements collected and documented",
      "analysis": "Technical analysis completed",
      "approval": req.approvalStatus === "Approved" ? "Request approved" : `Request ${req.approvalStatus?.toLowerCase()}`,
      "development": "Development work started",
      "testing": req.testStatus === "Pass" ? "Testing completed successfully" : "Testing in progress",
      "uat": req.uatStatus === "Accepted" ? "UAT accepted by business" : "UAT feedback received",
      "deployment": `Deployed to ${req.environment}`,
      "completed": req.finalStatus === "Closed" ? "Project closed successfully" : "Post-deployment review completed"
    };
    return actions[phaseId as keyof typeof actions] || "Activity completed";
  };

  const getPhaseStatus = (phaseId: string, req: DevelopmentRequest) => {
    if (phaseId === req.currentStage) return "Current";
    
    const phaseOrder = ["requirement-gathering", "analysis", "approval", "development", "testing", "uat", "deployment", "completed"];
    const currentIndex = phaseOrder.indexOf(req.currentStage);
    const phaseIndex = phaseOrder.indexOf(phaseId);
    
    return phaseIndex < currentIndex ? "Completed" : "Pending";
  };

  const getMonthlyStats = () => {
    const lastMonthRequests = getLastMonthData();
    const stats = {
      totalRequests: lastMonthRequests.length,
      completedRequests: lastMonthRequests.filter(r => r.currentStage === "completed").length,
      approvedRequests: lastMonthRequests.filter(r => r.approvalStatus === "Approved").length,
      inDevelopment: lastMonthRequests.filter(r => r.currentStage === "development").length,
      inTesting: lastMonthRequests.filter(r => ["testing", "uat"].includes(r.currentStage)).length,
      deployed: lastMonthRequests.filter(r => r.deploymentDate).length
    };
    return stats;
  };

  const getDepartmentBreakdown = () => {
    const lastMonthRequests = getLastMonthData();
    const breakdown: { [key: string]: number } = {};
    
    lastMonthRequests.forEach(req => {
      breakdown[req.department] = (breakdown[req.department] || 0) + 1;
    });
    
    return Object.entries(breakdown).map(([dept, count]) => ({ department: dept, count }));
  };

  const lastMonthRequests = getLastMonthData();
  const monthlyStats = getMonthlyStats();
  const departmentBreakdown = getDepartmentBreakdown();
  const projectActivities = getProjectActivities();
  const now = new Date();
  const lastMonthName = new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-slate-800">MIS Dashboard - {lastMonthName}</h2>
      </div>

      {/* Monthly Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.totalRequests}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.completedRequests}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.approvedRequests}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.inDevelopment}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Testing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.inTesting}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deployed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.deployed}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Requests ({lastMonthName})</CardTitle>
          </CardHeader>
          <CardContent>
            {departmentBreakdown.length > 0 ? (
              <div className="space-y-3">
                {departmentBreakdown.map(({ department, count }) => {
                  const percentage = monthlyStats.totalRequests > 0 ? (count / monthlyStats.totalRequests) * 100 : 0;
                  return (
                    <div key={department} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{department}</span>
                        <Badge variant="outline">{count}</Badge>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500">
                No requests in {lastMonthName}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics ({lastMonthName})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Completion Rate</span>
                </div>
                <Badge className="bg-green-500 text-white">
                  {monthlyStats.totalRequests > 0 ? Math.round((monthlyStats.completedRequests / monthlyStats.totalRequests) * 100) : 0}%
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Approval Rate</span>
                </div>
                <Badge className="bg-blue-500 text-white">
                  {monthlyStats.totalRequests > 0 ? Math.round((monthlyStats.approvedRequests / monthlyStats.totalRequests) * 100) : 0}%
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Active Projects</span>
                </div>
                <Badge className="bg-orange-500 text-white">
                  {monthlyStats.totalRequests - monthlyStats.completedRequests}
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Deployment Success</span>
                </div>
                <Badge className="bg-purple-500 text-white">
                  {monthlyStats.totalRequests > 0 ? Math.round((monthlyStats.deployed / monthlyStats.totalRequests) * 100) : 0}%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Activities Detail */}
      <Card>
        <CardHeader>
          <CardTitle>Project Activities - {lastMonthName}</CardTitle>
        </CardHeader>
        <CardContent>
          {projectActivities.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Phase</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectActivities.map((project) =>
                  project.activities.map((activity, index) => (
                    <TableRow key={`${project.requestId}-${index}`}>
                      <TableCell className="font-mono">{project.requestId}</TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{activity.phase}</Badge>
                      </TableCell>
                      <TableCell>{activity.action}</TableCell>
                      <TableCell>{new Date(activity.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge className={`${
                          activity.status === "Completed" ? "bg-green-500" :
                          activity.status === "Current" ? "bg-blue-500" :
                          "bg-gray-500"
                        } text-white`}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-slate-500">
              No project activities recorded for {lastMonthName}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
