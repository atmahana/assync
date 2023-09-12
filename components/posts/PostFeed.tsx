import usePosts from "@/hooks/post/usePosts";

import PostItem from "./PostItem";
import Skeleton from "../Skeleton";
import { HashLoader } from "react-spinners";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading, isValidating } = usePosts(userId);

  return (
    <div className="pb-16 sm:pb-0 mx-3 sm:mx-0 relative">
      {isValidating ? (
        <div className="bg-background border border-border p-3 rounded-full w-fit fixed top-24 left-0 right-0 my-0 mx-auto drop-shadow-md">
          <HashLoader color="#8b5cf6" size={20} />
        </div>
      ) : null}
      {isLoading ? <Skeleton length={4} /> : null}
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </div>
  );
};

export default PostFeed;
