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
        <h1 className="text-3xl font-bold text-[#1F2937]">Salary Calculator</h1>
        <p className="text-gray-600 mt-1">Calculate your total compensation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border-green-100">
          <h3 className="font-semibold mb-4">Enter your details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Base Salary (Annual)</label>
              <input
                type="range"
                min="300000"
                max="5000000"
                step="100000"
                value={baseSalary}
                onChange={(e) => setBaseSalary(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹3L</span>
                <span className="font-medium text-green-600">{formatCurrency(baseSalary)}</span>
                <span>₹50L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bonus (Annual)</label>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={bonus}
                onChange={(e) => setBonus(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹0</span>
                <span className="font-medium text-green-600">{formatCurrency(bonus)}</span>
                <span>₹5L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock/ESOP (Annual)</label>
              <input
                type="range"
                min="0"
                max="300000"
                step="10000"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹0</span>
                <span className="font-medium text-green-600">{formatCurrency(stock)}</span>
                <span>₹3L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={experience}
                onChange={(e) => setExperience(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span className="font-medium text-green-600">{experience} years</span>
                <span>20</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 border-green-100">
          <h3 className="font-semibold mb-4">Your Compensation Breakdown</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Annual Compensation</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(totalComp)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Base Salary</p>
                <p className="font-semibold">{formatCurrency(baseSalary)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Bonus</p>
                <p className="font-semibold">{formatCurrency(bonus)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Stock</p>
                <p className="font-semibold">{formatCurrency(stock)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Monthly Salary</p>
                <p className="font-semibold">{formatCurrency(monthlySalary)}</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600">Based on {experience} years of experience</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}