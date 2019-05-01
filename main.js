$(document).ready(function (){
console.log('connected');
$('<h1>').text('Search Top 10 Unsplash Image').appendTo('body')
var form = $('<form>').appendTo('body')
$('<input>').attr({'type':'text' , 'placeholder':'Search ... ' , 'id' : 'word'}).appendTo(form);
$('<input>').attr({'type':'submit' , 'id' : 'submit'}).val('search').appendTo(form);
$('<div>').addClass('result').appendTo('body');


//https://api.unsplash.com/search/photos/?query=sun&client_id=14647ec1963c472041f77a08e5ff1251e4f527f56fb59c66ae7dfe19e1c686d8
var colic = [];

function retrieveImage(){
    if(localStorage.getItem('savedImage') !== null){
      renderImage();
    }

  }

$('form').on('submit', function(){
    event.preventDefault();
    var word = $('#word').val();
    console.log('the word is ' + word);
    var url  = 'https://api.unsplash.com/search/photos/?query='+word+'&client_id=14647ec1963c472041f77a08e5ff1251e4f527f56fb59c66ae7dfe19e1c686d8'
    console.log(url)

    $.ajax({
      method: 'GET',
      url: url ,
      success: function(response) {
        console.log(response)
        console.log(response.results[0].urls.raw)
        parseData(response);
      } ,      
     
      error: function(error) {
        console.error('error : ', error);
      }
    })
  })

  function parseData(data) {
      for(var i = 0 ; i < 9 ; i++) {
        var image_url = data.results[i].urls.small
            var alt_description = data.results[i].alt_description
            console.log(alt_description);
            
            var newimage = {
                image: image_url,
                alt: alt_description
            }

            
            colic.push(newimage);
            localStorage.setItem('colic' , JSON.stringify(colic));
            renderImage(newimage)
      }
      console.log(parseData)
  }

  function renderImage(image) {
    var $saved = $('.result').empty();
    colic.forEach(function(image) {
        var $imageContainer = $('<div>').addClass('image-container').appendTo($saved);
        $('<div>').addClass('bottom-left').text(image.alt).appendTo($imageContainer);
        $imageContainer.append($('<img>').attr('src',image.image))
        console.log(image.image_url)
        
        
    });
}
})