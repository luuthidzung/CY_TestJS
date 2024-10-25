
        document.addEventListener('DOMContentLoaded', function () {
            const container = document.querySelector('.video-container');
            const video = document.querySelector('#myVideo');
            video.volumn=1;
            const videoWrapper = document.querySelector('.video-wrapper');
            const controls = document.querySelector('.controls');
            const playPauseBtn = document.querySelector('.play-pause');
            const centerPlayBtn = document.querySelector('.center-play');
            const rewindBtn = document.querySelector('.rewind');
            const forwardBtn = document.querySelector('.forward');
            const muteBtn = document.querySelector('.mute');
            const fullscreenBtn = document.querySelector('.fullscreen');
            const progressContainer = document.querySelector('.progress-container');
            const progressBar = document.querySelector('.progress-bar');
            let controlsTimeout;
   
            function togglePlay() {
                if (video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = '<img src="assets/pause.png" alt="Pause">';
                    videoWrapper.classList.remove('paused');
                    hideCenterPlayAfterFiveSeconds();
                } else {
                    video.pause();
                    playPauseBtn.innerHTML = '<img src="assets/playsmall.png" alt="Pause">';
                    videoWrapper.classList.add('paused');
                }
            }

            function hideCenterPlayAfterFiveSeconds() {
                const checkTime = setInterval(() => {
                    if (video.currentTime >= 5) {
                        centerPlayBtn.style.display = 'none'; 
                        clearInterval(checkTime); 
                    }
                }, 100);
            }


            // thaydoi Progress
            function updateProgress() {
                const percentage = (video.currentTime / video.duration) * 100;
                progressBar.style.width = `${percentage}%`;
            }

            function skip(duration) {
                video.currentTime += duration;
            }

            // mute
            function toggleMute() {
                video.muted = !video.muted;
                muteBtn.innerHTML = video.muted ? 
                 '<img src="assets/unmute.png" alt="Muted">' 
                : '<img src="assets/mute.png" alt="Unmuted">'; 
            }

            //fullscreen
            function toggleFullscreen() {
                if (!document.fullscreenElement) {
                    container.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }

            function hideControls() {
                clearTimeout(controlsTimeout);
                controlsTimeout = setTimeout(() => {
                    if (!video.paused) {
                        controls.classList.add('hidden');
                    }
                }, 100);
            }

            videoWrapper.addEventListener('mousemove', () => {
                controls.classList.remove('hidden');
                hideControls();
            });

            progressContainer.addEventListener('click', (e) => {
                const rect = progressContainer.getBoundingClientRect();
                const percentage = (e.clientX - rect.left) / rect.width;
                video.currentTime = video.duration * percentage;
            });
 
            playPauseBtn.addEventListener('click', togglePlay);
            centerPlayBtn.addEventListener('click', togglePlay);
            rewindBtn.addEventListener('click', () => skip(-15));
            forwardBtn.addEventListener('click', () => skip(15));
            muteBtn.addEventListener('click', toggleMute);
            fullscreenBtn.addEventListener('click', toggleFullscreen);
            video.addEventListener('timeupdate', updateProgress);
            video.addEventListener('play', hideControls);

            //tua video by keyboard
            document.addEventListener('keydown', (e) => {
                if (e.code === 'Space') {
                    e.preventDefault();
                    togglePlay();
                } else if (e.code === 'ArrowRight') {
                    skip(15);
                } else if (e.code === 'ArrowLeft') {
                    skip(-15);
                } else if (e.code === 'Escape' && document.fullscreenElement) {
                    document.exitFullscreen();
                }
            });

            video.addEventListener('loadedmetadata', () => {
                videoWrapper.classList.add('paused');
            });
        });
    