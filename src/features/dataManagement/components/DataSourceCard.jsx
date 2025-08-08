// src/features/dataManagement/components/DataSourceCard.jsx

import React from 'react';
import { Database, Zap, CheckCircle, AlertTriangle, Clock, RefreshCw, FileText, Settings } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

const DataSourceCard = ({ source, onSync, isSyncing, onShowDetails, onShowLogs, onShowSettings }) => {
    const getStatusInfo = (status) => {
        switch (status) {
            case 'Connected':
                return { icon: <CheckCircle className="text-green-400" />, textClass: 'text-green-400', strokeColor: '#4ade80', gradientUrl: 'url(#colorSuccess)' };
            case 'Error':
                return { icon: <AlertTriangle className="text-red-400" />, textClass: 'text-red-400', strokeColor: '#f87171', gradientUrl: 'url(#colorError)' };
            default:
                return { icon: <Clock className="text-yellow-400" />, textClass: 'text-yellow-400', strokeColor: '#facc15', gradientUrl: 'url(#colorWarning)' };
        }
    };

    const statusInfo = getStatusInfo(source.status);

    return (
        <div className="theme-bg-card p-5 rounded-lg shadow-lg flex flex-col justify-between theme-text-primary border theme-border-color hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1">
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4">{source.type === 'API' ? <Zap size={20} className="text-blue-600 dark:text-blue-400" /> : <Database size={20} className="text-blue-600 dark:text-blue-400" />}</div>
                        <div>
                            <h4 className="font-bold theme-text-primary">{source.name}</h4>
                            <p className="text-xs theme-text-secondary">{source.type}</p>
                        </div>
                    </div>
                    <div className={`flex items-center text-xs font-semibold ${statusInfo.textClass}`}>
                        {isSyncing ? <RefreshCw size={16} className="animate-spin" /> : statusInfo.icon}
                        <span className="ml-2">{isSyncing ? 'Syncing...' : source.status}</span>
                    </div>
                </div>
                <div className="space-y-3 text-sm mb-4">
                    <div className="flex justify-between"><span className="theme-text-secondary">Data Quality Score</span><span className="font-semibold text-green-400">{source.dataQuality}%</span></div>
                    <div className="flex justify-between"><span className="theme-text-secondary">Last Sync</span><span className="font-semibold theme-text-primary">{source.lastSync}</span></div>
                    <div className="flex justify-between"><span className="theme-text-secondary">Records Synced</span><span className="font-semibold theme-text-primary">{source.recordsSynced.toLocaleString()}</span></div>
                </div>
                <div className="h-20 mb-2 cursor-pointer" onClick={() => onShowDetails(source.id)}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={source.chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4ade80" stopOpacity={0.6}/><stop offset="95%" stopColor="#4ade80" stopOpacity={0}/></linearGradient>
                                <linearGradient id="colorError" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f87171" stopOpacity={0.6}/><stop offset="95%" stopColor="#f87171" stopOpacity={0}/></linearGradient>
                                <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#facc15" stopOpacity={0.6}/><stop offset="95%" stopColor="#facc15" stopOpacity={0}/></linearGradient>
                            </defs>
                            <Tooltip contentStyle={{ backgroundColor: 'var(--background-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', fontSize: '12px', padding: '8px', borderRadius: '6px' }} itemStyle={{ color: '#a5b4fc' }} labelStyle={{ display: 'none' }} />
                            <YAxis domain={['dataMin - 20', 'dataMax + 20']} hide={true} />
                            <Area type="monotone" dataKey="value" stroke={statusInfo.strokeColor} fill={statusInfo.gradientUrl} strokeWidth={2} connectNulls={true} isAnimationActive={!isSyncing} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t theme-border-color">
                <button onClick={() => onSync(source.id)} disabled={isSyncing} className="flex items-center text-sm font-medium theme-text-secondary hover:theme-text-primary transition-colors disabled:cursor-not-allowed disabled:theme-text-secondary"><RefreshCw size={14} className="mr-2"/> Sync Now</button>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onShowLogs(source.id)} className="flex items-center text-sm font-medium theme-text-secondary hover:theme-text-primary transition-colors"><FileText size={14} className="mr-2"/> Logs</button>
                    <button onClick={() => onShowSettings(source.id)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors theme-text-primary"><Settings size={16}/></button>
                </div>
            </div>
        </div>
    );
};

export default DataSourceCard;