import { AppToMount } from "../..";

export const zApps: AppToMount = {
    key: "zApps",
    hostname: "www.lingual-ninja.com",
    getApp: async () => {
        const module = await import("./App");
        return module.App;
    },
};
