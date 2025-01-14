import React, { useMemo, useState, useEffect } from 'react';

import { ConnectionProvider, WalletProvider as SolanaWalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { providers } from "ethers";

import "@rainbow-me/rainbowkit/styles.css";
import { parseUnits, zeroAddress } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useWalletClient,
  useAccount,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { currencies } from "@/config/currency";
import { storageChains } from "@/config/storage-chain";
import {
  RequestNetwork,
  Types,
  Utils,
} from "@requestnetwork/request-client.js";
import {
  approveErc20,
  hasErc20Approval,
  hasSufficientFunds,
  payRequest,
} from "@requestnetwork/payment-processor";
import { clusterApiUrl } from '@solana/web3.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { getPaymentNetworkExtension } from "@requestnetwork/payment-detection";
import { useEthersV5Provider } from "@/hooks/use-ethers-v5-provider";
import { useEthersV5Signer } from "@/hooks/use-ethers-v5-signer";


// import { SorobanReactProvider } from "@soroban-react/core";
// import { testnet, sandbox, standalone } from "@soroban-react/chains";
// import { freighter } from "@soroban-react/freighter";
// import { ChainMetadata, Connector } from "@soroban-react/types";
// import type { WalletChain, ChainMetadata, ChainName } from "@soroban-react/types";
// import { useSorobanReact } from "@soroban-react/core";



import { ConnectWalletProps } from '../@types/App';
import { faSignOutAlt, faUserCircle, faChevronDown, faChevronUp, faCopy } from '@fortawesome/free-solid-svg-icons';
import StellarSdk from 'stellar-sdk';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Link } from 'react-router-dom';
import Networks from '../utils/networks';


const ConnectWebWallet: React.FC<ConnectWalletProps> = ({ chain }) => {
  const NetworkCollection: any = useMemo(() => Networks, []);   
  //const { connected, publicKey, disconnect } = useWallet();
  const [walletDetails, setWalletDetails] = useState({ address: '', chain: '', username: '' });
  //const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const [selectedNetwork, setSelectedNetwork] = useState('');
  
  
  const handleNetworkChange = async (event: any) => {

    setSelectedNetwork(event.target.value);
    await handleConnect(event.target.value);
  };


  const handleConnect = () => {
    if (selectedNetwork) {
      connectToNetwork(selectedNetwork);
    } else {
      alert('Please select a network');
    }
  };


  const handleStellarConnect = () => {
        const keypair = StellarSdk.Keypair.random();
        setWalletDetails({ address: keypair.publicKey(), chain: 'Stellar', username: '' });
  };



  const connectToNetwork: any = async (networkKey: any) => {


        let networkFilter = NetworkCollection.filter((item:any) => item.chainId === networkKey);
        if(networkFilter.length == 0 ){        
            toast.error('Network is not supported');
            return;
        }

        const network = Networks;
        if (!window.ethereum) {
            toast.error('MetaMask is not installed');
            return;
        }
    
        try {


        const switchNetWork: any = await window.ethereum.request({
                                                    method: 'wallet_switchEthereumChain',
                                                    params: [{ chainId: networkFilter[0].chainId }],
                                                });
        console.log(`Connected to ${networkFilter[0].chainName}`, switchNetWork);

        } catch (error: any) {

            if (error.code === 4902) {
                try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [network],
                });
                } catch (addError) {
                console.error('Failed to add network:', addError);
                }
            } else {
                console.error('Failed to switch network:', error);
            }
        }
    };



    //   const initConnection = () => {
    //       try{
    //             let WEB3_PROVIDER_URL= "https://your-web3-provider-url";
    //             let requestProvider: any;
    //             // if (WEB3_PROVIDER_URL === undefined) {
    //               requestProvider = new providers.Web3Provider(window.ethereum);
    //             // } else {
    //             //   requestProvider = new providers.JsonRpcProvider(WEB3_PROVIDER_URL);
    //             // }
                
    //             const web3SignatureProvider: any = new Web3SignatureProvider(requestProvider);
    //             console.log("web3SignatureProvider", web3SignatureProvider);

    //             const requestClient: any = new RequestNetwork({
    //                                             nodeConnectionConfig: { 
    //                                             baseURL: "https://sepolia.gateway.request.network/",
    //                                             },
    //                                             signatureProvider: web3SignatureProvider,
    //                                         });
    //         } catch(e){
    //              console.log("e", e)
    //         }
    //     } 

    // useEffect(() => {  
    //   if (connected && publicKey && chain === 'solana') {
    //     setWalletDetails({ address: publicKey.toBase58(), chain: 'Solana', username: '' });
    //   } else if (!connected && chain === 'solana') {
    //     // toast.error('No Solana wallet found. Please install Phantom Wallet.');
    //   }
    //   initConnection();

    // }, [connected, publicKey, chain]);

    // const handleLogout = () => {
    //     disconnect();
    //     setWalletDetails({ address: '', chain: '', username: '' });
    // };

    // const handleCopyAddress = () => {
    //     navigator.clipboard.writeText(walletDetails.address);
    //     toast.success('Address copied to clipboard!');
    // };

    return (
        <div>
            {walletDetails.address ? (
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
                        <FontAwesomeIcon icon={dropdownOpen ? faChevronUp : faChevronDown} className="ml-2" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                            <div className="block px-4 py-2 text-sm text-gray-700 flex justify-between items-center">
                                {`${walletDetails.address.slice(0, 5)}...${walletDetails.address.slice(-5)}`}
                                <FontAwesomeIcon icon={faCopy} className="cursor-pointer ml-2" onClick={handleCopyAddress} />
                            </div>
                            <Link
                                to="/userpanel/wallet"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Go to Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex space-x-4">
   
                    <div>
                        <select onChange={(e) => handleNetworkChange(e)} value={selectedNetwork}>
                            <option value="">Select a network</option>
                            <option value="0x1">Ethereum Mainnet</option>
                            <option value="0x38">Binance Smart Chain</option>
                            <option value="0xa4b1">Arbitrum One</option>
                            <option value="0x89">Polygon Mainnet</option>
                            <option value="0x5">Goerli Testnet</option>
                            <option value="0x4">Rinkeby Testnet</option>
                        </select>
                        {/* <ConnectButton showBalance={false} /> */}
                    </div>
                    
                    {/* {chain === 'stellar' && (
                        <button
                            onClick={handleStellarConnect}
                            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
                        > Login </button>
                    )}

                    {chain === 'celo' && (
                        <button
                            onClick={handleStellarConnect}
                            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded">
                            Login
                        </button>
                    )}

                    {chain === 'solana' && 
                         <WalletMultiButton />} */}

                </div>
            )}
        </div>
    );
};

interface SolanaProviderProps {
    children: React.ReactNode;
}

const SolanaProvider: React.FC<SolanaProviderProps> = ({ children }) => {
    const network = 'mainnet-beta';
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const solanaWallets = useMemo(() => [new PhantomWalletAdapter()], []);

    return (
        <ConnectionProvider endpoint={endpoint}>
            <SolanaWalletProvider wallets={solanaWallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </SolanaWalletProvider>
        </ConnectionProvider>
    );
};

export { ConnectWebWallet, SolanaProvider };
