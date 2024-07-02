export const searchAlbums = (data, term) => {
    if (!term) return [];
  
    let results = [];
    const lowerTerm = term.toLowerCase();
  
    data.forEach(artist => {
      artist.albums.forEach(album => {
        // Search in album title
        if (album.title.toLowerCase().includes(lowerTerm)) {
          results.push({
            type: "album",
            artist: artist.name, // Include artist name
            title: album.title,
            numberOfSongs: album.songs.length,
            description: album.description.substring(0, 50)
          });
        }
  
        // Search in album description
        if (album.description.toLowerCase().includes(lowerTerm)) {
          const startIndex = album.description.toLowerCase().indexOf(lowerTerm);
          const snippet = album.description.substring(startIndex, startIndex + 50);
          results.push({
            type: "description",
            artist: artist.name, // Include artist name
            title: album.title,
            snippet: snippet,
            numberOfSongs: album.songs.length
          });
        }
  
        // Search in song titles
        album.songs.forEach(song => {
          if (song.title.toLowerCase().includes(lowerTerm)) {
            results.push({
              type: "song",
              artist: artist.name, // Include artist name
              title: song.title,
              length: song.length,
              albumTitle: album.title
            });
          }
        });
      });
    });
  
    return results.slice(0, 7); // Return only the first 7 results
  };
  