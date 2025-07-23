"use client";
import React from "react";
import { useUser } from "@/app/components/providers/UserProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { user } = useUser();

  const handleChange = ({ target }) => {
    const ValueParams = target.value;
    if (ValueParams === "") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("q");
      return router.push(`${pathname}`);
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", ValueParams);
    router.push(`/coupons?${params.toString()}`);
  };

  if (!user) return null;
  return (
    <div className=" mr-4 flex items-center space-x-4">
      <div className="relative">
        <Input
          onChange={handleChange}
          type="text"
          placeholder="חיפוש"
          autoComplete="off"
          className="pr-10 bg-white"
        />
        <SearchIcon className="absolute top-1/2 right-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default Search;
