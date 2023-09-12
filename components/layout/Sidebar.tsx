import { signOut } from "next-auth/react";
import { BiHomeAlt2, BiSolidHomeAlt2, BiBell, BiSolidBell, BiUser, BiSolidUser, BiLogOutCircle } from "react-icons/bi";

import useCurrentUser from "@/hooks/useCurrentUser";

import SidebarItem from "./SidebarItem";
import SidebarLogo from "./SidebarLogo";
import SidebarPostButton from "./SidebarPostButton";
import ThemeSwitcher from "../ThemeSwitcher";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      icon: BiHomeAlt2,
      activeIcon: BiSolidHomeAlt2,
      label: "Home",
      href: "/",
    },
    {
      icon: BiBell,
      activeIcon: BiSolidBell,
      label: "Notifications",
      href: "/notifications",
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      icon: BiUser,
      activeIcon: BiSolidUser,
      label: "Profile",
      href: `/${currentUser?.username}`,
      auth: true,
    },
  ];

  return (
    <div className="fixed bottom-0 sm:bottom-auto z-40 w-full sm:w-60 xl:w-[290px] bg-primary sm:bg-transparent">
      <div className="flex flex-row items-center w-full sm:flex-col">
        <div className="flex w-full space-y-2 rounded-lg justify-evenly sm:flex-col sm:border sm:border-border sm:shadow-sm sm:bg-primary sm:pb-10 sm:px-2 sm:pt-2">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              alert={item.alert}
              auth={item.auth}
              href={item.href}
              icon={item.icon}
              activeIcon={item.activeIcon}
              label={item.label}
            />
          ))}
          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOutCircle}
              activeIcon={BiLogOutCircle}
              label="Logout"
            />
          )}
          <ThemeSwitcher />
          <SidebarPostButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
