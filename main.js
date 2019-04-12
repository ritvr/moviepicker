
 

// DATA FETCH & DYNAMIC ELEMENT CREATION

// Fetches Movie data and creates elements to hold it on the main page
fetch('revised-med-movielist-2008-2018.json')  //use 'revised-med-movielist-2008-2018.json'
.then(response => response.json())
.then(data => {
    console.log(data[0].thumbnail);
    //Test of 'find' feature:
    let x = data.find(item => item.movie === 'It');
    console.log( x)

    data.map( data => {

        // Creates the 'main' div element and class that will hold the movie images
        let div = document.createElement('div');
        // Adds a filterable genre ClassName to 'main' element. Stripping out commas from the 'genre' data attribute.
        let cat = data.genre.replace(/,+/g,'')
        div.className='main filterDiv show ' + cat + ' ' +data.year;  //filterDiv and show are classes for filtering divs on main page
        div.style.backgroundImage= 'url('+data.thumbnail+')';
        
        
        // Movie Score Background colour
        let scoreBg = document.createElement('div')
        scoreBg.className='scoreBg'
        div.appendChild(scoreBg)

        // Transluscent Overylay of image 
        let overlay = document.createElement('div')
        overlay.className='imgOverlay'
        overlay.id=data.movie
        //Listens for a click on a particular movie then opens the movie details in a pop-up modal
        overlay.addEventListener('click', function(){
            console.log('Finding: ' + this.id );
            console.log(data.movie + data.year + data.description +data.runtime +data.imdb)
            // Makes the Modal visible
            modal.style.display='block';
            modalContent.style.display='grid';
            // Updates the Modal with specific movie information 
            document.querySelector('.heading').innerHTML=data.movie
            document.querySelector('.genre-category').innerHTML=data.genre
            document.querySelector('.year').innerHTML=data.year
            document.querySelector('.rating').innerHTML=data.rating
            document.querySelector('.runtime').innerHTML=data.runtime
            document.querySelector('.description').innerHTML=data.description
            // Creates Modal-Image element and populates with image
            let modalImage = document.createElement('div')
            modalImage.className='modal-image'
            modalImage.id=data.movie
            modalImage.style.background='url('+data.thumbnail+')'
            modalImage.style.backgroundSize='contain'
            modalImage.style.backgroundRepeat='no-repeat'
            modalContent.appendChild(modalImage)

            // Creates Favourite div to hold heart icon
            let favourite = document.createElement('div')
            favourite.className='favourite'
            favourite.id = data.movie
            modalContent.appendChild(favourite)
            
            // Creates Heart icon
            let heart = document.createElement('i')
            heart.className='fas fa-heart'
            favourite.appendChild(heart)

            

            // Function to check and see if movie is favourited
            favCheck = () => {
            if (movieList.find(x =>x.movie === modalImage.id))
                heart.style.color='red'

            else 
                heart.style.color='white'
            }

            // Calls function to see if movie is already favourited
            favCheck()
            
            // Event Listener to mark movie as 'Favourited'
             heart.addEventListener('click', () => {
                 if (heart.style.color!='red')
                    markMovie()
                else if (heart.style.color='red')
                    removeMovie()
             })

             // Function to mark movie as Favourite
             markMovie = () => {
                heart.style.color='red';
                movieList.push({"movie":modalImage.id, "url":modalImage.style.backgroundImage});
                myFavs()
             }

             // Function to unmark movie as Favourite 
             removeMovie = () => {
                 movieList = movieList.filter(x => x.movie !== modalImage.id)
                 heart.style.colour='white'
                 favCheck()
                 myFavs()
             }

              // Event Listener to Close Modal
              modal.addEventListener('click', function(e){   
                if (modalContent.contains(e.target)){
                } 
                else {
                    console.log('Clicked outside - close now. ')
                    modalImage.style.backgroundImage=''
                    modal.style.display='none'
                    modalContent.style.display='none'
                }
            });

            

            
        }, false);
        div.appendChild(overlay)

        // Movie Score
        let score = document.createElement('div')
        score.innerHTML = (data.imdb)
        score.className='score'
        // score.style.display='none'
        div.appendChild(score)

        // Movie Title
        let movie = document.createElement('div')
        movie.innerHTML= '<p>' + (data.movie) + '</p>'
        movie.className='movie'
        div.appendChild(movie)

        // Attach Genre attribute -- to be searchable / filterable
        div.setAttribute('genre', data.genre)
        
        // Add 'main' elelment to the document body
        container.appendChild(div)  
        

        // let cat = data.genre.split(',')
        console.log(cat)
        //console.log(data.genre )



        })})



// Display Favourites in Navbar
myFavs = () => {
    if (movieList.length > 0) {
        favourites.style.color='red'
        counter.style.display='block'
        counter.innerHTML=movieList.length
    }
    else if (movieList.length == 0 || '') {
        favourites.style.color='white'
        counter.style.display='none'
        counter.innerHTML=''
    }
}


// Filter Movie Divs

// Filterable 'main' movie divs displaying based on genre selection
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}

//Add the Show Class
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
        element.className += " " + arr2[i];
    }
  }
}

// Remove the Show Class
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}


// ***TO-DO: Update to ES2019
var genreContainer = document.getElementById("genre-container");
var btns = genreContainer.getElementsByClassName("genre-select");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}






// VARIABLES

let main = document.querySelector('.main')
let container = document.querySelector('.container')
let imgOverlay = document.querySelector('.imgOverlay')
let modal = document.querySelector('.modal')
let modalContent = document.querySelector('.modal-content')
let favourites = document.querySelector('.favourites')
let counter = document.querySelector('.counter')
let modalListContent = document.querySelector('.modal-list-content')
let modal2 = document.querySelector('.modal2')

let movieList = [];



// DOCUMENT EVENT LISTENERS



// Event Listner to Hide Navbar on Scroll Down - Show on Scroll Up
window.addEventListener('scroll', (e) => { 
    let scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let navbar = document.querySelector('.navbar');

    scrollY <= this.lastScroll 
      ? navbar.style.visibility = 'visible'
      : navbar.style.visibility = 'hidden'; 

    this.lastScroll = scrollY ;
})

// Event Listener to Display Favourited Movies Shortlist
favourites.addEventListener('click', () => {
    //Displays pop-up modal for shortlist movies display
    modal2.style.display='block'
    modalListContent.style.display='grid'

    //Maps shotlisted movies from array
    movieList.map( x => {
        // Creates and displays Favourited Movie Image
        let modalListImage = document.createElement('div')
        modalListImage.className= "modal-list-image"
        modalListImage.style.background = x.url
        modalListImage.style.backgroundSize='contain'
        modalListImage.style.backgroundRepeat='no-repeat'
        modalListContent.appendChild(modalListImage)

        // Creates and displays Favourited Movie Title
        let modalListTitle = document.createElement('div')
        modalListTitle.className = "list-heading"
        modalListTitle.innerHTML= x.movie
        modalListContent.appendChild(modalListTitle)

        // Event Listener to Close Modal holding the Favourite List
        modal2.addEventListener('click', function(e){   
            if (modalListContent.contains(e.target)){
            } 
            else {
                // Deletes Image and Title as the map function re-runs each time the Favourited Movies modal is opened
                modalListImage.remove()
                modalListTitle.remove()
                modalListContent.style.display='none'
                modal2.style.display='none'
            }
         });
    })  
})







