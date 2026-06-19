'use client';

import { useState } from 'react';

export default function HikeCalculator() {
  const [currentSalary, setCurrentSalary] = useState(1200000);
  const [hikePercentage, setHikePercentage] = useState(15);

  const newSalary = currentSalary + (currentSalary * hikePercentage / 100);
  const hikeAmount = newSalary - currentSalary;
  const monthlyIncrease = hikeAmount / 12;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Hike Calculator</h1>
        <p className="text-gray-600 mt-1">Calculate your salary hike</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border-green-100">
          <h3 className="font-semibold mb-4">Enter your details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Salary (Annual)</label>
              <input
                type="range"
                min="300000"
                max="5000000"
                step="100000"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹3L</span>
                <span className="font-medium text-green-600">{formatCurrency(currentSalary)}</span>
                <span>₹50L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hike Percentage</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={hikePercentage}
                onChange={(e) => setHikePercentage(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span className="font-medium text-green-600">{hikePercentage}%</span>
                <span>50%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 border-green-100">
          <h3 className="font-semibold mb-4">Your New Salary</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">New Annual Salary</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(newSalary)}</p>
              <p className="text-sm text-green-600 mt-1">↑ {formatCurrency(hikeAmount)} increase</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Monthly Salary</p>
                <p className="font-semibold">{formatCurrency(newSalary / 12)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Monthly Increase</p>
                <p className="font-semibold text-green-600">+{formatCurrency(monthlyIncrease)}</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600">New salary is {hikePercentage}% higher than current</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}