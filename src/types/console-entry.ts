export interface ConsoleEntry {
  workspace: Workspace;
  workspaces: Workspace[];
  workspaceUser: WorkspaceUser;
}

interface Workspace {
  id: string;
  key: string;
  name: string;
  orgId: string;
  secret: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkspaceUser {
  id: string;
  testCustomerId: string;
}
