![banner](banner.jpg)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Slack Chat](https://img.shields.io/badge/wordpress_slack-@codekraft--studio-blue.svg?style=flat)](https://wordpress.slack.com)

# generator-wordpress-plugin

> The best way to start creating your WordPress plugin projects.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-wordpress-plugin using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-wordpress-plugin
```

Then generate your new project:

```bash
yo wordpress-plugin
```

Once you are inside a existing project, generated with this tool you can also do:
```bash
yo wordpress-plugin:metabox MyMetabox
yo wordpress-plugin:shortcode MyShortcode
yo wordpress-plugin:widget MyWidget
```

The generator will take care to update your plugin main class to include the newly generated classes.

---

## Generators

### app
This is the default generator, once is called it will ask few questions and setup a working project for your WordPress Plugin. Depending on your answers the command can generate a __grunt/gulp__ based project with __sass__, __linters__ and a lot of features.

#### questions:
* __projectName__: The unique name slug you want to use for this project. Default: `<folder-name>`
* __projectTitle__: The title for your WordPress Plugin project. Default: `<Folder Name>`
* __projectDescription__: The description of your project. Default: `This is the <projectTitle> description.`
* __projectManager__: The build system you want to use for the project. Default: `grunt`
* __projectAuthor__: The name of the project author. Default: `<your-name>`
* __projectLicense__: The license under the project is developed and released. Default: `ISC`


## Subgenerators

### metabox [name]

This command will create a metabox class inside the `include/metabox/`, than it will update the __$metaboxes__ property on the main plugin class.
The metabox template is based on [WordPress Codex Metabox](https://developer.wordpress.org/reference/functions/add_meta_box/) rules, for more information about the code please refer to it.

#### example: `yo wordpress-plugin:metabox Test`


### shortcode [name]

This command will create a shortcode class inside the `include/shortcode/`, than it will update the __$shortcodes__ property on the main plugin class.
The shortcode template is based on [WordPress Codex Shortcode](https://codex.wordpress.org/Shortcode_API) rules, for more information about the code please refer to it.

#### example: `yo wordpress-plugin:shortcode Test`

#### options:

| option    | default | description |
|-----------|---------|-------------|
| filter    | `false` | Allow the shortcode attributes to be filtered |
| enclosing | `false` | Create the shortcode as enclosing tag (enable content) |


### widget [name]

This command will create a widget class inside the `include/widget/`, than it will update the __$widgets__ property on the main plugin class.
The widget template is based on [WordPress Codex Widget](https://codex.wordpress.org/Widgets_API) rules, for more information about the code please refer to it.

#### example: `yo wordpress-plugin:widget Test`

#### questions:
  * __description__: The description for the widget. Default: `The [name] widget description.`


### dashwidget [name]

This command makes very simple to add new widgets to the [administration dashboard](https://codex.wordpress.org/Dashboard_SubPanel). Once is run it will create a dashwidget class inside the `include/dashwidget/`, than it will update the __$dashwidgets__ property on the main plugin class.
The dashwidget template is based on [WordPress Codex Dashboard Widgets](https://codex.wordpress.org/Dashboard_Widgets_API) rules, for more information about the code please refer to it.

#### example: `yo wordpress-plugin:dashwidget Test`


### toolbar [name]

The Toolbar is an area of the screen just above the site that lists useful admininstration screen links such as add a new post or edit your profile.
The Toolbar contains links to information about WordPress, as well as quick-links to create new posts, pages and links, add new users, review comments, and alerts to available updates to plugins and themes on your site.

This command will create a toolbar class inside the `include/toolbar/`, than it will update the __$toolbars__ property on the main plugin class.
The toolbar template is based on [WordPress Codex Toolbar](https://codex.wordpress.org/Toolbar) rules, for more information about the code please refer to it.

#### example: `yo wordpress-plugin:toolbar Test`

#### questions:
  * __title__: The title of the toolbar, that will be shown in the bar. Default: `[name] Toolbar`
  * __hasChild__: A boolean that decide if the toolbar is enabled for submenus. Default: `true`
  * __childNumber__: How many empty child submenu to create, only if __hasChild__ is enabled. Default: `1`

---

## Development

Until the module it's not yet available as a global npm module. A global module may be created and symlinked to a local one, using npm.

Move inside the project folder and type:

```bash
npm link
```

That will install your project dependencies and symlink a global module to your local file. After npm is done, you'll be able to call `yo wordpress-plugin`


## Contributing

1. Create an issue and describe your idea
2. Fork the project (https://github.com/codekraft-studio/generator-wordpress-plugin/fork)
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Publish the branch (`git push origin my-new-feature`)
6. Create a new Pull Request

---

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

Apache-2.0 © [codekraft-studio](https://codekraft.it)


[npm-image]: https://badge.fury.io/js/generator-wordpress-plugin.svg
[npm-url]: https://npmjs.org/package/generator-wordpress-plugin
[travis-image]: https://travis-ci.org/codekraft-studio/generator-wordpress-plugin.svg?branch=master
[travis-url]: https://travis-ci.org/codekraft-studio/generator-wordpress-plugin
[daviddm-image]: https://david-dm.org/codekraft-studio/generator-wordpress-plugin.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/codekraft-studio/generator-wordpress-plugin
[coveralls-image]: https://coveralls.io/repos/github/codekraft-studio/generator-wordpress-plugin/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/codekraft-studio/generator-wordpress-plugin?branch=master
