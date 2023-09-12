import { useMemo } from "react";
import { BiCalendar } from "react-icons/bi";
import { format } from "date-fns";
import { FiEdit2 } from "react-icons/fi";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useFollow from "@/hooks/useFollow";
import useEditModal from "@/hooks/modals/useEditModal";

import Button from "../Button";

interface UserBioProps {
  id: string;
}

const UserBio: React.FC<UserBioProps> = ({ id }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(id);

  const editModal = useEditModal();

  // const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }

    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  return (
    <div className="sm:border-b sm:border-x bg-primary border-border">
      <div className="flex justify-end p-5">
        {currentUser?.username === id ? (
          <FiEdit2 size={20} onClick={editModal.onOpen} />
        ) : (
          // <Button secondary label="Edit" onClick={editModal.onOpen} />
          // <Button
          //   onClick={toggleFollow}
          //   label={isFollowing ? "Unfollow" : "Follow"}
          //   secondary={!isFollowing}
          //   outline={isFollowing}
          // />
          <div/>
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-foreground">
            {fetchedUser?.name}
          </p>
          <p className="text-md text-muted-foreground">
            @{fetchedUser?.username}
          </p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-foreground">{fetchedUser?.bio}</p>
          {/* <div className="flex flex-row items-center gap-2 mt-4 text-muted-foreground">
            <BiCalendar size={24} />
            <p>Joined {createdAt}</p>
          </div> */}
        </div>
        <div className="flex flex-row items-center gap-6 mt-4">
          <div className="flex flex-row items-center gap-1">
            <p className="text-foreground">
              {fetchedUser?.followingIds?.length}
            </p>
            <p className="text-muted-foreground">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-foreground">
              {fetchedUser?.followersCount || 0}
            </p>
            <p className="text-muted-foreground">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
