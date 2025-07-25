import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
        <TriangleAlert className="size-10"/>
      <div className="flex items-center gap-3">
        
        <h1 className="text-5xl font-bold text-red-500">404</h1>
      </div>

      <p className="text-lg text-gray-700">דף לא נמצא</p>
      <Link
        href="/"
        className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 cursor-pointer"
      >
        חזרה לעמוד הראשי
      </Link>
    </div>
  );
}
