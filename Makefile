# JS files
JS_FINAL = assets/min/app.js
 
JS_TARGETS = assets/js/lib/zepto.js \
			 assets/js/lib/mustache.js \
			 assets/js/app.js

# CSS files
CSS_FINAL = assets/min/app.css

CSS_TARGETS = assets/css/lib/normalize.css \
              assets/css/app.css
 
# Binaries
YUI_COMPRESSOR = java -jar vendor/yuicompressor.jar
YUI_COMPRESSOR_FLAGS = --charset utf-8 
 
CSS_MINIFIED = $(CSS_TARGETS:.css=.min.css)
JS_MINIFIED = $(JS_TARGETS:.js=.min.js)
 
all: $(JS_FINAL) $(CSS_FINAL)
 
# JS
$(JS_FINAL): $(JS_MINIFIED)
	cat $^ >$@
	rm -f $^
 
%.min.js: %.js
	$(YUI_COMPRESSOR) $(YUI_COMPRESSOR_FLAGS) --type js $< >$@
	echo >> $@
 
# CSS
$(CSS_FINAL): $(CSS_MINIFIED)
	cat $^ >$@
	rm -f $^
 
%.min.css: %.css
	$(YUI_COMPRESSOR) $(YUI_COMPRESSOR_FLAGS) --type css $< >$@
 
clean:
	rm -f $(JS_FINAL) $(CSS_FINAL)
 
.DEFAULT_GOAL := all
 
.PHONY: clean css
