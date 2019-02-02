<?php

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );

/**
 * The plugin main class file where initialization is controlled
 */
class <%= className %>_Main {

	public static function init() {

		// Register plugin text domain and load file
		load_plugin_textDomain( '<%= projectName %>', false, dirname(<%= definePrefix %>_DIR_BASENAME) . '/languages' );

		add_action( 'wp_enqueue_scripts', array('<%= className %>_Main', 'load_user_scripts') );

		// Register eventual wpcli commands
		if ( defined( 'WP_CLI' ) && WP_CLI ) {
			@include(<%= definePrefix %>_CLI_DIR . '/class-command.php');
		}

		if (is_admin()) {
			include(<%= definePrefix %>_ADMIN_DIR . '/class-admin.php');
			<%= className %>_Admin::init();
			return;
		}

	}

	/**
	* Plugin uninstall function
	* called when the plugin is uninstalled
	* @method uninstall
	*/
	public static function uninstall() { }

	/**
	* Plugin activation function
	* called when the plugin is activated
	* @method activate
	*/
	public static function activate() { }

	/**
	* Plugin deactivate function
	* is called during plugin deactivation
	* @method deactivate
	*/
	public static function deactivate() { }

	/**
	* Enqueue the main Plugin user scripts and styles
	* @method plugin_enqueue_scripts
	*/
	public static function load_user_scripts() {

		wp_register_style(
			"<%= projectName %>_user_style",
			<%= definePrefix %>_DIR_URL . "/assets/dist/user.css",
			array(),
			null
		);

		wp_register_script(
			"<%= projectName %>_user_script",
			<%= definePrefix %>_DIR_URL . "/assets/dist/user.js",
			array('jquery'),
			null,
			true
		);

		wp_enqueue_style('<%= projectName %>_user_style');
		wp_enqueue_script('<%= projectName %>_user_script');

	}

}
