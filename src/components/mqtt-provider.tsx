import mqtt, { type MqttClient } from "mqtt";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface MqttConfig{
    name: string,
    url: string,
    port: number,
    isConnected: boolean,
    client: MqttClient | null,
    onChange: (url: string, port: number) => void;
}

interface MQTTProviderProps{
    children: ReactNode
}

export const MqttContext = createContext<MqttConfig | undefined>(undefined);

export default function MQTTProvider({children}: MQTTProviderProps){

    const name = "dashboard";
    const [url, setUrl] = useState<string>("localhost");
    const [port, setPort] = useState<number>(3000);
    const [isConnected, setIsConnected] = useState(false);
    const [client, setClient] = useState<MqttClient | null>(null);

    const onChange = (url_: string, port_: number) => {
        setUrl(url_);
        setPort(port_);
        console.log("mqtt config changed");
    }

    useEffect(() => {
        const connectUrl = `ws://${url}:${port}`;
        console.log(`connecting to: ${connectUrl}`);

        const mqttClient = mqtt.connect(connectUrl, {
            protocol: 'ws'
        });

        mqttClient.on("connect", ()=>{
            setIsConnected(true);
        })

        mqttClient.on("close", () => {
            setIsConnected(false);
        })

        setClient(mqttClient);

        return () => {
            if(mqttClient){
                console.log(`global disconnected from: ${connectUrl}`);
                mqttClient.end(true);
                setIsConnected(false);
            }
        }
    }, [url, port])

    const value: MqttConfig = {name, url, port, isConnected, client, onChange}

    return(
        <MqttContext value={value}>
            {children}
        </MqttContext>
    )
}
