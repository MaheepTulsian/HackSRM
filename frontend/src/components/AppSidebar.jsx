import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/logo.png";

// Sample data.
const data = {
  navMain: [
    {
      // title: "Assignments & Materials",
      url: "#",
      items: [
        { title: "RAG", url: "./rag" },
        { title: "Summarize", url: "./summarize" },
        { title: "Explain me", url: "./explain" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex justify-center gap-2 md:justify-center">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="flex w-28 items-center justify-center rounded-md text-primary-foreground">
              {/* <img src={Logo} alt="Logo" /> */}
              <h1 className="text-4xl text-secondary-foreground mt-5">Assist.ai</h1>
            </div>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Sidebar Groups */}
        {data.navMain.map((group, index) => (
          <SidebarGroup key={index}>
            {/* <Separator /> */}
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            {/* <Separator /> */}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, subIndex) => (
                  <SidebarMenuItem key={subIndex}>
                    <SidebarMenuButton asChild className="hover:bg-accent px-6">
                      <NavLink
                        to={item.url}
                        className={({ isActive }) => `${isActive ? "bg-accent" : ""}`}
                      >
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}