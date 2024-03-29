import { Button } from "@mui/material";
import { FC } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Account } from "../types";
import accountCard from "../public/account_card_graphics.png";

interface AccountCardProps {
  account: Account;
  goToAccount: (id: number) => void;
}

const AccountCard: FC<AccountCardProps> = ({ account, goToAccount }) => {
  return (
    <div className="flex flex-col rounded-xl shadow-lg transform hover:scale-105 transition-transform">
      <div className="h-44 w-full bg-blue-100 rounded-t-lg">
        <img src={accountCard} className="w-full h-full object-cover"></img>
      </div>
      <div className="flex flex-row justify-between p-2 m-1">
        <div className="flex flex-col space-y-1">
          <h2 className="text-xl font-semibold mt-4 font-poppins">
            {account.name}
          </h2>
          <span className="font-poppins">
            Current value: {account.displayValue()}
          </span>
        </div>
        <Button
          className="self-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
          onClick={() => goToAccount(account.id)}
        >
          <FaArrowRight className="w-4 h-4 inline-block" />
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
