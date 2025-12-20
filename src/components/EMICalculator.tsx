import { useState } from 'react';
import { Calculator, Home, Building2, Building, GraduationCap, Coins, IndianRupee } from 'lucide-react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface LoanType {
  id: string;
  name: string;
  icon: any;
  defaultRate: number;
}

const loanTypes: LoanType[] = [
  { id: 'home', name: 'Home Loan', icon: Home, defaultRate: 8.5 },
  { id: 'mortgage', name: 'Mortgage Loan', icon: Building2, defaultRate: 9.0 },
  { id: 'project', name: 'Project Finance', icon: Building, defaultRate: 10.5 },
  { id: 'education', name: 'Education Loan', icon: GraduationCap, defaultRate: 7.5 },
  { id: 'gold', name: 'Gold Loan', icon: Coins, defaultRate: 9.5 },
];

export function EMICalculator() {
  const [selectedLoan, setSelectedLoan] = useState<string>('home');
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);

  const selectedLoanType = loanTypes.find(loan => loan.id === selectedLoan);

  // EMI Calculation Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfMonths = tenure * 12;

    if (ratePerMonth === 0) {
      return principal / numberOfMonths;
    }

    const emi =
      (principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfMonths)) /
      (Math.pow(1 + ratePerMonth, numberOfMonths) - 1);

    return Math.round(emi);
  };

  const emi = calculateEMI();
  const totalAmount = Math.round(emi * tenure * 12);
  const totalInterest = totalAmount - loanAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLoanTypeChange = (loanId: string) => {
    setSelectedLoan(loanId);
    const loan = loanTypes.find(l => l.id === loanId);
    if (loan) {
      setInterestRate(loan.defaultRate);
    }
  };

  return (
    <div className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0099ff]/10 rounded-full mb-4">
            <Calculator className="w-4 h-4 text-[#0099ff]" />
            <span className="text-sm text-[#0099ff]">Financial Planning</span>
          </div>
          <h2 className="text-gray-900 mb-3">EMI Calculator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your monthly loan payments and plan your finances better
          </p>
        </div>

        {/* Calculator Card */}
        <Card className="max-w-6xl mx-auto overflow-hidden shadow-lg border-gray-200">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Side - Input Controls */}
            <div className="p-6 lg:p-8 bg-white">
              {/* Loan Type Selection */}
              <div className="mb-6">
                <Label className="text-gray-700 mb-3 block">Select Loan Type</Label>
                <Select value={selectedLoan} onValueChange={handleLoanTypeChange}>
                  <SelectTrigger className="w-full h-12 bg-gray-50 border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {loanTypes.map((loan) => {
                      const Icon = loan.icon;
                      return (
                        <SelectItem key={loan.id} value={loan.id}>
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-[#0099ff]" />
                            <span>{loan.name}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Loan Amount */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-gray-700">Loan Amount</Label>
                  <span className="text-[#0099ff]">{formatCurrency(loanAmount)}</span>
                </div>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={100000}
                  max={10000000}
                  step={100000}
                  className="mb-2 [&_[data-slot=slider-range]]:bg-[#0099ff] [&_[data-slot=slider-thumb]]:border-[#0099ff]"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>₹1L</span>
                  <span>₹1Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-gray-700">Interest Rate (p.a.)</Label>
                  <span className="text-[#0099ff]">{interestRate.toFixed(1)}%</span>
                </div>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={5}
                  max={20}
                  step={0.1}
                  className="mb-2 [&_[data-slot=slider-range]]:bg-[#0099ff] [&_[data-slot=slider-thumb]]:border-[#0099ff]"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-gray-700">Loan Tenure</Label>
                  <span className="text-[#0099ff]">{tenure} Years</span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={([value]) => setTenure(value)}
                  min={1}
                  max={30}
                  step={1}
                  className="mb-2 [&_[data-slot=slider-range]]:bg-[#0099ff] [&_[data-slot=slider-thumb]]:border-[#0099ff]"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>

              {/* Manual Input Option */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label className="text-xs text-gray-600 mb-1.5 block">Amount (₹)</Label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1.5 block">Rate (%)</Label>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.1"
                    className="h-9 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1.5 block">Years</Label>
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="p-6 lg:p-8 bg-gradient-to-br from-[#0099ff] to-[#0077dd] text-white">
              <div className="flex items-center gap-3 mb-6">
                {selectedLoanType && (
                  <>
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <selectedLoanType.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm">Your Monthly Payment</p>
                      <h3 className="text-white">{selectedLoanType.name}</h3>
                    </div>
                  </>
                )}
              </div>

              {/* Monthly EMI */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20">
                <p className="text-white/80 text-sm mb-2">Monthly EMI</p>
                <div className="flex items-baseline gap-2">
                  <IndianRupee className="w-6 h-6 text-white" />
                  <h1 className="text-white">{formatCurrency(emi).replace('₹', '')}</h1>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-white/90">Principal Amount</span>
                  <span className="text-white">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/90">Loan Tenure</span>
                  <span className="text-white">{tenure} Years ({tenure * 12} months)</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full mt-6 px-6 py-3 bg-white text-[#0099ff] rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg">
                Apply for {selectedLoanType?.name}
              </button>
            </div>
          </div>
        </Card>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-500 mt-6 max-w-3xl mx-auto">
          * The EMI calculations shown above are indicative and for reference purposes only. Actual EMI may vary based on 
          final loan approval terms, processing fees, and other charges. Please contact our loan officers for accurate details.
        </p>
      </div>
    </div>
  );
}