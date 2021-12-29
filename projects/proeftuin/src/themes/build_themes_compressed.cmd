@echo off

call sass --quiet --style=compressed --no-source-map indigo-pink.scss:..\assets\themes\indigo-pink.css

call sass --quiet --style=compressed --no-source-map deeppurple-amber.scss:..\assets\themes\deeppurple-amber.css

call sass --quiet --style=compressed --no-source-map pink-bluegrey.scss:..\assets\themes\pink-bluegrey.css

call sass --quiet --style=compressed --no-source-map purple-green.scss:..\assets\themes\purple-green.css

call sass --quiet --style=compressed --no-source-map yellow-amber.scss:..\assets\themes\yellow-amber.css

call sass --quiet --style=compressed --no-source-map brown-green.scss:..\assets\themes\brown-green.css
