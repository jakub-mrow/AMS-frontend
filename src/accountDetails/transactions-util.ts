import { AccountTransactionType } from "../types.ts";
import { exhaustiveGuard } from "../util/exhaustive-switch.ts";

export const getName = (type: AccountTransactionType) => {
  switch (type) {
    case AccountTransactionType.DEPOSIT:
      return "Deposit";
    case AccountTransactionType.WITHDRAWAL:
      return "Withdrawal";
    default:
      return exhaustiveGuard(type);
  }
};

export const getSign = (type: AccountTransactionType) => {
  switch (type) {
    case AccountTransactionType.DEPOSIT:
      return "+";
    case AccountTransactionType.WITHDRAWAL:
      return "-";
    default:
      return exhaustiveGuard(type);
  }
};

export const getColor = (type: AccountTransactionType) => {
  switch (type) {
    case AccountTransactionType.DEPOSIT:
      return "green";
    case AccountTransactionType.WITHDRAWAL:
      return "red";
    default:
      return exhaustiveGuard(type);
  }
};
