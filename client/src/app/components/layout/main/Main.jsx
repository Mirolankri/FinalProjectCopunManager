"use client";
import React from "react";

export const Main = ({ children }) => {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 min-h-[67vh]">
        {children}
      </div>
    </main>
  );
};
