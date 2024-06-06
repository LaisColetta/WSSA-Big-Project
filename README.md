![food](https://shapeyourfutureok.com/wp-content/uploads/2018/10/25698-TSET-19-04-SYF-Website-Refresh_Header_5FoodGroups_F.jpg)

# My Food Canvas

The Recipe Manager is a web application designed to help users manage and explore recipes. Users can add, view, update, delete, and search for recipes both locally and online using the Edamam API. The application leverages a MySQL database to store recipe information and provides a user-friendly interface for interaction.
This is a project for the Web Services and Application module part of the Higher Diploma in Data Analytics at ATU College. The lecturer of this module is Andrew Beatty.

## Features

- Add Recipes: Users can add new recipes to the local database.
- View Recipes: Users can view all recipes stored in the local database.
- Update Recipes: Users can update existing recipes.
- Delete Recipes: Users can delete recipes from the local database.
- Search Recipes Online: Users can search for recipes online using the Edamam API.
- Add Online Recipes: Users can add recipes found online directly to the local database.

## Technologies Used

- Backend: Flask (Python web framework)
- Frontend: HTML, JavaScript, and jQuery
- Database: MySQL
- External API: Edamam API for online recipe search

## Installation and Setup

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/LaisColetta/WSSA-Big-Project.git
    ```

2. Set Up the Virtual Environment:

    ```python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up the configuration file (`config.py`) and add your Edamam API key:

    ```python
    class config:
    DEBUG = True
    MYSQL_DATABASE_HOST = 'lais.mysql.pythonanywhere-services.com'
    MYSQL_DATABASE_USER = 'lais'
    MYSQL_DATABASE_PASSWORD = 'recipe123'
    MYSQL_DATABASE_DB = 'lais$recipedb'
    API_KEY = '67442644f15763961b1408291b163751'
    API_ID = 'caa57a65'
    ```
5. Initialize the Database

Ensure the database schema is created by running the application once. The RecipesDAO class will automatically create the necessary table.

6. Run the Application

```bash
flask run
```
Access the application at http://127.0.0.1:5000/.

## Usage

1. Run the Flask application locally:

    ```bash
    python server.py
    ```

2. Access the application in your web browser at `http://localhost:5000`.

3. Use the web interface to manage recipes or make requests to the RESTful API endpoints for programmatic access.

## Accessing the Online Server

This application is also hosted on [PythonAnywhere](https://www.pythonanywhere.com/). You can access the online server by following these steps:

1. Visit the [PythonAnywhere](http://lais.pythonanywhere.com/) website and sign up for an account if you don't have one already.

2. Once logged in, navigate to the Dashboard and open a Bash console.

3. Clone the repository into your PythonAnywhere account:

    ```bash
    git clone https://github.com/LaisColetta/WSSA-Big-Project.git
    ```

4. Navigate to the project directory:

    ```bash
    cd WSSA-Big-Project
    ```

5. Set up the configuration file (`config.py`) and add your Edamam API key:

    ```python
    API_KEY = '67442644f15763961b1408291b163751'
    ```

6. Run the Flask application:

    ```bash
    python app.py
    ```

7. Access the application in your web browser using the PythonAnywhere domain provided.

## API Endpoints

- GET /api/config: Retrieve API configuration details.
- GET /api/recipes: Get all recipes.
- POST /api/recipes: Add a new recipe.
- GET /api/recipes/int:recipe_id: Get a specific recipe by ID.
- PUT /api/recipes/int:recipe_id: Update a recipe by ID.
- DELETE /api/recipes/int:recipe_id: Delete a recipe by ID.
- POST /api/recipes/search: Search for recipes online.
- POST /api/recipes/add_online: Add online recipes to the local database.

## File Structure

├── app.py

├── config.py

├── recipesDAO.py

├── templates/

│└── index.html

├── requirements.txt

└── README.md


