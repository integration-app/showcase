export interface ConsoleEntry {
    user: User
    workspace: Workspace
    workspaces: Workspace[]
  }
  
  interface User {
    id: string
    auth0Id: string
    email: string
    name: string
    defaultWorkspaceId: string
    pat: string
    introVideoStatus: string
  }
  
  interface Workspace {
    id: string
    key: string
    name: string
    orgId: string
    secret: string
    createdAt: string
    updatedAt: string
  }