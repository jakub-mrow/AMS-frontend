import { FcCurrencyExchange } from 'react-icons/fc';

const Exchanges = () => {
    const stockExchanges = [
        {
            name: 'New York Stock Exchange',
            timezone: 'America/New_York',
            openingHours: '9:30 AM - 4:00 PM',
        },
        {
            name: 'London Stock Exchange',
            timezone: 'Europe/London',
            openingHours: '8:00 AM - 4:30 PM',
        },
        {
            name: 'Tokyo Stock Exchange',
            timezone: 'Asia/Tokyo',
            openingHours: '9:00 AM - 3:00 PM',
        },
        {
            name: 'Frankfurt Stock Exchange',
            timezone: 'Europe/Berlin',
            openingHours: '8:00 AM - 8:00 PM',
        },
        {
            name: 'Hong Kong Stock Exchange',
            timezone: 'Asia/Hong_Kong',
            openingHours: '9:30 AM - 4:00 PM',
        },
        {
            name: 'Amsterdam Stock Exchange',
            timezone: 'Europe/Amsterdam',
            openingHours: '9:00 AM - 5:30 PM',
        },
        {
            name: 'Xetra Stock Exchange',
            timezone: 'Europe/Berlin',
            openingHours: '8:00 AM - 8:00 PM',
        },
    ];
    return (
        <div className="container mx-auto">
            <div className="flex flex-row space-x-2">
                <FcCurrencyExchange className="text-4xl"/>
                <h1 className="text-2xl font-bold mb-4">Stock Exchanges Opening Hours</h1>
            </div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Stock Exchange
                        </th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                            Opening Hours
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {stockExchanges.map((exchange, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <div className="flex items-center">
                                    <div className="ml-4">
                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                            {exchange.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <div className="text-sm leading-5 text-gray-900">
                                    {exchange.openingHours}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Exchanges;