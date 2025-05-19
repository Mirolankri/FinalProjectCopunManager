'use client'
import { useAlert } from "@/providers/AlertProvider/AlertProvider";
import { motion } from "framer-motion";
import Button from "./components/Elements/Button/Index";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
const AlertInstance = useAlert();
  return (
    <>
    דף  הבית פתוח לכולם
    <Button onClick={() => router.push('/auth/login')}>to login</Button>
    {/* <Button onClick={() => AlertInstance("success", "The user has been successfully deleted")}>Error</Button> */}
    </>
  );
}
