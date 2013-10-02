(function ($) {
  var json_url = "http://vimeo.com/api/v2/canonicaldesign/videos.json?callback=?";
  var listTemplate = _.template($("#list_template").html());
  var $list = $('ul.videos_list');

  var renderVideo = function (video_obj) {
    var el = listTemplate({
      title: video_obj.title,
      image: video_obj.thumbnail_large,
      video_url: "//player.vimeo.com/video/" + video_obj.id
    });
    $list.append(el);
  };

  $.getJSON(json_url, function (data) {
    _.each(data, function (e) {
      renderVideo(e);
    });

    $('.loading').remove();
  });

  $(function () {
    $('ul.videos_list li a').fancybox({
      type: "iframe"
    });
  });
})(jQuery);
