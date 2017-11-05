# DO NOT USE FOR A NEW APP
This build process is for existing ionic1 / angular 1 applications looking to migrate out of these old technologies and into new ones.  Please consider one of our other stacks if you are starting a new project.

# <a name="welcome"></a> Welcome

This project is being built with the [Madness Enjin](https://github.com/MadnessLabs/MadnessEnjinCLI), so it helps to understand some basic concepts of the tool.  All of the variables for your application are stored in ```enjin.json``` file.  You also have a ```enjin.*.json``` files to overwrite variables set in enjin.json or add new values per environment.  Then all the commands accept a ```-e``` flag that you can use to set the environment.  So an example would be I create the following file in the root or run ```enjin env app``` to have it created for you.

### enjin.app.json

```
{
    "mobile": true,
    "local": false,
    "debug": true,
    "stack": "@enjin/ionic1",
    "android": {
        "keystorePassword": "YOUR ANDROID KEYSTORE PASSWORD"
    }
}
```

Now you can run ```gulp -e app``` to run a build using the ```enjin.app.json``` file you created.  This is a very powerful concept that could make any variable change per environment.  You could have colors set to signify each environment, pages that are environment exclusive, or it's also a great place to store sensitive information as shown above with the Android keystore password because it shouldn't be synced with the repo.

The other huge part of the Enjin is the [Commands](#commands) that allow you to generate code, automate dumb tasks, and maintain code quality.  This README should serve as a guide on how to use all of these wonderful tools.  Enjoy and if we have helped you out in any way then please [Support us on Patreon](https://www.patreon.com/madnesslabs) so we can continue to development on Madness Enjin.

# <a name="dependencies"></a> Dependencies

This sections starts with a reference list of all of the dependencies so that you can understand what each of these peices do.  Then there is step-by-step instructions on how to install the dependencies.

### <a name="references"></a> REFERENCES

Below is a list of resources to help understand the software stack better.  Keep scrolling or [click for the step-by-step instructions](#instructions).

* <a href="https://github.com/MadnessLabs/MadnessEnjinCLI" target="_blank">Madness Enjin CLI</a> - Project building assistant
* <a href="https://nodejs.org/" target="_blank">NodeJS</a> - For spinning up local JavaScript driven server
* <a href="http://gulpjs.com/" target="_blank">GulpJS</a> - For running local, JavaScript driven, command line tasks
* <a href="http://www.browsersync.io/" target="_blank">Browser Sync</a> - For viewing changes live in the browser without having to leave your IDE
* <a href="http://ionicframework.com" target="_blank">Ionic</a> - For wrapping your app for Mobile (iOS & Android) and stock UI with icons.
* <a href="http://sass-lang.com/" target="_blank">SASS</a> - For writting cleaner and variable capable CSS.
* <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> - For using ES6 with static typing.
* <a href="https://pugjs.org/" target="_blank">Pug</a> - For writing cleaner and variable capable HTML.
* <a href="https://github.com/mahnunchik/gulp-responsive" target="_blank">Gulp Responsive</a> - For resizing images

### <a name="instructions"></a> SETUP ENVIRONMENT INSTRUCTIONS

1. **Install NodeJS** by clicking the "Install" button on their <a href="https://nodejs.org/" target="_blank">Home Page</a> and following the instructions
2. **Open Shell** and run the following command  
```npm install -g madnessenjin cordova ionic browser-sync gulp jade typescript typings jadelint sass-lint```


After you Have installed all of the dependencies using the step by step above you can install project using the [installation instructions](#installation). Then you are ready to start hacking with the platform. 

---

# <a name="installation"></a> Installation

Installation is required if you wish to view the application.  This assumes you have installed all of the **[Dependencies](#dependencies)**. Run the command below to install the build dependencies, build the web root from source files, and start a [Browser Sync](http://www.browsersync.io/) session in the default browser, to begin building.

```
enjin start [GITHUB_USERNAME]:[GITHUB_PASSWORD]@MadnessLabs/EnjinIonic1 [APP_NAME]
```

OR

```
git clone https://github.com/MadnessLabs/EnjinIonic1.git
Password: [GITHUB_PASSWORD]
cd EnjinIonic1
npm install
``` 

OR TO ADD TO EXISTING PROJECT

```
npm install --save-dev gulpjs/gulp#4.0 frankwallis/gulp-hub#4.1.0 @enjin/ionic1
enjin init
```

Now watch your console go crazy and wait for it to ask you some questions about your app.  Answer the questions, then it will finish the install and open your new app in the browser, ready to be worked on. 

---

# <a name="getting-started"></a> Start Building

We have tried to make developing applications as easy as possible.  We create a project file for [Sublime Text 3](http://www.sublimetext.com/3), but this is by no means exclusive to that program. If you aren't using Sublime Text then skip to the [Other RTE](#other-rte) section.


### <a name="sublime"></a> SUBLIME TEXT  

1. Open Sublime Text project file located in root. ( <PROJECT NAME>.sublime-project )
2. Select "Tools" -> "Build" (Ctrl + B) to start build with GulpJS.
3. Open browser to project and click the Live Reload extension making sure the black dot fills in on the icon.

That's it! Now when you make changes to the files in src/ directory, the browser will reload to show changes auto-magically.

### <a name="other-rte"></a> OTHER EDITOR

Open Shell to project's root and run
 ```
 gulp
 ```
That's it! Now when you make changes to the files in app/ directory, the browser will reload to show changes auto-magically.

---

# <a name="commands"></a> Commands

Enjin commands allow us to automate the repetitive tasks that come with scaling a project. Here is a list of the commands available in this repo along with a short description of what they do and the list of flags that they accept.  The flags are not required, but they allow you to get somewhere quicker if you know what you want rather than answering a bunch of prompts.

### **gulp**
- -e [ENVIRONMENT] => This is the environment you would like to build for

General command for building and running a live reloading server.

### **gulp deploy**
- -e [ENVIRONMENT] => This is the environment you would like to build and deploy to

Builds the project for the environment passed and then uploads it via SSH with the enjin {```deploy.options```}. (See <a href="https://github.com/mscdex/ssh2" target="_blank">SSH2 Documentation</a> for config options)

### **gulp fonts**

Copy file globs from enjin {```font.copy```} to public directory.

### **gulp workbox**

Generates service worker for your application using WorkBox.

### **gulp stencil**

If enjin.json {```stenciljs```} is setup then this command will run a stenciljs build using that config.


---

# <a name="build-commands"></a> Build Commands

These commands will build different pieces of your application.

### **gulp build**

Runs a build of the entire project, that will include scss, ts, pug, images, ect.

### **gulp html:build**

Runs a build of the .pug files into www/html

### **gulp build:css**

Runs a build of the .scss files into www/css/build.css and a minified build to www/css/build.min.css

### **gulp build:inject**

Inject CSS and JS files into your index page.

### **gulp build:inline**

Inline CSS and JS files that have inline attribute on your index page.

### **gulp build:js**

Runs a build of the .ts files into www/js/build.js and a minified build to www/js/build.min.js

### **gulp build:watch**

The file watcher that runs builds for each type of file (This task is auto-run with gulp).

---

# <a name="add-commands"></a> Add Commands

These commands allow quick adding of different peices of the application.  The flags are not required, they just make it faster if you know what you want.  If no flags are passed it will prompt you to answer questions.

### **gulp add:controller**
- -n [NAME] => The name of the new controller (Name should be Camel Case - Ex: feedCard)
- -d [DEPENDENCIES] => The list of dependencies that need to be injected (Comma Separated)

Creates a controller and should only be used when needing a controller standing alone. Controllers are automagically created with adding of a state, page, or component and are the preferred commands for getting a controller.

### **gulp add:directive**
- -n [NAME] => The name of the new directive (Name should be Camel Case - Ex: feedCard)
- -a [ATTRIBUTES] => The list of attributes for the directive (Comma Separated)
- -t [TEMPLATE PATH] => The path to the template you would like to use
- -r [RESTRICT] => Type of directive (Default: AE)

Creates a stand-alone directive and copies a snippet to your clipboard. A component should be preferred as it will create the template (.pug) and stylesheet (.scss).

### **gulp add:filter**
- -n [NAME] => The name of the new filter (Name should be Camel Case - Ex: feedCard)

Creates a filter

### **gulp add:modal**
- -n [NAME] => The name of the new modal (Name should be Camel Case - Ex: feedCard)

Creates an Ionic modal and then copies the snippet to implement it to the clipboard.

### **gulp add:model**
- -n [NAME] => The name of the new model (Name should start with Uppercase - Ex: User)

Creates a service for a model, meaning something that will be used bound to a database.

### **gulp add:page**
- -n [NAME] => The name of the new page (Name should be Camel Case - Ex: feedCard)
- -r [RESOLVES] => The list of things to resolve before the route can load (Comma Separated)

Creates a page, which consists of a controller (.ts), resolver (.ts), route (enjin.json), view (.pug), and stylesheet (.scss).

### **gulp add:popover**
- -n [NAME] => The name of the new popover (Name should be Camel Case - Ex: feedCard)

Creates an Ionic popover and then copies the snippet to implement it to the clipboard.

### **gulp add:resolver**
- -n [NAME] => The name of the new resolver (Name should be Camel Case - Ex: feedCard)
- -r [RESOLVES] => The list of things to resolve before the route can load (Comma Separated)

Creates a resolver that can be applied to a route in order to force them to resolve a list of dependencies before the route loads.

### **gulp add:route**
- -n [NAME] => The name of the new route state (Name should be Camel Case - Ex: feedCard)
- -u [URL] => The URL of the page (Beginning with /)
- -t [TEMPLATE PATH] => The path to the template you would like to use
- -c [CONTROLLER] => The name of the controller to use for this route
- -r [RESOLVER] => The name of the resolver to use on this route

Creates a new route in the enjin.json and in turn in app/router.ts. Routes automagically get created with states and pages.

### **gulp add:service**
- -n [NAME] => The name of the new service (Name should be Camel Case - Ex: feedCard)
- -t [TYPE] => The type of service (Choices: Empty / Rest)

Creates a new service that is used to pass data around your application.  It can also be used to create a contract so that you avoid vendor locking.

### **gulp add:state**
- -n [NAME] => The name of the new state (Name should be Camel Case - Ex: feedCard)
- -v [VIEW] => The name of the ui-view to inject state into (Default: tab)
- -r [RESOLVES] => The list of things to resolve before the route can load (Comma Separated)

Creates a state, which consists of a controller (.ts), resolver (.ts), route (enjin.json), view (.pug), and stylesheet (.scss). If the state is named feedState and there is a feed page then the feed page will be set to abstract in enjin.json / router.ts.

---

# <a name="css-commands"></a> CSS Commands

These commands control the CSS build process.  The only flag is the ```-e [Environment]``` to control which .env file you are using to overwrite enjin.json variables. These will almost never be used as the general commands run these for you, but they are here if needed.

### **gulp css:compile**

Compiles the .scss files to CSS in the build/css folder.

### **gulp css:concat**

Concats together all of the css files in build/css folder and creates www/css/build.css file.

### **gulp css:import**

Creates app/scss/libraries.scss that contains all the libraries (.scss files) in the enjin.json {```css.libraries```}.

### **gulp css:libraries**

Builds app/scss/libraries.scss into build/css/libraries.css so we can combine that at the top of our built css file.

### **gulp css:minify**

Minifies www/css/build.css into www/css/build.min.css for production.

---

# <a name="html-commands"></a> HTML Commands

These commands control the HTML build process.  The only flag is the ```-e [Environment]``` to control which .env file you are using to overwrite enjin.json variables. These will almost never be used as the general commands run these for you, but they are here if needed.

### **gulp html:compile**

Runs a build of the .pug files into www/html with linting.

### **gulp html:inject**

Injects js and css files into index.html file for easier development.


---

# <a name="img-commands"></a> Image Commands

These commands manage images on a project.

### **gulp favicons**

Creates favicons and icon file for the application from resources/icon.png file.

### **gulp images**

Resizes images from enjin {```img.srcDir```} to {```img.dir```} using the configs from {```img.config```}. See <a href="https://github.com/mahnunchik/gulp-responsive" target="_blank">Gulp-Responsive Documentation</a> for examples

---

# <a name="js-commands"></a> JS Commands

These commands control the JS build process.  The only flag is the ```-e [Environment]``` to control which .env file you are using to overwrite enjin.json variables. These will almost never be used as the general commands run these for you, but they are here if needed.

### **gulp js:app**

Creates src/ts/app.ts file from enjin.json file.

### **gulp js:compile**

Compiles the .ts files to JS in the build/js folder.

### **gulp js:concat**

Concats together all of the .js files in build/js folder and creates www/js/build.js file.

### **gulp js:minify**

Minifies www/js/build.js into www/js/build.min.js for production.

### **gulp js:router**

Generate app/ts/router.ts file from enjin.json routes.

---

# <a name="remove-commands"></a> Remove Commands

These commands allow quick removal of different peices of the application.  The flags are not required, they just make it faster if you know what you want.  If no flags are passed it will prompt you to answer questions.

### **gulp remove:component**
- -n [NAME] => The name of the new component (Name should be Camel Case - Ex: feedCard)

Removes all traces of a component from the project.

### **gulp remove:controller**
- -n [NAME] => The name of the new controller (Name should be Camel Case - Ex: feedCard)

Removes all traces of a controller from the project.

### **gulp remove:directive**
- -n [NAME] => The name of the new directive (Name should be Camel Case - Ex: feedCard)

Removes all traces of a directive from the project.

### **gulp remove:filter**
- -n [NAME] => The name of the new filter (Name should be Camel Case - Ex: feedCard)

Removes all traces of a filter from the project.

### **gulp remove:modal**
- -n [NAME] => The name of the new modal (Name should be Camel Case - Ex: feedCard)

Removes all traces of a modal from the project.

### **gulp remove:model**
- -n [NAME] => The name of the model to remove (Name should be Upper Case - Ex: User)

Removes a model from the project.

### **gulp remove:page**
- -n [NAME] => The name of the new page (Name should be Camel Case - Ex: feedCard)

Removes all traces of a page from the project.

### **gulp remove:popover**
- -n [NAME] => The name of the new popover (Name should be Camel Case - Ex: feedCard)

Removes all traces of a popover from the project.

### **gulp remove:resolver**
- -n [NAME] => The name of the new resolver (Name should be Camel Case - Ex: feedCard)

Removes all traces of a resolver from the project.

### **gulp remove:route**
- -n [NAME] => The name of the new route state (Name should be Camel Case - Ex: feedCard)

Removes all traces of a route from the project.

### **gulp remove:service**
- -n [NAME] => The name of the new service (Name should be Camel Case - Ex: feedCard)

Removes all traces of a service from the project.

### **gulp remove:state**
- -n [NAME] => The name of the new state (Name should be Camel Case - Ex: feedCard)

Removes all traces of a state from the project.

---

# <a name="custom-commands"></a> Custom Commands

If you looked at the gulpfile.js you may have noticed that it doesn't include any of these tasks?!? This is because the build tasks are stored globally so that they can be updated and improved.

If you need your own custom tasks for your project just create a folder named "tasks" under the root and add the directory to your gulpfile.js as shown below.

### gulpfile.js
```javascript
...

const hub = new HubRegistry([enjin.tasksDir, 'tasks/**/*.js']);

...
```

---

## <a name="credits"></a> Credits

This app structure was made by the good people at <a href="http://madnesslabs.net" target="_blank">Madness Labs</a> and is **OPEN SOURCE**.  What good is making a brilliant application development process if you don't let others use it. If this has helped you please return the favor by donating to <a href="https://www.patreon.com/madnesslabs">Madness Labs on Patreon</a> so we can keep making your life wwesome.  Enjoy! ^_^
