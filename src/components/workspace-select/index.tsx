import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConsoleEntry } from "@/hooks/use-console-entry";
import { useCurrentWorkspace } from "../providers/workspace-provider";

export const WorkspaceSelect = () => {
  const {
    workspaces = [],
    isError: workspacesError,
    isLoading: workspaceLoading,
  } = useConsoleEntry();
  const { saveWorkspace, workspace: currentWorkspace } = useCurrentWorkspace();

  const [workspaceId, setWorkspaceId] = useState(currentWorkspace?.id || "");

  useEffect(() => {
    if (currentWorkspace?.id) {
        setWorkspaceId(currentWorkspace.id)
    }
  }, [currentWorkspace?.id])

  if (!currentWorkspace) {
    return null
  }

  return (
    <Select
      value={workspaceId}
      onValueChange={(newId) => {
        const workspace = workspaces.find(({ id }) => id === newId);
        saveWorkspace(workspace!);
      }}
      disabled={workspacesError || workspaceLoading}
    >
      <SelectTrigger
        id="workspace"
        className="max-w-28 min-w-12 w-full"
        loading={workspaceLoading}
      >
        <SelectValue placeholder="Select a workspace" />
      </SelectTrigger>
      <SelectContent>
        {workspaces.map((ws) => (
          <SelectItem key={ws.id} value={ws.id}>
            {ws.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
