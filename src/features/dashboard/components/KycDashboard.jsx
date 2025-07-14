import React from 'react';
// CORRECTED: 'Legend' is removed from this import line.
import { UserCheck, Clock, ShieldX, TrendingUp } from 'lucide-react';
// CORRECTED: 'Legend' is now correctly imported from the 'recharts' library.
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';


// Mock data specifically for this dashboard
const kycStats = {
    verificationRate: 92.5,
    avgTurnaroundTime: '4.5 hours',
    rejectionRate: 3.1,
};

const dailyVerificationsData = [
    { day: 'Mon', count: 150 },
    { day: 'Tue', count: 180 },
    { day: 'Wed', count: 210 },
    { day: 'Thu', count: 190 },
    { day: 'Fri', count: 250 },
    { day: 'Sat', count: 120 },
    { day: 'Sun', count: 90 },
];

const StatCard = ({ icon, title, value, trend }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-white">
        <div className="flex items-center">
            <div className="mr-4">{icon}</div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
        {trend && <p className="text-xs text-green-400 mt-2 flex items-center"><TrendingUp size={14} className="mr-1"/>{trend}</p>}
    </div>
);

const KycDashboard = () => {
    return (
        <div className="space-y-6 animate-fade-in mt-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<UserCheck size={32} className="text-green-500"/>} title="Verification Rate" value={`${kycStats.verificationRate}%`} trend="+1.2% this week" />
                <StatCard icon={<Clock size={32} className="text-blue-500"/>} title="Avg. Turnaround Time" value={kycStats.avgTurnaroundTime} />
                <StatCard icon={<ShieldX size={32} className="text-red-500"/>} title="Rejection Rate" value={`${kycStats.rejectionRate}%`} />
            </div>

            {/* Daily Verifications Chart */}
            <div className="bg-[#1e252d] p-6 rounded-xl shadow-lg text-white mt-6">
                 <h3 className="text-xl font-semibold mb-4 text-[#c0933e]">Daily Verifications (Last 7 Days)</h3>
                 <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyVerificationsData}>
                            <XAxis dataKey="day" stroke="#e7f1fe" />
                            <YAxis stroke="#e7f1fe" />
                            <Tooltip 
                                cursor={{fill: 'rgba(230, 230, 230, 0.1)'}} 
                                contentStyle={{ backgroundColor: '#2d251e', border: 'none', color: 'white' }}
                            />
                            <Legend wrapperStyle={{color: "#e7f1fe"}}/>
                            <Bar dataKey="count" name="Verifications" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
    );
};

export default KycDashboard;