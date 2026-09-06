import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import MQTTProvider from "./components/mqtt-provider.tsx"
import { ThemeProvider } from "./components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={'dark'}>
      <MQTTProvider>
        <App />
      </MQTTProvider>
    </ThemeProvider>
  </StrictMode>
)
