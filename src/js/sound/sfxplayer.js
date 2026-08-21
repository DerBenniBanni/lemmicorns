import SoundBoxPlayer from "./soundboxplayer.js";

export default class SFXPlayer {
    constructor() {
        this.sfx = {};
    }
    add(name, data, loop = false) {
        let musicplayer = new SoundBoxPlayer();
        musicplayer.init(data);
        while(musicplayer.generate() < 1) {}
        this.sfx[name] = {};
        this.sfx[name].actx = new AudioContext();
        this.sfx[name].loaded = false;
        this.sfx[name].loop = loop;
        this.sfx[name].waveBuffer = musicplayer.createWave().buffer;
        this.sfx[name].samples = {};
    }
    addSample(audioname, samplename, start, duration) {
        this.sfx[audioname].samples[samplename] = {start, duration};
    }

    playAudio(audioname, sample = "") {
        let audio = this.sfx[audioname];
        if(audio) {
            /*if(!audio.loaded) {
                let self = this;
                window.setTimeout(()=>self.playAudio(audioname),100);
                return;
            }*/
            audio.actx.decodeAudioData(audio.waveBuffer.slice(), (audioBuffer) => {
                audio.audioBuffer = audioBuffer;
                //audio.loaded = true;
            });
            audio.srcNode = audio.actx.createBufferSource();
            audio.srcNode.buffer = audio.audioBuffer;
            audio.srcNode.connect(audio.actx.destination);
            audio.srcNode.loop = audio.loop;
            if(sample && audio.samples[sample]) {
                let spl = audio.samples[sample];
                audio.srcNode.start(0, spl.start, spl.duration);
            } else {
                audio.srcNode.start(0);
            }
            
        }
    }
    
}

