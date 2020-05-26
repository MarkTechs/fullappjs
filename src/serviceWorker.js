const cacheEstatico = "site-static";
const assets = [
  "/",
  "/database.js",
  "/index.js",
  "/public/css/main.css",
  "/loader.js",
  "/manifest.json",
  "/config/passport.js",
  "/helpers/auth.js",
  "/models/Notes.js",
  "/models/Users.js",
  "/public/logo.css",
  "/public/css/main.css",
  "/public/img/logosm.png",
  "/public/img/libreria.png",
  "/public/img/audio-libro.png",
  "/routes/diario.js",
  "/routes/index.js",
  "/routes/users.js",
  "/views/layouts/main.hbs",
  "/views/notes/allnotes.hbs",
  "/views/notes/editnotes.hbs",
  "/views/notes/newnotes.hbs",
  "/views/partials/erros.hbs",
  "/views/partials/messages.hbs",
  "/views/partials/navigation.hbs",
  "/views/users/about.hbs",
  "/views/users/index.hbs",
  "/views/rutines/rutinesUser.hbs"

];

//instalación del service worker
self.addEventListener("install", evt => {
  evt.waitUntil(
    caches.open(cacheEstatico).then(cache => {
      console.log("agregando Assets del cascaron del sitio web!");
      cache.addAll(assets);
    })
  );
});

//activate event
self.addEventListener("activate", evt => {
  //console.log("service worker ha sido activado!");
});

//fetch event
self.addEventListener("fetch", evt => {
  //console.log("fetch event", evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});

  