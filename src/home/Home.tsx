import { ReactNode, useContext, useState } from "react";
import AuthContext from "../auth/auth-context";
import { FaPlus, FaWallet } from "react-icons/fa";
import Exchanges from "../favourites/exchanges/Exchanges.tsx";
import { useAccounts } from "./use-accounts.ts";
import { AddAccountDialog } from "./AddAccountDialog.tsx";
import { TickerTape } from "react-tradingview-embed";
import AccountCard from "./AccountCard.tsx";
import News from "../news/News.tsx";
import { Box, Tab, Tabs } from "@mui/material";
import FavouriteAssets from "../favourites/favouriteAssets/FavouriteAssets.tsx";
import { useFavourites } from "../favourites/use-favourites.ts";


interface TabPanelProps {
  value: number;
  index: number;
  children: ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useContext(AuthContext);

  const {
    accounts,
    openAddDialog,
    closeAddDialog,
    isAddDialogOpen,
    addAccount,
    goToAccount,
  } = useAccounts();

  const { favouriteAssets, 
    deleteFavouriteAsset, 
    viewFavouriteAsset, 
    showFavorites,
    handlePageChange,
    addToFavorites,
    isFavorite,
    toggleShowFavorites,
    filteredExchanges,
    totalPages,
    startIndex,
    endIndex, 
    currentPage
  } = useFavourites();

  const components = [
    <Exchanges 
      showFavorites={showFavorites} 
      handlePageChange={handlePageChange}
      addToFavorites={addToFavorites}
      isFavorite={isFavorite}
      toggleShowFavorites={toggleShowFavorites}
      filteredExchanges={filteredExchanges}
      totalPages={totalPages}
      startIndex={startIndex}
      endIndex={endIndex}
      currentPage={currentPage}
    />,
    <FavouriteAssets 
      favouriteAssets={favouriteAssets} 
      deleteFavoriteAsset={deleteFavouriteAsset} 
      viewFavoriteAsset={viewFavouriteAsset} />,
  ];

  return (
    <div className="container mx-auto p-1">
      <div className="flex flex-col m-10 space-y-10">
        <div className="space-y-5">
          <div className="flex flex-row items-center space-x-4">
            <FaWallet className="flex text-2xl" />
            <h1 className="text-2xl font-bold">Your accounts</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-14">
            {accounts.map((account) => (
              <AccountCard account={account} goToAccount={goToAccount} />
            ))}
            <div className="w-full p-4 flex items-center justify-center">
              <button
                className="w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full flex items-center hover:scale-110 transition-transform justify-center"
                onClick={openAddDialog}
              >
                <FaPlus className="w-6 h-6" />
              </button>
              <AddAccountDialog
                isOpen={isAddDialogOpen}
                onClose={closeAddDialog}
                onAdd={addAccount}
              />
            </div>
          </div>
        </div>
        <TickerTape widgetProps={{ colorTheme: "light" }} />
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Exchanges" />
          <Tab label="Favourite Assets" />
        </Tabs>
        {components.map((component, index) => (
          <TabPanel key={index} value={activeTab} index={index}>
            {component}
          </TabPanel>
        ))}
        <News ticker=""></News>
      </div>
    </div>
  );
};

export default Home;
