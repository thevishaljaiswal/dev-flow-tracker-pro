import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Database } from "lucide-react";
import { useMISData } from "./MISDataManager";

export const CybersecurityRiskManagement = () => {
  const { getCurrentData } = useMISData();
  const securityData = getCurrentData().cybersecurity;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          🔐 Cybersecurity & Risk Management
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Incidents */}
        <div>
          <h4 className="font-semibold mb-3">Security Incidents</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{securityData.incidents.total}</div>
              <div className="text-sm text-red-600">Total Incidents</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{securityData.incidents.resolved}</div>
              <div className="text-sm text-green-600">Resolved</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{securityData.incidents.pending}</div>
              <div className="text-sm text-orange-600">Pending</div>
            </div>
          </div>
        </div>

        {/* Security Systems */}
        <div>
          <h4 className="font-semibold mb-3">Security Systems Status</h4>
          <div className="space-y-3">
            {Object.entries(securityData.systems).map(([system, data]) => (
              <div key={system} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-medium capitalize">{system}</span>
                </div>
                <div className="text-right">
                  <Badge variant="default">{data.status}</Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    Last updated: {data.lastUpdate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patch Management */}
        <div>
          <h4 className="font-semibold mb-3">Patch Management Status</h4>
          <div className="space-y-3">
            {Object.entries(securityData.patches).map(([type, data]) => (
              <div key={type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium capitalize">{type}</span>
                  <span className="text-sm">{data.completion}% ({data.pending} pending)</span>
                </div>
                <Progress value={data.completion} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Data Backup */}
        <div>
          <h4 className="font-semibold mb-3">Data Backup Status</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{securityData.backups.success}</div>
              <div className="text-sm text-green-600">Successful</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{securityData.backups.failure}</div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{securityData.backups.successRate}%</div>
              <div className="text-sm text-blue-600">Success Rate</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};