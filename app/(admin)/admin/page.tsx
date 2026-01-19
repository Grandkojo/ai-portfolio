export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-white/60">Welcome back, Traveler.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder Stats Cards */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-sm font-medium text-white/50 mb-2">Total Visits</h3>
                    <p className="text-4xl font-bold text-white">12,345</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-sm font-medium text-white/50 mb-2">Messages</h3>
                    <p className="text-4xl font-bold text-primary">24</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <h3 className="text-sm font-medium text-white/50 mb-2">Projects</h3>
                    <p className="text-4xl font-bold text-accent">8</p>
                </div>
            </div>
        </div>
    );
}
