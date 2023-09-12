import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModal from "@/hooks/modals/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLike from "@/hooks/useLike";

import Avatar from "../Avatar";
import Dropdown from "../Dropdown";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });
  const [isBookmarked, setIsBookmarked] = useState(false);

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();
      router.push(`/${data.user.username}`);
    },
    [router, data.user.id],
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    async (ev: any) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike],
  );

  const onBookmark = async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsBookmarked(!isBookmarked);
  };

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
  const BookmarkIcon = isBookmarked ? BsFillBookmarkFill : BsBookmark;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="sm:mx-0 p-5 my-5 transition border rounded-lg shadow-sm cursor-pointer bg-primary border-border hover:bg-foreground/5"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar id={data.user.username}/>
        <div className="w-full space-y-2">
          <div className="flex flex-row justify-between">
            <div className="inline-flex gap-2">
              <p
                onClick={goToUser}
                className="font-semibold cursor-pointer text-foreground hover:underline"
              >
                {data.user.name}
              </p>
              <span
                onClick={goToUser}
                className="cursor-pointer text-muted-foreground hover:underline"
              >
                @{data.user.username}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{createdAt}</span>
          </div>
          <div className="w-full text-foreground">{data.body}</div>
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-10 pt-2">
              <div
                onClick={onLike}
                className="flex flex-row items-center gap-2 transition cursor-pointer text-muted-foreground hover:text-red-500 hover:bg-red-500/20 p-2 rounded-full"
              >
                <LikeIcon color={hasLiked ? "red" : ""} size={24} />
                <p>{data.likedIds.length}</p>
              </div>
              <div className="flex flex-row items-center gap-2 transition cursor-pointer text-muted-foreground hover:text-accent hover:bg-accent/20 p-2 rounded-full">
                <AiOutlineMessage size={22} />
                <p>{data.comments?.length || 0}</p>
              </div>
              {/* <div
                onClick={onBookmark}
                className="flex flex-row items-center gap-2 transition cursor-pointer text-muted-foreground hover:text-foreground hover:bg-foreground/20 p-2 rounded-full"
              >
                <BookmarkIcon size={20} color={isBookmarked ? "white" : ""} />
              </div> */}
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              {currentUser?.id === data.user.id ? <Dropdown postId={data.id}/> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
