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
  { src: 'vvmminis/017_1.ogg', id: 16, data: '\u4df8' },
  { src: 'vvmminis/018_1.ogg', id: 16, data: '\ua996' },
];

function start() {
  createLoading();

  var queue = new createjs.LoadQueue();
  createjs.Sound.alternateExtensions = ["mp3"];
  queue.installPlugin(createjs.Sound);
  queue.addEventListener("fileload", addTrack);
  queue.addEventListener("complete", removeLoading);
  queue.loadManifest(tracks);
}

function stopTrack(track) {
  if (track.soundInstance) {
    track.soundInstance.stop();
    track.removeClass("current");
  }
}

function stopAllTracks() {
  $(".current").removeClass("current");
  createjs.Sound.stop();
}

function startTrack(track) {
  track.soundInstance = createjs.Sound.play(track.data("src"), { loop: -1 });
  track.addClass("current");
}

function addTrack(event) {
  var item = event.item;

  var track = $("<div />", {
    text: item.data,
    id: item.id,
    class: "track",
    href: "#"
  });

  track.data("src", item.src);

  track.on("click", function(e) {
    if (track.hasClass("current")) {
      stopTrack(track);
    } else {
      startTrack(track)
    }
  });

  $("#container").append(track);
  markLoaded(item.id);
}

$("#title").on("click", stopAllTracks);


function createLoading() {
  $.each(tracks, function addTrackToProgressBar(index, item) {
    var progressbarItem = $("<li />", {
      text: item.data,
      id: "progressbaritem-"+item.id
    });
    $("#progressbar").prepend(progressbarItem);
  });
}

function markLoaded(id) {
  $("#progressbaritem-"+id).addClass("loaded");
}

function removeLoading(event) {
  $("#progressbar").remove();
}







// three.js playground
if (window.location.search === "?three") {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  var renderer = new THREE.WebGLRenderer({alpha: true});
  $("body").prepend(renderer.domElement);

  var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  var material = new THREE.MeshBasicMaterial(
    { color: 0xffffff }
  );
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 1.5;

  function render() {
    requestAnimationFrame(render);

    if ($(".current").length) {
      cube.position.x += 0.1*(Math.random() - 0.5);
      cube.position.y += 0.1*(Math.random() - 0.5);
      cube.rotation.x += 0.01*Math.random();
      cube.rotation.y += 0.01*Math.random();
      renderer.render(scene, camera);

      if (Math.random() > 0.999) {
        camera.lookAt(cube.getWorldPosition());
      }
    }
  }
  render();
}
