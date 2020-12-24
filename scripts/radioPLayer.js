export const radioPlayerInit = () => {
  const radioStop = document.querySelector('.radio-stop');
  const radioNvigation = document.querySelector('.radio-navigation');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radio = document.querySelector('.radio');
  const radioVolume = document.querySelector('.radio-volume');
  const radioMute = document.querySelector('.radio-mute');
  const radioUnmute = document.querySelector('.radio-unmute');

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = false;

  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-pause');
    } else {
      radioStop.classList.remove('fa-play');
      radioStop.classList.add('fa-pause');
      radio.classList.add('play');
    }
  };

  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  };

  let currentVolume = audio.volume;

  console.dir(audio);
  console.log('radioVolume.value: ', radioVolume.value);

  const changeVolume = () => {
    const valueVolume = radioVolume.value;
    audio.volume = valueVolume / 100;
  };
    
    const volumeMute = () => {
      if (audio.volume != 0) {
        currentVolume = audio.volume;
        audio.volume = 0;
        radioVolume.value = 0;
      } else {
        audio.volume = currentVolume;
        radioVolume.value = currentVolume * 100;
      }
    };
  
    const volumeUnmute = () => {
      if (audio.volume != 1) {
       currentVolume = audio.volume;
       audio.volume = 1;
       radioVolume.value = 100;
     } else {
       audio.volume = currentVolume;
       radioVolume.value = currentVolume * 100;
     }
   };
  
  radioVolume.addEventListener('input', changeVolume);
  radioMute.addEventListener('click', volumeMute);  
  radioUnmute.addEventListener('click', volumeUnmute); 

  radioNvigation.addEventListener('change', event => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    const title = parent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    audio.src = target.dataset.radioStantion;

    audio.play();
    changeIconPlay();
  });

  radioStop.addEventListener('click', () => {
    if(audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  })

};

