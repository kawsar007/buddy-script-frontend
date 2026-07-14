"use client";

import { Avatar } from "@/src/components/ui/Avatar";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  ChevronDown,
  ChevronRight,
  CircleHelp,
  LogOut,
  Settings
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div ref={menuRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="hover:bg-bg flex items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors"
      >
        <Avatar
          avatarUrl={user.avatarUrl}
          firstName=""
          lastName=""
          size="sm"
        />

        <span className="text-muted hidden text-sm font-semibold sm:inline">
          {user.firstName}
        </span>

        <ChevronDown
          className={`text-muted size-4 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className="bg-surface absolute right-0 z-30 mt-3 w-80 overflow-hidden rounded-sm shadow-xl"
        >
          {/* Profile */}
          <div className="p-5">
            <div className="flex items-center gap-3">
              <Avatar
                avatarUrl={user.avatarUrl}
                firstName=""
                lastName=""
                size="md"
              />

              <div className="min-w-0">
                <h3 className="text-ink truncate text-lg font-semibold">
                  {user.firstName} {user.lastName}
                </h3>

                {/* <button
                  type="button"
                  role="menuitem"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View Profile
                </button> */}
                <Link
                  href="/profile"
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="border-border mx-4 border-t" />

          {/* Menu */}
          <div className="py-2">
            {/* Settings */}
            <button
              type="button"
              role="menuitem"
              className="hover:bg-bg flex w-full items-center gap-4 px-5 py-3 transition-colors"
            >
              <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                <Settings className="size-5" />
              </span>

              <span className="text-muted flex-1 text-left text-base font-medium">
                Settings
              </span>

              <ChevronRight className="text-muted size-4" />
            </button>

            {/* Help */}
            <button
              type="button"
              role="menuitem"
              className="hover:bg-bg flex w-full items-center gap-4 px-5 py-3 transition-colors"
            >
              <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                <CircleHelp className="size-5" />
              </span>

              <span className="text-muted flex-1 text-left text-base font-medium">
                Help &amp; Support
              </span>

              <ChevronRight className="text-muted size-4" />
            </button>

            {/* Logout */}
            <button
              type="button"
              role="menuitem"
              onClick={() => logout()}
              className="hover:bg-bg flex w-full items-center gap-4 px-5 py-3 transition-colors"
            >
              <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
                <LogOut className="size-5" />
              </span>

              <span className="text-muted flex-1 text-left text-base font-medium">
                Log Out
              </span>

              <ChevronRight className="text-muted size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


// "use client";

// import { Avatar } from "@/src/components/ui/Avatar";
// import { useAuth } from "@/src/contexts/AuthContext";
// import { ChevronDown, LogOut, Settings, UserRound } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// export function UserMenu() {
//   const { user, logout } = useAuth();
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);


//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   if (!user) return null;

//   return (
//     <div ref={menuRef} className="relative">
//       <button
//         type="button"
//         onClick={() => setOpen((prev) => !prev)}
//         aria-expanded={open}
//         aria-haspopup="menu"
//         className="hover:bg-bg flex items-center gap-2 rounded-full py-1 pr-2 pl-1 transition-colors"
//       >
//         {/* <Avatar name={user.name} size="sm" /> */}
//         <Avatar avatarUrl={user.avatarUrl} firstName="" lastName="" size="sm" />
//         <span className="text-ink hidden text-sm font-semibold sm:inline">
//           {user.firstName}
//         </span>
//         <ChevronDown className="text-muted size-4" aria-hidden="true" />
//       </button>

//       {open && (
//         <div
//           role="menu"
//           className="bg-surface absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl"
//         >
//           <div className="border-border border-b px-4 py-3">
//             <p className="text-ink text-sm font-semibold">{user.firstName} {user.lastName}</p>
//             <p className="text-muted truncate text-xs">{user.email}</p>
//           </div>
//           <button
//             type="button"
//             role="menuitem"
//             className="text-ink hover:bg-bg flex w-full items-center gap-2.5 px-4 py-2.5 text-sm"
//           >
//             <UserRound className="size-4" aria-hidden="true" />
//             View profile
//           </button>
//           <button
//             type="button"
//             role="menuitem"
//             className="text-ink hover:bg-bg flex w-full items-center gap-2.5 px-4 py-2.5 text-sm"
//           >
//             <Settings className="size-4" aria-hidden="true" />
//             Settings
//           </button>
//           <button
//             type="button"
//             role="menuitem"
//             onClick={() => logout()}
//             className="text-danger hover:bg-danger-light flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium"
//           >
//             <LogOut className="size-4" aria-hidden="true" />
//             Log out
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
