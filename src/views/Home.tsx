import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card"
import { Cpu, HardDrive, MemoryStick, MonitorCog, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useContext, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge";
import type { ResourceUsage } from "@/lib/structs";
import { MqttContext } from "@/components/mqtt-provider";

export default function Home() {

    const mqttContext = useContext(MqttContext);

    const [totalDocs, setTotalDocs] = useState(100);
    const [docsProcessed, setDocsProcessed] = useState(50);

    const [resourceUsage, setUsage] = useState<ResourceUsage | null>(null);

    useEffect(() => {
        if(!mqttContext || !mqttContext.client) return;

        const client = mqttContext.client;
        const topic = "system/metrics";

        client.subscribe(topic);

        const handleMessages = (incomingTopic: string, message: Buffer) => {
            if(incomingTopic == topic){
                const usage: ResourceUsage = JSON.parse(message.toString());
                setUsage(usage)
            }
        }

        client.on("message", handleMessages);

        return () => {
            client.unsubscribe(topic);
            client.off("message", handleMessages);
        }
    }, [mqttContext?.client]);

    return (
        <div className={'flex flex-col gap-4'}>
            {/* Documents Overview Card */}
            <Card className="w-[40%]">
                <CardHeader>
                    <CardTitle className={'flex items-center gap-2'}>
                        <Search className={'w-4 h-4'} />
                        Document Discovery
                    </CardTitle>
                    <CardDescription>Documents Discovered in Repositories</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className={'flex flex-col gap-2'}>
                        <div className={'flex gap-2 items-center'}>
                            <p>Discovery Status: </p>
                            <p>Active</p>
                        </div>
                        <div className={'flex gap-2'}>
                            <p>Documents Discovered: </p>
                            <p>{"value"}</p>
                        </div>
                        <div className={'flex gap-2 items-center'}>
                            <p>Documents Processed (OCR): </p>
                            <Progress className={"w-[20%]"} value={docsProcessed / totalDocs * 100} />
                            <p>{docsProcessed} / {totalDocs}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* System Overview */}
            <Card className="w-[40%]">
                <CardHeader>
                    <CardTitle className={'flex items-center gap-2 justify-between'}>
                        <div className={'flex items-center gap-2'}>
                            <MonitorCog className={'w-4 h-4'} />
                            <p>System Resources</p>
                        </div>
                        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                            Normal
                        </Badge>
                    </CardTitle>
                    <CardDescription>Infrastructure Resource Consumption</CardDescription>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className={'flex items-center gap-2'}>
                            <Cpu className={'w-4 h-4'} />
                            <p>CPU</p>
                            <Progress className={'w-[50%]'} value={resourceUsage == null ? 0: parseFloat(resourceUsage.cpu)} />
                            <p>{resourceUsage?.cpu}%</p>
                        </div>

                        <div className={'flex items-center gap-2'}>
                            <MemoryStick className={'w-4 h-4'} />
                            <p>Memory</p>
                            <Progress className={'w-[50%]'} value={resourceUsage == null ? 0 : parseFloat(resourceUsage.memory)} />
                            <p>{resourceUsage?.memory}%</p>
                        </div>

                        <div className={'flex items-center gap-2'}>
                            <HardDrive className={'w-4 h-4'} />
                            <p>Storage</p>
                            <Progress className={'w-[50%]'} value={resourceUsage == null ? 0: parseFloat(resourceUsage.disk)} />
                            <p>{resourceUsage?.disk}%</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
