"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { ConsoleEntry } from "@/types/console-entry"
import { getStoredWorkspace, storeWorkspace } from "@/lib/workspace-storage"

interface WorkspaceContextType {
  workspace: ConsoleEntry['workspace'] | null
  saveWorkspace: (id: ConsoleEntry['workspace']) => void
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspace: null,
  saveWorkspace: () => {},
})

export function useCurrentWorkspace() {
  return useContext(WorkspaceContext)
}

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspace, setWorkspace] = useState<WorkspaceContextType['workspace']>(null)

  useEffect(() => {
    const workspace = getStoredWorkspace()
    if (workspace) {
      setWorkspace(workspace)
    }
  }, [])

  const saveWorkspace = (workspace: WorkspaceContextType['workspace']) => {
    if (!workspace) return

    storeWorkspace(workspace)
    setWorkspace(workspace)
  }

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        saveWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}
