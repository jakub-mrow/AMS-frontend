import { useContext } from "react";
import AuthContext from "../auth/auth-context";
import { FaArrowRight, FaPlus, FaWallet } from 'react-icons/fa';
import Exchanges from "./Exchanges.tsx";
import { useAccounts } from "../accounts/use-accounts.ts";
import { Button } from "@mui/material";
import { AddAccountDialog } from "../accounts/AddAccountDialog.tsx";
import { TickerTape } from "react-tradingview-embed"

const Home = () => {
  useContext(AuthContext);

  const {
    accounts,
    openAddDialog,
    closeAddDialog,
    isAddDialogOpen,
    addAccount,
    goToAccount,
  } = useAccounts();

  return (
    <div className="container mx-auto p-1">
      <div className="flex flex-col m-10 space-y-10">
        <div className="space-y-5">
          <div className="flex flex-row items-center space-x-4">
            <FaWallet className="flex text-2xl" />
            <h1 className="text-2xl font-bold">Your accounts</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-14">
            {
              accounts.map((account) => (
                <div className="flex flex-col rounded-xl shadow-lg transform hover:scale-105 transition-transform">
                  <div className="h-44 w-full bg-blue-100 rounded-t-lg"></div>
                  <div className="flex flex-col space-y-1 p-2 m-1">
                    <h2 className="text-xl font-semibold mt-4 font-poppins">{account.name}</h2>
                    <span className="font-poppins">Current value: 1200 USD</span>
                  </div>
                  <Button
                    className="absolute bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 font-bold rounded"
                    onClick={() => goToAccount(account.id)}>
                    <FaArrowRight className="w-4 h-4 inline-block" />
                  </Button>
                </div>
              ))
            }
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-4 flex items-center justify-center">
              <button className="w-12 h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full flex items-center justify-center hover:scale-110 transition-transform" onClick={openAddDialog}
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
        <TickerTape widgetProps={{ colorTheme: "light" }}/>
        <Exchanges />
      </div>
    </div>
  );
};

export default Home;
