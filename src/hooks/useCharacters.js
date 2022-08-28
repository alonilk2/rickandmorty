import { useEffect, useRef, useState } from "react";
import { getAllCharacters, getCharactersListById } from "../api/character";
import useApi from "../hooks/useApi";

export default function useCharacters() {
  const charactersInfo = useApi(getAllCharacters);
  const charactersList = useApi(getCharactersListById);
  const charactersCount = useRef(0);
  const [unpopular, setUnpopular] = useState();

  const fetchCharactersList = async () => {
    let idsArr = [...Array(charactersCount.current).keys()].map((i) => i + 1);
    charactersList.request(idsArr);
  };

  const findMostUnpopularCharacterFromC137 = () => {
    let list = charactersList.data
      .filter((character) => character.origin.name === "Earth (C-137)")
      .sort((a, b) => a.episode.length - b.episode.length);
    setUnpopular(list[0]);
  };

  useEffect(() => {
    if (charactersInfo.data) {
      charactersCount.current = charactersInfo.data.info.count;
      fetchCharactersList();
    }
  }, [charactersInfo.data]);

  useEffect(() => {
    charactersInfo.request();
  }, []);

  useEffect(() => {
    charactersList.data && findMostUnpopularCharacterFromC137();
  }, [charactersList]);

  return {
    unpopular,
    loading: charactersInfo.loading || charactersList.loading,
    error: charactersInfo.error || charactersList.error

  };
}
