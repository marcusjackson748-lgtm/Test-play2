import StatCard from '@/components/dashboard/StatCard'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome back, {user?.email ?? 'User'}
        </h2>
        <p className="text-sm text-gray-500">
          Here is an overview of your metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" trend="up" />
        <StatCard title="Subscriptions" value="+2,350" change="+180.1%" trend="up" />
        <StatCard title="Active Now" value="+573" change="+201" trend="up" />
      </div>
    </div>
  )
}
