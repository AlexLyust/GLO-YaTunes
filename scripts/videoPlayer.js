export const videoPlayerInit = () => {
  
const videoPlayer = document.querySelector('.video-player');
const videoButtonPlay = document.querySelector('.video-button__play');
const videoButtonStop = document.querySelector('.video-button__stop');
const videoProgress = document.querySelector('.video-progress');
const videoTimePassed = document.querySelector('.video-time__passed');
const videoTimeTotal = document.querySelector('.video-time__total');
const videoVolume = document.querySelector('.video-volume');
const videoMute = document.querySelector('.video-mute');
const videoUnmute = document.querySelector('.video-unmute');
const videoFullscreen = document.querySelector('.video-fullscreen'); 

const toggleIcon = () => {
  if (videoPlayer.paused) {
    videoButtonPlay.classList.remove('fa-pause');
    videoButtonPlay.classList.add('fa-play');
  }else {
    videoButtonPlay.classList.add('fa-pause');
    videoButtonPlay.classList.remove('fa-play');
  }
};

const togglePlay = e => {
  e.preventDefault()
  if(videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
};

const stopPlay = () => {
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
};

const addZero = n => ('0' + n).slice(-2);

let currentVolume = videoPlayer.volume;

const changeVolume = () => {
  const valueVolume = videoVolume.value;
  videoPlayer.volume = valueVolume / 100;
}
  
  const volumeMute = () => {
    if (videoPlayer.volume != 0) {
      currentVolume = videoPlayer.volume;
      videoPlayer.volume = 0;
      videoVolume.value = 0;
    } else {
      videoPlayer.volume = currentVolume;
      videoVolume.value = currentVolume * 100;
    }
  };

  const volumeUnmute = () => {
    if (videoPlayer.volume != 1) {
     currentVolume = videoPlayer.volume;
     videoPlayer.volume = 1;
     videoVolume.value = 100;
   } else {
     videoPlayer.volume = currentVolume;
     videoVolume.value = currentVolume * 100;
   }
 };

  const changeVolumeIcon = () => {
    if (videoPlayer.volume == 0) {
      videoMute.classList.add('fa-volume-off');
      videoMute.classList.remove('fa-volume-down');
    }else {
      videoMute.classList.remove('fa-volume-off');
      videoMute.classList.add('fa-volume-down');
    }
  }

  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);

  videoButtonStop.addEventListener('click', stopPlay);

  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime / duration) * 100;

    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;

    videoProgress.addEventListener('input', () => {
      const duration = videoPlayer.duration;
      const value = videoProgress.value;

      videoPlayer.currentTime = (value * duration) / 100;

    })

  });

  videoVolume.addEventListener('input', changeVolume);
  videoVolume.addEventListener('change', changeVolumeIcon);

  videoMute.addEventListener('click', volumeMute);
  
  videoUnmute.addEventListener('click', volumeUnmute);

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  })

  videoPlayer.addEventListener('volumechange', () => {
    videoVolume.value = videoPlayer.volume * 100;
  })

  changeVolume();


}