/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';

let tvScriptLoadingPromise: Promise<Event>;

function TradingViewWidget() {
    const onLoadScriptRef = useRef < (() => void) | null > (null);

    useEffect(() => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement('script');
                script.id = 'tradingview-widget-loading-script';
                script.src = 'https://s3.tradingview.com/tv.js';
                script.type = 'text/javascript';
                script.onload = resolve;

                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => {
            onLoadScriptRef.current = null;
        };

        function createWidget() {
            if (document.getElementById('tradingview_e8f1f') && 'TradingView' in window) {
                new (window.TradingView as any).widget({
                    autosize: true,
                    symbol: "NVDA",
                    interval: "D",
                    timezone: "Etc/UTC",
                    theme: "light",
                    style: "1",
                    locale: "en",
                    enable_publishing: false,
                    allow_symbol_change: true,
                    container_id: "tradingview_e8f1f"
                });
            }
        }
    }, []);

    return (
        <div className='tradingview-widget-container'>
            <div id='tradingview_e8f1f' style={{height: "600px"}}/>
            <div className="tradingview-widget-copyright">
                <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
            </div>
        </div>
    );
}

export default TradingViewWidget;
