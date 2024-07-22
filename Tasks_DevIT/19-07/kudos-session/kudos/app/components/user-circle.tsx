// app/components/user-circle.tsx
import { Profile } from "@prisma/client";

interface props {
  profile: Profile;
  className?: string;
  onClick?: (...args: any) => any;
}

export function UserCircle({ profile, onClick, className }: props) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onClick?.(event);
    }
  };

  return (
    <div
      className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <h2>
        {profile.firstName.charAt(0).toUpperCase()}
        {profile.lastName.charAt(0).toUpperCase()}
      </h2>
    </div>
  );
}
