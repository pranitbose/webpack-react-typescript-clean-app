import reactLogo from "@app/assets/react.svg";
import { MenuItems } from "@app/components/menu-items";
import { type ReactElement } from "react";

const App = (): ReactElement => {
    return (
        <main className="container">
            <img
                src={reactLogo}
                alt="React logo"
                style={{ width: "4rem", height: "4rem" }}
            />
            <MenuItems />
        </main>
    );
};

export default App;
