<?php

/**
 * <%= childClassName %>_Metabox
 *
 * @since <%= projectVersion %>
 *
 * @author <%= projectAuthor %>
 * @license <%= projectLicense %>
 *
 */
class <%= childClassName %>_Metabox {

  public function __construct() {

    if( is_admin() ) {
      add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
      add_action( 'save_post', array( $this, 'save_meta' ), 10, 2 );
    }

  }

  // Add the metabox to WordPress
  public function add_meta_box($post_type) {

    add_meta_box(
      '<%= id %>',
      __( '<%= title %>', '<%= projectName %>' ),
      array( $this, 'render_meta_box' ),
      '<%= screen %>',
      '<%= context %>',
      '<%= priority %>'
    );

  }

  // Render the metabox content
  public function render_meta_box($post) {

    // Add an nonce field so we can check for it later.
    wp_nonce_field( '<%= id %>', '<%= id %>_nonce' );

    // Use get_post_meta to retrieve an existing value from the database.
    $value = get_post_meta( $post->ID, '<%= id %>_metavalue', true );

    ob_start();  ?>

    <div class="inside">

      <p>
      	<label for="<%= id %>_metavalue">
          <?php _e( 'Description for this field', '<%= projectName %>' ); ?>
        </label>
      	<input type="text" name="<%= id %>_metavalue" id="<%= id %>_metavalue" class="widefat code" value="<?php echo esc_attr( $value ); ?>">
      </p>

      <p class="howto">The metabox field meaning</p>
      <p>An extensive metabox fields description and explanation which guide user into plugin functions.</p>

    </div><?php

    return print( ob_get_clean() );

  }

  // Catch the metabox data and store it
  public function save_meta($post_id) {

    // Get the metabox nonce
    $nonce = isset($_POST['<%= id %>_nonce']) ? $_POST['<%= id %>_nonce'] : '';

    // Check if user has permissions to save data.
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
      return;
    }

    // Check if not an autosave.
    if ( wp_is_post_autosave( $post_id ) ) {
      return;
    }

    // Check if not a revision.
    if ( wp_is_post_revision( $post_id ) ) {
      return;
    }

    // Verify that the nonce is valid.
    if ( ! wp_verify_nonce( $nonce, '<%= id %>' ) ) {
      return $post_id;
    }

    // Get and sanitize the field data
    $data = sanitize_text_field( $_POST['<%= id %>_metavalue'] );

    // Update the metabox value
    update_post_meta( $post_id, '<%= id %>_metavalue', $data );

  }

}
