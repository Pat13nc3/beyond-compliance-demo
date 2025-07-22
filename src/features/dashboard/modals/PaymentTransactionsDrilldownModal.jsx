import React from 'react';
import { X } from 'lucide-react';

const PaymentTransactionsDrilldownModal = ({ transactions, providerName, currencySymbol, onClose }) => {
    if (!transactions || transactions.length === 0) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-gray-700">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>
                <h3 className="text-2xl font-bold text-[#c0933e] mb-4 border-b border-gray-700 pb-2">
                    Transactions for {providerName}
                </h3>

                <p className="text-gray-300 mb-4">
                    Displaying {transactions.length} transactions for {providerName}.
                </p>

                {transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-700">
                                <tr>
                                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-700 transition-colors">
                                        <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">
                                            {transaction.id}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                            {currencySymbol}{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                                            {transaction.type}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                transaction.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                transaction.status === 'Failed' ? 'bg-red-100 text-red-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-400 text-center py-4">No transactions found for this payment provider.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentTransactionsDrilldownModal;
