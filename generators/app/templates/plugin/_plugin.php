<?php

/**
 * <%= projectTitle %>
 *
 * @package     <%= projectTitle %>
 * @author      <%= projectAuthor %>
 * @copyright   <%= new Date().getFullYear() %> <%= projectTitle %>
 * @license     <%= projectLicense %>
 *
 * Plugin Name: <%= projectTitle %>
 * Description: <%= projectDescription %>
 * Version:     <%= projectVersion %>
 * Author:      <%= projectAuthor %>
 * Text Domain: <%= projectName %>
 * License:     <%= projectLicense %>
 *
 */

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );

// Plugin Defines
define( "<%= definePrefix %>_FILE", __FILE__ );
define( "<%= definePrefix %>_DIR", dirname(__FILE__) );
define( "<%= definePrefix %>_INCLUDE_DIR", dirname(__FILE__) . '/include' );
define( "<%= definePrefix %>_DIR_BASENAME", plugin_basename( __FILE__ ) );
define( "<%= definePrefix %>_DIR_PATH", plugin_dir_path( __FILE__ ) );
define( "<%= definePrefix %>_DIR_URL", plugins_url( null, __FILE__ ) );

// Require the main class file
require_once( dirname(__FILE__) . '/include/class-main.php' );
