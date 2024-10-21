import { FC, useEffect, useState } from "react";
import { Episode } from "../types";
const url = `https://rickandmortyapi.com/api/episode`;
interface EpisodeProps {
  episode?: string;
  setEpisode?: (result: string) => void;
  episodeList: Episode[];
  setEpisodeList?: (result: Episode[]) => void;
}
const EpisodeList: FC<EpisodeProps> = ({
  episode,
  setEpisode = () => {},
  episodeList,
  setEpisodeList = () => {},
}) => {
  const [toggle, setToggle] = useState(true);
  useEffect(() => {
    const getAllEpisodes = async () => {
      const response = await fetch(url);
      const responseJson = await response.json();
      setEpisodeList(responseJson?.results);
    };
    getAllEpisodes();
  }, []);
  return (
    <div>
      {episodeList.map((ep) => (
        <p
          className={`border-2 ${
            episode === ep.name ? "border-red-600 border-4" : "border-black"
          } mb-4`}
          onClick={(e) => {
            console.log(e.currentTarget.textContent);
            if (
              episode &&
              ep.name === e.currentTarget.textContent &&
              toggle &&
              episode === ep.name
            ) {
              setEpisode("");
              setToggle(false);
            } else {
              setEpisode(ep?.name);
              setToggle(true);
            }
          }}
          key={ep.id}
        >
          {ep?.name}
        </p>
      ))}
    </div>
  );
};

export default EpisodeList;
