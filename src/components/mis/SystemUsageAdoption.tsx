import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, BookOpen, MessageSquare } from "lucide-react";
import { useMISData } from "./MISDataManager";

export const SystemUsageAdoption = () => {
  const { getCurrentData } = useMISData();
  const usageData = getCurrentData().systemUsage;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          📈 System Usage & Adoption
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Activity */}
        <div>
          <h4 className="font-semibold mb-3">User Activity on Internal Applications</h4>
          <div className="space-y-4">
            {Object.entries(usageData.applications).map(([app, data]) => (
              <div key={app} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{app}</span>
                  <span className="text-sm">{data.activeUsers}/{data.totalUsers} users ({data.usage}%)</span>
                </div>
                <Progress value={data.usage} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* License Usage */}
        <div>
          <h4 className="font-semibold mb-3">License Usage vs Availability</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(usageData.licenses).map(([license, data]) => (
              <div key={license} className="p-3 border rounded-lg">
                <div className="font-medium capitalize mb-2">{license}</div>
                <div className="text-2xl font-bold mb-1">{data.utilization}%</div>
                <div className="text-sm text-muted-foreground">
                  {data.used} of {data.available} licenses
                </div>
                <Progress value={data.utilization} className="h-2 mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Training Sessions */}
        <div>
          <h4 className="font-semibold mb-3">Training Sessions</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">{usageData.training.conducted}</div>
              <div className="text-sm text-blue-600">Conducted</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <BookOpen className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{usageData.training.planned}</div>
              <div className="text-sm text-green-600">Planned</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{usageData.training.attendees}</div>
              <div className="text-sm text-purple-600">Attendees</div>
            </div>
          </div>
        </div>

        {/* User Feedback */}
        <div>
          <h4 className="font-semibold mb-3">User Feedback & Challenges</h4>
          <div className="space-y-2">
            {usageData.feedback.map((feedback, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{feedback.system}</div>
                  <div className="text-sm text-muted-foreground">{feedback.issue}</div>
                </div>
                <Badge variant={feedback.status === "Resolved" ? "default" : "secondary"}>
                  {feedback.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};