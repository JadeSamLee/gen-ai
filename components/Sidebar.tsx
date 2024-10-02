"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

interface SideBarProps {
  links: TabDetails[];
}

interface TabDetails {
  name: string;
  icon: React.ReactNode;
}

const SideBar: React.FC<SideBarProps> = ({ links }) => {
  const pathname = usePathname();
  const path = pathname.split("/")[1];
  const colorHex = "bg-gray-800";

  return (
    <div className="fixed flex flex-col items-center  gap-3 left-0  h-[100vh] bg-[#F6F6F6] w-[15vw] border text-black shadow-xl ">
      <h1 className="text-2xl font-bold tracking-wider text-center mt-10 mb-10">
        SOCRATES AI
      </h1>
      <div className="flex flex-col  gap-3 pr-12">
        {links.map((link) => (
          <Link
            href={`/${link.name.toLowerCase()}`}
            className={`flex gap-4 pl-10 w-[180px] py-4 items-center text-black rounded-br-lg rounded-tr-lg ${
              path == link.name.toLowerCase()
                ? colorHex + "  text-white"
                : "bg-transparent"
            }    `}
            key={link.name}
          >
            {link.icon}
            <p className={`font-semibold`}>{link.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
