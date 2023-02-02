document.querySelectorAll('audio').forEach((audio) => {
    audio.addEventListener('canplaythrough', () => {
        audio.closest('div').classList.remove('loading');
        audio.closest('div').querySelector('label').classList.remove('invisible');
        audio.closest('div').querySelector('img').classList.remove('invisible');
        audio.closest('.sound').classList.add('active-sound');
        audio.closest('.sound').onclick = async (e) => {
            document.querySelectorAll('.sound').forEach((sound) => {
                sound.querySelector('audio').pause();
                sound.querySelector('audio').currentTime = 0;
            })
            try {
                await e.currentTarget.querySelector('audio').play();
            } catch (e) {
                console.error(e);
            }
        }
    });
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
