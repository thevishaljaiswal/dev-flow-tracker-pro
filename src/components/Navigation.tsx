
import { Button } from "@/components/ui/button";
import { Home, FolderCheck, Plus, ArrowLeft } from "lucide-react";

interface NavigationProps {
  activeView: string;
  onViewChange: (view: "dashboard" | "requests" | "new-request") => void;
  onBack?: () => void;
}

export const Navigation = ({ activeView, onViewChange, onBack }: NavigationProps) => {
  if (activeView === "request-details") {
    return (
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Requests
            </Button>
            <div className="text-sm text-slate-500">Request Details</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-blue-600">IT Dev Tracker</div>
            <div className="flex space-x-1">
              <Button
                variant={activeView === "dashboard" ? "default" : "ghost"}
                onClick={() => onViewChange("dashboard")}
                className={activeView === "dashboard" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-600 hover:text-slate-800"}
              >
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeView === "requests" ? "default" : "ghost"}
                onClick={() => onViewChange("requests")}
                className={activeView === "requests" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-600 hover:text-slate-800"}
              >
                <FolderCheck className="w-4 h-4 mr-2" />
                Requests
              </Button>
              <Button
                variant={activeView === "new-request" ? "default" : "ghost"}
                onClick={() => onViewChange("new-request")}
                className={activeView === "new-request" ? "bg-blue-600 hover:bg-blue-700" : "text-slate-600 hover:text-slate-800"}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
