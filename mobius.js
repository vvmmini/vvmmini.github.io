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

  if ($(".current").length === 0) Vvolygon.clear();
}

function stopAllTracks() {
  $(".current").removeClass("current");
  createjs.Sound.stop();
}

function startTrack(track) {
  track.soundInstance = createjs.Sound.play(track.data("src"), { loop: -1 });
  track.addClass("current");
  Vvolygon.newMesh();
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
      startTrack(track);
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


Vvolygon = {
  colors: {
    grays: [
      new THREE.Color(0xe0e0e0),
      new THREE.Color(0xafafaf),
      new THREE.Color(0x656565),
      new THREE.Color(0xe7e7e7),
      new THREE.Color(0x4f4f4f),
    ],
    lights: [
      new THREE.Color(0x9E8299),
      new THREE.Color(0xB5D8E2),
      new THREE.Color(0xB1E6C4),
      new THREE.Color(0xEEAFA9),
      new THREE.Color(0xAEE9CE),
      new THREE.Color(0xD1ABEC),
      new THREE.Color(0x6BC5C6),
      new THREE.Color(0xE8C2BA),
      new THREE.Color(0xBAE0E8),
      new THREE.Color(0x87A2A8),
    ]
  },

  init: function() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });

    this.newMesh();
    this.camera.position.z = 1.5;

    this.render();

    $("body").prepend(this.renderer.domElement);
  },

  clear: function() {
    this.scene.remove(this.mesh);
    this.render();
  },

  render: function() {
    requestAnimationFrame(Vvolygon.render);

    if ($(".current").length) {
      Vvolygon.mesh.position.x += _.random(-0.005, 0.005);
      Vvolygon.mesh.position.y += _.random(-0.005, 0.005);
      Vvolygon.mesh.rotation.x += _.random(-0.001, 0.001);
      Vvolygon.mesh.rotation.y += _.random(-0.001, 0.001);

      if (Math.random() > 0.999) {
        Vvolygon.camera.lookAt(Vvolygon.mesh.getWorldPosition());
      }
    }

    Vvolygon.renderer.render(Vvolygon.scene, Vvolygon.camera);
  },

  generateGeometry: function() {
    var geometry = new THREE.Geometry();

    var vertices = _.random(20, 30);
    var faces = _.random(10, 20);

    geometry.vertices = [];
    for (var i = 0; i <= vertices; i++) {
      geometry.vertices.push(
        new THREE.Vector3(_.random(-1.5, 1.5),
                          _.random(-1.5, 1.5),
                          _.random(-1.5, 1.5))
      );
    }

    geometry.faces = [];
    for (var i = 0; i <= faces; i++) {
      geometry.faces.push(
        new THREE.Face3(_.random(vertices),
                        _.random(vertices),
                        _.random(vertices),
                        new THREE.Vector3(0, 1, 0),
                        _.sample(_.union(this.colors.lights,
                                         this.colors.grays)))
      );
    }

    return geometry;
  },

  newMesh: function() {
    this.scene.children = [];

    var material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.8,
      vertexColors: THREE.VertexColors
    });

    this.mesh = new THREE.Mesh(this.generateGeometry(), material);

    this.scene.add(this.mesh);
  }
}

if (window.location.search === "?three") {
  Vvolygon.init();
}
