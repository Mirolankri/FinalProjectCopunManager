'use client'
import React from 'react'
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ShortString } from '@/helpers/Strings/StringsHelpers';
export const CouponDescription = ({description}) => {
    return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link">{ShortString(description,20)}</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-50 max-h-50 overflow-auto">
            <div className="flex justify-between gap-4 ">
              <div className="">
                <h4 className="text-sm font-semibold ">תאור הקופון</h4>
                <p className="text-sm whitespace-pre-wrap">
                {description}
                </p>
                
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )
}
