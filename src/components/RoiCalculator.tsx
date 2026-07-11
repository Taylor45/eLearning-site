import React, { useState } from 'react';
import { Coins, TrendingUp, Users, Clock, ShieldCheck, Zap } from 'lucide-react';

interface RoiCalculatorProps {
  onUnlockSavings: (orgDetails: { size: number; currentCost: number; savings: number }) => void;
}

export default function RoiCalculator({ onUnlockSavings }: RoiCalculatorProps) {
  const [employeeCount, setEmployeeCount] = useState<number>(250);
  const [trainingHours, setTrainingHours] = useState<number>(24);
  const [traditionalCostPerHour, setTraditionalCostPerHour] = useState<number>(65);

  // Math models
  const currentTraditionalCost = employeeCount * trainingHours * traditionalCostPerHour;
  
  // Custom eLearning reduces physical cost by ~68% (venue, travel, printed materials, lost work hours)
  const estimatedDigitalCost = Math.round(currentTraditionalCost * 0.32);
  const netSavings = currentTraditionalCost - estimatedDigitalCost;
  const deliveryHoursSaved = Math.round(employeeCount * trainingHours * 0.45); // 45% faster learning cycles

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-orange-100 rounded-lg text-brand">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-navy-dark">
            Interactive eLearning ROI Calculator
          </h3>
          <p className="text-xs text-gray-500">
            Compare traditional in-person training costs with custom digital courseware
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Sliders Input Column */}
        <div className="space-y-6">
          
          {/* Slider 1: Employees */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-gray-400" />
                Total Learners to Train
              </label>
              <span className="font-mono text-sm font-bold text-brand bg-orange-50 px-2.5 py-1 rounded-md">
                {employeeCount.toLocaleString()} employees
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={employeeCount}
              onChange={(e) => setEmployeeCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
              <span>50</span>
              <span>1,500</span>
              <span>3,000</span>
              <span>5,000</span>
            </div>
          </div>

          {/* Slider 2: Training Hours */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                Annual Training Hours / Employee
              </label>
              <span className="font-mono text-sm font-bold text-brand bg-orange-50 px-2.5 py-1 rounded-md">
                {trainingHours} hours
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              step="1"
              value={trainingHours}
              onChange={(e) => setTrainingHours(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
              <span>5h</span>
              <span>25h</span>
              <span>50h</span>
              <span>80h</span>
            </div>
          </div>

          {/* Slider 3: Cost Per Hour */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-gray-400" />
                Traditional Cost / Hour
              </label>
              <span className="font-mono text-sm font-bold text-brand bg-orange-50 px-2.5 py-1 rounded-md">
                R{traditionalCostPerHour}/hr
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mb-2 leading-relaxed">
              *Includes instructor fees, venue rent, handouts, travel, and lost work time.
            </p>
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={traditionalCostPerHour}
              onChange={(e) => setTraditionalCostPerHour(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
              <span>R15</span>
              <span>R50</span>
              <span>R100</span>
              <span>R150</span>
            </div>
          </div>

        </div>

        {/* Results Output Column */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-150 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Savings Display */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest font-mono">
                Estimated Annual Savings
              </p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-4xl lg:text-5xl font-display font-extrabold text-navy-dark tracking-tight">
                  R{netSavings.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Save ~68%
                </span>
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <p className="text-[11px] font-mono text-gray-400 uppercase">
                  Traditional Method
                </p>
                <p className="font-mono text-sm font-bold text-gray-600 line-through">
                  R{currentTraditionalCost.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono text-gray-400 uppercase">
                  Mabasa Digital LMS
                </p>
                <p className="font-mono text-sm font-bold text-emerald-600">
                  R{estimatedDigitalCost.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Value Highlights */}
            <div className="space-y-2 pt-4 border-t border-gray-200 text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <Zap className="w-4 h-4 text-brand flex-shrink-0" />
                <span>
                  Save <strong>{deliveryHoursSaved.toLocaleString()}</strong> learner-hours annually
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Gain <strong>100% compliance tracking</strong> & analytics audits</span>
              </div>
            </div>

          </div>

          <div className="pt-6">
            <button
              id="calc-savings-cta"
              onClick={() => onUnlockSavings({
                size: employeeCount,
                currentCost: currentTraditionalCost,
                savings: netSavings
              })}
              className="w-full flex items-center justify-center px-5 py-3.5 bg-brand hover:bg-brand-hover text-white font-semibold rounded-lg shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm cursor-pointer"
            >
              Request Custom ROI Blueprint
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-2 font-mono">
              Includes full integration timeline & LMS recommendations
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
