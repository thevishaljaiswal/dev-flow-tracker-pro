import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingDown, TrendingUp, ShoppingCart } from "lucide-react";

export const ITBudgetActual = () => {
  // Mock data - replace with real data
  const budgetData = {
    monthly: {
      opex: { budget: 150000, actual: 142000, variance: -8000 },
      capex: { budget: 200000, actual: 185000, variance: -15000 }
    },
    majorPurchases: [
      { item: "Server Hardware Upgrade", amount: 75000, date: "2024-01-15", status: "Completed" },
      { item: "Software Licenses", amount: 25000, date: "2024-01-20", status: "Pending" }
    ],
    forecast: {
      nextMonth: 320000,
      nextQuarter: 980000,
      riskFactors: ["Potential hardware price increase", "Additional security software needed"]
    }
  };

  const getVarianceColor = (variance: number) => {
    if (variance < 0) return "text-green-600"; // Under budget
    if (variance > 0) return "text-red-600"; // Over budget
    return "text-gray-600"; // On budget
  };

  const getVarianceIcon = (variance: number) => {
    if (variance < 0) return <TrendingDown className="w-4 h-4 text-green-600" />;
    if (variance > 0) return <TrendingUp className="w-4 h-4 text-red-600" />;
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          💰 IT Budget vs Actual
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Monthly Spend */}
        <div>
          <h4 className="font-semibold mb-3">Monthly IT Spend</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">OPEX</h5>
                {getVarianceIcon(budgetData.monthly.opex.variance)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget:</span>
                  <span>${budgetData.monthly.opex.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Actual:</span>
                  <span>${budgetData.monthly.opex.actual.toLocaleString()}</span>
                </div>
                <div className={`flex justify-between text-sm font-medium ${getVarianceColor(budgetData.monthly.opex.variance)}`}>
                  <span>Variance:</span>
                  <span>${budgetData.monthly.opex.variance.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(budgetData.monthly.opex.actual / budgetData.monthly.opex.budget) * 100} 
                  className="h-2" 
                />
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">CAPEX</h5>
                {getVarianceIcon(budgetData.monthly.capex.variance)}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Budget:</span>
                  <span>${budgetData.monthly.capex.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Actual:</span>
                  <span>${budgetData.monthly.capex.actual.toLocaleString()}</span>
                </div>
                <div className={`flex justify-between text-sm font-medium ${getVarianceColor(budgetData.monthly.capex.variance)}`}>
                  <span>Variance:</span>
                  <span>${budgetData.monthly.capex.variance.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(budgetData.monthly.capex.actual / budgetData.monthly.capex.budget) * 100} 
                  className="h-2" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Major Purchases */}
        <div>
          <h4 className="font-semibold mb-3">Major IT Purchases/Procurements</h4>
          <div className="space-y-2">
            {budgetData.majorPurchases.map((purchase, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{purchase.item}</div>
                  <div className="text-sm text-muted-foreground">{purchase.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">${purchase.amount.toLocaleString()}</div>
                  <Badge variant={purchase.status === "Completed" ? "default" : "secondary"}>
                    {purchase.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast */}
        <div>
          <h4 className="font-semibold mb-3">Forecast</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-xl font-bold text-blue-600">${budgetData.forecast.nextMonth.toLocaleString()}</div>
              <div className="text-sm text-blue-600">Next Month</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-xl font-bold text-purple-600">${budgetData.forecast.nextQuarter.toLocaleString()}</div>
              <div className="text-sm text-purple-600">Next Quarter</div>
            </div>
          </div>
          
          <div className="p-3 border rounded-lg bg-yellow-50">
            <h5 className="font-medium mb-2">Risk Factors</h5>
            <ul className="text-sm space-y-1">
              {budgetData.forecast.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};