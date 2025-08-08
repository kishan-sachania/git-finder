import { client } from "@/config/client";
import { setFetchUserRepositoryList } from "@/redux/slices/github-slice";

export const fetchUserRepository = async ({ dispatch, searchQuery }) => {
  try {
    console.log(searchQuery);
    const response = await client.get(`${searchQuery}/repos`);
    dispatch(setFetchUserRepositoryList(response.data));

    if (!response.data.length > 0) {
      throw new Error("Repositories not found");
    }
  } catch (error) {
    throw new Error("Repositories not found");
  }
};
