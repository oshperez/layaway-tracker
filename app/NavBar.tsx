"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArchiveDrawerFill } from "react-icons/ri";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Layaways", href: "/layaways" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <RiArchiveDrawerFill />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "text-zinc-900": link.href === currentPath,
                "text-zinc-500": link.href !== currentPath,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign in</Link>
        )}
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Sign out</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
