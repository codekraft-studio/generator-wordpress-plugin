<?php

class <%= className %>_Admin {

	private $pages = array();

	private $metaboxes = array();

	private $widgets = array();

	private $shortcodes = array();

	private $toolbars = array();

	private $taxonomies = array();

	function __construct() {
		add_action("init", array($this, "register_shortcodes"));
		add_action("init", array($this, "register_taxonomies"));
		add_action("widgets_init", array($this, "register_widgets"));
        add_action("admin_init", array($this, "register_metaboxes"));
        add_action("admin_menu", array($this, "register_pages"));
        add_action("admin_menu", array($this, "register_toolbars"));

		// add_action("admin_init", array($this, "plugin_register_settings"));
	}

	public function plugin_register_settings() {

	}

	/**
	 * Register and init plugin shortcodes
	 */
	public function register_taxonomies() {
		foreach ($this->taxonomies as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin shortcodes
	 */
	public function register_shortcodes() {
		foreach ($this->shortcodes as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin admin pages
	 */
	public function register_pages() {
		foreach ($this->pages as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin widgets
	 */
	public function register_widgets() {
		foreach ($this->widgets as $widgetName => $widgetPath) {
			include_once (<%= definePrefix %>_ADMIN_DIR . $widgetPath);
			register_widget($widgetName);
		}
	}

	/**
	 * Register and init admin toolbars
	 */
	public function register_toolbars() {
		foreach ($this->toolbars as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin metaboxes
	 */
	public function register_metaboxes() {
		foreach ($this->metaboxes as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

}
