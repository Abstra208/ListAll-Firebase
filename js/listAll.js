import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js';
import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDZOojkQJf0PIXfYgMf6SdyurI22vEjnnk",
    authDomain: "ctc3420.firebaseapp.com",
    projectId: "ctc3420",
    storageBucket: "ctc3420.appspot.com",
    messagingSenderId: "298220775488",
    appId: "1:298220775488:web:b24600577123d5946a97a5",
    measurementId: "G-27E2ZLHJW0"
});

const storage = getStorage(firebaseApp);
const listRef = ref(storage, '');
const imagesContainer = document.getElementById("timeSheets_list");
const BigPicture = document.getElementById("big_image_content");
let srcImageCliquee = "";

listAll(listRef)
    .then((res) => {
        res.items.forEach((itemRef) => {
            getDownloadURL(ref(storage, itemRef ))
                .then((url) => {
                    const imgElement = document.createElement("img");
                    const divElement = document.createElement("div");
                    const h1Element = document.createElement("h1");

                    imgElement.src = url;
                    imgElement.alt = itemRef.name;

                    h1Element.textContent = itemRef.name;

                    divElement.appendChild(imgElement);
                    divElement.appendChild(h1Element);
                    imagesContainer.appendChild(divElement);

                    const enfants = Array.from(imagesContainer.children);
                    enfants.forEach(enfant => {
                        enfant.addEventListener('click', function() {
                          srcImageCliquee = this.querySelector('img').src; // Stocke le src de l'image cliquée
                          afficherBigImageContent(srcImageCliquee); // Appelle la fonction pour afficher l'image cliquée
                        });
                      });                      
                })
                .catch((error) => {
                    console.error("Erreur lors de l'obtention du lien :", error);
                });
        });
    }).catch((error) => {
        console.error("Erreur lors de la récupération de la liste :", error);
});

function afficherBigImageContent(imgUrl) {
    const bigImageContent = document.getElementById("big_image_content");
    const bigImage = document.getElementById("big_image");
    bigImageContent.style.display = 'block';
    bigImage.src= imgUrl;
}

document.getElementById("closeBigPicture").addEventListener('click', function() {
    const bigImageContent = document.getElementById("big_image_content");
    bigImageContent.style.display = 'none';
})