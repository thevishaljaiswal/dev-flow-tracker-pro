
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DevelopmentRequest } from "../pages/Index";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Zap,
  FileText,
  Search,
  Check,
  Calendar,
  Folder
} from "lucide-react";

interface DashboardOverviewProps {
  requests: DevelopmentRequest[];
}

export const DashboardOverview = ({ requests }: DashboardOverviewProps) => {
  const getStageStats = () => {
    const stages = {
      "requirement-gathering": 0,
      "analysis": 0,
      "approval": 0,
      "development": 0,
      "testing": 0,
      "uat": 0,
      "deployment": 0,
      "completed": 0
    };

    requests.forEach(req => {
      stages[req.currentStage]++;
    });

    return stages;
  };

  const getPriorityStats = () => {
    const priorities = { Urgent: 0, High: 0, Medium: 0, Low: 0 };
    requests.forEach(req => {
      priorities[req.priority]++;
    });
    return priorities;
  };

  const stageStats = getStageStats();
  const priorityStats = getPriorityStats();
  const totalRequests = requests.length;
  const completedRequests = stageStats.completed;
  const inProgressRequests = totalRequests - completedRequests;

  const getStageIcon = (stage: string) => {
    const icons = {
      "requirement-gathering": FileText,
      "analysis": Search,
      "approval": Check,
      "development": Folder,
      "testing": CheckCircle,
      "uat": Calendar,
      "deployment": Zap,
      "completed": CheckCircle
    };
    return icons[stage as keyof typeof icons] || FileText;
  };

  const getStageLabel = (stage: string) => {
    const labels = {
      "requirement-gathering": "Requirement Gathering",
      "analysis": "Analysis",
      "approval": "Approval",
      "development": "Development",
      "testing": "Testing",
      "uat": "UAT",
      "deployment": "Deployment",
      "completed": "Completed"
    };
    return labels[stage as keyof typeof labels] || stage;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      Urgent: "bg-red-500",
      High: "bg-orange-500", 
      Medium: "bg-yellow-500",
      Low: "bg-green-500"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <p className="text-xs text-blue-100">Active development items</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedRequests}</div>
            <p className="text-xs text-green-100">Successfully deployed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressRequests}</div>
            <p className="text-xs text-yellow-100">Currently active</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{priorityStats.Urgent + priorityStats.High}</div>
            <p className="text-xs text-red-100">Urgent & high priority</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Development Stages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Development Stages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stageStats).map(([stage, count]) => {
                const Icon = getStageIcon(stage);
                const percentage = totalRequests > 0 ? (count / totalRequests) * 100 : 0;
                
                return (
                  <div key={stage} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4 text-slate-600" />
                        <span className="text-sm font-medium text-slate-700">
                          {getStageLabel(stage)}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Priority Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Priority Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(priorityStats).map(([priority, count]) => {
                const percentage = totalRequests > 0 ? (count / totalRequests) * 100 : 0;
                
                return (
                  <div key={priority} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`} />
                        <span className="text-sm font-medium text-slate-700">{priority}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {count}
                      </Badge>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Recent Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium text-slate-800">{request.title}</div>
                  <div className="text-sm text-slate-600">
                    {request.id} • {request.requestedBy} • {request.department}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="outline"
                    className={`${getPriorityColor(request.priority)} text-white border-0`}
                  >
                    {request.priority}
                  </Badge>
                  <Badge variant="secondary">
                    {getStageLabel(request.currentStage)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
