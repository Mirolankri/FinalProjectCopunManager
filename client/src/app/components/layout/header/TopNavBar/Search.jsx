"use client";
import React, { Suspense } from "react";
import { useUser } from "@/app/components/providers/UserProvider";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  return (
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
  );
};

const Search = () => {
  const { user } = useUser();

  if (!user) return null;
  
  return (
    <div className=" mr-4 flex items-center space-x-4">
      <Suspense fallback={<div className="h-10 w-64 bg-gray-100 rounded animate-pulse" />}>
        <SearchInput />
      </Suspense>
    </div>
  );
};

export default Search;
