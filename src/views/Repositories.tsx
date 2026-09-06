import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/endpoints";
import type { Repo } from "@/lib/structs";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

import { DataTable } from "@/components/DataTable";
import { repoColumns } from "@/components/RepoColumn";
import AddRepoDialog from "@/dialogs/AddRepoDialog";

export default function Repositories() {

    const [repos, setRepos] = useState<Repo []>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    async function fetch_repos(){
        const url = `${API_URL}/repos/list`;
        const request = await fetch(url);
        const _repos = await request.json();
        setRepos(_repos);
    }

    useEffect(() => {
        fetch_repos();
    }, [isDialogOpen]);

    return (
        <div className="space-y-4 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Manage Repositories</h1>


                <div className={'flex items-center gap-x-4'}>
                    <Button variant={"default"} onClick={() => setIsDialogOpen(true)}>
                        Add
                        <Plus />
                    </Button>

                    <Button variant={"secondary"} onClick={fetch_repos}>
                        <RefreshCcw />
                    </Button>
                </div>
            </div>
            <DataTable columns={repoColumns} data={repos} />

            <AddRepoDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
        </div>
    );
}
