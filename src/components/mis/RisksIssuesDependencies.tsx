import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ExternalLink, FileCheck } from "lucide-react";

export const RisksIssuesDependencies = () => {
  // Mock data - replace with real data
  const riskData = {
    majorRisks: [
      { 
        risk: "Legacy system compatibility issues", 
        severity: "High", 
        mitigation: "Gradual migration plan with fallback options",
        owner: "IT Architecture Team"
      },
      { 
        risk: "Data security vulnerabilities", 
        severity: "Critical", 
        mitigation: "Enhanced security protocols and regular audits",
        owner: "Cybersecurity Team"
      }
    ],
    dependencies: [
      { 
        item: "Cloud migration project", 
        dependsOn: "Vendor contract finalization", 
        status: "Waiting",
        eta: "2024-02-15"
      },
      { 
        item: "New payroll system", 
        dependsOn: "HR policy approval", 
        status: "In Progress",
        eta: "2024-02-28"
      }
    ],
    compliance: [
      { 
        area: "GDPR Data Protection", 
        status: "Compliant", 
        lastAudit: "2024-01-10",
        nextReview: "2024-07-10"
      },
      { 
        area: "SOX Financial Controls", 
        status: "Gap Identified", 
        lastAudit: "2024-01-15",
        nextReview: "2024-03-15"
      }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "compliant": return "bg-green-500";
      case "gap identified": return "bg-red-500";
      case "in progress": return "bg-blue-500";
      case "waiting": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          ⚠️ Risks, Issues & Dependencies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Major Risks */}
        <div>
          <h4 className="font-semibold mb-3">Current Major Risks & Mitigation Plans</h4>
          <div className="space-y-3">
            {riskData.majorRisks.map((risk, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{risk.risk}</div>
                  <Badge className={`${getSeverityColor(risk.severity)} text-white`}>
                    {risk.severity}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  <strong>Mitigation:</strong> {risk.mitigation}
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Owner:</strong> {risk.owner}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dependencies */}
        <div>
          <h4 className="font-semibold mb-3">Dependencies on Other Departments/Vendors</h4>
          <div className="space-y-3">
            {riskData.dependencies.map((dep, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{dep.item}</div>
                  <div className="text-sm text-muted-foreground">
                    <ExternalLink className="w-3 h-3 inline mr-1" />
                    Depends on: {dep.dependsOn}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(dep.status)} text-white`}>
                    {dep.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">ETA: {dep.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div>
          <h4 className="font-semibold mb-3">Compliance Gaps & Audit Findings</h4>
          <div className="space-y-3">
            {riskData.compliance.map((comp, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{comp.area}</div>
                  <Badge className={`${getStatusColor(comp.status)} text-white`}>
                    {comp.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <strong>Last Audit:</strong> {comp.lastAudit}
                  </div>
                  <div>
                    <strong>Next Review:</strong> {comp.nextReview}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};