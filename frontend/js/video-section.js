function initVideoSection() {
  const playButton = document.getElementById("video-play-button");
  if (!playButton) return;

  const videoElement = playButton.nextElementSibling;

  playButton.addEventListener("click", () => {
    // Hide the play button
    playButton.classList.add("is-hidden");

    // Handle YouTube videos
    if (videoElement.src.includes("youtube")) {
      videoElement.src = videoElement.src + "&autoplay=1&enablejsapi=1";

      videoElement.addEventListener("message", (event) => {
        if (event.data === 2 || event.data === 0) {
          // 2 = paused, 0 = ended
          playButton.classList.remove("is-hidden");
        }
      });
    }
    // Handle Vimeo videos
    else if (videoElement.src.includes("vimeo")) {
      videoElement.src = videoElement.src + "?autoplay=1&api=1";

      const player = new Vimeo.Player(videoElement);
      player.on("pause", () => playButton.classList.remove("is-hidden"));
      player.on("ended", () => playButton.classList.remove("is-hidden"));
    }
    // Handle native video elements
    else if (videoElement.play) {
      videoElement.play();

      videoElement.addEventListener("pause", () =>
        playButton.classList.remove("is-hidden")
      );
      videoElement.addEventListener("ended", () =>
        playButton.classList.remove("is-hidden")
      );
    }
  });
}

document.addEventListener("DOMContentLoaded", initVideoSection);
