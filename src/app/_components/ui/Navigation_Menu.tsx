"use client"

import * as React from "react"

import { cn } from "~/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu"

const navItems = [
  {
    trigger: "Admin",
    list: [
      {
        title: "Admissions",
        href: "/forms/administrative/admissions",
        description: "Admissions Form for new students interested in joining.",
      },
      {
        title: "Student Information",
        href: "/",
        description: "Search for students & access relevant information about them.",
      },
      {
        title: "Accounting",
        href: "/",
        description: "Complete payments, view invoices, & manage financial records.",
      },
      {
        title: "Placement",
        href: "/",
        description: "View student grades & placement information",
      },
    ],
  },
  {
    trigger: "Gaming",
    list: [
      {
        title: "Gaming Menu",
        href: "/",
        description: "View the gaming menu & manage gaming orders.",
      },
      {
        title: "Attendance",
        href: "/",
        description: "View attendance records for gaming students.",
      },
      {
        title: "All Game Evaluation Report",
        href: "/",
        description: "View evaluations for all games.",
      },
      {
        title: "Two Game Evaluation Report",
        href: "/",
        description: "View evaluations for two games.",
      },
    ],
  },
  {
    trigger: "Bartending",
    list: [
      {
        title: "Attendance",
        href: "/",
        description: "View attendance records for bartending students.",
      },
      {
        title: "Bar Menu",
        href: "/",
        description: "View the bar menu & manage bar orders.",
      },
      {
        title: "Bar Management Evaluation",
        href: "/",
        description: "View evaluations for bar management.",
      },
    ],
  },
  {
    trigger: "Special Programs",
    list: [
      {
        title: "WIN",
        href: "/",
        description: "View the WIN program & manage WIN orders.",
      },
      {
        title: "Badges",
        href: "/",
        description: "View the badges program & manage badge orders.",
      },
      {
        title: "Badge Report",
        href: "/",
        description: "View reports on badges.",
      },
    ],
  },
  {
    trigger: "Reports",
    list: [
      {
        title: "Disbursements",
        href: "/",
        description: "View reports on disbursements.",
      },
      {
        title: "Admissions",
        href: "/",
        description: "View reports on admissions.",
      },
      {
        title: "Accounting",
        href: "/",
        description: "View reports on accounting.",
      },
      {
        title: "Student Information",
        href: "/",
        description: "View reports on student information.",
      },
      {
        title: "Financial Aid",
        href: "/",
        description: "View reports on financial aid.",
      },
    ],
  },
]

export function Nav_Items() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navItems.map((navItem, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuTrigger>
              {navItem.trigger}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="items grid w-[300px] gap-3 p-4
                md:w-[500px] md:grid-cols-2 lg:w-[540px]
                bg-gradient-to-bl from-gray-800 to-slate-950
                border-2 border-gray-800 rounded-2xl">
                {navItem.list.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
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
            "block select-none space-y-1 rounded-md p-3 leading-none\
              no-underline outline-none transition-colors hover:bg-accent\
              hover:text-accent-foreground focus:bg-accent\
              focus:text-accent-foreground",
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
  )
})
ListItem.displayName = "ListItem"
