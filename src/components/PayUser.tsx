"use client"

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import TokenSelect from './TokenSelect';
import ChainSelect from './ChainSelect';
import { Address, isAddress, parseEther } from 'viem';
import { getAddressForEns, getWindowClient } from '@/lib/utils';
import { SUPPORTED_CHAINS, SUPPORTED_TOKENS } from '@/lib/constants';

interface Props {
    recipient: string;
    chain?: string;
    amount?: string;
    token?: string;
}

function PayRoute({ recipient, chain, amount, token }: Props) {
  const [isPaying, setIsPaying] = useState(false)
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
    const [isResolving, setIsResolving] = useState(false);

    console.log(token, SUPPORTED_TOKENS.find(token => token.symbol.toLowerCase() ===`${token}`.toLowerCase())) 
    //@ts-expect-error: verify chain is a key of supported chains
    if (!chain || !(SUPPORTED_CHAINS[chain])) {
        chain = ""
    }
    if (!amount || isNaN(Number(amount))) {
        amount = ""
    }
    if (!token || !SUPPORTED_TOKENS.find(t => t.symbol.toLowerCase() === `${token}`.toLowerCase())) { 
        token = "";
    }
  const [formData, setFormData] = useState({
    recipient,
    chain,
    amount,
    token
  });

  useEffect(() => {
    const resolveRecipient = async () => {
      const recipient = formData.recipient
      if (recipient.endsWith('.eth')) {
        setIsResolving(true);
        // Simulate ENS resolution
        let address = null;
        try {
          address = await getAddressForEns(recipient);
        } catch (error) {
          console.error('Failed to resolve ENS:', error);
        }
          setResolvedAddress(address);
        }
        else if(isAddress(recipient)) {
            setResolvedAddress(recipient);
        }
    else {
        setResolvedAddress(null);
    }
        setIsResolving(false);
    };

    resolveRecipient();
  }, [formData.recipient]);


  const handleTokenChange = (value: string) => {
    setFormData(prev => ({ ...prev, token: value }));
  };

  const handleChainChange = (value: string) => {
    setFormData(prev => ({ ...prev, chain: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  async function handlePayment() {

    setIsPaying(true)
    alert("Getting window client...")
    const { recipient, chain, amount, token } = formData
    const paymentChain = chain as keyof typeof SUPPORTED_CHAINS
    const walletClient = getWindowClient(paymentChain)
    //Use peanut sdk to call the request link and send the payment


    setIsPaying(false)
  }

  const isPaymentValid = !!(resolvedAddress && !isResolving) && !!(SUPPORTED_TOKENS.find(t => t.symbol.toLowerCase() === `${formData.token}`.toLowerCase())) && !!(SUPPORTED_CHAINS[formData.chain as keyof typeof SUPPORTED_CHAINS]);

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h1>
        <p className="text-gray-600">Review and confirm your payment details</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient
          </label>
          <div className="relative">
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            {isResolving && (
              <div className="absolute right-3 top-2.5">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              </div>
            )}
          </div>
                  {resolvedAddress && (
                      <>
            <p className="hidden sm:block mt-1 text-sm text-gray-600">
              {resolvedAddress}
            </p>
            <p className="sm:hidden mt-1 text-sm text-gray-600">
              {resolvedAddress.slice(0, 6)}...{resolvedAddress.slice(-4)}
            </p>
                      </>
          )}
          {!isResolving && !resolvedAddress && (
            <p className="mt-1 text-sm text-red-600">
              Invalid recipient address or ENS name
            </p>
          )}
        </div>

        <ChainSelect value={formData.chain} onChange={handleChainChange} />

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 10"
          />
        </div>

        <TokenSelect value={formData.token} onChange={handleTokenChange} />

        <CompletePaymentButton  isPaymentValid={isPaymentValid} isResolving={isResolving} handlePayment={handlePayment} />
        
      </div>
    </div>
  );
};


function CompletePaymentButton ({ isPaymentValid, isResolving, handlePayment }: { isPaymentValid: boolean, isResolving: boolean, handlePayment: () => void }) {
  return (
    <button
      onClick={handlePayment}
      disabled={!isPaymentValid}
      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
        isPaymentValid
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
      }`}
    >
      {isResolving ? 'Resolving Address...' : 'Complete Payment'}
    </button>
  )
}

export default PayRoute;