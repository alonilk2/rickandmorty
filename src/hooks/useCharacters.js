/* eslint-disable react-hooks/exhaustive-deps */
/**
 * useCharacters hook handles characters list data fetching, filtering and sorting by popularity
 * @author Alon Barenboim
 */

import { useEffect, useRef, useState } from "react";
import { getAllCharacters, getCharactersListById } from "../api/character";
import { getOrigin } from "../api/origin";
import useApi from "../hooks/useApi";

export default function useCharacters() {
  const charactersInfo = useApi(getAllCharacters);
  const charactersList = useApi(getCharactersListById);
  const origin = useApi(getOrigin);
  const charactersCount = useRef(0);
  const [unpopular, setUnpopular] = useState();

  // fetchAllCharactersList initializes an array of 0..N while N=charactersCount.current
  // and sends a GET request with the array of Id's.
  const fetchAllCharactersList = async () => {
    let idsArr = [...Array(charactersCount.current).keys()].map((i) => i + 1);
    charactersList.request(idsArr);
  };

  // findMostUnpopularCharacterFromC137 filters characters which came from another origin other than "Earth-C137",
  // sorts the filtered list according to number of episodes, and set the first character in the list as the most unpopular one.
  const findMostUnpopularCharacterFromC137 = () => {
    let list = charactersList.data
      .filter((character) => character.origin.name === "Earth (C-137)")
      .sort((a, b) => a.episode.length - b.episode.length);
    setUnpopular(list[0]);
  };

  // Initial characters info request (which contains the total number of characters in DB)
  useEffect(() => {
    charactersInfo.request();
  }, []);

  // Triggered when charactersInfo.data contains the characters count, fetch list of all characters
  useEffect(() => {
    if (charactersInfo.data) {
      charactersCount.current = charactersInfo.data.info.count;
      fetchAllCharactersList();
    }
  }, [charactersInfo.data]);

  // Find most unpopular character from origin 'Earth-C137'
  useEffect(() => {
    charactersList.data && findMostUnpopularCharacterFromC137();
  }, [charactersList]);

  // Get most unpopular's character origin's data
  useEffect(() => {
    if(unpopular){
        origin.request(unpopular.id)
    }
  }, [unpopular])

  return {
    unpopular,
    charactersList,
    origin: origin.data,
    loading: charactersInfo.loading || charactersList.loading,
    error: charactersInfo.error || charactersList.error
  };
}
