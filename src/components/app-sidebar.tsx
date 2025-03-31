'use client';

import * as React from 'react';
import { LayoutDashboard, Blocks, Users, Activity } from 'lucide-react';

import { NavProjects } from '@/components/nav-projects';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const data = {
  projects: [
    {
      name: 'Dashboard',
      url: '/',
      icon: LayoutDashboard,
    },
    {
      name: 'Integrations',
      url: '/integrations',
      icon: Blocks,
    },
    {
      name: 'Actions',
      url: '/actions',
      icon: Activity,
    },
    {
      name: 'Users',
      url: '/users',
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
