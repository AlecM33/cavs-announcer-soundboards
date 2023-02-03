const pauseAllOtherSounds = () => {
    document.querySelectorAll('.sound').forEach((sound) => {
        const audioEl = sound.querySelector('audio');
        if (audioEl.currentTime > 0
            && !audioEl.paused && !audioEl.ended
            && audioEl.readyState > audioEl.HAVE_CURRENT_DATA
        ) {
            audioEl.pause();
            audioEl.currentTime = 0;
        }
    })
}

const play = async (audioEl) => {
    pauseAllOtherSounds();
    await audioEl.play();
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
        const audioEl = sound.querySelector('audio');
        if (audioEl.readyState > 3) {
            await play(audioEl);
        } else {
            audioEl.addEventListener('canplaythrough', async () => {
                toggleLoading(sound, false);
                await play(audioEl);
            }, { once: true });
            audioEl.onloadstart = (e) => {
                toggleLoading(sound, true);
            }
            audioEl.onprogress = (ee) => {
                toggleLoading(sound, true);
            };
            audioEl.onstalled = (ee) => {
                toggleLoading(sound, false);
            };
            audioEl.onsuspend = (ee) => {
                toggleLoading(sound, false);
            };
            audioEl.onabort = (ee) => {
                toggleLoading(sound, false);
            };
            audioEl.load();
        }
    }
});

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
