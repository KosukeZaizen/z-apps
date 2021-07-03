import { AppToMount } from "../..";
import { Z_APPS_HOST } from "../../common/consts";

export const zApps: AppToMount = {
    key: "zApps",
    hostname: Z_APPS_HOST,
    getApp: async () => {
        const module = await import("./App");
        return module.App;
    },
};
