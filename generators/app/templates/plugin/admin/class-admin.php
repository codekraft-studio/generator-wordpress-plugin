<?php

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );

/**
 * The plugin admin class that handle all the backend functions and views
 */
class <%= className %>_Admin {

	private static $pages = array();

	private static $metaboxes = array();

	private static $widgets = array();

	private static $shortcodes = array();

	private static $toolbars = array();

	private static $taxonomies = array();

	public static function init() {

		add_filter( 'mce_css', array('<%= className %>_Admin', 'load_editor_style') );

		add_action( 'admin_enqueue_scripts', array('<%= className %>_Admin', 'load_styles') );
		add_action( 'admin_enqueue_scripts', array('<%= className %>_Admin', 'load_scripts') );

		add_action( 'admin_init', array('<%= className %>_Admin', 'register_settings') );
		add_action( 'admin_menu', array('<%= className %>_Admin', 'add_settings_page') );

	}

	/**
	* Enqueue the plugin admin styles
	* @method load_styles
	*/
	public static function load_styles() {
    	wp_register_style(
			'<%= projectName %>_admin_style',
			<%= definePrefix %>_DIR_URL . '/assets/dist/admin.css',
			array(),
			null
		);
    	wp_enqueue_style('<%= projectName %>_admin_style');
  }

	/**
	* Add the plugin style to tinymce editor
	* @method load_editor_style
	*/
	function load_editor_style($styles) {
		if ( !empty( $styles ) ) {
			$styles .= ',';
		}
		$styles .= <%= definePrefix %>_DIR_URL . '/assets/dist/editor-style.css';
		return $styles;
	}

	/**
	* Enqueue the plugin admin scripts
	* @method load_scripts
	*/
  	public static function load_scripts() {
    	wp_register_script(
			'<%= projectName %>_admin_script',
			<%= definePrefix %>_DIR_URL . "/assets/dist/admin.js",
			array('jquery'),
			null,
			true
		);
    	wp_enqueue_script('<%= projectName %>_admin_script');
  	}

	/**
	* Add the plugin menu page(s)
	* @method add_settings_page
	*/
	public static function add_settings_page() {

		add_menu_page(
			__('<%= projectTitle %>', '<%= projectName %>'),
			__('<%= projectTitle %>', '<%= projectName %>'),
			'administrator', // Menu page capabilities
			'<%= projectName %>-settings', // Page ID
			array('<%= className %>_Admin', 'print_settings_page'), // Callback
			'dashicons-admin-generic',
			null
		);

	}

	/**
	* Register the main Plugin Settings
	* @method register_settings
	*/
	public static function register_settings() {

		register_setting( '<%= projectName %>-settings-group', '<%= projectName %>_main_options', array('<%= className %>_Admin', 'sanitize_settings') );

		add_settings_section( 'main', __('Main Settings', '<%= projectName %>'), array( '<%= className %>_Admin', 'main_section_callback' ), '<%= projectName %>-settings' );

		add_settings_field( 'first_option', 'First Option', array( '<%= className %>_Admin', 'first_option_callback' ), '<%= projectName %>-settings', 'main' );

	}

	/**
	* The text to display as description for the main section
	* @method main_section_callback
	*/
	public static function main_section_callback() {
		return _e( 'Start adding from here you plugin settings.', '<%= projectName %>' );
	}

	/**
	* Create the option html input
	* @return html
	*/
	public static function first_option_callback() {
		return printf(
			'<input type="text" id="first_option" name="<%= projectName %>_main_options[first_option]" value="%s" />',
			isset( self::$settings['first_option'] ) ? esc_attr( self::$settings['first_option']) : ''
		);
	}

	/**
	* Sanitize the settings values before saving it
	* @param  mixed $input The settings value
	* @return mixed        The sanitized value
	*/
	public static function sanitize_settings($input) {
		return $input;
	}

	/**
	* Plugin main settings page
	* @method print_settings_page
	*/
	public static function print_settings_page() {
		ob_start(); ?>

		<div class="wrap">

			<div class="card">

				<h1><?php _e( '<%= projectTitle %>', '<%= projectName %>' ); ?></h1>

				<p><?php _e( 'Start from here to build you awesome plugin, using this basic setup.', '<%= projectName %>' ); ?></p>

			</div>

			<div class="card">

				<form method="post" action="options.php">

					<?php settings_fields( '<%= projectName %>-settings-group' ); ?>
					<?php do_settings_sections( '<%= projectName %>-settings' ); ?>

					<?php submit_button(); ?>

				</form>

			</div>

		</div><?php
		return print( ob_get_clean() );
	}

	/**
	 * Register and init plugin shortcodes
	 */
	public static function register_taxonomies() {
		foreach (self::$taxonomies as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin shortcodes
	 */
	public static function register_shortcodes() {
		foreach (self::$shortcodes as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin admin pages
	 */
	public static function register_pages() {
		foreach (self::$pages as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin widgets
	 */
	public static function register_widgets() {
		foreach (self::$widgets as $widgetName => $widgetPath) {
			include_once (<%= definePrefix %>_ADMIN_DIR . $widgetPath);
			register_widget($widgetName);
		}
	}

	/**
	 * Register and init admin toolbars
	 */
	public static function register_toolbars() {
		foreach (self::$toolbars as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

	/**
	 * Register and init plugin metaboxes
	 */
	public static function register_metaboxes() {
		foreach (self::$metaboxes as $className => $path) {
			include_once(<%= definePrefix %>_ADMIN_DIR . $path);
			new $className();
		}
	}

}
