const { registerBlockType } = wp.blocks;
const { createElement: el, Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, TextControl } = wp.components;
const { useBlockProps } = wp.blockEditor;

// Search icon SVG
const ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
  </svg>
`;

// Placeholder text for the search input can be customized
const DEFAULT_PLACEHOLDER = "What data are you looking for?";

// Common function to render the search form in the editor and for saving
const renderSearchForm = (attributes, setAttributes) =>
  el(
    "div",
    { className: "adc-search" },
    // the form
    el(
      "form",
      { className: "adc-search-form", method: "get", action: "#" },
      // Search icon
      el("span", {
        dangerouslySetInnerHTML: { __html: ICON },
        className: "adc-search-icon",
      }),
      // Input with configurable placeholder text
      el("input", {
        type: "search",
        id: "default-search",
        value: attributes.searchTerm || "",
        placeholder: attributes.placeholderText || DEFAULT_PLACEHOLDER, // Configurable placeholder text
        className: "adc-search-input",
        onChange: (event) => setAttributes({ searchTerm: event.target.value }), // Update attributes on input change
      }),
      // Button
      el(
        "button",
        {
          type: "submit",
          className: "adc-search-button",
        },
        "Search"
      )
    ),
    // a button to do an advanced search
    el(
      "a",
      {
        href: "https://arcticdata.io/catalog/",
        className: "adc-advanced-search",
      },
      "Advanced Search"
    )
  );

registerBlockType("adc/search-block", {
  title: "ADC Search Block",
  icon: el("span", { dangerouslySetInnerHTML: { __html: ICON } }),
  category: "common",
  attributes: {
    searchTerm: {
      type: "string",
      default: "",
    },
    placeholderText: {
      type: "string",
      default: DEFAULT_PLACEHOLDER,
    },
  },
  edit: (props) => {
    const blockProps = useBlockProps();
    const { attributes, setAttributes } = props;

    return el(
      Fragment,
      null,
      el(
        InspectorControls,
        null,
        el(
          PanelBody,
          { title: "Search Field Settings" },
          el(TextControl, {
            label: "Placeholder Text",
            value: attributes.placeholderText,
            onChange: (newText) => setAttributes({ placeholderText: newText }),
            help: "Customize the placeholder text for the search input.",
          })
        )
      ),
      el("div", blockProps, renderSearchForm(attributes, setAttributes)) // Apply blockProps to the wrapper
    );
  },
  save: (props) => renderSearchForm(props.attributes), // No submission logic needed here
});
