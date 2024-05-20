# My Food Canvas

This recipe manager called 'My Food Canvas' is a web application designed to help users to create their own cookbook and where they can also explore new recipes. Users can add, view, update, delete, search and save recipes both locally and online using the Edamam API. The application uses a MySQL database to store recipe information and provides a user-friendly interface for interaction.

This project is part of the course Web Services and Application from the ATU college winter 2024, Ireland, lectured by Andre Beatty. 

## Features

- View a list of all recipes saved by the user.
- User can add a new recipe by adding the name, ingredients and instructions.
- Update an existing recipe.
- Delete a recipe.
- Search for recipes online using the Spoonacular API and add them to the database.

## Resources used
- Backend: Flask (Python web framework)
- Frontend: HTML, JavaScript, and jQuery
- Database: MySQL
- External API: Edamam API for online recipe search

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/recipe-manager.git
    cd recipe-manager
    ```

2. Navigate to the project directory:

    ```bash
    cd recipe-management
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up the configuration file (`config.py`) and add your Spoonacular API key:

    ```python
    SPOONACULAR_API_KEY = 'your-spoonacular-api-key'
    ```

## Usage

1. Run the Flask application locally:

    ```bash
    python app.py
    ```

2. Access the application in your web browser at `http://localhost:5000`.

3. Use the web interface to manage recipes or make requests to the RESTful API endpoints for programmatic access.

## Accessing the Online Server

This application is also hosted on [PythonAnywhere](https://www.pythonanywhere.com/). You can access the online server by following these steps:

1. Visit the [PythonAnywhere](https://www.pythonanywhere.com/) website and sign up for an account if you don't have one already.

2. Once logged in, navigate to the Dashboard and open a Bash console.

3. Clone the repository into your PythonAnywhere account:

    ```bash
    git clone https://github.com/your-username/recipe-management.git
    ```

4. Navigate to the project directory:

    ```bash
    cd recipe-management
    ```

5. Set up the configuration file (`config.py`) and add your Spoonacular API key:

    ```python
    SPOONACULAR_API_KEY = 'your-spoonacular-api-key'
    ```

6. Run the Flask application:

    ```bash
    python app.py
    ```

7. Access the application in your web browser using the PythonAnywhere domain provided.

## API Endpoints

- `GET /api/recipes`: Get all recipes.
- `GET /api/recipes/{recipe_id}`: Get a specific recipe by ID.
- `POST /api/recipes`: Create a new recipe.
- `PUT /api/recipes/{recipe_id}`: Update an existing recipe.
- `DELETE /api/recipes/{recipe_id}`: Delete a recipe.
- `POST /api/recipes/search`: Search for recipes online and add them to the database.

  source: Edamam API Documentation - https://developer.edamam.com/edamam-docs-recipe-api

## EDAMAM API

The recipes contained in the Recipe Search API EDAMAM are web recipes. These are recipes collected from throughout the internet. Therefore, they do not hold the copyrights to these recipes and do not provide the cooking instructionsonly the url to the source recipe. 


