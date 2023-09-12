import Image from "next/image";

import useUser from "@/hooks/useUser";

import Avatar from "../Avatar";

interface UserHeroProps {
  id: string;
}

const UserHero: React.FC<UserHeroProps> = ({ id }) => {
  const { data: fetchedUser } = useUser(id);

  return (
    <div>
      <div className="relative sm:border-x h-44 lg:h-56 bg-neutral-700 border-border">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <Avatar id={id} isLarge hasBorder />
        </div>
      </div>
    </div>
  );
};

export default UserHero;
