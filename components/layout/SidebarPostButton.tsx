import { useCallback } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { useRouter } from "next/router";

import useLoginModal from "@/hooks/modals/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarPostButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();

  const onClick = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    router.push("/");
  }, [loginModal, router, currentUser]);

  return (
    <div onClick={onClick} className="fixed right-4 bottom-20 sm:hidden">
      <div className="flex items-center justify-center p-4 mt-6 transition rounded-full cursor-pointer lg:hidden h-14 w-14 bg-accent hover:bg-opacity-80">
        <BiSolidPencil size={24} color="white" />
      </div>
      <div className="hidden px-4 py-2 mt-6 rounded-full cursor-pointer lg:block bg-accent hover:bg-opacity-90">
        <p
          className="
            hidden 
            lg:block 
            text-center
            font-semibold
            text-white 
            text-[20px]
        "
        >
          Post
        </p>
      </div>
    </div>
  );
};

export default SidebarPostButton;
