import { useRouter } from "next/router";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="items-center hidden gap-5 px-2 mx-2 my-4 rounded-lg cursor-pointer sm:flex w-fit hover:bg-muted/25"
    >
      <span className="text-xl font-bold text-accent">assync</span>
    </div>
  );
};

export default SidebarLogo;
