import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server, Wifi, AlertTriangle, CheckCircle } from "lucide-react";

export const ITOperationsSummary = () => {
  // Mock data - replace with real data
  const systemData = {
    applications: {
      erp: { uptime: 99.8, status: "operational" },
      crm: { uptime: 99.5, status: "operational" },
      portal: { uptime: 98.9, status: "maintenance" }
    },
    infrastructure: {
      servers: { uptime: 99.9, status: "operational" },
      network: { uptime: 99.7, status: "operational" },
      vpn: { uptime: 99.2, status: "operational" }
    },
    tickets: {
      total: 45,
      resolved: 38,
      pending: 7,
      slaAdherence: 92
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="w-5 h-5" />
          📊 IT Operations Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* System Uptime */}
        <div>
          <h4 className="font-semibold mb-3">System Uptime & Downtime Report</h4>
          
          <div className="space-y-3">
            <div>
              <h5 className="text-sm font-medium mb-2">Applications</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(systemData.applications).map(([app, data]) => (
                  <div key={app} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize">{app}</span>
                      <Badge variant={data.status === "operational" ? "default" : "secondary"}>
                        {data.status}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-green-600">{data.uptime}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium mb-2">Infrastructure</h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(systemData.infrastructure).map(([infra, data]) => (
                  <div key={infra} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize">{infra}</span>
                      <Badge variant="default">
                        {data.status}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-green-600">{data.uptime}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Support Tickets */}
        <div>
          <h4 className="font-semibold mb-3">Incident & Support Tickets Overview</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{systemData.tickets.total}</div>
              <div className="text-sm text-blue-600">Total Tickets</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{systemData.tickets.resolved}</div>
              <div className="text-sm text-green-600">Resolved</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{systemData.tickets.pending}</div>
              <div className="text-sm text-orange-600">Pending</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{systemData.tickets.slaAdherence}%</div>
              <div className="text-sm text-purple-600">SLA Adherence</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};