// src/components/TabsMui.tsx
import React, { ReactNode, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { SymbolOverview } from 'react-tradingview-embed'
import { OriginalChart } from './OriginalChart';
import { AssetDetailsInfoResponse } from '../types';

interface TabPanelProps {
    value: number;
    index: number;
    children: ReactNode;
}

interface ChartTabsProps {
    tradingviewSymbols: string[];
    assetDetailsInfo: AssetDetailsInfoResponse;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
    return (
        <div role="tabpanel" hidden={value !== index}>
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

export const ChartTabs: React.FC<ChartTabsProps> = ({ tradingviewSymbols, assetDetailsInfo }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const components = [
        <OriginalChart assetDetailsInfo={assetDetailsInfo} />,
        <SymbolOverview widgetProps={{ colorTheme: "light", symbols: tradingviewSymbols }} />
    ];

    return (
        <div>
            <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Original" />
                <Tab label="Tradingview" />
            </Tabs>
            {components.map((component, index) => (
                <TabPanel key={index} value={activeTab} index={index}>
                    {component}
                </TabPanel>
            ))}
        </div>
    );
};
