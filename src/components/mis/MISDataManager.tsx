import { useState, createContext, useContext, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define comprehensive MIS data structure
export interface MISData {
  // IT Operations Summary
  itOperations: {
    applications: Record<string, { uptime: number; status: string }>;
    infrastructure: Record<string, { uptime: number; status: string }>;
    tickets: {
      total: number;
      resolved: number;
      pending: number;
      slaAdherence: number;
    };
    recurringIssues: Array<{ issue: string; rootCause: string; action: string }>;
  };

  // Cybersecurity & Risk Management
  cybersecurity: {
    incidents: { total: number; resolved: number; pending: number };
    systems: Record<string, { status: string; lastUpdate: string }>;
    patches: Record<string, { completion: number; pending: number }>;
    backups: { success: number; failure: number; successRate: number };
    userAccessReviews: Array<{ department: string; lastReview: string; findings: string }>;
  };

  // Projects & Enhancements
  projects: {
    ongoing: Array<{ id: string; name: string; status: string; progress: number; department: string; budget: number; timeline: string }>;
    newInitiatives: Array<{ name: string; kickoff: string; department: string; budget: number }>;
    delays: Array<{ project: string; reason: string; mitigation: string; impact: string }>;
    completed: Array<{ name: string; impact: string; completionDate: string; budget: number }>;
  };

  // System Usage & Adoption
  systemUsage: {
    applications: Record<string, { activeUsers: number; totalUsers: number; usage: number }>;
    licenses: Record<string, { used: number; available: number; utilization: number; cost: number }>;
    training: { conducted: number; planned: number; attendees: number; feedback: number };
    feedback: Array<{ system: string; issue: string; status: string; priority: string }>;
  };

  // Automation & Innovation
  automation: {
    initiatives: Array<{ name: string; type: string; status: string; timeSaved: string; costSaved: number }>;
    savings: { totalTimeSaved: number; costSaved: number; processes: number };
    aiMl: Array<{ name: string; status: string; impact: string; roi: string }>;
    suggestions: Array<{ idea: string; priority: string; estimatedSavings: string; feasibility: string }>;
  };

  // IT Budget vs Actual
  budget: {
    monthly: {
      opex: { budget: number; actual: number; variance: number };
      capex: { budget: number; actual: number; variance: number };
    };
    majorPurchases: Array<{ item: string; amount: number; date: string; status: string; vendor: string }>;
    forecast: {
      nextMonth: number;
      nextQuarter: number;
      riskFactors: string[];
    };
  };

  // Risks, Issues & Dependencies
  risks: {
    majorRisks: Array<{ risk: string; severity: string; mitigation: string; owner: string; dueDate: string }>;
    dependencies: Array<{ item: string; dependsOn: string; status: string; eta: string; impact: string }>;
    compliance: Array<{ area: string; status: string; lastAudit: string; nextReview: string; findings: string }>;
  };

  // Upcoming Plans & Roadmap
  roadmap: {
    upgrades: Array<{ name: string; date: string; impact: string; type: string; responsible: string }>;
    maintenance: Array<{ system: string; date: string; duration: string; window: string; impact: string }>;
    training: Array<{ program: string; date: string; audience: string; trainer: string; budget: number }>;
    procurement: Array<{ item: string; timeline: string; budget: string; status: string; priority: string }>;
  };
}

// Default data structure
const getDefaultMISData = (): MISData => ({
  itOperations: {
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
    tickets: { total: 45, resolved: 38, pending: 7, slaAdherence: 92 },
    recurringIssues: []
  },
  cybersecurity: {
    incidents: { total: 2, resolved: 2, pending: 0 },
    systems: {
      antivirus: { status: "up-to-date", lastUpdate: "2024-01-20" },
      firewall: { status: "active", lastUpdate: "2024-01-18" },
      intrusion: { status: "active", lastUpdate: "2024-01-19" }
    },
    patches: {
      os: { completion: 95, pending: 3 },
      apps: { completion: 88, pending: 12 },
      firmware: { completion: 92, pending: 5 }
    },
    backups: { success: 28, failure: 2, successRate: 93 },
    userAccessReviews: []
  },
  projects: {
    ongoing: [],
    newInitiatives: [],
    delays: [],
    completed: []
  },
  systemUsage: {
    applications: {
      erp: { activeUsers: 450, totalUsers: 500, usage: 90 },
      crm: { activeUsers: 280, totalUsers: 320, usage: 87.5 },
      portal: { activeUsers: 180, totalUsers: 250, usage: 72 }
    },
    licenses: {
      office365: { used: 480, available: 500, utilization: 96, cost: 15000 },
      adobe: { used: 25, available: 30, utilization: 83, cost: 2500 },
      project: { used: 15, available: 20, utilization: 75, cost: 1200 }
    },
    training: { conducted: 8, planned: 12, attendees: 145, feedback: 4.2 },
    feedback: []
  },
  automation: {
    initiatives: [],
    savings: { totalTimeSaved: 320, costSaved: 24000, processes: 12 },
    aiMl: [],
    suggestions: []
  },
  budget: {
    monthly: {
      opex: { budget: 150000, actual: 142000, variance: -8000 },
      capex: { budget: 200000, actual: 185000, variance: -15000 }
    },
    majorPurchases: [],
    forecast: {
      nextMonth: 320000,
      nextQuarter: 980000,
      riskFactors: []
    }
  },
  risks: {
    majorRisks: [],
    dependencies: [],
    compliance: []
  },
  roadmap: {
    upgrades: [],
    maintenance: [],
    training: [],
    procurement: []
  }
});

// Context for MIS data management
interface MISDataContextType {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  misData: Record<string, MISData>;
  updateMISData: (month: string, data: Partial<MISData>) => void;
  getCurrentData: () => MISData;
}

const MISDataContext = createContext<MISDataContextType | undefined>(undefined);

export const useMISData = () => {
  const context = useContext(MISDataContext);
  if (!context) {
    throw new Error("useMISData must be used within MISDataProvider");
  }
  return context;
};

// Generate month options for the current year and next year
const generateMonthOptions = () => {
  const months = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  for (let year = currentYear - 1; year <= currentYear + 1; year++) {
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1);
      const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      months.push({ key: monthKey, label: monthLabel });
    }
  }
  
  return months;
};

