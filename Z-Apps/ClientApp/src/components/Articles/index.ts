import { AppToMount } from "../..";

export const Articles: AppToMount = {
    key: "Articles",
    hostname: "articles.lingual-ninja.com",
    getApp: async () => {
        const module = await import("./App");
        return module.App;
    },
};
