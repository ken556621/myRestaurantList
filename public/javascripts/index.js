const heart = document.querySelectorAll('.fa-heart');

//like function
heart.forEach(icon => {
    icon.addEventListener('click',function(event){
    icon.classList.toggle("fas");
    icon.classList.toggle("liked");
    addToEatenList(event);
});
})
