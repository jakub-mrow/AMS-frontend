import { Asset, AssetBalanceHistory, BaseStockValue } from "../types.ts";
import { Loading } from "../util/Loading.tsx";
import { displayCurrency } from "../util/display-currency.ts";
import { AssetChart } from "./AssetChart.tsx";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { RiMoneyPoundCircleLine } from "react-icons/ri";

export const AssetSummary = ({
  stock,
  histories,
  isLoading,
  baseStockValue,
  isMobile,
}: {
  isLoading: boolean;
  histories: AssetBalanceHistory[];
  stock: Asset;
  baseStockValue: BaseStockValue;
  isMobile: boolean;
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
        <div className="flex h-full items-center justify-center mt-2">
          <div className="relative bg-white py-6 px-6 rounded-xl w-full my-4 lg:shadow-xl border h-full mx-4 lg:mx-0">
            <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-primary left-4 -top-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>

            <div className="mt-8 overflow-y-auto max-h-full">
              <p className="text-3xl font-semibold my-2">{stock.name}</p>
              <div className="flex flex-col space-x-2 text-gray-400 text-xl">
                <div className="flex flex-row space-x-2 items-center">
                  <MdOutlineAccountBalanceWallet />
                  <p>Value</p>
                </div>
                <div className="flex flex-row space-x-2">
                  <p className="text-black">{displayCurrency(stock.price * stock.quantity, stock.currency)}</p>
                  <p className={colorMap[stock.getResultColor()]}>
                    {stock.displayResult()}
                  </p>
                </div>
              </div>
              {
                stock.currency !== baseStockValue.currency && (
                  <div className="flex flex-col space-x-2 text-gray-400 text-lg my-3">
                    <div className="flex flex-row space-x-2 items-center">
                      <RiMoneyPoundCircleLine />
                      <p>Value in {baseStockValue.currency}:</p>
                    </div>
                    <p className="text-black">{displayCurrency(
                      baseStockValue.price * stock.quantity,
                      baseStockValue.currency,
                    )}</p>
                  </div>
                )
              }

              <div className="flex flex-col space-x-2 text-gray-400 text-lg my-3">
                <div className="flex flex-row space-x-2 items-center">
                  <RiMoneyPoundCircleLine />
                  <p>Quantity</p>
                </div>
                <p className="text-black">{stock.quantity}</p>
              </div>

              <div className="flex flex-col space-x-2 text-gray-400 text-lg my-3">
                <div className="flex flex-row space-x-2 items-center">
                  <RiMoneyPoundCircleLine />
                  <p>Price</p>
                </div>
                <p className="text-black">{displayCurrency(stock.price, stock.currency)}</p>
              </div>
              {isMobile && (
                <AssetChart
                  isLoading={isLoading}
                  histories={histories}
                  isMobile={isMobile}
                  stockCurrency={stock.currency}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
