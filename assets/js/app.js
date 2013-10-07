/*global window, Zepto, Mustache*/
(function ($, Mustache, window) {
  var DesdeLinux = function () {
    var homeTemplate = $("#home_template").html(),
      videoTemplate = $("#video_template").html(),
      $container = $('.main_content'),
      _this = this,
      vimeoGroup = "shortfilms";

    this.current_route = null;

    this.init = function () {
      this.initRoute(window.location.hash);
      $(window).on('popstate', function (e) {
        e.preventDefault();
        _this.initRoute(window.location.hash);
      });
    };

    this.initRoute = function (route) {
      if (route === this.current_route) {
        return false;
      }
      var video_id = route.match(/^#!\/video\/(\d+)/);
      $('.loading').show();
      if (video_id) {
        this.video(video_id[1]);
      } else {
        this.home();
      }
      $(window).scrollTop(0);
      this.current_route = route;
    };

    this.home = function () {
      $.getJSON("http://vimeo.com/api/v2/group/"+ vimeoGroup +"/videos.json?callback=?", function (data) {
        var videos = [], video;
        $.each(data, function (index, video_obj) {
          video = {
            title: video_obj.title,
            image: video_obj.thumbnail_large,
            url: "#!/video/" + video_obj.id
          };
          videos.push(video);
        });
        $container.html(Mustache.render(homeTemplate, {videos: videos}));
        $('.loading').hide();
      });
    };

    this.video = function (video_id) {
      $.getJSON("http://vimeo.com/api/v2/video/" + video_id +  ".json?callback=?", function (data) {
        var video = data[0];
        $container.html(Mustache.render(videoTemplate, {title: video.title, video_id: video.id}));
        $('.loading').hide();
      });
    };

    return this.init();
  };

  return new DesdeLinux();
}(Zepto, Mustache, window));