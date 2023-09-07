import useDeletePost from "@/hooks/post/useDeletePost";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/modals/useLoginModal";
import { useState } from "react";
import { SlOptions } from "react-icons/sl";

interface DropdownProps {
  userId?: string;
  postId: string;
}

const Dropdown: React.FC<DropdownProps> = ({ userId, postId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: currentUser } = useCurrentUser();
  const { deletePost } = useDeletePost(postId);
  const loginModal = useLoginModal();

  const onDelete = (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    deletePost();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-2 hover:bg-accent/20 hover:text-foreground/80 rounded-full"
      >
        <SlOptions size={20} />
      </button>
      {isExpanded ? (
        <div className="mt-0 absolute right-0 bg-background min-w-[8rem] text-foreground border border-border rounded-lg p-0.5">
          <ul>
            <li
              onClick={onDelete}
              className="hover:bg-foreground/5 px-2 py-1 rounded-md"
            >
              Delete
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
