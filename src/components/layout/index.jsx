import { useEffect, useState } from "react";
import { User, Github } from "lucide-react";

import SideBar from "./components/side-bar";
import NavBar from "./components/nav-bar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserFromGitHub } from "./api/api";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import UserRepository from "../pages";

export default function SearchLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [inputError, setInputError] = useState(null);

  const searchResponse = useSelector((state) => state.SearchUser);
  const dispatch = useDispatch();

  const handleSearch = async (e, username) => {
    e.preventDefault();
    try {
      if (!username) {
        //input is empty
        if (searchQuery.trim() === "") return;

        //input include space
        if (searchQuery.trim().includes(" ")) {
          setInputError("error");

          toast("Invalid Username please remove space", {
            style: {
              backgroundColor: "#ef4444",
              color: "#fff",
            },
            
          });
          return;
        }
      } else {
        setSearchQuery(username);
      }

      setInputError(null);
      setHasError(null);
      setIsLoading(true);
      //get user from github
      await fetchUserFromGitHub({
        dispatch,
        searchQuery: username ?? searchQuery,
      });

      setHasSearched(true);
      setIsLoading(false);
    } catch (error) {
      setHasError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#0d1117] overflow-hidden">
      {/* GitHub-style Header */}
      <NavBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        inputError={inputError}
      />

      <div className="flex h-full">
        {/* Sidebar History */}
        <SideBar
          sidebarOpen={sidebarOpen}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 h-full overflow-y-scroll">
          {/* Search Results or Welcome */}

          {!hasSearched && !hasError ? (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
              <div className="text-center max-w-2xl">
                <Github className="h-16 w-16 text-[#7d8590] mx-auto mb-6" />
                <h1 className="text-4xl sm:text-5xl font-bold text-[#f0f6fc] mb-4">
                  Find Repository
                </h1>
                <p className="text-lg text-[#7d8590] mb-8">
                  Discover talented developers and explore their amazing
                  projects
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 h-full">
              {/* Loading State */}
              {isLoading && (
                <div className="h-full flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f6feb] mx-auto mb-4"></div>
                    <p className="text-[#7d8590]">
                      Searching for Repository...
                    </p>
                  </div>
                </div>
              )}

              {/* User Repository Response  */}
              {!isLoading &&
                searchResponse &&
                Object.keys(searchResponse).length > 0 &&
                !hasError && (
                  <UserRepository
                    searchQuery={searchQuery}
                    searchResponse={searchResponse}
                  />
                )}

              {/* Empty State */}
              {!isLoading && hasError && (
                <div className="h-full flex items-center justify-center py-20">
                  <div className="text-center">
                    <User className="h-16 w-16 text-[#7d8590] mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[#f0f6fc] mb-2">
                      No developers found
                    </h3>
                    <p className="text-[#7d8590]">
                      Try different search terms or browse our suggestions
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {<Toaster closeButton />}

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
