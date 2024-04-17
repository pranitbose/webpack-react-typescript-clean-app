import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@app/App";
import "@app/main.scss";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
    const root = createRoot(rootElement);
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
