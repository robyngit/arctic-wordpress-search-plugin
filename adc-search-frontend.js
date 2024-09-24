document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector(".adc-search-form");
  const searchInput = document.querySelector(".adc-search-input");
  console.log(searchForm);

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent default form submission
      const searchTerm = encodeURIComponent(searchInput.value.trim());
      console.log(searchTerm);
      const searchURL = `https://arcticdata.io/catalog/data/query=${searchTerm}`;
      // Redirect to the search URL with the query
      if (searchTerm) {
        window.location.href = searchURL;
      }
    });
  }
});
