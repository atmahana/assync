import { RiNotificationFill } from "react-icons/ri";
import useNotifications from "@/hooks/useNotifications";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect } from "react";
import Skeleton from "./Skeleton";

const NotificationsFeed = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [], isLoading } = useNotifications(
    currentUser?.id,
  );

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (isLoading) {
    return (
      <div className="mt-5 pt-5 sm:pt-0">
        <div className="w-full bg-primary rounded-lg">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-full bg-primary rounded-lg">
              <div className="flex gap-3 p-5">
                <div className="rounded-full w-8 h-8 aspect-square bg-background animate-pulse" />
                <div className="mt-2 h-4 w-2/3 bg-background animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (fetchedNotifications.length === 0) {
    return (
      <div className="p-6 text-xl text-center text-neutral-600">
        No notifications
      </div>
    );
  }

  return (
    <div className="flex flex-col my-5 rounded-lg shadow-sm bg-primary">
      {fetchedNotifications.map((notification: Record<string, any>) => (
        <div
          key={notification.id}
          className="flex flex-row items-center gap-4 p-6"
        >
          <RiNotificationFill color="#8b5cf6" size={24} />
          <p className="text-foreground">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
