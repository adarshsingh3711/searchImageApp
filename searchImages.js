const accessKey = "RA6ld2TUGV1VKiYjcXLByRLdve7flEJTCbc1zkaS9lo"

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");

const searchResults = document.querySelector(".search-results");


const showMore = document.getElementById("show-more-button");


let inputData = ""

let page = 1


formEl.addEventListener("submit", async(event) => {
    event.preventDefault();

    page = 1;
   await searchImages();

});


showMore.addEventListener("click", async() => {



    await searchImages();
 
     });



async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url);
   
    const data = await response.json();

    
    console.log( data);


    


    const results = data.results

    if (page == 1) {

        searchResults.innerHTML = "";
    }

    results.map((result) => {

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;


        const imageLink = document.createElement("a");

        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;


        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);




    });

    page++
    if (page > 1) {
        showMore.style.display = "block"
    }


   



   




}

// // Function to set/update cookies
// function setCookie(name, value, days) {
//     const expires = new Date();
//     expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

//     document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=None; Secure`;
// }

// // Usage
// setCookie("_sp_ses.0295", "your_value", 30);
// setCookie("_sp_id.0295", "your_value", 30);
