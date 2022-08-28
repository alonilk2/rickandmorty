import client from "./client";

export const getAllCharacters = () => client.get("/character");
export const getCharactersListById = (idArray) =>
  client.get("/character/" + idArray);
