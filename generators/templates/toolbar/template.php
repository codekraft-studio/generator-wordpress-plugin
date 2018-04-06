<?php

/**
 * <%= childClassName %>_Toolbar.
 *
 * @since <%= projectVersion %>
 *
 * @author <%= projectAuthor %>
 * @license <%= projectLicense %>
 *
 */
class <%= childClassName %>_Toolbar {

  protected $toolbar = array(
    'id' => '<%= id %>',
    'title' => '<%= title %>',
    'meta' => array()
  );

  <%if (hasChild) { %>
  protected $toolbarChildren = array(
    <% for(var i=0; i < childNumber; i++) {%>
    array(
      'id' => '<%= id %>-submenu-<%= i %>',
      'parent' => '<%= id %>',
      'title' => '<%= title %> Submenu <%= i %>',
      'meta' => array()
    ),
    <% } %>
  );<% } %>

	public function __construct() {
		add_action( 'wp_before_admin_bar_render', array($this, 'create_toolbar'), 999 );
	}

  public function create_toolbar() {
    global $wp_admin_bar;

    // Add main toolbar menu
		$wp_admin_bar->add_menu( $this->toolbar );

		// Add any existing childmenu
		if( isset($this->toolbarChildren) && !empty($this->toolbarChildren) ) {
			foreach ($this->toolbarChildren as $childMenu) {
				$wp_admin_bar->add_menu( $childMenu );
			}
		}
  }

}
