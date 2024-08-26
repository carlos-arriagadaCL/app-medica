"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const megaMenu = [
  {
    title: "Top servicios",
    services: [
      {
        title: "Tele-medicina",
        slug: "tele-medicina",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae pariatur iste beatae explicabo voluptatum eaque ducimus dolores quas soluta molestias, sapiente laudantium reprehenderit commodi vel repellat ad fuga sint earum.",
      },
      {
        title: "Visita medica",
        slug: "tele-medicina",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae pariatur iste beatae explicabo voluptatum eaque ducimus dolores quas soluta molestias, sapiente laudantium reprehenderit commodi vel repellat ad fuga sint earum.",
      },
      {
        title: "Licencias medicas",
        slug: "tele-medicina",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae pariatur iste beatae explicabo voluptatum eaque ducimus dolores quas soluta molestias, sapiente laudantium reprehenderit commodi vel repellat ad fuga sint earum.",
      },
    ],
  },
  {
    title: "Medicos",
    services: [
      {
        title: "Tele-medicina",
        slug: "tele-medicina",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae pariatur iste beatae explicabo voluptatum eaque ducimus dolores quas soluta molestias, sapiente laudantium reprehenderit commodi vel repellat ad fuga sint earum.",
      },
      {
        title: "Visita medica",
        slug: "tele-medicina",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae pariatur iste beatae explicabo voluptatum eaque ducimus dolores quas soluta molestias, sapiente laudantium reprehenderit commodi vel repellat ad fuga sint earum.",
      },
      {
        title: "Licencias medicas",
        slug: "tele-medicina",
        description:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae pariatur iste beatae explicabo voluptatum eaque ducimus dolores quas soluta molestias, sapiente laudantium reprehenderit commodi vel repellat ad fuga sint earum.",
      },
    ],
  },
];

export default function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-4">
        {megaMenu.map((item, i) => {
          return (
            <NavigationMenuItem key={i}>
              <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {item.services.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={`/services/${component.slug}`}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
