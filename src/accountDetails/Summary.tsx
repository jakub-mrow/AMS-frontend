import { Account } from "../types.ts";
import { Loading } from "../util/Loading.tsx";
import { CloudUpload, Settings } from "@mui/icons-material";
import { displayCurrency } from "../util/display-currency.ts";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiMoneyPoundCircleLine } from "react-icons/ri";


export const Summary = ({
  account,
  isLoading,
  openAccountEditDialog,
  openImportDialog,
}: {
  isLoading: boolean;
  account: Account;
  openAccountEditDialog?: () => void;
  openImportDialog?: () => void;
}) => {
  type ColorMap = {
    [key: string]: 'text-red-800' | 'text-black' | 'text-green-800';
  };
  const colorMap: ColorMap = {
    red: 'text-red-800',
    black: 'text-black',
    green: 'text-green-800',
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex h-full items-center justify-center mt-12">
          <div className="relative bg-white py-6 px-6 rounded-xl w-full my-4 lg:shadow-xl border h-full mx-4 lg:mx-0">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-primary left-4 -top-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div className="mt-8">
              <p className="text-3xl font-semibold my-2">{account.name}</p>
              <div className="flex flex-col space-x-2 text-gray-400 text-xl">
                <div className="flex flex-row space-x-2 items-center">
                  <MdOutlineAccountBalanceWallet />
                  <p>Value</p>
                </div>
                {
                  account.hasXirr() ? (
                    <div className="flex flex-row space-x-2 items-center">
                      <p className="text-black">{account.displayValue()}</p>
                      <p className={colorMap[account.getXirrColor()]}>
                        {account.displayXirr()}
                      </p>
                    </div>
                  ) : <p className="text-black">{account.displayValue()}</p>
                }
              </div>
              <div className="flex flex-col space-x-2 text-gray-400 text-lg my-3">
                <div className="flex flex-row space-x-2 items-center">
                  <RiMoneyPoundCircleLine />
                  <p>Balances</p>
                </div>
                {account.balances.map((balance) => (
                  <div className="text-black" key={balance.currency}>
                    {displayCurrency(balance.amount, balance.currency)}
                  </div>
                ))}
              </div>
              <div className="border-t-2 "></div>

              <div className="flex flex-row justify-center items-center space-x-4">
                <div className="my-2">
                  {openImportDialog && (
                    <div>
                      <p className="font-semibold text-base mb-2">Settings</p>
                      <div className="flex items-center justify-center text-base text-gray-400 font-semibold">
                        <CloudUpload className="text-primary" onClick={openImportDialog} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="my-2">
                  {openAccountEditDialog && (
                    <div>
                      <p className="font-semibold text-base mb-2">Settings</p>
                      <div className="flex items-center justify-center text-base text-gray-400 font-semibold">
                        <Settings className="text-primary" onClick={openAccountEditDialog} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
