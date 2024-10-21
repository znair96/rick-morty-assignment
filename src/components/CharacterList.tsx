import { Pagination } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Character, Episode } from "../types";
const url = `https://rickandmortyapi.com/api/character`;
interface CharacterProps {
  episode?: string;
  setEpisode?: () => void;
  episodeList: Episode[];
  setEpisodeList?: () => void;
}
const CharacterList: FC<CharacterProps> = ({ episode, episodeList }) => {
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalPageCount, setTotalPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const getAllCharacters = async (page = 1) => {
    const response = await fetch(url + "?page=" + page);
    const responseJson = await response.json();
    setIsLoading(false);
    setCharacterList(responseJson?.results);
    setTotalPageCount(responseJson?.info.pages);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    getAllCharacters(value);
  };
  useEffect(() => {
    if (!episode) {
      getAllCharacters();
    } else {
      setIsLoading(true);
      const charactersFromEpisodePromises = episodeList
        .filter((ep) => ep?.name === episode)[0]
        .characters.map((character) => fetch(character));
      Promise.all(charactersFromEpisodePromises)
        .then((values) => {
          return Promise.all(values.map((value) => value.json()));
        })
        .then((characters: Character[]) => {
          setIsLoading(false);

          setCharacterList(characters);
        });
    }
  }, [episode]);
  return (
    <div className="w-[100%]">
      <div className="grid grid-cols-4 gap-4  min-h-[75vh] max-h-[75vh] overflow-scroll overflow-x-hidden">
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          characterList.map((character) => (
            <div className="flex flex-col items-center" key={character.id}>
              <img src={character.image} width={128} />
              <p className="text-sm">{character.name}</p>
            </div>
          ))
        )}
      </div>
      {!episode && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={totalPageCount}
            page={currentPage}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default CharacterList;
