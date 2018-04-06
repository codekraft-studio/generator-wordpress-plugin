<?php

// Block direct access to file
defined( 'ABSPATH' ) or die( 'Not Authorized!' );

/**
 * <%= childClassName %>_Menu_Page
 *
 * @since <%= projectVersion %>
 *
 * @author <%= projectAuthor %>
 * @license <%= projectLicense %>
 *
 */
class <%= childClassName %>_Menu_Page {

	function __construct() {

		add_menu_page(
      __("<%= page_title %>", "<%= projectName %>"),
      __("<%= menu_title %>", "<%= projectName %>"),
      "<%= capability %>",
      "<%= menu_slug %>",
      array($this, "print_page"),
      "<%= icon %>",
      <%= position %>
    );

	}

	public function print_page() {
		ob_start(); ?>

	    <div class="wrap">

			<div class="card">
				<h1><?php _e( 'WP Vuln', '<%= projectName %>' ); ?></h1>
				<p><?php _e( 'Start from here to build you awesome plugin, using this basic setup.', '<%= projectName %>' ); ?></p>
			</div>

		</div><?php

		return print(ob_get_clean());
	}

}
