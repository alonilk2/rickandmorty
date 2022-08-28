import client from "./client";

export const getOrigin = (locId) => client.get("/location/" + locId);