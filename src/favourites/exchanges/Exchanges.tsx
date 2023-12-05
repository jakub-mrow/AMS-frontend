import { FcCurrencyExchange } from 'react-icons/fc';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { StockExchange } from './use-stock-exchanges';

interface ExchangeProps {
    currentPage: number;
    showFavorites: boolean;
    handlePageChange: (index: number) => void;
    addToFavorites: (name: string) => void;
    isFavorite: (name: string) => boolean;
    toggleShowFavorites: () => void;
    filteredExchanges: StockExchange[];
    totalPages: number;
    startIndex: number;
    endIndex: number;
}


const Exchanges: React.FC<ExchangeProps> = ({ 
    currentPage, 
    showFavorites, 
    handlePageChange, 
    addToFavorites, 
    isFavorite, 
    toggleShowFavorites, 
    filteredExchanges, 
    totalPages, 
    startIndex, 
    endIndex
}) => {

    return (
        <div className="container mx-auto">
            <div className="flex flex-row space-x-2">
                <FcCurrencyExchange className="text-4xl" />
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
                    {filteredExchanges.slice(startIndex, endIndex).map((exchange, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <div className="flex items-center">
                                    <div className="flex flex-row ml-4 space-x-2">
                                        <button
                                            onClick={() => addToFavorites(exchange.name)}
                                            className="text-yellow-300 text-xl"
                                        >
                                            {isFavorite(exchange.name) ? <AiFillStar /> : <AiOutlineStar />}
                                        </button>
                                        <div className="text-sm leading-5 font-medium text-gray-900">
                                            {exchange.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                                <div className="text-sm leading-5 text-gray-900">
                                    {exchange.openingHour} - {exchange.closingHour}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={toggleShowFavorites}
                    className="mx-1 px-3 py-1 rounded bg-blue-500 text-white"
                >
                    {showFavorites ? 'Show All Exchanges' : 'Show Favorite Exchanges'}
                </button>
            </div>
        </div>
    )
}

export default Exchanges;