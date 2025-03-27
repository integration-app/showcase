'use client'

import { EllipsisVertical, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ExecuteActionModal } from "./execute-action-modal";
import { useState } from "react";

export function ActionMenu({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ExecuteActionModal
        id={id}
        isOpen={isOpen}
        onOpenChange={(value) => setIsOpen(value)}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='xs'>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Play /> Run action
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
