'use client';

import * as React from 'react';
import { LayoutDashboard, Blocks, Users } from 'lucide-react';

import { NavPages } from '@/components/nav-pages';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

const pages = [
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
    name: 'Users',
    url: '/users',
    icon: Users,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <NavUser />
      </SidebarHeader>
      <SidebarContent>
        <NavPages pages={pages} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
