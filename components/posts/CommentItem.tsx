import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import Avatar from "../Avatar";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (ev: any) => {
      ev.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id],
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div className="p-2.5 sm:p-5 transition rounded-md cursor-pointer hover:bg-foreground/5">
      <div className="flex flex-row items-start gap-5">
        <Avatar userId={data.user.id} />
        <div className="w-full">
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
                className="cursor-pointer text-neutral-500 hover:underline"
              >
                @{data.user.username}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">{createdAt}</span>
          </div>
          <div className="mt-1 text-foreground">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
