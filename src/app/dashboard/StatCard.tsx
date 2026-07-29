import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
}

export default function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</div>
        {change && (
          <span
            className={`text-xs font-medium ${
              trend === 'up'
                ? 'text-green-600 dark:text-green-400'
                : trend === 'down'
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500'
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  )
}
