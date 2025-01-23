@echo off

call sass --quiet --style=compressed --no-source-map --load-path=../../../../node_modules/ indigo-pink.scss:..\assets\themes\indigo-pink.css

call sass --quiet --style=compressed --no-source-map --load-path=../../../../node_modules/ deeppurple-amber.scss:..\assets\themes\deeppurple-amber.css

call sass --quiet --style=compressed --no-source-map --load-path=../../../../node_modules/ pink-bluegrey.scss:..\assets\themes\pink-bluegrey.css

call sass --quiet --style=compressed --no-source-map --load-path=../../../../node_modules/ purple-green.scss:..\assets\themes\purple-green.css

call sass --quiet --style=compressed --no-source-map --load-path=../../../../node_modules/ yellow-amber.scss:..\assets\themes\yellow-amber.css

call sass --quiet --style=compressed --no-source-map --load-path=../../../../node_modules/ brown-green.scss:..\assets\themes\brown-green.css
