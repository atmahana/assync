import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { IconType } from "react-icons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeIcons = [
    {
      theme: "dark",
      icon: <MdOutlineDarkMode />,
    },
    { theme: "light", icon: <MdOutlineLightMode /> },
    {
      theme: "system",
      icon: <WiMoonAltFirstQuarter />,
    },
  ];

  return (
    <div className="hidden sm:block relative w-full rounded-lg hover:bg-muted/25">
      <select
        className="h-full w-full py-4 px-12 xl:text-lg bg-transparent font-sans text-sm font-normal text-foreground"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      >
        <option value="system" className="bg-background text-foreground">
          System
        </option>
        <option value="dark" className="bg-background text-foreground">
          Dark
        </option>
        <option value="light" className="bg-background text-foreground">
          Light
        </option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
