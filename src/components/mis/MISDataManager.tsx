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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="operations" className="space-y-4">
            {/* IT Operations editing form */}
            <div className="space-y-4">
              <h4 className="font-semibold">Ticket Metrics</h4>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            {/* Cybersecurity editing form */}
            <div className="space-y-4">
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

          <TabsContent value="budget" className="space-y-4">
            {/* Budget editing form */}
            <div className="space-y-4">
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