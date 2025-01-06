import React, { useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ConnectWalletProps } from '../@types/App';
import { faSignOutAlt, faUserCircle, faChevronDown, faChevronUp, faCopy } from '@fortawesome/free-solid-svg-icons';
import StellarSdk from 'stellar-sdk';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { Link } from 'react-router-dom';


const ConnectWebWallet: React.FC<ConnectWalletProps> = ({ chain }) => {
    const { connected, publicKey, disconnect } = useWallet();
    const [walletDetails, setWalletDetails] = useState({ address: '', chain: '', username: '' });
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleStellarConnect = () => {
        const keypair = StellarSdk.Keypair.random();
        setWalletDetails({ address: keypair.publicKey(), chain: 'Stellar', username: '' });
    };

    useEffect(() => {
        if (connected && publicKey && chain === 'solana') {
            setWalletDetails({ address: publicKey.toBase58(), chain: 'Solana', username: '' });
        } else if (!connected && chain === 'solana') {
            toast.error('No Solana wallet found. Please install Phantom Wallet.');
        }
    }, [connected, publicKey, chain]);

    const handleLogout = () => {
        disconnect();
        setWalletDetails({ address: '', chain: '', username: '' });
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(walletDetails.address);
        toast.success('Address copied to clipboard!');
    };

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
                    {chain === 'stellar' && (
                        <button
                            onClick={handleStellarConnect}
                            className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-4 rounded"
                        >
                            Connect Stellar Wallet
                        </button>
                    )}
                    {chain === 'solana' && <WalletMultiButton />}
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
