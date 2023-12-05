import React from 'react'
import { FaBook } from 'react-icons/fa';
import { NewsCardData } from './use-news';
import { Link } from 'react-router-dom';

interface NewsCardProps {
    newsCardData: NewsCardData;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsCardData }) => {
    return (
        <div className="bg-white rounded-lg h-40 overflow-hidden shadow-md flex items-center">
            {newsCardData.imageUrl ? (
                <img
                    src={newsCardData.imageUrl}
                    alt="News Image"
                    className="w-32 h-full object-cover object-center rounded-l"
                />
            ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-300 rounded-l">
                    <FaBook className="text-5xl text-slate-500" />
                </div>
            )}
            <div className="flex flex-col p-4 h-40 overflow-y-auto">
                <span className="font-semibold text-lg">
                    {newsCardData.title}
                </span>
                <p className="text-gray-600 overflow-ellipsis">
                    {((newsCardData.description ?? '').length ?? 0) > 250
                        ? `${newsCardData.description?.slice(0, 250)}...`
                        : newsCardData.description}
                </p>
                <Link to={newsCardData.link} className="text-blue-500 hover:underline mt-2 mb-2">
                    Read more
                </Link>
            </div>
        </div>
    )
}

export default NewsCard