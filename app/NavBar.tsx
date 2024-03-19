import Link from "next/link";
import React from "react";
import { RiArchiveDrawerFill } from "react-icons/ri";

function NavBar() {
  const links = [
    { label: "Layaways", href: "/layaways" },
    { label: "Dashboard", href: "/" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <RiArchiveDrawerFill />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
