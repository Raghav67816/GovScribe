import { useState } from "react"
import {
  Sidebar, 
  SidebarHeader,
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel,
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarFooter,
} from "@/components/ui/sidebar"

import {
  Home, 
  LibraryBig, 
  Server, 
  ConciergeBell, 
  Sun, 
  Moon, 
  ChevronRight, 
  Globe,
} from "lucide-react"

import {
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useTheme } from "./theme-provider"

interface AppSidebarProps {
  activePage: string
  setActivePage: (page: string) => void
}

export function AppSidebar({ activePage, setActivePage }: AppSidebarProps) {
  const { setTheme } = useTheme()
  const [serverOpen, setServerOpen] = useState(true)
  const [knowledgeBaseOpen, setKnowledgeBaseOpen] = useState(true)

  return (
    <Sidebar className="border-r border-border/40 bg-card">
      <SidebarHeader className="h-14 flex items-center justify-center border-b border-border/40">
        <p className="font-bold text-sm tracking-tight text-foreground">GovScribe Dashboard</p>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground/60 px-2 mb-2">
            Data Hub
          </SidebarGroupLabel>

          <SidebarMenu className="space-y-1">
            {/* Home */}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActivePage("Home")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${activePage === "Home"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                <Home className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Server */}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  setServerOpen(open => !open)
                  setActivePage("Server")
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${activePage === "Server"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform duration-200 ${serverOpen ? "rotate-90" : ""}`} />
                <Server className="h-4 w-4 shrink-0" />
                <span>Server</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {serverOpen && (
              <SidebarMenuItem className="pl-8">
                <SidebarMenuButton
                  onClick={() => setActivePage("Services")}
                  className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors relative before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-muted-foreground/40 ${activePage === "Services"
                      ? "bg-muted text-foreground font-semibold before:bg-primary"
                      : "text-muted-foreground/80 hover:bg-muted/30 hover:text-foreground"
                    }`}
                >
                  <ConciergeBell className="h-3.5 w-3.5 shrink-0" />
                  <span>Services</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}

            {/* Knowledge Base */}
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  setKnowledgeBaseOpen(open => !open)
                  setActivePage("Knowledge Base")
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${activePage === "Knowledge Base"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                <ChevronRight className={`h-4 w-4 shrink-0 transition-transform duration-200 ${knowledgeBaseOpen ? "rotate-90" : ""}`} />
                <LibraryBig className="h-4 w-4 shrink-0" />
                <span>Knowledge Base</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {knowledgeBaseOpen && (
              <>
                {/* Repositories */}
                <SidebarMenuItem className="pl-8">
                  <SidebarMenuButton
                    onClick={() => setActivePage("Repositories")}
                    className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors relative before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-muted-foreground/40 ${activePage === "Repositories"
                        ? "bg-muted text-foreground font-semibold before:bg-primary"
                        : "text-muted-foreground/80 hover:bg-muted/30 hover:text-foreground"
                      }`}
                  >
                    <LibraryBig className="h-3.5 w-3.5 shrink-0" />
                    <span>Repositories</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Document Discovery */}
                <SidebarMenuItem className="pl-8">
                  <SidebarMenuButton
                    onClick={() => setActivePage("Document Discovery")}
                    className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors relative before:absolute before:left-[-10px] before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-1 before:rounded-full before:bg-muted-foreground/40 ${activePage === "Document Discovery"
                        ? "bg-muted text-foreground font-semibold before:bg-primary"
                        : "text-muted-foreground/80 hover:bg-muted/30 hover:text-foreground"
                      }`}
                  >
                    <Globe className="h-3.5 w-3.5 shrink-0" />
                    <span>Document Discovery</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-2 border-t border-border/40">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-left bg-transparent border-none p-0 outline-none">
                <div className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-muted/50 hover:text-foreground group transition-colors">
                  <div className="h-4 w-4 shrink-0 relative flex items-center justify-center">
                    <Sun className="h-4 w-4 absolute transition-all scale-100 rotate-0 dark:scale-0 dark:rotate-90" />
                    <Moon className="h-4 w-4 absolute transition-all scale-0 -rotate-90 dark:scale-100 dark:rotate-0" />
                  </div>
                  <span>Switch Theme</span>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" className="w-48 bg-card border-border">
                <DropdownMenuItem onClick={() => setTheme("light")} className="text-xs font-semibold cursor-pointer">Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="text-xs font-semibold cursor-pointer">Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="text-xs font-semibold cursor-pointer">System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}