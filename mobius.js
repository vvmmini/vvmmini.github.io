var tracks = [
  { src: 'vvmminis/001_1.ogg', id: 1,  data: '\u2591' },
  { src: 'vvmminis/002_1.ogg', id: 2,  data: '\u2051' },
  { src: 'vvmminis/003_1.ogg', id: 3,  data: '\u253d' },
  { src: 'vvmminis/004_1.ogg', id: 4,  data: '\u25a4' },
  { src: 'vvmminis/005_1.ogg', id: 5,  data: '\u2698' },
  { src: 'vvmminis/006_1.ogg', id: 6,  data: '\u2235' },
  { src: 'vvmminis/007_1.ogg', id: 7,  data: '\u259b' },
  { src: 'vvmminis/008_1.ogg', id: 8,  data: '\u2589' },
  { src: 'vvmminis/009_1.ogg', id: 9,  data: '\u25ce' },
  { src: 'vvmminis/010_1.ogg', id: 10, data: '\ua623' },
  { src: 'vvmminis/011_1.ogg', id: 11, data: '\u2563' },
  { src: 'vvmminis/013_1.ogg', id: 13, data: '\u09dc' },
  { src: 'vvmminis/015_1.ogg', id: 15, data: '\u0469' },
  { src: 'vvmminis/016_1.ogg', id: 16, data: '\u1328' },
];

createjs.Sound.alternateExtensions = ["mp3"];
createjs.Sound.registerManifest(tracks);

var stop = function(soundInstance) {
  if (soundInstance) {
    soundInstance.stop();
  }
}

$.each(tracks, function(index, item) {
  var track = $("<div />", {
    text: item.data,
    id: index,
    class: "track",
    href: "#"
  });

  track.on("click", function(e) {
    if (track.hasClass("current")) {
      stop(track.soundInstance);
      track.removeClass("current");
    } else {
      track.soundInstance = createjs.Sound.play(item.src, { loop: -1 });
      track.addClass("current");
    }
  });

  $("body").append(track);
});

$("#title").on("click", function() {
  $(".current").removeClass("current");
  createjs.Sound.stop();
});
