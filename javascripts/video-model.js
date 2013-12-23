var app = app || {};

(function(){
  app.Video = Backbone.Model.extend({
    url: function(){
      return "http://vimeo.com/api/v2/video/" + this.id + ".json";
    },
    sync: function(method, model, options){
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    },
    parse: function(response){
      return response[0];
    }
  });
})();
