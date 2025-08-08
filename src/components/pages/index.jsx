import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  ExternalLink,
  Github,
  Star,
  GitFork,
  Menu,
  Building,
  MapPin,
  LinkIcon,
  Calendar,
  Users,
  UserPlus,
  BookMarked,
  Filter,
  Search,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRepository } from "./user-repository/api/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Loader from "../layout/components/Loader";

const getLanguageColor = (language) => {
  const colors = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Go: "#00ADD8",
    Java: "#b07219",
    CSS: "#563d7c",
    HTML: "#e34c26",
  };
  return colors[language] || "#8b949e";
};

const UserRepository = ({ searchQuery, searchResponse }) => {
  const [repositoryError, setRepositoryError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [repoList, setRepoList] = useState([]);
  const [loading, setLoading] = useState(false);

  const userRepositoryList = useSelector((state) => state.UserRepositoryList);
  const dispatch = useDispatch();

  useEffect(() => {
    setRepoList(userRepositoryList);
  }, [userRepositoryList]);

  //On change of selected sort option, sort the repository list
  useEffect(() => {
    if (selected === "name") {
      const newList = [...userRepositoryList].sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
      console.log(newList);
      setRepoList(newList);
    } else {
      const newList = [...userRepositoryList].sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );

      setRepoList(newList);
    }
  }, [selected]);

  const resetList = () => {
    setSelected(null);
    setRepoList(userRepositoryList);
  };

  //GET Repository
  useEffect(() => {
    (async () => {
      try {
        await fetchUserRepository({ dispatch, searchQuery });
      } catch (err) {
        setRepositoryError(err?.message);
      }
    })();
  }, [searchResponse]);

  //Filter item on Input
  const handleSearch = (input) => {
    setRepositoryError(null);
    if (input.trim() === "") setRepoList(userRepositoryList);

    const filteredList = userRepositoryList.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
    if (filteredList.length === 0) {
      setRepositoryError("No repositories found");
    }
    setRepoList(filteredList);
  };

  //Debounce to delay search as event continues
  const debounceSearch = (func, time = 2000) => {
    let timeout;
    return (...args) => {
      setLoading(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
        setLoading(false);
      }, time);
    };
  };

  const handleDebounce = debounceSearch(handleSearch);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#f0f6fc] mb-2">
          Developer Profile
        </h2>
        <p className="text-[#7d8590]">Results for "{searchQuery}"</p>
      </div>

      {/*  User Profile Card */}
      <Card className="bg-[#161b22] border-[#30363d] mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar and Basic Info */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={searchResponse.avatar_url || "/placeholder.svg"}
                  alt={searchResponse.name || searchResponse.login}
                />
                <AvatarFallback className="bg-[#21262d] text-[#f0f6fc] text-2xl">
                  {(searchResponse.name || searchResponse.login)
                    .charAt(0)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                className="border-[#30363d]  text-[#f0f6fc] bg-[#21262d] cursor-pointer"
                onClick={() => window.open(searchResponse.html_url, "_blank")}
              >
                <Github className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-[#f0f6fc] mb-1">
                  {searchResponse.name || searchResponse.login}
                </h3>
                <p className="text-[#7d8590] text-lg">
                  @{searchResponse.login}
                </p>
              </div>

              {searchResponse.bio && (
                <p className="text-[#f0f6fc] mb-4">{searchResponse.bio}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {searchResponse.company && (
                  <div className="flex items-center gap-2 text-[#7d8590]">
                    <Building className="h-4 w-4" />
                    <span>{searchResponse.company}</span>
                  </div>
                )}
                {searchResponse.location && (
                  <div className="flex items-center gap-2 text-[#7d8590]">
                    <MapPin className="h-4 w-4" />
                    <span>{searchResponse.location}</span>
                  </div>
                )}
                {searchResponse.blog && (
                  <div className="flex items-center gap-2 text-[#7d8590]">
                    <LinkIcon className="h-4 w-4" />
                    <a
                      href={searchResponse.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#1f6feb] hover:underline"
                    >
                      {searchResponse.blog}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-[#7d8590]">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(searchResponse.created_at)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1 text-[#7d8590]">
                  <Users className="h-4 w-4" />
                  <span className="text-[#f0f6fc] font-semibold">
                    {searchResponse.followers}
                  </span>
                  <span>followers</span>
                </div>
                <div className="flex items-center gap-1 text-[#7d8590]">
                  <UserPlus className="h-4 w-4" />
                  <span className="text-[#f0f6fc] font-semibold">
                    {searchResponse.following}
                  </span>
                  <span>following</span>
                </div>
                <div className="flex items-center gap-1 text-[#7d8590]">
                  <Github className="h-4 w-4" />
                  <span className="text-[#f0f6fc] font-semibold">
                    {searchResponse.public_repos}
                  </span>
                  <span>repositories</span>
                </div>
                <div className="flex items-center gap-1 text-[#7d8590]">
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-[#f0f6fc] font-semibold">
                    {searchResponse.public_gists}
                  </span>
                  <span>gists</span>
                </div>
              </div>

              {searchResponse.hireable && (
                <div className="mt-4">
                  <Badge
                    variant="secondary"
                    className="bg-[#238636] text-white"
                  >
                    Available for hire
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repositories Section */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
        <h3 className="text-xl font-bold text-[#f0f6fc] flex-shrink-0">
          Popular Repositories
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex gap-2 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-[#161b22] text-[#7d8590] border-[#30363d] hover:bg-[#21262d] hover:text-[#f0f6fc]"
                >
                  <Filter size={16} className="mr-2" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#161b22] text-[#7d8590] border-[#30363d]"
                align="start"
              >
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#30363d]" />
                <RadioGroup value={selected} onValueChange={setSelected}>
                  <DropdownMenuItem
                    className={
                      selected === "name" ? "bg-[#21262d] text-[#f0f6fc]" : ""
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {" "}
                    {/* Prevent closing on radio select */}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="name"
                        id="name"
                        className="peer sr-only "
                      />
                      <Label
                        htmlFor="name"
                        className=" w-full py-2 px-1 rounded cursor-pointer"
                      >
                        Name (Z-A)
                      </Label>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={
                      selected === "star-counter"
                        ? "bg-[#21262d] text-[#f0f6fc]"
                        : ""
                    }
                    onSelect={(e) => e.preventDefault()}
                  >
                    {" "}
                    {/* Prevent closing on radio select */}
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="star-counter"
                        id="star-counter"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="star-counter"
                        className=" w-full py-2 px-1 rounded  cursor-pointer"
                      >
                        Star Count
                      </Label>
                    </div>
                  </DropdownMenuItem>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              className="bg-[#21262d] text-[#7d8590] border border-[#30363d] hover:bg-[#30363d] hover:text-[#f0f6fc]"
              onClick={resetList}
            >
              Reset
            </Button>
          </div>
          <div className="flex-1 relative w-full sm:max-w-xs lg:max-w-md">
            {" "}
            {/* Adjusted width for responsiveness */}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7d8590] h-4 w-4" />
            <Input
              type="text"
              placeholder="Search Repository"
              onChange={(e) => handleDebounce(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#f0f6fc] placeholder:text-[#7d8590] focus:border-[#1f6feb] focus:ring-1 focus:ring-[#1f6feb] w-full"
            />
            {loading && (
              // <Loader className="absolute right-2 top-1.5 text-white " /> // Uncomment if Loader exists
              <div className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin rounded-full h-4 w-4 border-b-2 border-[#1f6feb]"></div>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 pb-20">
        {repoList.length > 0 &&
          repoList.map((repo) => (
            <Card
              key={repo.id}
              className="bg-[#161b22] border-[#30363d] hover:border-[#7d8590] transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg text-[#1f6feb] hover:underline cursor-pointer w-52 truncate ">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.name}
                      </a>
                    </CardTitle>
                    <CardDescription className="text-[#7d8590] mt-1">
                      {repo.description}
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#30363d] text-[#7d8590] ml-2"
                  >
                    {repo.private ? "Private" : "Public"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {repo.topics.slice(0, 3).map((topic, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.topics.length - 3}
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#7d8590]">
                  <div className="flex items-center gap-4">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: getLanguageColor(repo.language),
                          }}
                        ></div>
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks_count}
                    </div>
                  </div>
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Empty State */}
      {repositoryError && (
        <div className="h-full flex items-center justify-center pb-20">
          <div className="text-center">
            <BookMarked className="h-16 w-16 text-[#7d8590]/80 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#f0f6fc] mb-2">
              No Repository found
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRepository;
