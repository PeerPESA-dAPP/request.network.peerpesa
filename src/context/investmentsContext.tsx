// context/todoContext.tsx
import * as React from 'react';
import { InvestmentContextType, AInvestment } from '../@types/App';
import { useAppApi } from '../services/dbConnect';

//    export const InvestmentContext = React.createContext<InvestmentContextType | null>(null);
// Initialize the context with `undefined` as a default value
export const InvestmentContext = React.createContext<InvestmentContextType | undefined>(undefined);

const InvestmentProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
   
    const { postData, getData, updateData, deleteData } = useAppApi<null>();
    const [investment, setInvestment] = React.useState<AInvestment>({});   
     
    const saveAInvestment = async (investment: AInvestment) => {
      const content: AInvestment = {
                    // request_id: investment.request_id,
                    // loan_asset: investment.loan_asset,
                    // user_id:investment.user_id,
                    // loan_amount: investment.loan_amount,
                    // interest_rate: investment.interest_rate,
                    // interest_period: investment.interest_period,
                    // duration: investment.duration,
                    // duration_period: investment.duration_period,
                    // collateral_amount_percentage: investment.collateral_amount_percentage,
                    // collateral_assets: investment.collateral_assets,
                    // liquidation_point: investment.liquidation_point,
                    // default_penalty: investment.default_penalty,
                    // rating: investment.rating,
                    // min_loan_amount: investment.min_loan_amount,
                    // max_loan_amount: investment.max_loan_amount
      };

      const response: any = await postData(`${process.env.REACT_APP_API_URL}loans/createInvestment`, JSON.stringify(content))
      return response;

    };

    const updateAInvestment = (investment: AInvestment) => {
      const content: AInvestment = {
                // request_id: investment.request_id,
                // loan_asset: investment.loan_asset,
                // user_id:investment.user_id,
                // loan_amount: investment.loan_amount,
                // interest_rate: investment.interest_rate,
                // interest_period: investment.interest_period,
                // duration: investment.duration,
                // duration_period: investment.duration_period,
                // collateral_amount_percentage: investment.collateral_amount_percentage,
                // collateral_assets: investment.collateral_assets,
                // liquidation_point: investment.liquidation_point,
                // default_penalty: investment.default_penalty,
                // rating: investment.rating,
                // min_loan_amount: investment.min_loan_amount,
                // max_loan_amount: investment.max_loan_amount
      };
    };

    const getAllInvestments = async () => {
      const response: any = await getData(`${process.env.REACT_APP_API_URL}loans/investments`);
      return response;
    };

    return <InvestmentContext.Provider value={{ investment, getAllInvestments, saveAInvestment, updateAInvestment }}>{children}</InvestmentContext.Provider>;
  };
  
  export default InvestmentProvider;
