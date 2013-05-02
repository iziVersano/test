
Hello ,
use grunt.js to run it on node server , but it can be run on any server .
it uses external library's like Backbone.js , Require.js , Jquery. this is the skeleton architecture i use usually.
its not minified or compressed , you can use the instructions on the readme to build and minify it , i can also do it 
and send the minified version (its just has better performance).


## Quickstart

Though this is a mostly static frontend, there are some things that need to be installed and setup so the development goes smoothly.

#### Install NodeJS

This allows for JavaScript on the command line. If you don't already have it installed, goto the [official website](http://nodejs.org/) and follow the instructions for your platform.

#### Install PhantomJS

This gives us a headless browser on the command line, which is great for testing. If you don't already have it installed, goto the [official website](http://phantomjs.org/) and follow the instructions for your platform. In the future, this can be used with Grunt to do command line testing of your project.

#### Install Grunt

With NodeJS installed, you'll have access to NPM, which is NodeJS's package manager. With this, we can install other tools we need. Grunt is a build a tool for JavaScript projects and allows for some very useful things, including distributing, linting, minifying, compiling the RequireJS modules and also includes watchers for LESS, CoffeeScript etc. Run this to install globally on your system.

```
npm install -g grunt
```
You can find out more about Grunt by going to the [Grunt official page](http://gruntjs.com/) or by running `grunt --help`.

#### Clone this repository!

You've probably already done this bit, but of course you need the project on your computer. Obviously, [you'll need Git](http://git-scm.com/) for this.

#### Install project dependencies

In the project root, run this to install the project dependencies, which are basically other node modules for Grunt to work.

```
npm install
```

This basically looks at the project's `package.json` file and installs the dependencies from there.

#### Run a local server and watch

Due to AJAX calls being made and certain asset references, you'll need some sort of local server running to serve the files correctly. It has been setup so you have a static server and a watcher combined, so simply running this in the project root gives you a static server, a LESS compiler and JS linter.

```
grunt launch
```

And that's it. Make sure to leave this running in your terminal whilst developing.

Note: If you encounter an error saying 'Error: EMFILE: Too many opened files.' when executing abovementioned task, which may happen on MacOS especially, you need to make sure you have enough of ulimit allocated (by default its set to 256 which is not much at all). You can fix the problem by executing following command from your terminal:

```
ulimit -n 3072		# to set limit to 3072
```

#### Or... Just need to watch?

Maybe you have another solution for running a local development server. If so, you'll still want to watch your files whilst developing so it'll do LESS compling and run the JS linter. In the project root, run this:

```
grunt watch
```

And that will sit and watch for any changes made to your LESS files and it will automatically create the CSS files for viewing. It also watches your JS files and will lint them automatically for you. This means it'll catch any errors you have before they become a problem.


## Use of AMD and Non-AMD code

This project uses a hybrid of AMD modules and normal global libraries. After a lot of testing, and with the general erractic state of AMD support with many third party libraries, the decision was made that all application wide scripts (such as jQuery, jQuery plugins, Backbone, Underscore etc) should just be included as normal using the traditional script tag way. Any application code will be strictly AMD and used with RequireJS in the normal way. Though this may seem a little odd at first, there is quite a few advantages to this setup, the main disadvantage really is inconsistency. Just remember, any global third party libraries should simply use the normal script tag way defined in the `index.html` page. Any application code that is required to be built and optimized at a later stage, should be using modules with RequireJS.

## Backbone coding notes

* This project is using Backbone Layout Manager for certain parts, it requires a slightly different way of doing certain views. There is [lots of information here](http://tbranyen.github.com/backbone.layoutmanager/).
* Code has been separated into distinct 'widgets' and 'pages' for (hopefully) modularity and loose-coupling.
* When widget are initializing their own sub views, remember to pass in the `widget` etc.
* When subscribing or unsubscribing to events through the mediator, remember to pass the page/widget context into it.

project so far, please continue with the tests in the same manner as the ones detailed in the project.

## Building for production

This project is extensively using Grunt for it's building. You can see all Grunt configuration in the `grunt.js` file in the project root. The default directory for the build destination is `../build/` from the project root. This can be changed in the `grunt.js` configuration file. To do a full build, including linting, minification, concating just run:

```
grunt build
```

## Resources

* [NodeJS](http://nodejs.org/)
* [PhantomJS](http://phantomjs.org/)
* [Grunt](http://gruntjs.com/)
* [LESS](http://lesscss.org/)
* [Jasmine](http://pivotal.github.com/jasmine/)
* [Require](http://requirejs.org/)
* [jQuery](http://jquery.com/)
* [jQuery UI](http://jqueryui.com/)
* [jQuery UI Touch Punch](http://touchpunch.furf.com/)
* [Underscore](http://http://underscorejs.org/)
* [Backbone](http://backbonejs.org/)
* [Backbone LayoutManager](https://github.com/tbranyen/backbone.layoutmanager/)
* [Backbone ModelBinder](https://github.com/theironcook/backbone.modelbinder/)
* [Backbone LocalStorage](https://github.com/jeromegn/backbone.localstorage/)