!function ($) {
  var $win = $(window)
    , $nav = $('.subnav')
    , navTop = $('.subnav').length && $('.subnav').offset().top - 40
    , isFixed = 0
    , moduleDescriptors = $('.workflow-steps .module')
    , chosenModuleExtension = 'js'
    , chosenModule = 'builtin';

  processScroll()

  // hack sad times - holdover until rewrite for 2.1
  $nav.on('click', function () {
    if (!isFixed)
      setTimeout(function () { $win.scrollTop($win.scrollTop() - 147) }, 10)
    else
      setTimeout(function () { $win.scrollTop($win.scrollTop() - 87) }, 10)
  })

  $win.on('scroll', processScroll)

  function processScroll() {
    var i, scrollTop = $win.scrollTop()
    if (scrollTop >= navTop && !isFixed) {
      isFixed = 1
      $nav.addClass('subnav-fixed')
    } else if (scrollTop <= navTop && isFixed) {
      isFixed = 0
      $nav.removeClass('subnav-fixed')
    }
  }

  function doCodeHighlight(el) {
    names = $(el).attr('class').split(" ");
    names.shift()
    $('span.' + names.join(', span.')).toggleClass('hilight')
  }

  $('.config .hi').mouseover(function(){
    doCodeHighlight(this)
  }).mouseout(function(){
    doCodeHighlight(this)
  })

  if (moduleDescriptors.length > 0) {

    function showModule() {
      $(moduleDescriptors).hide();
      console.log(chosenModuleExtension, chosenModule)
      $(moduleDescriptors).filter('.' + chosenModuleExtension + '.' + chosenModule).show();
    }

    showModule()

    $('[name="extension"]').click(function() {
      chosenModuleExtension = $(this).val();
      showModule();
    }).attr('checked',false).filter('[value="' + chosenModuleExtension + '"]').attr('checked',true)

    $('[name="module"]').click(function() {
      chosenModule = $(this).val();
      showModule();
    }).attr('checked',false).filter('[value="' + chosenModule + '"]').attr('checked',true);

  }

}(window.jQuery)