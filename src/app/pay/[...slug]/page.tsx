"use client"

import PayUser from "@/components/PayUser"
import { parsePaymentUrl } from "@/lib/utils";
export default function PaymentPage({ params }: { params: { slug: string[] } }) {
    const { recipient, chain, amount, token } = parsePaymentUrl(params.slug)

    return (
      <div className="container mx-auto px-4 py-8">
           <PayUser
          recipient={recipient}
          chain={chain}
          amount={amount}
          token={token}
        />
      </div>
    )
  }
  
  