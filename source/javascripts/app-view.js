var app = app || {};

(function(){
  app.AppView = Backbone.View.extend({
    template: JST["templates/index"],
    el: '.main_content',
    initialize: function(){
      this.listenTo(app.Videos, 'all', this.render);
      app.Videos.fetch({ reset: true });
    },
    render: function(){
      this.$el.html(this.template({videos: app.Videos.toJSON()}));
    }
  });
})();
