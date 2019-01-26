![banner](banner.jpg)

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url] [![Slack Chat](https://img.shields.io/badge/wordpress_slack-@codekraft--studio-blue.svg?style=flat)](https://wordpress.slack.com)

# generator-wordpress-plugin

> The best way to setup your WordPress custom plugins.

## Installation

First of all, if you don't have it already installed on your system, install [Yeoman](http://yeoman.io) using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```

Than install the **@wptools/generator-plugin** generator globally on your system.

```bash
npm install -g @wptools/generator-plugin
```

## Getting started

Now you have access to the generator through yeoman this mean you can generate new projects anywhere by typing:

```bash
yo @wptools/plugin
```

The generator will ask you some questions for setting the project configuration parameters and once is done the new project will be created.

#### Using subgenerators

Inside an existing project __generated with this generator__ you can also use many sub generators to go further in the project base prototyping, let see some examples:

```bash
yo @wptools/plugin:metabox MyMetabox
```

Create a new metabox called "MyMetabox", the subgenerator take one argument which, in this case, is the class name of the metabox. You can use any name you want but it will fored to be capitalized CamelCase suffixed by "Metabox" or more generic, the subgenerator name, for generated class names, in order to follow common coding standards.

You have also other subgenerators, once it starts it will ask you some questions, based on the subgenerator context in order to customize the class and element rendering.

```bash
yo @wptools/plugin:shortcode MyShortcode
yo @wptools/plugin:widget MyWidget
```

The generator will also take care to __update your plugin main class__ automatically to include the newly generated classes.

---

## Generators

* [plugin](#app) The main generator that [create the plugin](https://codex.wordpress.org/Writing_a_Plugin)
* [commentspage](#commentspage) Subgenerator for creating [comments pages](https://codex.wordpress.org/Function_Reference/add_comments_page)
* [dashboardpage](#dashboardpage) Subgenerator for creating submenu [dashboard pages](https://codex.wordpress.org/Function_Reference/add_dashboard_page)
* [dashwidget](#dashwidget) Subgenerator for creating [dashboard widgets](https://codex.wordpress.org/Dashboard_Widgets_API)
* [linkspage](#linkspage) Subgenerator for creating [links pages](https://codex.wordpress.org/Function_Reference/add_links_page)
* [managementpage](#managementpage) Subgenerator for creating [management pages](https://codex.wordpress.org/Function_Reference/add_management_page)
* [mediapage](#mediapage) Subgenerator for creating [media pages](https://codex.wordpress.org/Function_Reference/add_media_page)
* [menupage](#menupage) Subgenerator for creating [menu pages](https://codex.wordpress.org/Function_Reference/add_menu_page)
* [metabox](#metabox) Subgenerator for creating [metaboxes](https://developer.wordpress.org/reference/functions/add_meta_box/)
* [optionspage](#optionspage) Subgenerator for creating [options pages](https://codex.wordpress.org/Function_Reference/add_options_page)
* [pagespage](#pagespage) Subgenerator for creating [page pages](https://codex.wordpress.org/Function_Reference/add_pages_page)
* [pluginspage](#pluginspage) Subgenerator for creating [plugins pages](https://codex.wordpress.org/Function_Reference/add_plugins_page)
* [postspage](#postspage) Subgenerator for creating [posts pages](https://codex.wordpress.org/Function_Reference/add_posts_page)
* [shortcode](#shortcode) Subgenerator for creating [shortcodes](https://codex.wordpress.org/Shortcode_API)
* [submenupage](#submenupage) Subgenerator for creating [submenu pages](https://developer.wordpress.org/reference/functions/add_submenu_page/)
* [taxonomy](#taxonomy) Subgenerator for creating [custom taxonomies](https://codex.wordpress.org/Taxonomies)
* [themepage](#themepage) Subgenerator for creating [theme pages](https://codex.wordpress.org/Function_Reference/add_theme_page)
* [toolbar](#toolbar) Subgenerator for creating dashboard [toolbars](https://codex.wordpress.org/Toolbar)
* [userspage](#userspage) Subgenerator for creating [users pages](https://codex.wordpress.org/Function_Reference/add_users_page)
* [widget](#widget) Subgenerator for creating [widgets](https://codex.wordpress.org/WordPress_Widgets)

### app

This is the default generator, once is called it will ask few questions and setup a working project for your WordPress Plugin. Depending on your answers the command can generate a **grunt/gulp** based project with **sass**, **linters** and a lot of features.

#### questions:

-   **projectName**: The unique name slug you want to use for this project. Default: `<folder-name>`
-   **projectTitle**: The title for your WordPress Plugin project. Default: `<Folder Name>`
-   **projectDescription**: The description of your project. Default: `This is the <projectTitle> description.`
-   **projectManager**: The build system you want to use for the project. Default: `grunt`
-   **projectAuthor**: The name of the project author. Default: `<your-name>`
-   **projectLicense**: The license under the project is developed and released. Default: `ISC`

## Subgenerators

### metabox


This command will create a metabox class inside the `include/metabox/`, than it will update the **$metaboxes** property on the main plugin class.
The metabox template is based on [WordPress Codex Metabox](https://developer.wordpress.org/reference/functions/add_meta_box/) rules, for more information about the code please refer to it.

#### example: `yo @wptools/plugin:metabox Test`

### shortcode


This command will create a shortcode class inside the `include/shortcode/`, than it will update the **$shortcodes** property on the main plugin class.
The shortcode template is based on [WordPress Codex Shortcode](https://codex.wordpress.org/Shortcode_API) rules, for more information about the code please refer to it.

#### example: `yo @wptools/plugin:shortcode Test`

#### options:

| option    | default | description                                            |
| --------- | ------- | ------------------------------------------------------ |
| filter    | `false` | Allow the shortcode attributes to be filtered          |
| enclosing | `false` | Create the shortcode as enclosing tag (enable content) |

### widget


This command will create a widget class inside the `include/widget/`, than it will update the **$widgets** property on the main plugin class.
The widget template is based on [WordPress Codex Widget](https://codex.wordpress.org/Widgets_API) rules, for more information about the code please refer to it.

#### example: `yo @wptools/plugin:widget Test`

#### questions:

-   **description**: The description for the widget. Default: `The [name] widget description.`

### dashwidget

This command makes very simple to add new widgets to the [administration dashboard](https://codex.wordpress.org/Dashboard_SubPanel). Once is run it will create a dashwidget class inside the `include/dashwidget/`, than it will update the **$dashwidgets** property on the main plugin class.
The dashwidget template is based on [WordPress Codex Dashboard Widgets](https://codex.wordpress.org/Dashboard_Widgets_API) rules, for more information about the code please refer to it.

#### example: `yo @wptools/plugin:dashwidget Test`

### toolbar

The Toolbar is an area of the screen just above the site that lists useful admininstration screen links such as add a new post or edit your profile.
The Toolbar contains links to information about WordPress, as well as quick-links to create new posts, pages and links, add new users, review comments, and alerts to available updates to plugins and themes on your site.

This command will create a toolbar class inside the `include/toolbar/`, than it will update the **$toolbars** property on the main plugin class.
The toolbar template is based on [WordPress Codex Toolbar](https://codex.wordpress.org/Toolbar) rules, for more information about the code please refer to it.

#### example: `yo @wptools/plugin:toolbar Test`

#### questions:

-   **title**: The title of the toolbar, that will be shown in the bar. Default: `[name] Toolbar`
-   **hasChild**: A boolean that decide if the toolbar is enabled for submenus. Default: `true`
-   **childNumber**: How many empty child submenu to create, only if **hasChild** is enabled. Default: `1`

---

## Development

Until the module it's not yet available as a global npm module. A global module may be created and symlinked to a local one, using npm.

Move inside the project folder and type:

```bash
npm link
```

That will install your project dependencies and symlink a global module to your local file. After npm is done, you'll be able to call `yo @wptools/plugin`

## Contributing

1.  Create an issue and describe your idea
2.  Fork the project (<https://github.com/codekraft-studio/generator-wordpress-plugin/fork>)
3.  Create your feature branch (`git checkout -b my-new-feature`)
4.  Commit your changes (`git commit -am 'Add some feature'`)
5.  Publish the branch (`git push origin my-new-feature`)
6.  Create a new Pull Request

---

## License

Apache-2.0 © [codekraft-studio](https://codekraft.it)

---

## Getting To Know Yeoman

-   Yeoman has a heart of gold.
-   Yeoman is a person with feelings and opinions, but is very easy to work with.
-   Yeoman can be too opinionated at times but is easily convinced not to be.
-   Feel free to [learn more about Yeoman](http://yeoman.io/).


[npm-image]: https://badge.fury.io/js/%40wptools%2Fgenerator-plugin.svg

[npm-url]: https://npmjs.org/package/@wptools/generator-plugin

[travis-image]: https://travis-ci.org/codekraft-studio/generator-wordpress-plugin.svg?branch=master

[travis-url]: https://travis-ci.org/codekraft-studio/generator-wordpress-plugin

[daviddm-image]: https://david-dm.org/codekraft-studio/generator-wordpress-plugin.svg?theme=shields.io

[daviddm-url]: https://david-dm.org/codekraft-studio/generator-wordpress-plugin

[coveralls-image]: https://coveralls.io/repos/github/codekraft-studio/generator-wordpress-plugin/badge.svg?branch=master

[coveralls-url]: https://coveralls.io/github/codekraft-studio/generator-wordpress-plugin?branch=master
