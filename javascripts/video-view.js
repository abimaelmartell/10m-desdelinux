var app = app || {};

(function(){
  app.VideoView = Backbone.View.extend({
    el: '.main_content',
    template: JST['templates/video.jst'],
    initialize: function(){
      this.render();
    },
    render: function(){
      this.$el.html(this.template({ video: this.model.toJSON() }));
    }
  });
})();
