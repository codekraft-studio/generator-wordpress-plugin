<?php

/**
 * <%= childClassName %>_Shortcode.
 *
 * @since <%= projectVersion %>
 *
 * @author <%= projectAuthor %>
 * @license <%= projectLicense %>
 *
 */
class <%= shortcodeName %>_Shortcode {

  /**
   * The shortcode tag name
   * @type {String}
   */
  private $shortcode_name = '<%= shortcodeTag %>';

  public function __construct() {
    add_shortcode( $this->shortcode_name, array($this, 'do_shortcode') );
  }

  /**
   * The shortcode rendering function
   * @method do_shortcode
   * @param {Array} $atts An associative array of attributes, or an empty string if no attributes are given
   * @param {String} [$content=null] The enclosed content (if the shortcode is used in its enclosing form)
   */
  public function do_shortcode($atts<%- enclosing ? (', ' + '$content = null') : '' %>) {

    // Get the shortcode options
    $a = shortcode_atts( array(
      'title' => '<%= shortcodeName %> Shortcode'
    ), $atts<%- filter ? (', ' + "'" + shortcodeTag + "'") : '' %> );

    // Start capturing
    ob_start(); ?>

    <div class="<%= shortcodeTag %>-shortcode">
      <h4><?php echo $a['title']; ?></h4><% if (enclosing) { %>
      <p><?php echo $content; ?></p><% } %>
    </div><?php

    return ob_get_clean();

  }

}
