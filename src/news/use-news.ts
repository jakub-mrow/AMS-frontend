import { useContext, useEffect, useState } from "react";
import { apiUrl } from "../config";
import AuthContext from "../auth/auth-context";

interface EODNews {
    title: string,
    date: string,
    link: string
}

export interface NewsCardData {
    title: string,
    date: string
    description: string | null
    link: string
    imageUrl: string | null
}


export const useNews = (ticker: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [news, setNews] = useState<NewsCardData[]>([]);
    const { token } = useContext(AuthContext);

    const [displayedNewsCount, setDisplayedNewsCount] = useState(4);

    const handleLoadMore = () => {
        setDisplayedNewsCount((prevCount) => prevCount + 4);
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                let endpoint = `${apiUrl}/api/get_stock_news`;

                if (ticker.trim() !== '') {
                    endpoint += `?ticker=${ticker}`;
                }
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch news. Status: ${response.status}`);
                }

                const data: EODNews[] = await response.json();

                const metadataPromises = data.map((item: EODNews) => getMetaData(item.link));

                const metadataResults = await Promise.all(metadataPromises);

                const cardData = data.map((item: EODNews, index: number) => ({
                    ...item,
                    ...metadataResults[index],
                }));

                setNews(cardData);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [ticker, token]);

    const getMetaData = async (link: string) => {
        try {
            const proxyLink = "https://thingproxy.freeboard.io/fetch/" + link;
            const response = await fetch(proxyLink);
            const html = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const ogImageMeta = doc.querySelector('meta[property="og:image"]');
            const metaDescription = doc.querySelector('meta[name="description"]');

            const description = metaDescription ? metaDescription.getAttribute('content') : '';
            const imageUrl = ogImageMeta ? ogImageMeta.getAttribute('content') : '';

            return {
                imageUrl,
                description

            };
        } catch (error) {
            console.error('Error fetching metadata:', error);
            return {
                imageUrl: '',
                description: '',
            };
        }
    };

    return {
        isLoading,
        news,
        displayedNewsCount,
        handleLoadMore
    }

}