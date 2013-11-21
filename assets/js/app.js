/*global window, Zepto, Mustache*/
(function ($, Mustache, window, undefined) {
  var DesdeLinux = function () {
    var homeTemplate = $("#home_template").html(),
      videoTemplate = $("#video_template").html(),
      $container = $('.main_content'),
      _this = this,
      vimeoGroup = "210882";

    this.pagesCache = {};

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
      if(route in this.pagesCache){
        $container.html(this.pagesCache[route]);
      }else{
        var video_id = route.match(/^#!\/video\/(\d+)/);
        $('.loading').show();
        if (video_id) {
          this.video(video_id[1]);
        } else {
          this.home();
        }
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
        var content = Mustache.render(homeTemplate, {videos: videos});
        $container.html(content);
        _this.pagesCache['#!/'] = content;
        $('.loading').hide();
      });
    };

    this.video = function (video_id) {
      $.getJSON("http://vimeo.com/api/v2/video/" + video_id +  ".json?callback=?", function (data) {
        var video = data[0];
        var content = Mustache.render(videoTemplate, {title: video.title, video_id: video.id});
        $container.html(content);
        _this.pagesCache['#!/video/' + video_id ] = content;
        $('.loading').hide();
      });
    };

    return this.init();
  };

  window.app = new DesdeLinux();
}(Zepto, Mustache, window));
