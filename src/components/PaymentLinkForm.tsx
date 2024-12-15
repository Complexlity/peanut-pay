'use client'

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import TokenSelect from './TokenSelect';
import GeneratedLink from './GeneratedLink';
import { getAddressForEns } from '@/lib/utils';
import { BASE_URL } from '@/lib/constants';
import ChainSelect from './ChainSelect';
import peanut from '@squirrel-labs/peanut-sdk';
import { Address } from 'viem';
import { create } from 'domain';

interface FormData {
  recipient: string;
  chain?: string;
  amount?: string;
  token?: string;
}


const PaymentLinkForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    recipient: '',
    chain: '',
    amount: '',
    token: '',
  });


  

  async function createRequestLink({
    chainId,
    tokenAddress,
    tokenAmount,
    tokenDecimals,
    recipientAddress,
    apiKey,
  }: {
      chainId: string,
      tokenAddress: Address,
      tokenAmount: string,
      tokenDecimals: string,
      recipientAddress: Address,
      apiKey: string
  }): Promise<string | undefined> {
    try {
      const { link } = await peanut.createRequestLink({
        chainId,
        tokenAddress,
        tokenAmount,
        tokenType: peanut.interfaces.EPeanutLinkType.erc20, // or EPeanutLinkType.native
        tokenDecimals,
        recipientAddress,
        APIKey: apiKey,
      });
      return link;
    } catch (error) {
      console.error('Error creating request link:', error);
      return undefined
    }
  }
  


  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const resolveEns = async (ensName: string) => {
    if (!ensName.endsWith('.eth')) return;
    
    setIsResolving(true);
    // Simulate ENS resolution
    let address = null;
    try {
      address = await getAddressForEns(ensName);
    } catch (error) {
      console.error('Failed to resolve ENS:', error);
      
    }
    setResolvedAddress(address);
    setIsResolving(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'recipient' && value.endsWith('.eth')) {
      resolveEns(value);
    } else if (name === 'recipient') {
      setResolvedAddress(null);
    }
  };



  const handleTokenChange = (value: string) => {
    setFormData(prev => ({ ...prev, token: value }));
  };

  const handleChainChange = (value: string) => {
    setFormData(prev => ({ ...prev, chain: value }));
  };

  const tempGenerateLink = () => {
    const recepient = formData.recipient;
    const parts = [recepient];

    if (formData.chain) parts.push(formData.chain);
    if (formData.amount) parts.push(formData.amount);
    if (formData.token) parts.push(formData.token);

    // await
    return `${BASE_URL}/pay/${parts.join('/')}`;
  };

  const handleGenerateLink = async () => {

    // const recipientAddress = '0x42A5DC31169Da17639468e7Ffa271e90Fdb5e85A';
  // const tokenAddress = '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85'; // USDC on Optimism
  // const chainId = '10';  // Optimism
  // const tokenAmount = '10';
  // const tokenDecimals = '6';
    // const APIKey = 'UtyraajNKZqCelV3k2U0Y1xW7l3WwWpI';
    
    // const link = await createRequestLink({
    //   recepientAddress: resolvedAddress || formData.recipient,
    //   chainId:
    // });
    //
    //Use peanut sdk to generate the payment link for the user to copy
    
  };

  const hasOtherValues = (!!formData.chain || !!formData.amount || !!formData.token);
  

  return (
    <div className="w-full max-w-lg mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Link Generator</h1>
        <p className="text-gray-600">Create your custom payment link</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address or ENS
          </label>
          <div className="relative">
            <input
              type="text"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0x... or name.eth"
              required
            />
            {isResolving && (
              <div className="absolute right-3 top-2.5">
                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              </div>
            )}
          </div>
          {resolvedAddress && (
            <>
            <p className="hidden sm:block py-4 text-sm text-gray-600">
              Address: {resolvedAddress}
            </p>
            <p className="sm:hidden py-4 text-sm text-gray-600">
              Address: {resolvedAddress.slice(0, 8)}...{resolvedAddress.slice(-6)}
            </p>
            </>
          )}
        </div>

        <ChainSelect value={formData.chain || ''} onChange={handleChainChange} />

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (Optional)
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

        <TokenSelect value={formData.token || ''} onChange={handleTokenChange} />

        {/* <GeneratedLink link={handleGenerateLink()} address={resolvedAddress || formData.recipient} hasOtherValues={hasOtherValues} /> */}
        <GeneratedLink link={tempGenerateLink()} address={resolvedAddress || formData.recipient} hasOtherValues={hasOtherValues} />

        {/* <button onClick={handleGenerateLink} className="w-full py-3 px-4 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700">Generate Link</button> */}
      </div>
    </div>
  );
};

export default PaymentLinkForm;