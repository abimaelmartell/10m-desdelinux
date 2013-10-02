(function ($) {
  var DesdeLinux = function(){
    var homeTemplate = _.template($("#home_template").html()),
        videoTemplate = _.template($("#video_template").html()),
        $container = $('.main_content'),
        _this = this;

    this.current_route = null;

    this.init = function(){
      this.initRoute(window.location.hash);
      $(window).on('popstate', function(e){
        e.preventDefault();
        _this.initRoute(window.location.hash);
      });
    };

    this.initRoute = function(route){
      if(route == this.current_route)
        return false;
      var video_id = route.match(/^#!\/video\/(\d+)/);
      $('.loading').show();
      if(video_id){
        this.video(video_id[1]);
      }else{
        this.home();
      }
      $(window).scrollTop(0);
      this.current_route = route;
    };

    this.home = function(){
      $.getJSON("http://vimeo.com/api/v2/group/shortfilms/videos.json?callback=?", function (data) {
        var videos = [], video;
        _.each(data, function (video_obj) {
          video = {
            title: video_obj.title,
            image: video_obj.thumbnail_large,
            url: "/#!/video/" + video_obj.id
          };
          videos.push(video);
        });
        $container.html(homeTemplate({videos: videos}));
        $('.loading').hide();
      });
    };

    this.video = function(video_id){
      $.getJSON("http://vimeo.com/api/v2/video/" + video_id +  ".json?callback=?", function(data){
          var video = data[0];
          $container.html(videoTemplate({
            title: video.title,
            video_id: video.id
          }));
          $('.loading').hide();
      });
    };

    return this.init();
  };

  new DesdeLinux();
})(jQuery);
