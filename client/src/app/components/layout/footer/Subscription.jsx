import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubscriptionApiService from '@/app/services/GlobalAPI/SubscriptionAPI';

const subscriptionApiService = new SubscriptionApiService();

export const Subscription = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await subscriptionApiService.Subscribe(email)
        .then(() => {
            setEmail('');
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }

  return (
    <form onSubmit={HandleSubmit}>
    <div className="flex w-full max-w-md items-center gap-2">
        <Input type="email" placeholder="דואר אלקטרוני" onChange={(e) => setEmail(e.target.value)} value={email} />
        <Button type="submit" variant="outline" disabled={loading || !email}>
          הרשם
        </Button>
    </div>
    </form>
  )
}
