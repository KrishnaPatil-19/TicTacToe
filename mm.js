document.addEventListener('DOMContentLoaded', () => {
    const clickSound = document.getElementById('clickSound');
    const music = document.getElementById('backgroundMusic');
    const toggleMusicButton = document.getElementById('toggleMusic');
    const toggleSoundEffectsButton = document.getElementById('toggleSoundEffects');

    let isMusicPlaying = localStorage.getItem('isMusicPlaying') === 'true';
    let areSoundEffectsEnabled = localStorage.getItem('areSoundEffectsEnabled') === 'true';

    toggleMusicButton.textContent = isMusicPlaying ? 'Turn Music Off' : 'Turn Music On';
    toggleSoundEffectsButton.textContent = areSoundEffectsEnabled ? 'Turn Sound Effects Off' : 'Turn Sound Effects On';

    function playClickSound() {
        if (areSoundEffectsEnabled) {
            clickSound.play().catch(e => console.error('Click sound play error:', e));
        }
    }

    function toggleMusic() {
        if (isMusicPlaying) {
            music.pause();
            toggleMusicButton.textContent = 'Turn Music On';
        } else {
            music.play().catch(e => console.error('Music play error:', e));
            toggleMusicButton.textContent = 'Turn Music Off';
        }
        isMusicPlaying = !isMusicPlaying;
        localStorage.setItem('isMusicPlaying', isMusicPlaying);
    }

    function toggleSoundEffects() {
        areSoundEffectsEnabled = !areSoundEffectsEnabled;
        toggleSoundEffectsButton.textContent = areSoundEffectsEnabled ? 'Turn Sound Effects Off' : 'Turn Sound Effects On';
        localStorage.setItem('areSoundEffectsEnabled', areSoundEffectsEnabled);
    }

    toggleMusicButton.addEventListener('click', () => {
        playClickSound();
        toggleMusic();
    });

    toggleSoundEffectsButton.addEventListener('click', () => {
        playClickSound();
        toggleSoundEffects();
    });

    if (isMusicPlaying) {
        music.play().catch(e => console.error('Music play error:', e));
    }
});
