import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";

import useUser from "@/hooks/useUser";

interface AvatarProps {
  id: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ id, isLarge, hasBorder }) => {
  const router = useRouter();

  const { data: fetchedUser } = useUser(id);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push({
        pathname: "/[userId]",
        query: { userId: id },
      });
    },
    [router, id],
  );

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-primary" : ""}
        ${isLarge ? "h-32" : "h-10 sm:h-12"}
        ${isLarge ? "w-32" : "w-10 sm:w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
        aspect-square
      `}
    >
      <Image
        fill
        sizes="20"
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={fetchedUser?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
