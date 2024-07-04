export const searchAndSuggest = (data, term) => {
  if (!term) return { results: [], suggestion: "" };

  const performSearch = (searchTerm) => {
    let results = [];
    let suggestion = "";
    const lowerTerm = searchTerm.toLowerCase();

    data.forEach((artist) => {
      // Search in artist name
      if (artist.name.toLowerCase().includes(lowerTerm)) {
        if (!suggestion && artist.name.toLowerCase().startsWith(lowerTerm)) {
          suggestion = artist.name;
        }
        results.push({
          type: "artist",
          artist: artist.name,
          numberOfAlbums: artist.albums.length,
          remaining: artist.name.toLowerCase().startsWith(lowerTerm)
            ? artist.name.slice(lowerTerm.length)
            : "",
        });
      }

      artist.albums.forEach((album) => {
        // Search in album title
        if (album.title.toLowerCase().includes(lowerTerm)) {
          if (!suggestion && album.title.toLowerCase().startsWith(lowerTerm)) {
            suggestion = album.title;
          }
          results.push({
            type: "album",
            artist: artist.name,
            title: album.title,
            numberOfSongs: album.songs.length,
            description: album.description.substring(0, 50),
            remaining: album.title.toLowerCase().startsWith(lowerTerm)
              ? album.title.slice(lowerTerm.length)
              : "",
          });
        }

        // Search in song titles
        album.songs.forEach((song) => {
          if (song.title.toLowerCase().includes(lowerTerm)) {
            if (!suggestion && song.title.toLowerCase().startsWith(lowerTerm)) {
              suggestion = song.title;
            }
            results.push({
              type: "song",
              artist: artist.name,
              title: song.title,
              length: song.length,
              albumTitle: album.title,
              remaining: song.title.toLowerCase().startsWith(lowerTerm)
                ? song.title.slice(lowerTerm.length)
                : "",
            });
          }
        });

        // Search in album description
        if (album.description.toLowerCase().includes(lowerTerm)) {
          const startIndex = album.description.toLowerCase().indexOf(lowerTerm);
          const snippet =
            (startIndex > 3 ? "..." : "") +
            album.description.substring(startIndex, startIndex + 50);
          results.push({
            type: "description",
            artist: artist.name,
            title: album.title,
            snippet: snippet,
            numberOfSongs: album.songs.length,
            remaining: album.description.toLowerCase().startsWith(lowerTerm)
              ? album.description.slice(lowerTerm.length)
              : "",
          });
        }
      });
    });

    return { results: results.slice(0, 7), suggestion };
  };

  // Perform the initial search
  let { results, suggestion } = performSearch(term);

  // If no results, try again with term - 1 character
  if (results.length === 0 && term.length > 1) {
    ({ results, suggestion } = performSearch(term.slice(0, -1)));
  }

  return { results, suggestion };
};
