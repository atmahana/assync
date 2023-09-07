import axios from "axios";
import useSWRMutation from "swr/mutation";
import usePost from "./usePost";
import usePosts from "./usePosts";

import { toast } from "react-hot-toast";

const useDeletePost = (postId: string, userId?: string) => {
  const url = `/api/posts/${postId}`;
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const { data, error, trigger, reset, isMutating } = useSWRMutation(url, (url: string) =>
    axios.delete(url).then((res) => res.data),
  );

  const deletePost = async () => {
    try {
      await trigger();
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success("Successfully deleted")
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error);
      toast.error(message)
    }
  }

  return { deletePost }
}

export default useDeletePost;