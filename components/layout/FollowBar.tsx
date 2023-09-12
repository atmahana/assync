import useUsers from "@/hooks/useUsers";
import { useRouter } from "next/router";

import Avatar from "../Avatar";
import Skeleton from "../Skeleton";

const FollowBar = () => {
  const { data: users = [], isLoading } = useUsers();

  const router = useRouter();

  return (
    <div className="hidden xl:block">
      <div className="p-4 border rounded-lg shadow-sm bg-primary border-border">
        <h2 className="text-xl font-semibold text-foreground">Who to follow</h2>
        <div className="flex flex-col gap-6 mt-4">
          {isLoading ? (
            <Skeleton isSmall length={4} />
          ) : (
            users.map((user: Record<string, any>) => (
              <div
                key={user.id}
                className="flex flex-row gap-4 cursor-pointer"
                onClick={() => router.push(`/${user.username}`)}
              >
                <Avatar id={user.username}/>
                <div className="flex flex-col">
                  <p className="text-sm font-semibold text-foreground">
                    {user.name}
                  </p>
                  <p className="text-sm text-neutral-400">@{user.username}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
