import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Play, Ban, Info } from "lucide-react"
import { ServiceInfo } from "../dialogs/service-info"
import { BADGE_NORMAL, BADGE_CRITICAL } from "../lib/bagde-colors"

export default function Services() {

    const staticServices: Record<string, string> = {
        "Document Discovery Module": "Running",
        "OCR Service": "Running",
        "Amendment Identifier Service": "Paused",
        "Document Ingestion Service": "Running",
        "Retrival Service": "Stopped",
    }

    const actions = ["Start", "Stop", "Info"]

    const actionIcons: Record<string, React.ReactNode> = {
        "Start": <Play className={'w-4 h-4'} />,
        "Stop": <Ban className={'w-4 h-4'} />,
        "Info": <Info className={'w-4 h-4'} />
    }

    const [infoOpen, setInfoOpen] = useState(false);

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className={'font-bold text-md'}>Service</TableHead>
                        <TableHead className={'font-bold text-md'}>Status</TableHead>
                        <TableHead className="text-right font-bold text-md">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {Object.entries(staticServices).map(
                        ([service_name, service_status]) => (
                            <TableRow key={service_name}>
                                <TableCell>{service_name}</TableCell>
                                <TableCell>
                                    <Badge className={
                                        service_status == "Running" ? BADGE_NORMAL : BADGE_CRITICAL
                                    }>
                                        {service_status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            render={
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-8"
                                                >
                                                    <MoreHorizontalIcon />
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                </Button>
                                            }
                                        />

                                        <DropdownMenuContent align="end">
                                            {actions.map((action) => (
                                                <DropdownMenuItem key={action} onClick={() => {
                                                    if(action == "Info"){
                                                        setInfoOpen(true);
                                                    }
                                                }}>
                                                    {actionIcons[action]}
                                                    {action}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>

            <ServiceInfo isOpen={infoOpen} onOpenChange={setInfoOpen} />
        </div>
    )
}