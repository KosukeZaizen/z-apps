import { AppToMount } from "../..";

export const LocalDebugMenu: AppToMount = {
    key: "LocalDebugMenu",
    hostname: "localhost",
    getApp: async () => {
        const module = await import("./App");
        return module.App;
    },
};
