'use client';

import { useState } from 'react';

export default function EquityCalculator() {
  const [shares, setShares] = useState(1000);
  const [currentPrice, setCurrentPrice] = useState(1500);
  const [strikePrice, setStrikePrice] = useState(500);

  const totalValue = shares * currentPrice;
  const profit = shares * (currentPrice - strikePrice);
  const profitPercentage = ((currentPrice - strikePrice) / strikePrice) * 100;

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <main className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F2937]">Equity Calculator</h1>
        <p className="text-gray-600 mt-1">Calculate your RSU/ESOP value</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6 border-green-100">
          <h3 className="font-semibold mb-4">Enter your details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Shares</label>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={shares}
                onChange={(e) => setShares(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>100</span>
                <span className="font-medium text-green-600">{shares} shares</span>
                <span>10,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Share Price (₹)</label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹100</span>
                <span className="font-medium text-green-600">₹{currentPrice}</span>
                <span>₹5,000</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Strike Price (₹)</label>
              <input
                type="range"
                min="100"
                max="3000"
                step="100"
                value={strikePrice}
                onChange={(e) => setStrikePrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹100</span>
                <span className="font-medium text-green-600">₹{strikePrice}</span>
                <span>₹3,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 border-green-100">
          <h3 className="font-semibold mb-4">Your Equity Value</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Total Equity Value</p>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(totalValue)}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Total Profit</p>
                <p className="font-semibold text-green-600">{formatCurrency(profit)}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Profit %</p>
                <p className="font-semibold text-green-600">{profitPercentage.toFixed(1)}%</p>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600">You have {shares} shares at ₹{currentPrice} each</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}