import { state } from "./state";

export function playSound(url) {
    if (state.sound) {
    var ourAudio = document.createElement('audio');
  
    ourAudio.src = url; 
    ourAudio.autoplay = true;
    ourAudio.onended = function() {
        this.remove(); 
      };
    document.body.appendChild(ourAudio);
  }
}

  