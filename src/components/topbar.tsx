import { Button } from "./ui/button"
import { Logs } from "lucide-react"
import { Settings } from "lucide-react"
import { Menu } from "lucide-react"
import { useSidebar } from "./ui/sidebar"
import { Badge } from "./ui/badge"

interface TopbarProps {
    activePage: string
};

export default function Topbar({ activePage }: TopbarProps) {

    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar()

    return (
        <div className={'w-full h-[10%] border-b-1 bg-card'}>
            <div className={"p-4 w-full h-full flex items-center justify-between"}>
                <div className={'flex items-center gap-4'}>
                    <Button variant={'ghost'} onClick={() => {
                        setOpen(!open);
                    }}>
                        <Menu className={'w-4 h-4'} />
                    </Button>
                    <p>{activePage}</p>
                </div>
                <div className={'flex gap-4 items-center'}>

                    <Button variant={'secondary'}>
                        <Settings className={'w-4 h-4'} />
                        Settings
                    </Button>

                    <Button variant={'secondary'}>
                        <Logs className={'w-4 h-4'} />
                        Logs
                    </Button>


                    <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 p-2">
                        Online
                    </Badge>
                </div>
            </div>
        </div>
    )
}