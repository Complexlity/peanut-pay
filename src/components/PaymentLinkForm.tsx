'use client'
import  { useState } from 'react';
import { Loader2, Link as LinkIcon } from 'lucide-react';
import TokenSelect from './TokenSelect';

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
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);
  const [isResolving, setIsResolving] = useState(false);

  const resolveEns = async (ensName: string) => {
    if (!ensName.endsWith('.eth')) return;
    
    setIsResolving(true);
    // Simulate ENS resolution
    setTimeout(() => {
      setResolvedAddress('0x9647BB6a598c2675310c512e0566B60a5aEE6261');
      setIsResolving(false);
    }, 1000);
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

  const generateLink = () => {
    const address = resolvedAddress || formData.recipient;
    const parts = [address];

    if (formData.chain) parts.push(formData.chain);
    if (formData.amount) parts.push(formData.amount);
    if (formData.token) parts.push(formData.token);

    return `pay.to/${parts.join('/')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
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
            <p className="mt-1 text-sm text-gray-600">
              Resolved: {resolvedAddress.slice(0, 6)}...{resolvedAddress.slice(-4)}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="chain" className="block text-sm font-medium text-gray-700 mb-1">
            Chain (Optional)
          </label>
          <input
            type="text"
            id="chain"
            name="chain"
            value={formData.chain}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., optimism"
          />
        </div>

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

        <div className="pt-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
              <LinkIcon className="w-4 h-4" />
              <span className="font-medium">Generated Link:</span>
            </div>
            <code className="block w-full p-2 bg-white rounded border border-gray-200 text-sm break-all">
              {generateLink()}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentLinkForm;