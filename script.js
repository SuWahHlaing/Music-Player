const playlistTag = document.getElementsByClassName("playlist")[0];

const MusicFolders = [
                        {Id:"https://gaana.com/song/relax-ocean-waves-1",title:"Relax Ocean Waves"},
                        {Id:"https://gaana.com/song/sleep-song-of-summer-7",title:"Sleep Song for Summer"},
                        {Id:"https://gaana.com/song/nature-sounds-lullaby-15",title:"Nature Sounds Lullaby"},
                        {Id:"https://gaana.com/song/reminiscing-in-the-rain-2",title:"Reminiscing in the Rain"},
                        {Id:"https://gaana.com/song/lite-relaxing-sounds-of-nature",title:"Little Relaxing Sounds of Nature"},
                        {Id:"https://gaana.com/song/inner-peace-381",title:"Inner Peace"}
                     ]
                  for(let i=0;i<MusicFolders.length;i++){
                     const music = document.createElement("div");
                     music.classList.add("musicTag")
                     const Title = MusicFolders[i].title;
                     music.textContent=Title;
                     playlistTag.append(music); 

                  }