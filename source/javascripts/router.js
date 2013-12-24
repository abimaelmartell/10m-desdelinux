var app = app || {};

(function(){
  var Router = Backbone.Router.extend({
    routes: {
      '': 'home',
      'video/:id': 'singleVideo',
      '!/video/:id': 'singleVideo'
    },
    singleVideo: function(id){
      var video = new app.Video({ id: id });
      video.fetch({
        success: function(){
          new app.VideoView({ model: video });
        }
      });
    },
    home: function(){
      new app.AppView();
    }
  });

  app.Router = new Router();
  Backbone.history.start();
})();
