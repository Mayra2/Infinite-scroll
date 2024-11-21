const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'myApiKey';
const apiUrl= `https://api.unsplash.com/photos/random?client_id=${apiKey}&query=pink&count=${count}`;

// Check if all images are loaded
function imageLoaded(){
imagesLoaded++;
if(imagesLoaded===totalImages){
    ready = true;
    loader.hidden = true;
}
}

//Helper function to Set Attributes on DOM
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//Display photos - create elements for links and photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run ForEach in photosArray
    photosArray.forEach(photo => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        //Create <img> for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('title', photo.alt_description);
        // img.setAttribute('alt', photo.alt_description);
       
        //Put the img inside <a>, and both inside imageContainer
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        //Event Listener when photos are loaded
        img.addEventListener('load', imageLoaded);
        //Append items
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

}
//Get photos form Unsplash API
async function getPhotos() {
    try{
const response = await fetch(apiUrl);
photosArray = await response.json();
displayPhotos();
    }catch(error){

    }
}

//Check to see if scrolling near bottom, load more
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready=false;
        getPhotos();
    }
})
getPhotos();