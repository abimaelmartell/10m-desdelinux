(function($){
  var json_url = "http://vimeo.com/api/v2/16180379/videos.json?callback=?";
  var listTemplate = _.template($("#list_template").html());
  var $list = $('ul.videos_list');

  $.getJSON(json_url, function(data){
    _.each(data, function(e){
      renderVideo(e);
    });
  });

  var renderVideo = function(video_obj){
    el = listTemplate({
      title: video_obj.title,
      image: video_obj.thumbnail_large,
      video_url: "//player.vimeo.com/video/" + video_obj.id
    });
    console.log(video_obj);
    $list.append(el);
  };

  $(function(){
    $('ul.videos_list li a').fancybox({
        type: "iframe"
    });
  });
})(jQuery);