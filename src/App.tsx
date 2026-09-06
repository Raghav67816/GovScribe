import { useState } from "react";
import Home from "./views/Home";
import Server from "./views/Server";
import Services from "./views/Services";
import Topbar from "./components/topbar";
import Repositories from "./views/Repositories";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";

export default function App() {

  const [activePage, setActivePage] = useState("Home");

  return (
    <SidebarProvider className="w-full h-screen flex">
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Topbar activePage={activePage} />
        <main className="flex-1 overflow-y-auto p-6 bg-background/50">
            {activePage == "Home" && <Home></Home>}
            {activePage == "Server" && <Server></Server>}
            {activePage == "Repositories" && <Repositories></Repositories>}
            {activePage == "Services" && <Services></Services>}
        </main>
      </div>
    </SidebarProvider>
  );
}
