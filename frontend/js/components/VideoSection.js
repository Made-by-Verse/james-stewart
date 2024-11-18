import Base from "../core/Base";

export class VideoSection extends Base {
  constructor() {
    super();
    this.playButton = document.getElementById("video-play-button");
  }

  init() {
    super.init();
    if (!this.playButton) return;

    this.videoElement = this.playButton.nextElementSibling;
    this.bindEvents();
  }

  bindEvents() {
    this.playButton.addEventListener("click", () => this.handlePlay());
  }

  handlePlay() {
    this.playButton.classList.add("is-hidden");

    if (this.videoElement.src.includes("youtube")) {
      this.handleYouTube();
    } else if (this.videoElement.src.includes("vimeo")) {
      this.handleVimeo();
    } else if (this.videoElement.play) {
      this.handleNativeVideo();
    }
  }

  handleYouTube() {
    this.videoElement.src = this.videoElement.src + "&autoplay=1&enablejsapi=1";

    this.videoElement.addEventListener("message", (event) => {
      if (event.data === 2 || event.data === 0) {
        this.playButton.classList.remove("is-hidden");
      }
    });
  }

  handleVimeo() {
    this.videoElement.src = this.videoElement.src + "?autoplay=1&api=1";

    const player = new Vimeo.Player(this.videoElement);
    player.on("pause", () => this.playButton.classList.remove("is-hidden"));
    player.on("ended", () => this.playButton.classList.remove("is-hidden"));
  }

  handleNativeVideo() {
    this.videoElement.play();

    this.videoElement.addEventListener("pause", () =>
      this.playButton.classList.remove("is-hidden")
    );
    this.videoElement.addEventListener("ended", () =>
      this.playButton.classList.remove("is-hidden")
    );
  }
}
