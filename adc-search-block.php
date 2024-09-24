<?php
/**
 * Plugin Name: ADC Search Block
 * Description: A custom block to create a search input for ADC.
 * Version: 1.0.0
 * Author: Robyn Thiessen-Bock
 */

function adc_search_block_register() {
    // Editor script for block editor (block.js)
    wp_register_script(
        'adc-search-block-editor-js',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ), // Dependencies for block editor
        null,
        true // Load in the footer
    );

    // Front-end script (adc-search-frontend.js)
    wp_register_script(
        'adc-search-frontend-js',
        plugins_url( 'adc-search-frontend.js', __FILE__ ),
        array(),
        null,
        true // Load in the footer
    );

    // Register block styles (same for editor and front-end)
    wp_register_style(
        'adc-search-block-style',
        plugins_url( 'adc-search-block.css', __FILE__ )
    );

    // Automatically register the block type using block.json
    register_block_type( __DIR__ );

    // Enqueue the front-end script only on the front-end
    if ( ! is_admin() ) {
        wp_enqueue_script( 'adc-search-frontend-js' );
    }
}

add_action( 'init', 'adc_search_block_register' );


