import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Settings, BookOpen, ShoppingCart } from "lucide-react";

export const UpcomingPlansRoadmap = () => {
  // Mock data - replace with real data
  const roadmapData = {
    upgrades: [
      { name: "Database Server Upgrade", date: "2024-02-15", impact: "2 hours downtime", type: "Infrastructure" },
      { name: "ERP System Update", date: "2024-02-20", impact: "4 hours downtime", type: "Application" },
      { name: "Security Patch Rollout", date: "2024-02-25", impact: "30 minutes downtime", type: "Security" }
    ],
    maintenance: [
      { system: "Core Banking System", date: "2024-02-10", duration: "6 hours", window: "Saturday 10 PM - 4 AM" },
      { system: "Email Servers", date: "2024-02-17", duration: "2 hours", window: "Sunday 2 AM - 4 AM" }
    ],
    training: [
      { program: "Cybersecurity Awareness", date: "2024-02-12", audience: "All Staff", trainer: "External Vendor" },
      { program: "New CRM Features", date: "2024-02-19", audience: "Sales Team", trainer: "Internal IT" },
      { program: "IT Security Audit", date: "2024-02-26", audience: "IT Department", trainer: "Compliance Team" }
    ],
    procurement: [
      { item: "Network Security Appliances", timeline: "Q1 2024", budget: "$150,000", status: "RFP Stage" },
      { item: "Employee Laptops Refresh", timeline: "Q2 2024", budget: "$200,000", status: "Planning" }
    ]
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "infrastructure": return "bg-blue-500";
      case "application": return "bg-green-500";
      case "security": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "rfp stage": return "bg-orange-500";
      case "planning": return "bg-blue-500";
      case "approved": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          📅 Upcoming Plans & Roadmap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Planned Upgrades */}
        <div>
          <h4 className="font-semibold mb-3">Next Month's Planned Upgrades & Rollouts</h4>
          <div className="space-y-3">
            {roadmapData.upgrades.map((upgrade, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{upgrade.name}</div>
                  <div className="text-sm text-muted-foreground">Impact: {upgrade.impact}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{upgrade.date}</div>
                  <Badge className={`${getTypeColor(upgrade.type)} text-white`}>
                    {upgrade.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Maintenance */}
        <div>
          <h4 className="font-semibold mb-3">Scheduled Maintenance/Downtime Notifications</h4>
          <div className="space-y-3">
            {roadmapData.maintenance.map((maintenance, index) => (
              <div key={index} className="p-3 border rounded-lg bg-yellow-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    {maintenance.system}
                  </div>
                  <Badge variant="outline">{maintenance.duration}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Date:</strong> {maintenance.date} | <strong>Window:</strong> {maintenance.window}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training & Reviews */}
        <div>
          <h4 className="font-semibold mb-3">Planned Training, Audits & Reviews</h4>
          <div className="space-y-3">
            {roadmapData.training.map((training, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {training.program}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Audience: {training.audience} | Trainer: {training.trainer}
                  </div>
                </div>
                <div className="text-sm font-medium">{training.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Procurement Timeline */}
        <div>
          <h4 className="font-semibold mb-3">Upcoming Procurement Timelines</h4>
          <div className="space-y-3">
            {roadmapData.procurement.map((procurement, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    {procurement.item}
                  </div>
                  <Badge className={`${getStatusColor(procurement.status)} text-white`}>
                    {procurement.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div><strong>Timeline:</strong> {procurement.timeline}</div>
                  <div><strong>Budget:</strong> {procurement.budget}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};