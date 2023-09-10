import React, { useCallback, useTransition } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

import useLoginModal from "@/hooks/modals/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  icon: IconType;
  activeIcon: IconType;
  href?: string;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  activeIcon: ActiveIcon,
  href,
  auth,
  onClick,
  alert,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [_, startTransition] = useTransition();

  const pathname = usePathname();
  const isActive = pathname === href;

  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      startTransition(() => {
        router.push(href);
      });
    }
  }, [router, href, auth, loginModal, onClick, currentUser]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative flex items-center justify-center p-4 rounded-lg cursor-pointer h-14 w-14 hover:bg-muted/25 sm:hidden">
        {isActive ? (
          <ActiveIcon size={28} color="#8b5cf6" />
        ) : (
          <Icon size={28} color="#8b5cf6" />
        )}
        {alert ? (
          <BsDot className="absolute left-0 text-accent -top-4" size={70} />
        ) : null}
      </div>
      <div className="relative items-center hidden w-full gap-4 p-4 rounded-lg cursor-pointer sm:flex items-row hover:bg-muted/25">
        {isActive ? (
          <ActiveIcon size={24} color="#8b5cf6" />
        ) : (
          <Icon size={24} color="#8b5cf6" />
        )}
        <p className="hidden sm:block text-foreground lg:text-xl">{label}</p>
        {alert ? (
          <BsDot className="absolute left-0 text-accent -top-4" size={70} />
        ) : null}
      </div>
    </div>
  );
};

export default SidebarItem;
