const playlistTag = document.getElementsByClassName("playlist")[0];
let audioTag = document.getElementsByClassName("audioTag")[0];
const MusicHolder = document.getElementsByClassName("MusicHolder")[0];
let currentTimeAndTotalTime;
let indexOfPreviousPlaying = -1;
let isPlaying = false;
let currentProgress;

const MusicFolders = [
   { Id: "Music/When the Fog Settled.mp3", title: "Lark in the Morning" },
   { Id: "Music/Inspiring-Acoustic-Guitar.mp3", title: "Inspiring Acoustic Guitar" },
   { Id: "Music/Happy_African_Village.mp3", title: "Happy African Village" },
   { Id: "Music/When the Fog Settled.mp3", title: "Fly away when the fog settled down" },
   { Id: "Music/Sakuya2.mp3", title: "Sakuya" },
   { Id: "Music/river-stream.mp3", title: "River Stream" }
]

for (let i = 0; i < MusicFolders.length; i++) {
   const tracksTag = document.createElement("div");
   tracksTag.classList.add("trackItem");
   tracksTag.classList.add(i);
   const musicTitle = (i + 1).toString() + ". " + MusicFolders[i].title;
   tracksTag.textContent = musicTitle;
   playlistTag.append(tracksTag);
   tracksTag.setAttribute('id', 'Tag' + i);

   tracksTag.addEventListener("click", () => {
      playingSong(i);
      addProgressBar(i, tracksTag);
   })

}
let durationText = "00:00";
let songDuration = 0;
audioTag.addEventListener("loadeddata", () => {
   songDuration = Math.floor(audioTag.duration);
   durationText = createMinuteAndSecondText(songDuration);

})
audioTag.addEventListener("timeupdate", () => {
   const currentTime = Math.floor(audioTag.currentTime);
   const currentTimeText = createMinuteAndSecondText(currentTime);
   totalDurationAndCurrentTimeText = currentTimeText + " / " + durationText;
   currentTimeAndTotalTime.textContent = totalDurationAndCurrentTimeText;
   updateCurrentProgress(currentTime);

})
const createMinuteAndSecondText = (totalSeconds) => {
   const minutes = Math.floor(totalSeconds / 60);
   const seconds = Math.floor(totalSeconds % 60);

   const minutesText = minutes < 10 ? "0" + minutes.toString() : minutes;
   const secondsText = seconds < 10 ? "0" + seconds.toString() : seconds;
   return totalSecondsAndMinutesText = minutesText + ":" + secondsText;
}
const updateCurrentProgress = (currentTime) => {
   const currentProgressWidth = Math.floor((150 / songDuration) * currentTime);
   //  let updateCurrentProgressTag=document.getElementsByClassName("currentProgress")[0];
   currentProgress.style.width = currentProgressWidth + "px";

}
const changeButton = (pauseButton, playButton) => {

   if (isPlaying) {
      pauseButton.style.display = "inline";
      playButton.style.display = "none";
   }
   else {
      pauseButton.style.display = "none";
      playButton.style.display = "inline";
   }
}
const playingSong = (currentPlayingIndex) => {
   const musicId = MusicFolders[currentPlayingIndex].Id;
   audioTag.src = musicId;
   audioTag.play();

}
const removingDiv = (index) => {
   console.log("index", index);
   const totalDurationElementToBeRemoved = document.getElementById('TD' + index);
   totalDurationElementToBeRemoved.remove();
   const removingMusicPlayer = document.getElementById('MC' + index);
   removingMusicPlayer.remove();
   const currentTimeAndTotalTimeToBeRemoved = document.getElementById('CTANDTT' + index);
   currentTimeAndTotalTimeToBeRemoved.remove();
}

function addProgressBar(i, paramtracksTag) {
   const progressBar = document.createElement("div");
   currentProgress = document.createElement("div");

   currentTimeAndTotalTime = document.createElement("div");
   currentTimeAndTotalTime.setAttribute('id', 'CTANDTT' + i);
   currentTimeAndTotalTime.classList.add("currentAndTotalTime");

   progressBar.setAttribute('id', 'TD' + i);
   currentProgress.setAttribute('id', 'CT' + i);

   progressBar.classList.add("progressBar");
   currentProgress.classList.add("currentProgress");

   paramtracksTag.append(currentTimeAndTotalTime);
   progressBar.append(currentProgress);
   paramtracksTag.append(progressBar);

   const musicPlayer = document.createElement("div");
   let previousButton = document.createElement("i");
   let playButton = document.createElement("i");
   let pauseButton = document.createElement("i");
   let nextButton = document.createElement("i");

   // styling
   previousButton.style.margin = '5px';
   playButton.style.margin = '5px';
   playButton.style.display = 'none';
   pauseButton.style.margin = '5px';
   nextButton.style.margin = '5px';

   musicPlayer.classList.add("musicPlayer");
   musicPlayer.setAttribute('id', 'MC' + i);
   previousButton.className = "previousButton fas fa-step-backward controls";
   playButton.className = "playButton fas fa-play-circle controls";
   pauseButton.className = "pauseButton fas fa-pause-circle controls";
   nextButton.className = "nextButton fas fa-step-forward controls";

   musicPlayer.append(previousButton, playButton, pauseButton, nextButton);
   paramtracksTag.append(musicPlayer);


   if (indexOfPreviousPlaying != -1) {
      removingDiv(indexOfPreviousPlaying);
   }
   indexOfPreviousPlaying = i;

   pauseButton.addEventListener("click", (event) => {
      console.log("pause");
      event.preventDefault();
      event.stopPropagation();
      audioTag.pause();
      isPlaying = false;
      changeButton(pauseButton, playButton);
   })

   playButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const currentTime = Math.floor(audioTag.currentTime);
      if (currentTime === 0) {
         playingSong(i);
      }
      else {
         audioTag.play();
         isPlaying = true;
         changeButton(pauseButton, playButton);

      }

   })

   nextButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (i === MusicFolders.length - 1) {
         return;
      }
      else {
         i += 1;
         playingSong(i);
         let nextTracksTag = document.getElementById('Tag' + i);
         addProgressBar(i, nextTracksTag);
      }
   })
   previousButton.addEventListener("click",(event)=>{
      event.preventDefault();
      event.stopPropagation();
      if(i === 0){
         return;
      }
      else{
         i -=1;
         playingSong(i);
         let previousTracksTag = document.getElementById('Tag' + i);
         addProgressBar(i,previousTracksTag);
      
      }
   })
}




