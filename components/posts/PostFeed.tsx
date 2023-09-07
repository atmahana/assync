import usePosts from "@/hooks/post/usePosts";

import PostItem from "./PostItem";
import Skeleton from "../Skeleton";
import { useEffect } from "react";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const {
    data: posts = [],
    isLoading,
    isValidating,
    mutate,
  } = usePosts(userId);

  return (
    <div className="pb-16 sm:pb-0 mx-3 sm:mx-0">
      {isValidating ? (
        <p className="text-center text-lg font-semibold uppercase">
          is validating
        </p>
      ) : null}
      {isLoading ? <Skeleton length={4} /> : null}
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
