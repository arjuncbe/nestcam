var video = document.getElementById("video");
var videoSrc = "https://email.en.ascema.com/audio/stream.m3u8";

var streaming = false;

function startStream() {
  if (streaming) {
    document.getElementById("streamthumbnail").src = "images/nest.jpg";
    video.pause();
    streaming = false;
    return;
  }
  document.getElementById("streamthumbnail").src =
    "https://email.en.ascema.com:444/?action=stream";
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
    video.addEventListener("loadedmetadata", function () {
      video.play();
    });
  }
  streaming = true;
}