export const MISDataProvider = ({ children }: { children: ReactNode }) => {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [misData, setMisData] = useState<Record<string, MISData>>({
    [currentMonth]: getDefaultMISData()
  });

  const updateMISData = (month: string, data: Partial<MISData>) => {
    setMisData(prev => ({
      ...prev,
      [month]: {
        ...prev[month] || getDefaultMISData(),
        ...data
      }
    }));
  };

  const getCurrentData = (): MISData => {
    return misData[selectedMonth] || getDefaultMISData();
  };

  return (
    <MISDataContext.Provider value={{
      selectedMonth,
      setSelectedMonth,
      misData,
      updateMISData,
      getCurrentData
    }}>
      {children}
    </MISDataContext.Provider>
  );
};

export const MISMonthSelector = () => {
  const { selectedMonth, setSelectedMonth } = useMISData();
  const monthOptions = generateMonthOptions();

  return (
    <div className="flex items-center gap-4 mb-6">
      <Label htmlFor="month-select" className="text-sm font-medium">
        Select Month:
      </Label>
      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {monthOptions.map(month => (
            <SelectItem key={month.key} value={month.key}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const MISDataEditor = () => {
  const { selectedMonth, getCurrentData, updateMISData } = useMISData();
  const { toast } = useToast();
  const [editData, setEditData] = useState<MISData>(getCurrentData());

  const handleSave = () => {
    updateMISData(selectedMonth, editData);
    toast({
      title: "Data Updated",
      description: `MIS data for ${new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} has been saved.`,
    });
  };

  const addArrayItem = (section: keyof MISData, arrayKey: string, newItem: any) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: [...(prev[section] as any)[arrayKey], newItem]
      }
    }));
  };

  const removeArrayItem = (section: keyof MISData, arrayKey: string, index: number) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [arrayKey]: (prev[section] as any)[arrayKey].filter((_: any, i: number) => i !== index)
      }
    }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-4">
          <Edit className="w-4 h-4 mr-2" />
          Edit MIS Data
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit MIS Data - {new Date(selectedMonth + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="operations" className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-4">
            <div className="space-y-6">
              <h4 className="font-semibold">Application Uptime</h4>
              {Object.entries(editData.itOperations.applications).map(([app, data]) => (
                <div key={app} className="grid grid-cols-3 gap-4">
                  <Label className="capitalize">{app}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Uptime %"
                    value={data.uptime}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        applications: {
                          ...prev.itOperations.applications,
                          [app]: { ...data, uptime: parseFloat(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Select
                    value={data.status}
                    onValueChange={(value) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        applications: {
                          ...prev.itOperations.applications,
                          [app]: { ...data, status: value }
                        }
                      }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="down">Down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <h4 className="font-semibold">Infrastructure Uptime</h4>
              {Object.entries(editData.itOperations.infrastructure).map(([infra, data]) => (
                <div key={infra} className="grid grid-cols-3 gap-4">
                  <Label className="capitalize">{infra}</Label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Uptime %"
                    value={data.uptime}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        infrastructure: {
                          ...prev.itOperations.infrastructure,
                          [infra]: { ...data, uptime: parseFloat(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Select
                    value={data.status}
                    onValueChange={(value) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        infrastructure: {
                          ...prev.itOperations.infrastructure,
                          [infra]: { ...data, status: value }
                        }
                      }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operational">Operational</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="down">Down</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}

              <h4 className="font-semibold">Ticket Metrics</h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Total Tickets</Label>
                  <Input
                    type="number"
                    value={editData.itOperations.tickets.total}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        tickets: {
                          ...prev.itOperations.tickets,
                          total: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Resolved Tickets</Label>
                  <Input
                    type="number"
                    value={editData.itOperations.tickets.resolved}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        tickets: {
                          ...prev.itOperations.tickets,
                          resolved: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Pending Tickets</Label>
                  <Input
                    type="number"
                    value={editData.itOperations.tickets.pending}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        tickets: {
                          ...prev.itOperations.tickets,
                          pending: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>SLA Adherence %</Label>
                  <Input
                    type="number"
                    value={editData.itOperations.tickets.slaAdherence}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      itOperations: {
                        ...prev.itOperations,
                        tickets: {
                          ...prev.itOperations.tickets,
                          slaAdherence: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Recurring Issues</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('itOperations', 'recurringIssues', {
                      issue: '',
                      rootCause: '',
                      action: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Issue
                  </Button>
                </div>
                
                {editData.itOperations.recurringIssues.map((issue, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Issue Description"
                        value={issue.issue}
                        onChange={(e) => {
                          const newIssues = [...editData.itOperations.recurringIssues];
                          newIssues[index] = { ...issue, issue: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            itOperations: { ...prev.itOperations, recurringIssues: newIssues }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('itOperations', 'recurringIssues', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Root Cause"
                        value={issue.rootCause}
                        onChange={(e) => {
                          const newIssues = [...editData.itOperations.recurringIssues];
                          newIssues[index] = { ...issue, rootCause: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            itOperations: { ...prev.itOperations, recurringIssues: newIssues }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Action Taken"
                        value={issue.action}
                        onChange={(e) => {
                          const newIssues = [...editData.itOperations.recurringIssues];
                          newIssues[index] = { ...issue, action: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            itOperations: { ...prev.itOperations, recurringIssues: newIssues }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="space-y-6">
              <h4 className="font-semibold">Security Incidents</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Total Incidents</Label>
                  <Input
                    type="number"
                    value={editData.cybersecurity.incidents.total}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        incidents: {
                          ...prev.cybersecurity.incidents,
                          total: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Resolved</Label>
                  <Input
                    type="number"
                    value={editData.cybersecurity.incidents.resolved}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        incidents: {
                          ...prev.cybersecurity.incidents,
                          resolved: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Pending</Label>
                  <Input
                    type="number"
                    value={editData.cybersecurity.incidents.pending}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        incidents: {
                          ...prev.cybersecurity.incidents,
                          pending: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
              </div>

              <h4 className="font-semibold">System Status</h4>
              {Object.entries(editData.cybersecurity.systems).map(([system, data]) => (
                <div key={system} className="grid grid-cols-3 gap-4">
                  <Label className="capitalize">{system}</Label>
                  <Select
                    value={data.status}
                    onValueChange={(value) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        systems: {
                          ...prev.cybersecurity.systems,
                          [system]: { ...data, status: value }
                        }
                      }
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="up-to-date">Up to Date</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="needs-update">Needs Update</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="date"
                    value={data.lastUpdate}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        systems: {
                          ...prev.cybersecurity.systems,
                          [system]: { ...data, lastUpdate: e.target.value }
                        }
                      }
                    }))}
                  />
                </div>
              ))}

              <h4 className="font-semibold">Patch Management</h4>
              {Object.entries(editData.cybersecurity.patches).map(([patch, data]) => (
                <div key={patch} className="grid grid-cols-3 gap-4">
                  <Label className="capitalize">{patch}</Label>
                  <Input
                    type="number"
                    placeholder="Completion %"
                    value={data.completion}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        patches: {
                          ...prev.cybersecurity.patches,
                          [patch]: { ...data, completion: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Pending Count"
                    value={data.pending}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        patches: {
                          ...prev.cybersecurity.patches,
                          [patch]: { ...data, pending: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                </div>
              ))}

              <h4 className="font-semibold">Backup Status</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Successful Backups</Label>
                  <Input
                    type="number"
                    value={editData.cybersecurity.backups.success}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        backups: {
                          ...prev.cybersecurity.backups,
                          success: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Failed Backups</Label>
                  <Input
                    type="number"
                    value={editData.cybersecurity.backups.failure}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        backups: {
                          ...prev.cybersecurity.backups,
                          failure: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Success Rate %</Label>
                  <Input
                    type="number"
                    value={editData.cybersecurity.backups.successRate}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      cybersecurity: {
                        ...prev.cybersecurity,
                        backups: {
                          ...prev.cybersecurity.backups,
                          successRate: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">User Access Reviews</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('cybersecurity', 'userAccessReviews', {
                      department: '',
                      lastReview: '',
                      findings: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Review
                  </Button>
                </div>
                
                {editData.cybersecurity.userAccessReviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Department"
                        value={review.department}
                        onChange={(e) => {
                          const newReviews = [...editData.cybersecurity.userAccessReviews];
                          newReviews[index] = { ...review, department: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            cybersecurity: { ...prev.cybersecurity, userAccessReviews: newReviews }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('cybersecurity', 'userAccessReviews', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        placeholder="Last Review Date"
                        value={review.lastReview}
                        onChange={(e) => {
                          const newReviews = [...editData.cybersecurity.userAccessReviews];
                          newReviews[index] = { ...review, lastReview: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            cybersecurity: { ...prev.cybersecurity, userAccessReviews: newReviews }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Findings"
                        value={review.findings}
                        onChange={(e) => {
                          const newReviews = [...editData.cybersecurity.userAccessReviews];
                          newReviews[index] = { ...review, findings: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            cybersecurity: { ...prev.cybersecurity, userAccessReviews: newReviews }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            {/* Projects editing form */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Ongoing Projects</h4>
                <Button
                  size="sm"
                  onClick={() => addArrayItem('projects', 'ongoing', {
                    id: `P${String(editData.projects.ongoing.length + 1).padStart(3, '0')}`,
                    name: '',
                    status: 'green',
                    progress: 0,
                    department: '',
                    budget: 0,
                    timeline: ''
                  })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Project
                </Button>
              </div>
              
              {editData.projects.ongoing.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Input
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) => {
                        const newProjects = [...editData.projects.ongoing];
                        newProjects[index] = { ...project, name: e.target.value };
                        setEditData(prev => ({
                          ...prev,
                          projects: { ...prev.projects, ongoing: newProjects }
                        }));
                      }}
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeArrayItem('projects', 'ongoing', index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      placeholder="Department"
                      value={project.department}
                      onChange={(e) => {
                        const newProjects = [...editData.projects.ongoing];
                        newProjects[index] = { ...project, department: e.target.value };
                        setEditData(prev => ({
                          ...prev,
                          projects: { ...prev.projects, ongoing: newProjects }
                        }));
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Progress %"
                      value={project.progress}
                      onChange={(e) => {
                        const newProjects = [...editData.projects.ongoing];
                        newProjects[index] = { ...project, progress: parseInt(e.target.value) || 0 };
                        setEditData(prev => ({
                          ...prev,
                          projects: { ...prev.projects, ongoing: newProjects }
                        }));
                      }}
                    />
                    <Select
                      value={project.status}
                      onValueChange={(value) => {
                        const newProjects = [...editData.projects.ongoing];
                        newProjects[index] = { ...project, status: value };
                        setEditData(prev => ({
                          ...prev,
                          projects: { ...prev.projects, ongoing: newProjects }
                        }));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="amber">Amber</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <div className="space-y-6">
              <h4 className="font-semibold">Application Usage</h4>
              {Object.entries(editData.systemUsage.applications).map(([app, data]) => (
                <div key={app} className="grid grid-cols-4 gap-4">
                  <Label className="capitalize">{app}</Label>
                  <Input
                    type="number"
                    placeholder="Active Users"
                    value={data.activeUsers}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        applications: {
                          ...prev.systemUsage.applications,
                          [app]: { ...data, activeUsers: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Total Users"
                    value={data.totalUsers}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        applications: {
                          ...prev.systemUsage.applications,
                          [app]: { ...data, totalUsers: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Usage %"
                    value={data.usage}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        applications: {
                          ...prev.systemUsage.applications,
                          [app]: { ...data, usage: parseFloat(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                </div>
              ))}

              <h4 className="font-semibold">License Management</h4>
              {Object.entries(editData.systemUsage.licenses).map(([license, data]) => (
                <div key={license} className="grid grid-cols-5 gap-4">
                  <Label className="capitalize">{license}</Label>
                  <Input
                    type="number"
                    placeholder="Used"
                    value={data.used}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        licenses: {
                          ...prev.systemUsage.licenses,
                          [license]: { ...data, used: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Available"
                    value={data.available}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        licenses: {
                          ...prev.systemUsage.licenses,
                          [license]: { ...data, available: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Utilization %"
                    value={data.utilization}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        licenses: {
                          ...prev.systemUsage.licenses,
                          [license]: { ...data, utilization: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                  <Input
                    type="number"
                    placeholder="Cost"
                    value={data.cost}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        licenses: {
                          ...prev.systemUsage.licenses,
                          [license]: { ...data, cost: parseInt(e.target.value) || 0 }
                        }
                      }
                    }))}
                  />
                </div>
              ))}

              <h4 className="font-semibold">Training Metrics</h4>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label>Conducted</Label>
                  <Input
                    type="number"
                    value={editData.systemUsage.training.conducted}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        training: {
                          ...prev.systemUsage.training,
                          conducted: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Planned</Label>
                  <Input
                    type="number"
                    value={editData.systemUsage.training.planned}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        training: {
                          ...prev.systemUsage.training,
                          planned: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Attendees</Label>
                  <Input
                    type="number"
                    value={editData.systemUsage.training.attendees}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        training: {
                          ...prev.systemUsage.training,
                          attendees: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Feedback Score</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={editData.systemUsage.training.feedback}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      systemUsage: {
                        ...prev.systemUsage,
                        training: {
                          ...prev.systemUsage.training,
                          feedback: parseFloat(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">User Feedback & Issues</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('systemUsage', 'feedback', {
                      system: '',
                      issue: '',
                      status: 'open',
                      priority: 'medium'
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Feedback
                  </Button>
                </div>
                
                {editData.systemUsage.feedback.map((feedback, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="System Name"
                        value={feedback.system}
                        onChange={(e) => {
                          const newFeedback = [...editData.systemUsage.feedback];
                          newFeedback[index] = { ...feedback, system: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            systemUsage: { ...prev.systemUsage, feedback: newFeedback }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('systemUsage', 'feedback', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        placeholder="Issue Description"
                        value={feedback.issue}
                        onChange={(e) => {
                          const newFeedback = [...editData.systemUsage.feedback];
                          newFeedback[index] = { ...feedback, issue: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            systemUsage: { ...prev.systemUsage, feedback: newFeedback }
                          }));
                        }}
                      />
                      <Select
                        value={feedback.status}
                        onValueChange={(value) => {
                          const newFeedback = [...editData.systemUsage.feedback];
                          newFeedback[index] = { ...feedback, status: value };
                          setEditData(prev => ({
                            ...prev,
                            systemUsage: { ...prev.systemUsage, feedback: newFeedback }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={feedback.priority}
                        onValueChange={(value) => {
                          const newFeedback = [...editData.systemUsage.feedback];
                          newFeedback[index] = { ...feedback, priority: value };
                          setEditData(prev => ({
                            ...prev,
                            systemUsage: { ...prev.systemUsage, feedback: newFeedback }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Automation Initiatives</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('automation', 'initiatives', {
                      name: '',
                      type: 'workflow',
                      status: 'planned',
                      timeSaved: '',
                      costSaved: 0
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Initiative
                  </Button>
                </div>
                
                {editData.automation.initiatives.map((initiative, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Initiative Name"
                        value={initiative.name}
                        onChange={(e) => {
                          const newInitiatives = [...editData.automation.initiatives];
                          newInitiatives[index] = { ...initiative, name: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, initiatives: newInitiatives }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('automation', 'initiatives', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <Select
                        value={initiative.type}
                        onValueChange={(value) => {
                          const newInitiatives = [...editData.automation.initiatives];
                          newInitiatives[index] = { ...initiative, type: value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, initiatives: newInitiatives }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="workflow">Workflow</SelectItem>
                          <SelectItem value="rpa">RPA</SelectItem>
                          <SelectItem value="portal">Self-Service Portal</SelectItem>
                          <SelectItem value="integration">Integration</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={initiative.status}
                        onValueChange={(value) => {
                          const newInitiatives = [...editData.automation.initiatives];
                          newInitiatives[index] = { ...initiative, status: value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, initiatives: newInitiatives }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Time Saved"
                        value={initiative.timeSaved}
                        onChange={(e) => {
                          const newInitiatives = [...editData.automation.initiatives];
                          newInitiatives[index] = { ...initiative, timeSaved: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, initiatives: newInitiatives }
                          }));
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Cost Saved"
                        value={initiative.costSaved}
                        onChange={(e) => {
                          const newInitiatives = [...editData.automation.initiatives];
                          newInitiatives[index] = { ...initiative, costSaved: parseInt(e.target.value) || 0 };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, initiatives: newInitiatives }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold">Overall Savings</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Total Time Saved (hrs)</Label>
                  <Input
                    type="number"
                    value={editData.automation.savings.totalTimeSaved}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      automation: {
                        ...prev.automation,
                        savings: {
                          ...prev.automation.savings,
                          totalTimeSaved: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Cost Saved</Label>
                  <Input
                    type="number"
                    value={editData.automation.savings.costSaved}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      automation: {
                        ...prev.automation,
                        savings: {
                          ...prev.automation.savings,
                          costSaved: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Processes Automated</Label>
                  <Input
                    type="number"
                    value={editData.automation.savings.processes}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      automation: {
                        ...prev.automation,
                        savings: {
                          ...prev.automation.savings,
                          processes: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">AI/ML Projects</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('automation', 'aiMl', {
                      name: '',
                      status: 'planned',
                      impact: '',
                      roi: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add AI/ML Project
                  </Button>
                </div>
                
                {editData.automation.aiMl.map((project, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) => {
                          const newProjects = [...editData.automation.aiMl];
                          newProjects[index] = { ...project, name: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, aiMl: newProjects }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('automation', 'aiMl', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        value={project.status}
                        onValueChange={(value) => {
                          const newProjects = [...editData.automation.aiMl];
                          newProjects[index] = { ...project, status: value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, aiMl: newProjects }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="research">Research</SelectItem>
                          <SelectItem value="development">Development</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                          <SelectItem value="deployed">Deployed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Impact"
                        value={project.impact}
                        onChange={(e) => {
                          const newProjects = [...editData.automation.aiMl];
                          newProjects[index] = { ...project, impact: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, aiMl: newProjects }
                          }));
                        }}
                      />
                      <Input
                        placeholder="ROI"
                        value={project.roi}
                        onChange={(e) => {
                          const newProjects = [...editData.automation.aiMl];
                          newProjects[index] = { ...project, roi: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, aiMl: newProjects }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Improvement Suggestions</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('automation', 'suggestions', {
                      idea: '',
                      priority: 'medium',
                      estimatedSavings: '',
                      feasibility: 'medium'
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Suggestion
                  </Button>
                </div>
                
                {editData.automation.suggestions.map((suggestion, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Improvement Idea"
                        value={suggestion.idea}
                        onChange={(e) => {
                          const newSuggestions = [...editData.automation.suggestions];
                          newSuggestions[index] = { ...suggestion, idea: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, suggestions: newSuggestions }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('automation', 'suggestions', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Select
                        value={suggestion.priority}
                        onValueChange={(value) => {
                          const newSuggestions = [...editData.automation.suggestions];
                          newSuggestions[index] = { ...suggestion, priority: value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, suggestions: newSuggestions }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Estimated Savings"
                        value={suggestion.estimatedSavings}
                        onChange={(e) => {
                          const newSuggestions = [...editData.automation.suggestions];
                          newSuggestions[index] = { ...suggestion, estimatedSavings: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, suggestions: newSuggestions }
                          }));
                        }}
                      />
                      <Select
                        value={suggestion.feasibility}
                        onValueChange={(value) => {
                          const newSuggestions = [...editData.automation.suggestions];
                          newSuggestions[index] = { ...suggestion, feasibility: value };
                          setEditData(prev => ({
                            ...prev,
                            automation: { ...prev.automation, suggestions: newSuggestions }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <div className="space-y-6">
              <h4 className="font-semibold">Monthly Budget</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h5 className="font-medium">OPEX</h5>
                  <div className="space-y-2">
                    <div>
                      <Label>Budget</Label>
                      <Input
                        type="number"
                        value={editData.budget.monthly.opex.budget}
                        onChange={(e) => setEditData(prev => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            monthly: {
                              ...prev.budget.monthly,
                              opex: {
                                ...prev.budget.monthly.opex,
                                budget: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Actual</Label>
                      <Input
                        type="number"
                        value={editData.budget.monthly.opex.actual}
                        onChange={(e) => setEditData(prev => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            monthly: {
                              ...prev.budget.monthly,
                              opex: {
                                ...prev.budget.monthly.opex,
                                actual: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium">CAPEX</h5>
                  <div className="space-y-2">
                    <div>
                      <Label>Budget</Label>
                      <Input
                        type="number"
                        value={editData.budget.monthly.capex.budget}
                        onChange={(e) => setEditData(prev => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            monthly: {
                              ...prev.budget.monthly,
                              capex: {
                                ...prev.budget.monthly.capex,
                                budget: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>Actual</Label>
                      <Input
                        type="number"
                        value={editData.budget.monthly.capex.actual}
                        onChange={(e) => setEditData(prev => ({
                          ...prev,
                          budget: {
                            ...prev.budget,
                            monthly: {
                              ...prev.budget.monthly,
                              capex: {
                                ...prev.budget.monthly.capex,
                                actual: parseInt(e.target.value) || 0
                              }
                            }
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Major Purchases</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('budget', 'majorPurchases', {
                      item: '',
                      amount: 0,
                      date: '',
                      status: 'planned',
                      vendor: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Purchase
                  </Button>
                </div>
                
                {editData.budget.majorPurchases.map((purchase, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Item Description"
                        value={purchase.item}
                        onChange={(e) => {
                          const newPurchases = [...editData.budget.majorPurchases];
                          newPurchases[index] = { ...purchase, item: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, majorPurchases: newPurchases }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('budget', 'majorPurchases', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={purchase.amount}
                        onChange={(e) => {
                          const newPurchases = [...editData.budget.majorPurchases];
                          newPurchases[index] = { ...purchase, amount: parseInt(e.target.value) || 0 };
                          setEditData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, majorPurchases: newPurchases }
                          }));
                        }}
                      />
                      <Input
                        type="date"
                        placeholder="Date"
                        value={purchase.date}
                        onChange={(e) => {
                          const newPurchases = [...editData.budget.majorPurchases];
                          newPurchases[index] = { ...purchase, date: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, majorPurchases: newPurchases }
                          }));
                        }}
                      />
                      <Select
                        value={purchase.status}
                        onValueChange={(value) => {
                          const newPurchases = [...editData.budget.majorPurchases];
                          newPurchases[index] = { ...purchase, status: value };
                          setEditData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, majorPurchases: newPurchases }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="ordered">Ordered</SelectItem>
                          <SelectItem value="received">Received</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Vendor"
                        value={purchase.vendor}
                        onChange={(e) => {
                          const newPurchases = [...editData.budget.majorPurchases];
                          newPurchases[index] = { ...purchase, vendor: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            budget: { ...prev.budget, majorPurchases: newPurchases }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="font-semibold">Forecast</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Next Month Forecast</Label>
                  <Input
                    type="number"
                    value={editData.budget.forecast.nextMonth}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      budget: {
                        ...prev.budget,
                        forecast: {
                          ...prev.budget.forecast,
                          nextMonth: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
                <div>
                  <Label>Next Quarter Forecast</Label>
                  <Input
                    type="number"
                    value={editData.budget.forecast.nextQuarter}
                    onChange={(e) => setEditData(prev => ({
                      ...prev,
                      budget: {
                        ...prev.budget,
                        forecast: {
                          ...prev.budget.forecast,
                          nextQuarter: parseInt(e.target.value) || 0
                        }
                      }
                    }))}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risks" className="space-y-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Major Risks</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('risks', 'majorRisks', {
                      risk: '',
                      severity: 'medium',
                      mitigation: '',
                      owner: '',
                      dueDate: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Risk
                  </Button>
                </div>
                
                {editData.risks.majorRisks.map((risk, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Risk Description"
                        value={risk.risk}
                        onChange={(e) => {
                          const newRisks = [...editData.risks.majorRisks];
                          newRisks[index] = { ...risk, risk: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, majorRisks: newRisks }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('risks', 'majorRisks', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Select
                        value={risk.severity}
                        onValueChange={(value) => {
                          const newRisks = [...editData.risks.majorRisks];
                          newRisks[index] = { ...risk, severity: value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, majorRisks: newRisks }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Mitigation Plan"
                        value={risk.mitigation}
                        onChange={(e) => {
                          const newRisks = [...editData.risks.majorRisks];
                          newRisks[index] = { ...risk, mitigation: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, majorRisks: newRisks }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Owner"
                        value={risk.owner}
                        onChange={(e) => {
                          const newRisks = [...editData.risks.majorRisks];
                          newRisks[index] = { ...risk, owner: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, majorRisks: newRisks }
                          }));
                        }}
                      />
                      <Input
                        type="date"
                        placeholder="Due Date"
                        value={risk.dueDate}
                        onChange={(e) => {
                          const newRisks = [...editData.risks.majorRisks];
                          newRisks[index] = { ...risk, dueDate: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, majorRisks: newRisks }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Dependencies</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('risks', 'dependencies', {
                      item: '',
                      dependsOn: '',
                      status: 'pending',
                      eta: '',
                      impact: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Dependency
                  </Button>
                </div>
                
                {editData.risks.dependencies.map((dependency, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Dependency Item"
                        value={dependency.item}
                        onChange={(e) => {
                          const newDependencies = [...editData.risks.dependencies];
                          newDependencies[index] = { ...dependency, item: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, dependencies: newDependencies }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('risks', 'dependencies', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        placeholder="Depends On"
                        value={dependency.dependsOn}
                        onChange={(e) => {
                          const newDependencies = [...editData.risks.dependencies];
                          newDependencies[index] = { ...dependency, dependsOn: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, dependencies: newDependencies }
                          }));
                        }}
                      />
                      <Select
                        value={dependency.status}
                        onValueChange={(value) => {
                          const newDependencies = [...editData.risks.dependencies];
                          newDependencies[index] = { ...dependency, status: value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, dependencies: newDependencies }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="blocked">Blocked</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="date"
                        placeholder="ETA"
                        value={dependency.eta}
                        onChange={(e) => {
                          const newDependencies = [...editData.risks.dependencies];
                          newDependencies[index] = { ...dependency, eta: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, dependencies: newDependencies }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Impact"
                        value={dependency.impact}
                        onChange={(e) => {
                          const newDependencies = [...editData.risks.dependencies];
                          newDependencies[index] = { ...dependency, impact: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, dependencies: newDependencies }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Compliance</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('risks', 'compliance', {
                      area: '',
                      status: 'compliant',
                      lastAudit: '',
                      nextReview: '',
                      findings: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Compliance Item
                  </Button>
                </div>
                
                {editData.risks.compliance.map((compliance, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Compliance Area"
                        value={compliance.area}
                        onChange={(e) => {
                          const newCompliance = [...editData.risks.compliance];
                          newCompliance[index] = { ...compliance, area: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, compliance: newCompliance }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('risks', 'compliance', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Select
                        value={compliance.status}
                        onValueChange={(value) => {
                          const newCompliance = [...editData.risks.compliance];
                          newCompliance[index] = { ...compliance, status: value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, compliance: newCompliance }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="partial">Partial</SelectItem>
                          <SelectItem value="pending-review">Pending Review</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="date"
                        placeholder="Last Audit"
                        value={compliance.lastAudit}
                        onChange={(e) => {
                          const newCompliance = [...editData.risks.compliance];
                          newCompliance[index] = { ...compliance, lastAudit: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, compliance: newCompliance }
                          }));
                        }}
                      />
                      <Input
                        type="date"
                        placeholder="Next Review"
                        value={compliance.nextReview}
                        onChange={(e) => {
                          const newCompliance = [...editData.risks.compliance];
                          newCompliance[index] = { ...compliance, nextReview: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, compliance: newCompliance }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Findings"
                        value={compliance.findings}
                        onChange={(e) => {
                          const newCompliance = [...editData.risks.compliance];
                          newCompliance[index] = { ...compliance, findings: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            risks: { ...prev.risks, compliance: newCompliance }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Planned Upgrades</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('roadmap', 'upgrades', {
                      name: '',
                      date: '',
                      impact: '',
                      type: 'software',
                      responsible: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Upgrade
                  </Button>
                </div>
                
                {editData.roadmap.upgrades.map((upgrade, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Upgrade Name"
                        value={upgrade.name}
                        onChange={(e) => {
                          const newUpgrades = [...editData.roadmap.upgrades];
                          newUpgrades[index] = { ...upgrade, name: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, upgrades: newUpgrades }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('roadmap', 'upgrades', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        type="date"
                        placeholder="Date"
                        value={upgrade.date}
                        onChange={(e) => {
                          const newUpgrades = [...editData.roadmap.upgrades];
                          newUpgrades[index] = { ...upgrade, date: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, upgrades: newUpgrades }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Impact"
                        value={upgrade.impact}
                        onChange={(e) => {
                          const newUpgrades = [...editData.roadmap.upgrades];
                          newUpgrades[index] = { ...upgrade, impact: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, upgrades: newUpgrades }
                          }));
                        }}
                      />
                      <Select
                        value={upgrade.type}
                        onValueChange={(value) => {
                          const newUpgrades = [...editData.roadmap.upgrades];
                          newUpgrades[index] = { ...upgrade, type: value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, upgrades: newUpgrades }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="software">Software</SelectItem>
                          <SelectItem value="hardware">Hardware</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="security">Security</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Responsible"
                        value={upgrade.responsible}
                        onChange={(e) => {
                          const newUpgrades = [...editData.roadmap.upgrades];
                          newUpgrades[index] = { ...upgrade, responsible: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, upgrades: newUpgrades }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Scheduled Maintenance</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('roadmap', 'maintenance', {
                      system: '',
                      date: '',
                      duration: '',
                      window: '',
                      impact: ''
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Maintenance
                  </Button>
                </div>
                
                {editData.roadmap.maintenance.map((maintenance, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="System"
                        value={maintenance.system}
                        onChange={(e) => {
                          const newMaintenance = [...editData.roadmap.maintenance];
                          newMaintenance[index] = { ...maintenance, system: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, maintenance: newMaintenance }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('roadmap', 'maintenance', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        type="date"
                        placeholder="Date"
                        value={maintenance.date}
                        onChange={(e) => {
                          const newMaintenance = [...editData.roadmap.maintenance];
                          newMaintenance[index] = { ...maintenance, date: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, maintenance: newMaintenance }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Duration"
                        value={maintenance.duration}
                        onChange={(e) => {
                          const newMaintenance = [...editData.roadmap.maintenance];
                          newMaintenance[index] = { ...maintenance, duration: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, maintenance: newMaintenance }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Maintenance Window"
                        value={maintenance.window}
                        onChange={(e) => {
                          const newMaintenance = [...editData.roadmap.maintenance];
                          newMaintenance[index] = { ...maintenance, window: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, maintenance: newMaintenance }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Impact"
                        value={maintenance.impact}
                        onChange={(e) => {
                          const newMaintenance = [...editData.roadmap.maintenance];
                          newMaintenance[index] = { ...maintenance, impact: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, maintenance: newMaintenance }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Planned Training</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('roadmap', 'training', {
                      program: '',
                      date: '',
                      audience: '',
                      trainer: '',
                      budget: 0
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Training
                  </Button>
                </div>
                
                {editData.roadmap.training.map((training, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Training Program"
                        value={training.program}
                        onChange={(e) => {
                          const newTraining = [...editData.roadmap.training];
                          newTraining[index] = { ...training, program: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, training: newTraining }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('roadmap', 'training', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        type="date"
                        placeholder="Date"
                        value={training.date}
                        onChange={(e) => {
                          const newTraining = [...editData.roadmap.training];
                          newTraining[index] = { ...training, date: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, training: newTraining }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Audience"
                        value={training.audience}
                        onChange={(e) => {
                          const newTraining = [...editData.roadmap.training];
                          newTraining[index] = { ...training, audience: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, training: newTraining }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Trainer"
                        value={training.trainer}
                        onChange={(e) => {
                          const newTraining = [...editData.roadmap.training];
                          newTraining[index] = { ...training, trainer: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, training: newTraining }
                          }));
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Budget"
                        value={training.budget}
                        onChange={(e) => {
                          const newTraining = [...editData.roadmap.training];
                          newTraining[index] = { ...training, budget: parseInt(e.target.value) || 0 };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, training: newTraining }
                          }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Upcoming Procurement</h4>
                  <Button
                    size="sm"
                    onClick={() => addArrayItem('roadmap', 'procurement', {
                      item: '',
                      timeline: '',
                      budget: '',
                      status: 'planned',
                      priority: 'medium'
                    })}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Procurement
                  </Button>
                </div>
                
                {editData.roadmap.procurement.map((procurement, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Input
                        placeholder="Procurement Item"
                        value={procurement.item}
                        onChange={(e) => {
                          const newProcurement = [...editData.roadmap.procurement];
                          newProcurement[index] = { ...procurement, item: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, procurement: newProcurement }
                          }));
                        }}
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeArrayItem('roadmap', 'procurement', index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        placeholder="Timeline"
                        value={procurement.timeline}
                        onChange={(e) => {
                          const newProcurement = [...editData.roadmap.procurement];
                          newProcurement[index] = { ...procurement, timeline: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, procurement: newProcurement }
                          }));
                        }}
                      />
                      <Input
                        placeholder="Budget"
                        value={procurement.budget}
                        onChange={(e) => {
                          const newProcurement = [...editData.roadmap.procurement];
                          newProcurement[index] = { ...procurement, budget: e.target.value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, procurement: newProcurement }
                          }));
                        }}
                      />
                      <Select
                        value={procurement.status}
                        onValueChange={(value) => {
                          const newProcurement = [...editData.roadmap.procurement];
                          newProcurement[index] = { ...procurement, status: value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, procurement: newProcurement }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planned">Planned</SelectItem>
                          <SelectItem value="rfp-prepared">RFP Prepared</SelectItem>
                          <SelectItem value="vendor-selection">Vendor Selection</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="ordered">Ordered</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={procurement.priority}
                        onValueChange={(value) => {
                          const newProcurement = [...editData.roadmap.procurement];
                          newProcurement[index] = { ...procurement, priority: value };
                          setEditData(prev => ({
                            ...prev,
                            roadmap: { ...prev.roadmap, procurement: newProcurement }
                          }));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};