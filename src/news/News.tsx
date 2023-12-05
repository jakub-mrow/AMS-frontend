import NewsCard from './NewsCard';
import { useNews } from './use-news';
import { Loading } from '../util/Loading';
import { IoNewspaperOutline } from "react-icons/io5";

interface NewsProps {
    ticker: string;
}

const News: React.FC<NewsProps> = ({ ticker }) => {
    const { news, isLoading, displayedNewsCount, handleLoadMore } = useNews(ticker);

    const displayedNews = news.slice(0, displayedNewsCount);

    return (
        <div className="container mx-auto">
            <div className="flex flex-row space-x-2 mb-4">
                <IoNewspaperOutline size={32} className=" text-slate-500 " />
                <h1 className="text-2xl font-bold mb-4">Financial News and Articles</h1>
            </div>
            {isLoading ? (
                <Loading />
            ) : (
                <div className="flex flex-col space-y-8">
                    {displayedNews.length === 0 ? (
                        <div className="flex items-center justify-center bg-gray-100 p-8 rounded-xl mb-8">
                            <p className="text-gray-500">There are no available articles about this asset</p>
                        </div>
                    ) : (
                        displayedNews.map((newsItem) => (
                            <NewsCard key={newsItem.link} newsCardData={newsItem} />
                        ))
                    )}
                    {displayedNews.length < news.length && (
                        <button className="text-blue-500 hover:underline" onClick={handleLoadMore}>
                            Load More
                        </button>
                    )}
                </div>
            )}

        </div>
    )
}

export default News