import { useState } from "react";
import CharacterList from "./components/CharacterList";
import EpisodeList from "./components/EpisodeList";
import { Episode } from "./types";

function App() {
  const [episode, setEpisode] = useState<string>("");
  const [episodeList, setEpisodeList] = useState<Episode[]>([]);
  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-8 mb-10 ">
        Rick and Morty Characters
      </h1>
      <div className="flex gap-32 w-3/4 m-auto">
        <div className="left-side-bar w-[25%]">
          <p className="mb-6">All Episodes</p>
          <div className="min-h-[75vh] max-h-[75vh] overflow-scroll overflow-x-hidden">
            <EpisodeList
              episode={episode}
              setEpisode={setEpisode}
              episodeList={episodeList}
              setEpisodeList={setEpisodeList}
            />
          </div>
        </div>
        <>
          <CharacterList episode={episode} episodeList={episodeList} />
        </>
      </div>
    </>
  );
}

export default App;
