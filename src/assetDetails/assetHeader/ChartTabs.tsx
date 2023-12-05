// src/components/TabsMui.tsx
import React, { ReactNode, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { SymbolOverview } from 'react-tradingview-embed'
import { OriginalChart } from './OriginalChart';
import { AssetDetailsInfoResponse } from '../types';
import { Result } from '../../appBar/use-search-bar';
import AssetChartCard from '../assetBodyCards/AssetChartCard';
import AssetOverviewBody from '../assetBodyCards/AssetOverviewBody';

interface TabPanelProps {
    value: number;
    index: number;
    children: ReactNode;
}

interface ChartTabsProps {
    // tradingviewSymbols: string[];
    assetDetailsInfo: AssetDetailsInfoResponse;
    assetDetailsData: Result;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

export const ChartTabs: React.FC<ChartTabsProps> = ({ assetDetailsInfo, assetDetailsData }) => {
    let symbols: string[] = [];
    switch (assetDetailsData.Type) {
        case 'Common Stock':
            if (assetDetailsData.Exchange === "US") {
                symbols = [`NASDAQ:${assetDetailsData.Code}`];
            } else {
                symbols = [`${assetDetailsData.Exchange}:${assetDetailsData.Code}`];
            }
            break;
        case 'ETF':
            symbols = [`${assetDetailsData.Exchange}:${assetDetailsData.Code}`]
            break;
        case 'Currency':
            if (assetDetailsData.Exchange === "CC") {
                symbols = [`${assetDetailsData.Code.split("-").join("")}`];
                break;
            } else {
                symbols = [];
            }
            break;
        default:
            symbols = [`${assetDetailsData.Code}`]
            break;
    }

    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const components = [
        <OriginalChart assetDetailsInfo={assetDetailsInfo} assetDetailsData={assetDetailsData}/>,
        <SymbolOverview widgetProps={{ colorTheme: "light", symbols: symbols }} />,
        <AssetOverviewBody assetDetailsData={assetDetailsData} assetDetailsInfo={assetDetailsInfo} />,
        <AssetChartCard assetDetailsData={assetDetailsData} assetDetailsInfo={assetDetailsInfo}/>
    ];

    return (
        <div>
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Chart" />
                <Tab label="Tradingview" />
                <Tab label="Financials" />
                <Tab label="Technical chart" />
            </Tabs>
            {components.map((component, index) => (
                <TabPanel key={index} value={activeTab} index={index}>
                    {component}
                </TabPanel>
            ))}
        </div>
    );
};
