"use client";

import Image from "next/image";
import Post from "./ui/post";
import ListPost from "./ui/listPost";
import { useAuth } from "./context/auth";
import { useEffect } from "react";
import { useTheme } from "./context/theme";

export default function Home() {
  return (
    <div className="min-h-screen p-[100px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ListPost/>
    </div>
  );
}
