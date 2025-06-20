# 🍽️ Food Product Explorer

This is a React-based web application that allows users to explore food products using the [OpenFoodFacts API](https://world.openfoodfacts.org/). The app supports search by **product name** or **barcode**, **filtering by category**, **sorting**, and viewing detailed **nutritional information** for each product.

---

## 🚀 Features

### 1. Homepage
- Displays a list of food products fetched from the OpenFoodFacts API.
- Each product card shows:
  - Product Name
  - Image (with fallback)
  - Category
  - Ingredients (if available)
  - Nutrition Grade (A–E)
- Infinite scroll / "Load More" button for pagination.

### 2. Search
- **Name Search**: Search for products by name.
- **Barcode Search**: Enter barcode to get exact product details.

### 3. Category Filter
- Dropdown to filter by food categories (beverages, dairy, snacks, etc.).
- Categories dynamically fetched from the API (fallback options available).

### 4. Sort Functionality
- Sort product list by:
  - Name (A-Z or Z-A)
  - Nutrition Grade (best to worst or worst to best)

### 5. Product Detail Page
- Shows complete details:
  - Product name, image, and brand
  - Nutrition grade
  - Full list of ingredients
  - Nutritional values (Energy, Fat, Carbs, Protein, etc.)
  - Labels like vegan, gluten-free, etc.

### 6. Responsive UI
- Fully mobile and desktop responsive.
- Clean and modern UI built using **Tailwind CSS**.

---

## 🛠️ Technologies Used

| Tech         | Purpose                      |
|--------------|------------------------------|
| ReactJS      | Frontend Framework           |
|  CSS3        | Styling                      |
| OpenFoodFacts API | Data Source             |
| Lucide-React | Icons                        |

---

## 🧠 Methodology

The application is designed as a single-page React app with the following architecture:

- **State Management**: `useState` and `useEffect` are used to manage search state, category filters, and paginated product lists.
- **Search & Filter**:
  - Unified search bar supports both name and barcode lookup.
  - API endpoints are called conditionally based on user input.
- **Performance**:
  - Only fetches more products when "Load More" is clicked.
  - Handles API fallback if the OpenFoodFacts server is slow or unresponsive.
- **User Experience**:
  - Placeholder images, loading states, and graceful error messages enhance usability.

---

## 🕓 Time Taken

**Total Time:** ~10–12 hours  
**Breakdown:**
- Initial setup & API integration: 2 hours  
- Search & barcode logic: 2.5 hours  
- Category filtering & sorting: 2 hours  
- Product detail layout: 2.5 hours  
- Tailwind styling & responsiveness: 2 hours  
- Testing, fallback handling & error states: 1 hour

---

Project Live Link:https://foodexplorer-mauve.vercel.app/

