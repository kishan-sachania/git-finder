import { setSearchHistory, setSearchUser } from "@/redux/slices/github-slice";
import { client } from "@config/client.js";

export const fetchUserFromGitHub = async ({ dispatch, searchQuery }) => {
  try {
    const response = await client.get(searchQuery);
    if (response.status !== 200) {
      throw new Error("User not found");
    }
    dispatch(setSearchUser(response.data));
    //save user to history
    dispatch(
      setSearchHistory({
        name: response.data.name,
        avatar_url: response.data.avatar_url,
        login:response.data.login
      })
    );
  } catch (error) {
    throw new Error("User not found");
  }
};
