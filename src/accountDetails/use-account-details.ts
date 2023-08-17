import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Account, AccountTransaction } from "../accounts/types.ts";
import { useAuth } from "../util/use-auth.ts";
import { apiUrl } from "../config.ts";
import { AccountsDetailsService } from "./account-details-service.ts";
import { useSnackbar } from "../snackbar/use-snackbar.ts";
import { Severity } from "../snackbar/snackbar-context.ts";

export const useAccountDetails = () => {
  const { token } = useAuth(); //TODO remove after getting token
  const accountDetailsService = useMemo(() => {
    return new AccountsDetailsService(apiUrl, token);
  }, [token]);
  const { id } = useParams<{ id: string }>();
  const alert = useSnackbar();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [accountTransactions, setAccountTransactions] = useState<
    AccountTransaction[]
  >([]);
  const [isDepositDialogOpen, setIsDepositDialogOpen] = useState(false);

  const openDepositDialog = useCallback(() => {
    setIsDepositDialogOpen(true);
  }, []);

  const closeDepositDialog = useCallback(() => {
    setIsDepositDialogOpen(false);
  }, []);

  const refreshAccountData = useCallback(() => {
    if (!id) {
      return;
    }
    accountDetailsService
      .fetchAccount(Number(id))
      .then((data) => {
        setAccount(data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          navigate("/accounts", { replace: true });
        }
      });
    accountDetailsService
      .fetchAccountTransactions(Number(id))
      .then((data) => {
        setAccountTransactions(data);
      })
      .catch((error) => {
        if (error instanceof Error) {
          alert(error.message, Severity.ERROR);
          navigate("/accounts", { replace: true });
        }
      });
  }, [id, alert, accountDetailsService, navigate]);

  useEffect(() => {
    refreshAccountData();
  }, [refreshAccountData]);

  const onDeposit = (amount: number, currency: string) => {
    if (account) {
      accountDetailsService
        .depositToAccount(account.id, amount, currency)
        .then(() => refreshAccountData())
        .catch((error) => {
          if (error instanceof Error) {
            alert(error.message, Severity.ERROR);
          }
        });
    }
  };

  return {
    account,
    accountTransactions,
    openDepositDialog,
    closeDepositDialog,
    isDepositDialogOpen,
    onDeposit,
  };
};
