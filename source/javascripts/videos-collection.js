var app = app || {};

(function(){
  var Videos = Backbone.Collection.extend({
    url: "http://vimeo.com/api/v2/group/210882/videos.json",
    sync: function(method, model, options){
      options.dataType = "jsonp";
      return Backbone.sync(method, model, options);
    }  
  });

  app.Videos = new Videos();
})();
