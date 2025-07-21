import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderOpen, TrendingUp } from "lucide-react";
import { useMISData } from "./MISDataManager";

export const ProjectsEnhancementsUpdate = () => {
  const { getCurrentData } = useMISData();
  const projectData = getCurrentData().projects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "green": return "bg-green-500";
      case "amber": return "bg-yellow-500";
      case "red": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FolderOpen className="w-5 h-5" />
          🧰 Projects & Enhancements Update
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ongoing Projects */}
        <div>
          <h4 className="font-semibold mb-3">Ongoing IT Projects (RAG Status)</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.ongoing.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-mono">{project.id}</TableCell>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.department}</TableCell>
                  <TableCell>{project.progress}%</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(project.status)} text-white`}>
                      {project.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* New Initiatives */}
        <div>
          <h4 className="font-semibold mb-3">New Initiatives Kicked Off</h4>
          <div className="space-y-2">
            {projectData.newInitiatives.map((initiative, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{initiative.name}</div>
                  <div className="text-sm text-muted-foreground">{initiative.department}</div>
                </div>
                <Badge variant="outline">Kickoff: {initiative.kickoff}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Project Delays */}
        <div>
          <h4 className="font-semibold mb-3">Project Delays & Mitigation</h4>
          <div className="space-y-2">
            {projectData.delays.map((delay, index) => (
              <div key={index} className="p-3 border rounded-lg bg-orange-50">
                <div className="font-medium text-orange-800">{delay.project}</div>
                <div className="text-sm text-orange-600 mt-1">Reason: {delay.reason}</div>
                <div className="text-sm text-orange-600">Mitigation: {delay.mitigation}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Projects Impact */}
        <div>
          <h4 className="font-semibold mb-3">Business Impact of Completed Projects</h4>
          <div className="space-y-2">
            {projectData.completed.map((project, index) => (
              <div key={index} className="p-3 border rounded-lg bg-green-50">
                <div className="font-medium text-green-800">{project.name}</div>
                <div className="text-sm text-green-600 mt-1">Impact: {project.impact}</div>
                <div className="text-sm text-green-600">Completed: {project.completionDate}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};