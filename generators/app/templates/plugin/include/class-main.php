<?php

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );

class <%= className %> {

  private $settings;

  private $metaboxes = array();

  private $widgets = array();

  private $shortcodes = array();

  private $toolbars = array();

  public function __construct() {

    // Plugin uninstall hook
    register_uninstall_hook( <%= definePrefix %>_FILE, array(__CLASS__, 'plugin_uninstall') );

    // Plugin activation/deactivation hooks
    register_activation_hook( <%= definePrefix %>_FILE, array($this, 'plugin_activate') );
    register_deactivation_hook( <%= definePrefix %>_FILE, array($this, 'plugin_deactivate') );

    // Plugin Actions
    add_action( 'plugins_loaded', array($this, 'plugin_init') );

    // User
    add_action( 'wp_enqueue_scripts', array($this, 'plugin_enqueue_scripts') );

    // Admin
    add_filter( 'mce_css', array($this, 'plugin_add_editor_style') );
    add_action( 'admin_enqueue_scripts', array($this, 'plugin_enqueue_admin_scripts') );
    add_action( 'admin_init', array($this, 'plugin_register_settings') );
    add_action( 'admin_menu', array($this, 'plugin_add_settings_pages') );

    // Register plugin widgets
    add_action( 'widgets_init', function(){
    	foreach ($this->widgets as $widgetName => $widgetPath) {
    	  include_once( <%= definePrefix %>_INCLUDE_DIR . $widgetPath );
        register_widget( $widgetName );
    	}
    });

    // Init plugin shortcodes
    foreach ($this->shortcodes as $className => $path) {
      include_once( <%= definePrefix %>_INCLUDE_DIR . $path );
      new $className();
    }

    // Init plugin metaboxes
    foreach ($this->metaboxes as $className => $path) {
      include_once( <%= definePrefix %>_INCLUDE_DIR . $path );
      new $className();
    }

  }

  /**
   * Plugin uninstall function
   * called when the plugin is uninstalled
   * @method plugin_uninstall
   */
  public static function plugin_uninstall() { }

  /**
  * Plugin activation function
  * called when the plugin is activated
  * @method plugin_activate
  */
  public function plugin_activate() { }

  /**
  * Plugin deactivate function
  * is called during plugin deactivation
  * @method plugin_deactivate
  */
  public function plugin_deactivate() { }

  /**
  * Plugin init function
  * init the polugin textDomain
  * @method plugin_init
  */
  function plugin_init() {
    load_plugin_textDomain( '<%= projectName %>', false, dirname(<%= definePrefix %>_DIR_BASENAME) . '/languages' );
  }

  /**
   * Add the plugin menu page(s)
   * @method plugin_add_settings_pages
   */
  function plugin_add_settings_pages() {

    add_menu_page(
      __('<%= projectTitle %>', '<%= projectName %>'),
      __('<%= projectTitle %>', '<%= projectName %>'),
      'administrator', // Menu page capabilities
      '<%= projectName %>-settings', // Page ID
      array($this, 'plugin_settings_page'), // Callback
      'none', // No icon
      null
    );

  }

  /**
  * Register the main Plugin Settings
  * @method plugin_register_settings
  */
  function plugin_register_settings() {

    register_setting( '<%= projectName %>-settings-group', '<%= projectName %>_main_options', array($this, 'plugin_sanitize_settings') );

    add_settings_section( 'main', __('Main Settings', '<%= projectName %>'), array( $this, 'main_section_callback' ), '<%= projectName %>-settings' );

    add_settings_field( 'first_option', 'First Option', array( $this, 'first_option_callback' ), '<%= projectName %>-settings', 'main' );

  }

  /**
   * The text to display as description for the main section
   * @method main_section_callback
   */
  function main_section_callback() {
    return _e( 'Start adding from here you plugin settings.', '<%= projectName %>' );
  }

  /**
   * Create the option html input
   * @return html
   */
  function first_option_callback() {
    return printf(
      '<input type="text" id="first_option" name="<%= projectName %>_main_options[first_option]" value="%s" />',
      isset( $this->settings['first_option'] ) ? esc_attr( $this->settings['first_option']) : ''
    );
  }

  /**
   * Sanitize the settings values before saving it
   * @param  mixed $input The settings value
   * @return mixed        The sanitized value
   */
  function plugin_sanitize_settings($input) {
    return $input;
  }

  /**
  * Enqueue the main Plugin admin scripts and styles
  * @method plugin_enqueue_scripts
  */
  function plugin_enqueue_admin_scripts() {

    $min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';

    wp_register_style( '<%= projectName %>_admin_style', <%= definePrefix %>_DIR_URL . '/assets/dist/css/admin.css', array(), null );
    wp_enqueue_style('<%= projectName %>_admin_style');

    wp_register_script( '<%= projectName %>_admin_script', <%= definePrefix %>_DIR_URL . "/assets/dist/js/admin/admin{$min}.js", array('jquery'), null, true );
    wp_enqueue_script('<%= projectName %>_admin_script');

  }

  /**
  * Enqueue the main Plugin user scripts and styles
  * @method plugin_enqueue_scripts
  */
  function plugin_enqueue_scripts() {

    $min = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '.min';

    wp_register_style( '<%= projectName %>_user_style', <%= definePrefix %>_DIR_URL . '/assets/dist/css/user.css', array(), null );
    wp_enqueue_style('<%= projectName %>_user_style');

    wp_register_script( '<%= projectName %>_user_script', <%= definePrefix %>_DIR_URL . "/assets/dist/js/user/user{$min}.js", array('jquery'), null, true );
    wp_enqueue_script('<%= projectName %>_user_script');

  }

  /**
   * Add the plugin style to tinymce editor
   * @method plugin_add_editor_style
   */
  function plugin_add_editor_style($styles) {
      if ( !empty( $styles ) ) {
      $styles .= ',';
    }
    $styles .= <%= definePrefix %>_DIR_URL . '/assets/dist/css/editor-style.css';
    return $styles;
  }

  /**
  * Plugin main settings page
  * @method plugin_settings_page
  */
  function plugin_settings_page() {

    ob_start(); ?>

    <div class="wrap">

      <div class="card">

        <h1><?php _e( '<%= projectTitle %>', '<%= projectName %>' ); ?></h1>

        <p><?php _e( 'Start from here to build you awesome plugin, using this basic setup.', '<%= projectName %>' ); ?></p>

      </div>

      <div class="card">

        <?php $this->settings = get_option( '<%= projectName %>_main_options' ); ?>

        <form method="post" action="options.php">

          <?php settings_fields( '<%= projectName %>-settings-group' ); ?>
          <?php do_settings_sections( '<%= projectName %>-settings' ); ?>

          <?php submit_button(); ?>

        </form>

      </div>

    </div><?php

    return print( ob_get_clean() );

  }

}

new <%= className %>;
