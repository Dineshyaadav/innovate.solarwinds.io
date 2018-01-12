---
---

(function($) {
  // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function getAttr(num, totalNum) {
    num = num + 1;
    var photoId = num,
        dataPrev = num - 1,
        dataNext = num + 1;

    if (num > 0 && num < 10) {
      photoId = '0' + photoId;
      dataPrev = '0' + dataPrev;

      if (num !== 9) {
        dataNext = '0' + dataNext;
      }
    }

    if (num === 10) {
      dataPrev = '0' + dataPrev;
    }

    if (num === 1) {
      dataPrev = totalNum;
    }

    if (num === totalNum) {
      dataNext = '01';
    }

    return {
      'id': 'thumb' + photoId,
      'data-prev': 'thumb' + dataPrev,
      'data-next': 'thumb' + dataNext
    }
  }

  var photosArray = [
  {%- assign count = 1 | plus: 0 -%}
  {%- for image in site.static_files -%}
    {%- if image.path contains 'assets/2017/images/event' -%}
      {%- unless image.name contains '_thumb' -%}
        {%- capture thumb-path -%}{{ image.path | split: '.' | first }}_thumb.jpg{%- endcapture -%}
        '<img src="{{ thumb-path }}" alt="Photos from SolarWinds Innovate Summit 2017 in Brno" class="gallery__thumb" data-src="{{ image.path }}" />'{% if count < 79 %}, {% endif %}
        {%- assign count = count | plus: 1 -%}
      {%- endunless -%}
    {%- endif -%}
  {%- endfor -%}
  ];
  var $gallery = $('.gallery');
  photosShuffled = shuffle(photosArray);
  for (var i = 0; i < photosArray.length; i++) {
    let $photo = $($.parseHTML(photosArray[i])).attr(getAttr(i, photosArray.length));
    $gallery.append($photo);
  }

})(jQuery);