import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/songs/Aakhir_Tumhein…",
    posterUrl:
      "https://ik.imagekit.io/0cef4ey58/cohort-2/moodify/posters/Aakhir_Tumhe…",
    title: "Aakhir Tumhein Aana Hai [DOWNLOAD MING]",
    mood: "surprised",
  });
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};
