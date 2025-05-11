'use client'
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import { motion } from "framer-motion";
import Button from "./components/Elements/Button/Index";

export default function Home() {
const AlertInstance = useAlert();
  return (
    <>
    דף  הבית פתוח לכולם
    {/* <Button onClick={() => AlertInstance("success", "The user has been successfully deleted")}>Error</Button> */}
    </>
  );
}
