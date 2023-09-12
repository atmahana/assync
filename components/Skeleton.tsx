import Avatar from "./Avatar";

interface SkeletonProps {
  isSmall?: boolean;
  length: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ isSmall, length }) => {
  return (
    <div className="h-auto space-y-5 pt-5 sm:pt-0 mt-5">
      {[...Array(length)].map((_, index) => (
        <div
          key={index}
          className={`w-full rounded-lg bg-primary ${
            isSmall ? "h-fit" : "h-32"
          }`}
        >
          <div className={`flex gap-3 ${isSmall ? "p-1" : "p-5 "}`}>
            <div className="rounded-full w-12 h-12 aspect-square bg-background animate-pulse" />
            <div
              className={`${
                isSmall ? "h-4 w-36" : "h-6 w-32"
              } mt-2 bg-background animate-pulse`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
