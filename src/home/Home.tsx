import { useContext } from "react";
import AuthContext from "../auth/auth-context";
import { FaPlus, FaWallet } from "react-icons/fa";
import Exchanges from "./Exchanges.tsx";
import { useAccounts } from "./use-accounts.ts";
import { AddAccountDialog } from "./AddAccountDialog.tsx";
import { TickerTape } from "react-tradingview-embed";
import AccountCard from "./AccountCard.tsx";
import News from "../news/News.tsx";

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
        <Exchanges />
        <News ticker=""></News>
      </div>
    </div>
  );
};

export default Home;
