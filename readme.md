###This is the development repo for the [Learn Regex](http://shakyshane.github.com/learn-regex) app.

Learn Regex is designed to be an introduction to regular expressions in Javascript for beginners. Users can select 'sections' of a regex and watch it being built right there on the page. The sections can then be re-ordered or removed & there's the opportunity to use the newly created regex in a test.

### Roadmap
This first release can be seen as a proof-of-concept. In future releases I would like to see:

1. More 'sections' added so that more complicated regular expressions can be created.
2. Alternative output of the regex. Right now it's pretty verbose & accurate, but I'd like to offer the alternative short-hand style too. (like `/\.css$/gm.test('.css')` for example)
3. Offer the ability to change the language that is output (i.e. show the same regex, but in PHP, Ruby, Java etc.)

###Contributing Guide
Contributions are welcomed providing they have accompanying tests. If you are planning any major 
work, please talk to me first so that your time is not wasted.

First, clone the repository

`git clone https://github.com/shakyShane/learn-regex-dev.git regex-app`

Then, cd into **regex-app** (or whatever you called it) and run 

`npm install`

You can now run tests: `grunt karma:unit` & `grunt:karma:e2e`

You can preview the site `grunt server`

And you can 'build' the site to check everything is working nicely `grunt build`