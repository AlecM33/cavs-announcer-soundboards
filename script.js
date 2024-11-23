const pauseAllSounds = () => {
    document.querySelectorAll('.sound').forEach((sound) => {
        const audioEl = sound.querySelector('audio');
        audioEl.pause();
        audioEl.currentTime = 0;
    })
}

const play = async (audioEl) => {
    pauseAllSounds();
    audioEl.play().catch((e) => {
        if (e.name === "AbortError") {
            console.log("Canceled playback due to selection of another sound.", e);
        }
    });
}

const toggleLoading = (sound, isLoading) => {
    if (isLoading) {
        sound.querySelector('label').classList.add('invisible');
        sound.querySelector('img').classList.add('invisible');
        sound.classList.add('loading');
    } else {
        sound.classList.remove('loading');
        sound.querySelector('label').classList.remove('invisible');
        sound.querySelector('img').classList.remove('invisible');
    }
}

document.querySelectorAll('.sound').forEach((sound) => {
    sound.onclick = async (e) => {
        toggleLoading(sound, true);
        const audioEl = sound.querySelector('audio');
        await play(audioEl);
    }
});

document.querySelectorAll('audio').forEach((audioEl) => {
    let sound = audioEl.closest('.sound');
    audioEl.onloadstart = (e) => {
        toggleLoading(sound, true);
    }
    audioEl.onprogress = (e) => {
        toggleLoading(sound, true);
    };
    audioEl.onstalled = (e) => {
        toggleLoading(sound, false);
    };
    audioEl.onsuspend = (e) => {
        toggleLoading(sound, false);
    };
    audioEl.onabort = (e) => {
        toggleLoading(sound, false);
    };
    audioEl.onplaying = (e) => {
        toggleLoading(sound, false);
    };
})

document.getElementById('back').onclick = () => {
    document.querySelectorAll('.sound-list').forEach((soundList) => {
        soundList.style.display = 'none';
    });
    document.getElementById('announcer-select').style.display = 'flex';
    document.getElementById('announcer-select').animate(
        [
            {opacity: 0},
            {opacity: 1}
        ], {
            fill: 'forwards',
            easing: 'linear',
            duration: 200
        });
    document.getElementById('back').style.display = 'none';
};

document.querySelectorAll('.announcer-option').forEach((option, index) => option.onclick = () => {
    document.getElementById('back').style.display = 'flex';
    document.getElementById('announcer-select').style.display = 'none';
    document.getElementById('sounds-' + (index + 1)).style.display = 'flex';
    document.getElementById('sounds-' + (index + 1)).animate(
        [
            {opacity: 0},
            {opacity: 1}
        ], {
            fill: 'forwards',
            easing: 'linear',
            duration: 200
        });
    document.querySelectorAll('.announcer-option').forEach((option2, index2) => {
        if (index2 !== index) {
            document.getElementById('sounds-' + (index2 + 1)).style.display = 'none';
        }
    })
});
