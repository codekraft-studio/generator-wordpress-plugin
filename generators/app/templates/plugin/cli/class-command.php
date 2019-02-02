<?php

class <%= className %>_Command {

  public function __construct() {
    // called when command is loaded
  }

  public function foo() {
    WP_CLI::success( 'Hello from <%= projectName %>:foo command' );
  }

}

// Register cli command
WP_CLI::add_command( '<%= projectName %>', '<%= className %>_Command' );
