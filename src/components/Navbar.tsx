
'use client'

import { useEffect, useState } from 'react';
import { Wallet } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
    const [userAddress, setUserAddress] = useState<string | null>(null);

    useEffect(() => {
        handleConnect();
    }, []);
    
    const handleConnect = async () => {
        const [address] = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        })
        setUserAddress(address);
    setIsConnected(true);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">peanut pay</span>
          </div>
          
          <button
            onClick={handleConnect}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isConnected
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-blue-600 text-white hover:bg-blue-700' 
            }`}
          >
            {isConnected ? userAddress : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;