<?php

/**
 * <%= childClassName %>_Widget.
 *
 * <%= description %>
 *
 * @since <%= projectVersion %>
 *
 * @author <%= projectAuthor %>
 * @license <%= projectLicense %>
 *
 */
class <%= childClassName %>_Widget extends WP_Widget {

	/**
	 * Register widget with WordPress.
	 */
	public function __construct() {

		parent::__construct(
			'<%= id %>',
			esc_html__( '<%= title %>', '<%= projectName %>' ),
			array(
				'description' => esc_html__( '<%= description %>', '<%= projectName %>' )
			)
		);

	}

	/**
	 * Front-end display of widget.
	 * @see WP_Widget::widget()
	 * @param array $args     Widget arguments.
	 * @param array $instance Saved values from database.
	 */
	public function widget( $args, $instance ) {
    echo $args['before_widget'];

		if ( ! empty( $instance['title'] ) ) {
			echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
		}

    if ( !empty( $instance['description']) ) {
			echo esc_html__( $instance['description'], '<%= projectName %>' );
		}

		echo $args['after_widget'];
	}

	/**
	 * Back-end widget form.
	 * @see WP_Widget::form()
	 * @param array $instance Previously saved values from database.
	 */
	public function form( $instance ) {

    // Get the form instance values or fallback to defaults
		$instance = wp_parse_args((array) $instance, array(
			'title' => esc_html__( '<%= title %> Widget', '<%= projectName %>' ),
			'description' => esc_html__( '<%= description %>', '<%= projectName %>' )
		)); ?>

    <p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
        <?php esc_attr_e( 'Title:', '<%= projectName %>' ); ?>
      </label>
			<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['title'] ); ?>">
		</p>

    <p>
			<label for="<?php echo esc_attr( $this->get_field_id( 'description' ) ); ?>">
        <?php esc_attr_e( 'Description:', '<%= projectName %>' ); ?>
      </label>
			<textarea class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'description' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'description' ) ); ?>"><?php echo esc_attr( $instance['description'] ); ?></textarea>
		</p><?php

	}

	/**
	 * Sanitize widget form values as they are saved.
	 * @see WP_Widget::update()
	 * @param array $instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 * @return array Updated safe values to be saved.
	 */
	public function update( $new_instance, $old_instance ) {
    $instance = array();
		$instance['title'] = ( !empty($new_instance['title']) ) ? strip_tags( $new_instance['title'] ) : '';
		$instance['description'] = ( !empty($new_instance['description']) ) ? strip_tags( $new_instance['description'] ) : '';
		return $instance;
  }

}
