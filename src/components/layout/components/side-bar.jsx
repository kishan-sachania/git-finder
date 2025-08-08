import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { deleteUserSearchHistory } from "@/redux/slices/github-slice";
import { BrushCleaning, Clock, EqualApproximately } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SideBar = ({ sidebarOpen, setSearchQuery, handleSearch }) => {
  const userSearchHistory = useSelector((state) => state.UserSearchHistory);
  const dispatch = useDispatch();

  //handle clear history
  const handleDeleteHistory = () => {
    const prompt=confirm("Are you sure you want to clear your search history?");
    if(prompt){
      dispatch(deleteUserSearchHistory());
    }
  };

  return (
    <div
      className={` fixed lg:static inset-y-0 left-0 z-50 w-64 h-screen  bg-[#0d1117] border-r  border-[#21262d] transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } pt-0`}
    >
      <div className="p-4 pt-6  h-screen">
        <div className="mb-6 h-full">
          {userSearchHistory?.length > 0 ? (
            <div className="flex justify-between items-center">
              <h3 className="text-[#f0f6fc] font-semibold mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Search History
              </h3>
              <p
                className="text-[#f0f6fc]/80 mb-3 cursor-pointer"
                onClick={handleDeleteHistory}
              >
                clear
              </p>
            </div>
          ) : (
            <h3 className="text-[#f0f6fc] h-full  font-semibold mb-3  flex flex-col items-center justify-center gap-2">
              <BrushCleaning className="h-14 w-14 text-gray-300/30" />
              No Search Perform
            </h3>
          )}
          <ScrollArea className="h-full">
            <div className="space-y-1">
              {userSearchHistory?.map((user, index) => (
                <div key={index} className="flex items-center cursor-pointer">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={user.avatar_url || "/placeholder.svg"}
                      alt={user.name ?? user.login}
                    />
                  </Avatar>
                  <button
                    onClick={(e) => {
                      handleSearch(e, user.login);
                    }}
                    className="cursor-pointer w-full text-left px-3 py-2 text-sm text-[#7d8590] hover:text-[#f0f6fc] hover:bg-[#21262d] rounded-md transition-colors"
                  >
                    {user.name ?? user.login}
                  </button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
