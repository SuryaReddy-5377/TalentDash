'use client';

import { useState } from 'react';

export default function SalaryCalculator() {
  const [baseSalary, setBaseSalary] = useState(1200000);
  const [bonus, setBonus] = useState(120000);
  const [stock, setStock] = useState(80000);
  const [experience, setExperience] = useState(4);

  const totalComp = baseSalary + bonus + stock;
  const monthlySalary = baseSalary / 12;
  const monthlyBonus = bonus / 12;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#222222]">Salary Calculator</h1>
        <p className="text-[#717171] mt-1">Calculate your total compensation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-[#222222] mb-4">Enter your details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#484848] mb-1">Base Salary (Annual)</label>
              <input
                type="range"
                min="300000"
                max="5000000"
                step="100000"
                value={baseSalary}
                onChange={(e) => setBaseSalary(Number(e.target.value))}
                className="w-full accent-[#FF5A5F]"
              />
              <div className="flex justify-between text-sm text-[#717171]">
                <span>₹3L</span>
                <span className="font-medium text-[#FF5A5F]">{formatCurrency(baseSalary)}</span>
                <span>₹50L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#484848] mb-1">Bonus (Annual)</label>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value))}
                className="w-full accent-[#FF5A5F]"
              />
              <div className="flex justify-between text-sm text-[#717171]">
                <span>₹0</span>
                <span className="font-medium text-[#FF5A5F]">{formatCurrency(bonus)}</span>
                <span>₹5L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#484848] mb-1">Stock/ESOP (Annual)</label>
              <input
                type="range"
                min="0"
                max="300000"
                step="10000"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full accent-[#FF5A5F]"
              />
              <div className="flex justify-between text-sm text-[#717171]">
                <span>₹0</span>
                <span className="font-medium text-[#FF5A5F]">{formatCurrency(stock)}</span>
                <span>₹3L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#484848] mb-1">Experience (Years)</label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full accent-[#FF5A5F]"
              />
              <div className="flex justify-between text-sm text-[#717171]">
                <span>0</span>
                <span className="font-medium text-[#FF5A5F]">{experience} years</span>
                <span>20</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-[#222222] mb-4">Your Compensation Breakdown</h3>
          
          <div className="space-y-4">
            <div className="bg-[#FFF5F5] rounded-lg p-4">
              <p className="text-sm text-[#717171]">Total Annual Compensation</p>
              <p className="text-3xl font-bold text-[#FF5A5F]">{formatCurrency(totalComp)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171]">Base Salary</p>
                <p className="font-semibold text-[#222222]">{formatCurrency(baseSalary)}</p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171]">Bonus</p>
                <p className="font-semibold text-[#222222]">{formatCurrency(bonus)}</p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171]">Stock</p>
                <p className="font-semibold text-[#222222]">{formatCurrency(stock)}</p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171]">Monthly Salary</p>
                <p className="font-semibold text-[#222222]">{formatCurrency(monthlySalary)}</p>
              </div>
            </div>

            <div className="bg-[#FFF5F5] rounded-lg p-3 text-center">
              <p className="text-sm text-[#717171]">Based on {experience} years of experience</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}