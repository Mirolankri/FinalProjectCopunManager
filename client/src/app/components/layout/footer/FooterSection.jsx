'use client'
import { Footer, FooterBottom, FooterColumn, FooterContent } from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import {  GiftIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FooterData = {
    logo : <GiftIcon />,
    name : "CouPoint",
    columns : [
      
      {
        title: "Contact",
        links: [
          { text: "Discord", href: "/" },
          { text: "Twitter", href: "/" },
          { text: "Github", href: "/" },
        ],
      },
    ],
    copyright : "© 2025 CouPoint. All rights reserved",
    policies : [
      { text: "מדיניות הפרטיות", href: "/" },
      { text: "תנאי שימוש", href: "/" },
    ],
    className : "",
}
export default function FooterSection() {
  return (
    <footer className={cn("bg-background w-full px-4 border-t", FooterData.className)}>
      <div className="mx-auto">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-1 sm:col-span-1 md:col-span-1">
              <div className="flex items-center gap-2">
                {FooterData.logo}
                <h3 className="text-xl font-bold">{FooterData.name}</h3>
              </div>
            </FooterColumn>
            <FooterColumn className="col-span-1 sm:col-span-1 md:col-span-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">עקבו אחרינו</h3>
              </div>
              <div className="flex flex-col gap-2">
                <Link href={"/"}>FaceBook</Link>
                <Link href={"/"}>Instagram</Link>
                <Link href={"/"}>WhatsApp</Link>
              </div>
            </FooterColumn>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">הישאר מעודכן</h3>
              </div>
              <div className="flex w-full max-w-md items-center gap-2">
                <Input type="email" placeholder="דואר אלקטרוני" />
                <Button type="submit" variant="outline">
                  הרשם
                </Button>
              </div>
            </FooterColumn>
          </FooterContent>
          <FooterBottom>
            <div>{FooterData.copyright}</div>
            <div className="flex items-center gap-4">
              {FooterData.policies.map((policy, index) => (
                <Link key={index} href={policy.href}>
                  {policy.text}
                </Link>
              ))}
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
