"use client";
import React from "react";
import { NavBar } from "./TopNavBar/NavBar";

export const Header = () => {
  return (
    <>
      <NavBar />
      <div className="h-16"></div>
      <header className="bg-white shadow-sm"></header>
    </>
  );
};
