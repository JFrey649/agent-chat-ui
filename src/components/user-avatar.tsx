"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { User, LogIn, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export function UserAvatar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        aria-label="User menu"
      >
        <Avatar className="size-8">
          <AvatarFallback className="bg-blue-500 text-white">
            <User className="size-5" />
          </AvatarFallback>
        </Avatar>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md border bg-white shadow-lg z-50">
          <div className="p-1">
            {!isLoggedIn ? (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={handleLogin}
              >
                <LogIn className="size-4" />
                <span>登录</span>
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="size-4" />
                <span>退出登录</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

