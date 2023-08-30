"use client";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <div className="border-b px-5">
      <NavigationMenu>
        <NavigationMenuList>
          <div className="flex h-10 items-center space-x-4 text-sm font-semibold">
            <div>ANÁLISIS NUMÉRICO</div>
            <Separator orientation="vertical" />
          </div>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sistemas de Ecuaciones
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
