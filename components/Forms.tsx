import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import useLoginModal from "@/hooks/modals/useLoginModal";
import useRegisterModal from "@/hooks/modals/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/post/usePosts";
import usePost from "@/hooks/post/usePost";

import Avatar from "./Avatar";
import Button from "./Button";

interface FormProps {
  postId?: string;
}

const PostForm: React.FC<FormProps> = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/posts", { body });
      toast.success("Post created");
      setBody("");
      mutatePosts();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  return (
    <div className="my-5 mx-3 sm:mx-0 border rounded-lg shadow-sm bg-primary border-border p-5 group">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <Avatar id={currentUser?.username} />
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none w-full p-3 ring-0 outline-none text-[20px] bg-transparent placeholder-muted-foreground text-foreground transition duration-500" 
              placeholder="What's happening?"
            ></textarea>
            <hr className="h-[1px] w-full scale-x-0 peer-focus:scale-x-100 border-muted-foreground transition" />
            <div className="hidden group-focus-within:flex flex-row justify-end mt-4">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Post"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-2xl font-bold text-center text-white">
            Welcome to assync
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

const CommentForm: React.FC<FormProps> = ({
  postId,
}) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = `/api/comments?postId=${postId}`;

      await axios.post(url, { body });

      toast.success("Post created");
      setBody("");
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, postId, mutatePost]);

  return (
    <div className="p-5 bg-transparent">
      {currentUser ? (
        <div className="flex flex-row gap-4">
          <Avatar id={currentUser?.username} />
          <div className="w-full">
            <textarea
              disabled={isLoading}
              onChange={(event) => setBody(event.target.value)}
              value={body}
              className="disabled:opacity-80 peer resize-none w-full p-3 ring-0 outline-none text-[20px] bg-primary placeholder-muted-foreground text-foreground"
              placeholder="Post a reply"
            ></textarea>
            <hr className="h-[1px] w-full scale-x-0 peer-focus:scale-x-100 border-muted-foreground transition" />
            <div className="flex flex-row justify-end mt-4">
              <Button
                disabled={isLoading || !body}
                onClick={onSubmit}
                label="Post"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="mb-4 text-2xl font-bold text-center text-white">
            Login to post a reply
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export { PostForm, CommentForm };
