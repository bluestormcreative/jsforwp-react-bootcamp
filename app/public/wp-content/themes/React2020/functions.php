<?php
/**
 * Functions for child theme
 *
 * @package react2020
 */

/**
 * Enqueue child scripts.
 *
 * @return void
 */
function react2020_enqueue_styles() {

	$parent_style = 'twentytwenty-style'; 

	wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );

	wp_enqueue_style( 'child-style',
		get_stylesheet_directory_uri() . '/style.css',
		array( $parent_style ),
		time() // wp_get_theme()->get('Version').
	);

	wp_enqueue_script(
		'react2020-frontend',
		get_stylesheet_directory_uri() . '/build/index.js',
		[ 'wp-element', 'wp-components' ],
		time(), // For production use wp_get_theme()->get('Version').      
		true
	);
}
add_action( 'wp_enqueue_scripts', 'react2020_enqueue_styles' );
