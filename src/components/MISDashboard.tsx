import { BarChart3 } from "lucide-react";
import { MISDataProvider, MISMonthSelector, MISDataEditor } from "./mis/MISDataManager";
import { ITOperationsSummary } from "./mis/ITOperationsSummary";
import { CybersecurityRiskManagement } from "./mis/CybersecurityRiskManagement";
import { ProjectsEnhancementsUpdate } from "./mis/ProjectsEnhancementsUpdate";
import { SystemUsageAdoption } from "./mis/SystemUsageAdoption";
import { AutomationInnovation } from "./mis/AutomationInnovation";
import { ITBudgetActual } from "./mis/ITBudgetActual";
import { RisksIssuesDependencies } from "./mis/RisksIssuesDependencies";
import { UpcomingPlansRoadmap } from "./mis/UpcomingPlansRoadmap";

interface MISDashboardProps {
  requests?: any[];
  onNavigateToRequests?: () => void;
}

export const MISDashboard = ({ requests = [], onNavigateToRequests }: MISDashboardProps) => {
  return (
    <MISDataProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-800">MIS Dashboard</h2>
          </div>
        </div>

        {/* Month Selector and Data Editor */}
        <div className="flex items-center justify-between">
          <MISMonthSelector />
          <MISDataEditor />
        </div>

        {/* IT Operations Summary */}
        <ITOperationsSummary />

        {/* Cybersecurity & Risk Management */}
        <CybersecurityRiskManagement />

        {/* Projects & Enhancements Update */}
        <ProjectsEnhancementsUpdate />

        {/* System Usage & Adoption */}
        <SystemUsageAdoption />

        {/* Automation & Innovation */}
        <AutomationInnovation />

        {/* IT Budget vs Actual */}
        <ITBudgetActual />

        {/* Risks, Issues & Dependencies */}
        <RisksIssuesDependencies />

        {/* Upcoming Plans & Roadmap */}
        <UpcomingPlansRoadmap />
      </div>
    </MISDataProvider>
  );
};
