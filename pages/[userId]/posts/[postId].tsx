import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import usePost from "@/hooks/post/usePost";

import Header from "@/components/Header";
import { CreateCommentForm } from "@/components/Forms";
import PostItem from "@/components/posts/PostItem";
import CommentFeed from "@/components/posts/CommentFeed";
import Head from "next/head";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{fetchedPost.user.name}: "{fetchedPost.body}" / assync</title>
      </Head>
      <Header showBackArrow label="Post" />
      <div className="mx-3 sm:mx-0">
        <PostItem data={fetchedPost} />
      </div>
      <div className="my-5 mx-3 sm:mx-0 rounded-lg bg-primary border border-border divide-y divide-border">
        <CreateCommentForm postId={postId as string} />
        <CommentFeed comments={fetchedPost?.comments} />
      </div>
    </>
  );
};

export default PostView;
