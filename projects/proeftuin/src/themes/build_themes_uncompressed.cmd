@echo off

call sass --quiet --style=expanded --no-source-map --load-path=../../../../node_modules/ indigo-pink.scss:indigo-pink.css

call sass --quiet --style=expanded --no-source-map --load-path=../../../../node_modules/ deeppurple-amber.scss:deeppurple-amber.css

call sass --quiet --style=expanded --no-source-map --load-path=../../../../node_modules/ pink-bluegrey.scss:pink-bluegrey.css

call sass --quiet --style=expanded --no-source-map --load-path=../../../../node_modules/ purple-green.scss:purple-green.css

call sass --quiet --style=expanded --no-source-map --load-path=../../../../node_modules/ yellow-amber.scss:yellow-amber.css

call sass --quiet --style=expanded --no-source-map --load-path=../../../../node_modules/ brown-green-amber.scss:brown-green.css
