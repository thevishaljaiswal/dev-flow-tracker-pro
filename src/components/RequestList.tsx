
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DevelopmentRequest } from "../pages/Index";
import { Search, Calendar, Folder, FileText } from "lucide-react";

interface RequestListProps {
  requests: DevelopmentRequest[];
  onSelectRequest: (request: DevelopmentRequest) => void;
}

export const RequestList = ({ requests, onSelectRequest }: RequestListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [stageFilter, setStageFilter] = useState<string>("all");

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
    const matchesStage = stageFilter === "all" || request.currentStage === stageFilter;
    
    return matchesSearch && matchesPriority && matchesStage;
  });

  const getPriorityColor = (priority: string) => {
    const colors = {
      Urgent: "bg-red-500 text-white",
      High: "bg-orange-500 text-white", 
      Medium: "bg-yellow-500 text-white",
      Low: "bg-green-500 text-white"
    };
    return colors[priority as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getStageColor = (stage: string) => {
    const colors = {
      "requirement-gathering": "bg-blue-100 text-blue-800",
      "analysis": "bg-purple-100 text-purple-800",
      "approval": "bg-yellow-100 text-yellow-800",
      "development": "bg-orange-100 text-orange-800",
      "testing": "bg-indigo-100 text-indigo-800",
      "uat": "bg-pink-100 text-pink-800",
      "deployment": "bg-green-100 text-green-800",
      "completed": "bg-emerald-100 text-emerald-800"
    };
    return colors[stage as keyof typeof colors] || "bg-gray-100 text-gray-800";
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

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800">Filter Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="requirement-gathering">Requirement Gathering</SelectItem>
                <SelectItem value="analysis">Analysis</SelectItem>
                <SelectItem value="approval">Approval</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="uat">UAT</SelectItem>
                <SelectItem value="deployment">Deployment</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Request Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-slate-800">{request.title}</h3>
                    <Badge className={getPriorityColor(request.priority)}>
                      {request.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{request.id}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(request.requestDate).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Folder className="h-4 w-4" />
                      <span>{request.relatedModule}</span>
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    <strong>Requested by:</strong> {request.requestedBy} ({request.department})
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2">{request.businessJustification}</p>
                </div>
                <div className="flex flex-col items-end space-y-2 ml-4">
                  <Badge className={getStageColor(request.currentStage)}>
                    {getStageLabel(request.currentStage)}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onSelectRequest(request)}
                    className="text-blue-600 border-blue-300 hover:bg-blue-50"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-slate-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-slate-600 mb-1">No requests found</h3>
            <p className="text-slate-500">Try adjusting your search criteria or create a new request.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
