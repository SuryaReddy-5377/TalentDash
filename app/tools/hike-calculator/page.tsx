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
        <h1 className="text-3xl font-bold text-[#222222]">Hike Calculator</h1>
        <p className="text-[#717171] mt-1">Calculate your salary hike</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-[#222222] mb-4">Enter your details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#484848] mb-1">Current Salary (Annual)</label>
              <input
                type="range"
                min="300000"
                max="5000000"
                step="100000"
                value={currentSalary}
                onChange={(e) => setCurrentSalary(Number(e.target.value))}
                className="w-full accent-[#FF5A5F]"
              />
              <div className="flex justify-between text-sm text-[#717171]">
                <span>₹3L</span>
                <span className="font-medium text-[#FF5A5F]">{formatCurrency(currentSalary)}</span>
                <span>₹50L</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#484848] mb-1">Hike Percentage</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={hikePercentage}
                onChange={(e) => setHikePercentage(Number(e.target.value))}
                className="w-full accent-[#FF5A5F]"
              />
              <div className="flex justify-between text-sm text-[#717171]">
                <span>0%</span>
                <span className="font-medium text-[#FF5A5F]">{hikePercentage}%</span>
                <span>50%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-[#222222] mb-4">Your New Salary</h3>
          
          <div className="space-y-4">
            <div className="bg-[#FFF5F5] rounded-lg p-4">
              <p className="text-sm text-[#717171]">New Annual Salary</p>
              <p className="text-3xl font-bold text-[#FF5A5F]">{formatCurrency(newSalary)}</p>
              <p className="text-sm text-[#FF5A5F] mt-1">↑ {formatCurrency(hikeAmount)} increase</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171]">Monthly Salary</p>
                <p className="font-semibold text-[#222222]">{formatCurrency(newSalary / 12)}</p>
              </div>
              <div className="bg-[#F7F7F7] rounded-lg p-3">
                <p className="text-xs text-[#717171]">Monthly Increase</p>
                <p className="font-semibold text-[#FF5A5F]">+{formatCurrency(monthlyIncrease)}</p>
              </div>
            </div>

            <div className="bg-[#FFF5F5] rounded-lg p-3 text-center">
              <p className="text-sm text-[#717171]">New salary is {hikePercentage}% higher than current</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}