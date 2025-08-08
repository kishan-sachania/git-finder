import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Menu, Search } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const NavBar = ({
  sidebarOpen,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  inputError,
}) => {
  return (
    <>
      <header className="bg-[#161b22] border-b border-[#30363d] px-4 py-3">
        <div className="flex flex-col items-start gap-2 sm:flex-row md:items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Mobile sidebar toggle in navbar */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-[#f0f6fc] hover:bg-[#21262d] p-2"
            >
              <Menu className="h-4 w-4" />
            </Button>

            <Github className="h-8 w-8 text-white" />
            <span className="text-white font-semibold text-lg">
              Developer Search
            </span>
          </div>

          {/* GitHub-style search bar */}
          <div className="flex-1 max-w-md sm:mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative w-full flex gap-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7d8590] h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Type / to search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${
                    inputError
                      ? "border-red-400 focus:border-red-800 focus:ring-1 focus:ring-red-800"
                      : "border-[#30363d] focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb]"
                  } pl-10 pr-4 py-2 bg-[#0d1117] border  rounded-md text-[#f0f6fc] placeholder:text-[#7d8590]  w-full`}
                />
                <Button
                  className="bg-green-500 hover:bg-green-700 text-black/80"
                  onClick={() => setSearchQuery(searchQuery)}
                  disabled={searchQuery.trim() === ""}
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#f0f6fc] hover:bg-[#21262d]"
              onClick={() => window.open("https://github.com", "_blank")}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
