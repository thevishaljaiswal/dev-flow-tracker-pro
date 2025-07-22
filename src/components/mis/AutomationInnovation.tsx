import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, DollarSign, Lightbulb } from "lucide-react";
import { useMISData } from "./MISDataManager";

export const AutomationInnovation = () => {
  const { getCurrentData } = useMISData();
  const automationData = getCurrentData().automation;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5" />
          💡 Automation & Innovation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Automation Initiatives */}
        <div>
          <h4 className="font-semibold mb-3">Automation & Digitization Initiatives</h4>
          <div className="space-y-3">
            {automationData.initiatives.map((initiative, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{initiative.name}</div>
                  <div className="text-sm text-muted-foreground">{initiative.type}</div>
                </div>
                <div className="text-right">
                  <Badge variant={initiative.status === "Live" ? "default" : "secondary"}>
                    {initiative.status}
                  </Badge>
                  <div className="text-sm text-green-600 mt-1">{initiative.timeSaved}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Summary */}
        <div>
          <h4 className="font-semibold mb-3">Time/Cost Saved via Automation</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">{automationData.savings.totalTimeSaved}</div>
              <div className="text-sm text-green-600">Hours/Month</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">₹{automationData.savings.costSaved.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Saved/Month</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Zap className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{automationData.savings.processes}</div>
              <div className="text-sm text-purple-600">Processes</div>
            </div>
          </div>
        </div>

        {/* AI/ML Improvements */}
        <div>
          <h4 className="font-semibold mb-3">AI, ML & Data Analytics Improvements</h4>
          <div className="space-y-2">
            {automationData.aiMl.map((project, index) => (
              <div key={index} className="p-3 border rounded-lg bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{project.name}</div>
                  <Badge variant={project.status === "Live" ? "default" : "secondary"}>
                    {project.status}
                  </Badge>
                </div>
                <div className="text-sm text-blue-600">Impact: {project.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Suggestions */}
        <div>
          <h4 className="font-semibold mb-3">Suggestions for Future Improvements</h4>
          <div className="space-y-2">
            {automationData.suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{suggestion.idea}</div>
                  <div className="text-sm text-green-600">Est. savings: {suggestion.estimatedSavings}</div>
                </div>
                <Badge variant={suggestion.priority === "High" ? "destructive" : "secondary"}>
                  {suggestion.priority}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};