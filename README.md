
# Album Search Application

This is a simple React application that allows users to search for albums, artists, and songs. The search functionality includes dynamic autocomplete suggestions and keyboard navigation for an enhanced user experience.

## Features

- **Autocomplete Suggestions**: Provides autocomplete suggestions as you type in the search bar.
- **Keyboard Navigation**: Use arrow keys to navigate through the search results.
- **Click Outside to Close**: Clicking outside the search bar or results closes the suggestions dropdown.
- **Dynamic Result Update**: Updates the search term dynamically as you navigate through the results with arrow keys.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kanish-111/searchAutocomplete
   cd searchboxz
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Project Structure

- `src/App.js`: Main application component handling the search logic and UI.
- `src/App.css`: CSS file for styling the application.
- `src/utils/utils.js`: Contains the search utility function.
- `src/components/Result.js`: Component for rendering individual search results.
- `public/data.json`: JSON file containing the album, artist, and song data.

## Usage

1. **Search Bar**: Type in the search bar to see autocomplete suggestions based on your input.
2. **Arrow Key Navigation**: Use the up and down arrow keys to navigate through the suggestions.
3. **Enter Key**: Press Enter to select a suggestion and close the dropdown.
4. **Click Outside**: Click anywhere outside the search bar and suggestions to close the dropdown.


### Dropdown Appearance

To adjust the appearance of the dropdown, modify the `.results-list` class in `src/App.css`.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

