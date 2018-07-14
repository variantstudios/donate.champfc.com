
$('.subpage.with-sidebar .content h3').each(function() {
  var hyphenated = $(this).text().replace(/\s/g, '-').toLowerCase();
  $(this).attr('id', hyphenated);
});

var ToC = '<nav role="navigation" class="table-of-contents">' + '<h4>— in-page sub navigation  —</h4>' + '<ul>';

var newLine, el, title, link;

$('.subpage.with-sidebar .content h3').each(function() {
  el = $(this);
  title = el.text();
  link = '#' + el.attr('id');

  newLine = '<li>' + '<a href="' + link + '">' + title + '</a>' + '</li>';

  ToC += newLine;
});

ToC += '</ul>' + '</nav>';

$('.toc').prepend(ToC);

if (window.matchMedia('(min-width: 800px)').matches) {
  var elements = document.querySelectorAll('.sticky');
  Stickyfill.add(elements);
  //console.log('Wide viewport');
} else {
  //console.log('Small viewport');
}
