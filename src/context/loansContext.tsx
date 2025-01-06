// context/todoContext.tsx
import * as React from 'react';
import { LoanContextType, ALoanRequest, ALoanApprove, ALoanRepay } from '../@types/App';
import { useAppApi } from '../services/dbConnect';

export const LoanContext = React.createContext<LoanContextType | null>(null);
const LoanProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  
    const { postData, getData, updateData, deleteData } = useAppApi<null>();
    const [loan, setLoan] = React.useState<ALoanRequest>({});   
    const [loanApprove, setLoanApprove] = React.useState<ALoanApprove>({});   
    const [loanRepay, setLoanRepay] = React.useState<ALoanRepay>({});   
     
    const saveALoanRequest = (loan: ALoanRequest) => {
      const content: ALoanRequest = {
                            // request_id: loan.request_id,
                            // investment_id: loan.investment_id,
                            // loan_asset_id: loan.loan_asset_id,
                            // loan_amount: loan.loan_amount,
                            // duration: loan.duration,
                            // duration_period: loan.duration_period,
                            // collateral_asset: loan.collateral_asset,
                            // collateral_amount: loan.collateral_amount,
                            // status: loan.status
                          };
    };

    const updateALoanRequest = (loan: ALoanRequest) => {
      const content: ALoanRequest = {
                            // request_id: loan.request_id,
                            // investment_id: loan.investment_id,
                            // loan_asset_id: loan.loan_asset_id,
                            // loan_amount: loan.loan_amount,
                            // duration: loan.duration,
                            // duration_period: loan.duration_period,
                            // collateral_asset: loan.collateral_asset,
                            // collateral_amount: loan.collateral_amount,
                            // status: loan.status
                          };
    };

    const updateALoanApprove = (loan: ALoanApprove) => {
      const content: ALoanApprove = {
                            // request_id: loan.request_id,
                            // loan_id: loan.loan_id
                          };
    };

    const updateALoanRepay = (loan: ALoanRepay) => {
      const content: ALoanRepay = {
                                    // request_id: loan.request_id,
                                    // loan_id: loan.loan_id,
                                    // amount: loan.amount
                                  };
    };
    return <LoanContext.Provider value={{ loan, saveALoanRequest, updateALoanRequest, updateALoanApprove, updateALoanRepay }}>{children}</LoanContext.Provider>;
  };
  
  export default LoanProvider;