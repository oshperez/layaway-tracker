"use client";

import { ExitIcon, PersonIcon } from "@radix-ui/react-icons";
import { Avatar, Box, Container, DropdownMenu, Flex } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArchiveDrawerFill } from "react-icons/ri";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-4">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="4">
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const menuLinks = [
    { label: "Dashboard", href: "/" },
    { label: "Layaways", href: "/layaways" },
  ];

  return (
    <>
      <Link href="/">
        <RiArchiveDrawerFill />
      </Link>
      <ul className="flex space-x-6">
        {menuLinks.map((link) => (
          <li key={link.href}>
            <Link
              className={classnames({
                "nav-link": true,
                "!text-zinc-900": link.href === currentPath,
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  const menuLinks = [
    { label: "Profile", href: "/user/profile", icon: <PersonIcon /> },
    { label: "Sign out", href: "/api/auth/signout", icon: <ExitIcon /> },
  ];

  if (status === "loading") return null;
  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Sign in
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback=":)"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {menuLinks.map((link) => (
            <DropdownMenu.Item key={link.label}>
              {link.icon}
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
