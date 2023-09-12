import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  showBackArrow?: boolean;
  label: string;
}

const Header: React.FC<HeaderProps> = ({ showBackArrow, label }) => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="p-5 sm:border bg-primary border-border sm:rounded-lg">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            color="primary"
            size={20}
            className="transition cursor-pointer hover:opacity-70"
          />
        )}
        <h1 className="text-xl font-semibold text-foreground">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
