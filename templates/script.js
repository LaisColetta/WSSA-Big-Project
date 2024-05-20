        // Function to show the create form
        function showCreate() {
            document.getElementById('showCreateButton').style.display = "none";
            document.getElementById('recipeTable').style.display = "none";
            document.getElementById('createUpdateForm').style.display = "block";

            document.getElementById('createLabel').style.display = "inline";
            document.getElementById('updateLabel').style.display = "none";

            document.getElementById('doCreateButton').style.display = "block";
            document.getElementById('doUpdateButton').style.display = "none";
        }

        // Function to show the table view
        function showViewAll() {
            document.getElementById('showCreateButton').style.display = "block";
            document.getElementById('recipeTable').style.display = "block";
            document.getElementById('createUpdateForm').style.display = "none";
        }

        function viewSavedRecipes() {
            window.location.href = "/";  // Redirect to main page
        }

        // Function to show the update form
        function showUpdate(buttonElement) {
            document.getElementById('showCreateButton').style.display = "none";
            document.getElementById('recipeTable').style.display = "none";
            document.getElementById('createUpdateForm').style.display = "block";

            document.getElementById('createLabel').style.display = "none";
            document.getElementById('updateLabel').style.display = "inline";

            document.getElementById('doCreateButton').style.display = "none";
            document.getElementById('doUpdateButton').style.display = "block";

            var rowElement = buttonElement.parentNode.parentNode;
            var recipe = getRecipeFromRow(rowElement);
            populateFormWithRecipe(recipe);
        }

        // Function to clear the form
        function clearForm() {
            document.querySelector('#createUpdateForm input[name="id"]').value = "";
            document.querySelector('#createUpdateForm input[name="name"]').value = "";
            document.querySelector('#createUpdateForm input[name="ingredients"]').value = "";
            document.querySelector('#createUpdateForm input[name="instructions"]').value = "";
            showViewAll();
        }

        // Function to extract recipe data from a table row
        function getRecipeFromRow(rowElement) {
            return {
                id: rowElement.children[0].innerText,
                name: rowElement.children[1].innerText,
                ingredients: rowElement.children[2].innerText,
                instructions: rowElement.children[3].innerText,
            };
        }

        // Function to populate the form with recipe data
        function populateFormWithRecipe(recipe) {
            document.querySelector('#createUpdateForm input[name="id"]').value = recipe.id;
            document.querySelector('#createUpdateForm input[name="name"]').value = recipe.name;
            document.querySelector('#createUpdateForm input[name="ingredients"]').value = recipe.ingredients;
            document.querySelector('#createUpdateForm input[name="instructions"]').value = recipe.instructions;
        }

        // Function to add a new recipe to the database
        function doCreate() {
            var form = document.getElementById('createUpdateForm');
            var recipe = {
                name: form.querySelector('input[name="name"]').value,
                ingredients: form.querySelector('input[name="ingredients"]').value,
                instructions: form.querySelector('input[name="instructions"]').value
            };

            $.ajax({
                url: "/api/recipes",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(recipe),
                dataType: "json",
                success: function () {
                    alert("Recipe added successfully");
                    window.location.href = "/";  // Redirect to main page
                },
                error: function (xhr, status, error) {
                    console.error("Error: " + status + ", Message: " + error);
                }
            });
        }

        // Function to update an existing recipe in the database
        function doUpdate() {
            var recipe = {
                id: document.querySelector('#createUpdateForm input[name="id"]').value,
                name: document.querySelector('#createUpdateForm input[name="name"]').value,
                ingredients: document.querySelector('#createUpdateForm input[name="ingredients"]').value,
                instructions: document.querySelector('#createUpdateForm input[name="instructions"]').value,
            };

            $.ajax({
                type: 'PUT',
                url: '/api/recipes/' + recipe.id,
                data: JSON.stringify(recipe),
                contentType: 'application/json',
                success: function () {
                    alert('Recipe updated successfully!');
                    loadRecipes();
                    clearForm();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }

        // Function to delete a recipe from the database
        function doDelete(buttonElement) {
            var rowElement = buttonElement.parentNode.parentNode;
            var idToDelete = rowElement.children[0].innerText;

            $.ajax({
                type: 'DELETE',
                url: '/api/recipes/' + idToDelete,
                success: function () {
                    alert('Recipe deleted successfully!');
                    loadRecipes();
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }

        // Function to load all recipes from the database
        function loadRecipes() {
            $.ajax({
                type: 'GET',
                url: '/api/recipes',
                success: function (recipes) {
                    var tableBodyElement = document.querySelector('#recipeTable tbody');
                    while (tableBodyElement.firstChild) {
                        tableBodyElement.removeChild(tableBodyElement.firstChild);
                    }

                    recipes.forEach(function (recipe) {
                        var rowElement = document.createElement('tr');

                        var idElement = document.createElement('td');
                        idElement.innerText = recipe.id;
                        rowElement.appendChild(idElement);

                        var nameElement = document.createElement('td');
                        nameElement.innerText = recipe.name;
                        rowElement.appendChild(nameElement);

                        var ingredientsElement = document.createElement('td');
                        ingredientsElement.innerText = recipe.ingredients;
                        rowElement.appendChild(ingredientsElement);

                        var instructionsElement = document.createElement('td');
                        instructionsElement.innerText = recipe.instructions;
                        rowElement.appendChild(instructionsElement);

                        var updateButtonCellElement = document.createElement('td');
                        var updateButtonElement = document.createElement('button');
                        updateButtonElement.innerText = "Update";
                        updateButtonElement.onclick = function () { showUpdate(this); };
                        updateButtonCellElement.appendChild(updateButtonElement);
                        rowElement.appendChild(updateButtonCellElement);

                        var deleteButtonCellElement = document.createElement('td');
                        var deleteButtonElement = document.createElement('button');
                        deleteButtonElement.innerText = "Delete";
                        deleteButtonElement.onclick = function () { doDelete(this); };
                        deleteButtonCellElement.appendChild(deleteButtonElement);
                        rowElement.appendChild(deleteButtonCellElement);

                        tableBodyElement.appendChild(rowElement);
                    });
                },
                error: function (xhr, status, error) {
                    console.error(error);
                }
            });
        }

        // Function to search for recipes online using Edamam API
        async function searchOnlineRecipes() {
            var searchQuery = document.getElementById('searchQuery').value;
            var searchResultsContainer = document.getElementById('searchResults');

            searchResultsContainer.innerHTML = ""; // Clear previous results

            try {
                // Fetch the API configuration
                const response = await fetch('/api/config');
                const config = await response.json();

                var API_URL = config.API_URL;
                var API_ID = config.API_ID;
                var API_KEY = config.API_KEY;

                $.ajax({
                    type: 'GET',
                    url: `${API_URL}?q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}`,
                    success: function (data) {
                        var recipes = data.hits;
                        if (recipes.length > 0) {
                            recipes.forEach(function (hit) {
                                var recipe = hit.recipe;

                                var recipeElement = document.createElement('div');
                                recipeElement.classList.add('recipe');

                                var labelElement = document.createElement('h3');
                                labelElement.innerText = recipe.label;
                                recipeElement.appendChild(labelElement);

                                var imageElement = document.createElement('img');
                                imageElement.src = recipe.image;
                                recipeElement.appendChild(imageElement);

                                var ingredientsElement = document.createElement('p');
                                ingredientsElement.innerText = "Ingredients: " + recipe.ingredientLines.join(", ");
                                recipeElement.appendChild(ingredientsElement);

                                var linkElement = document.createElement('a');
                                linkElement.href = recipe.url;
                                linkElement.innerText = "View full recipe";
                                recipeElement.appendChild(linkElement);

                                var saveButtonElement = document.createElement('button');
                                saveButtonElement.classList.add('save-recipe');
                                saveButtonElement.onclick = function() { saveRecipeToDatabase(recipe); };
                                saveButtonElement.innerText = "Save Recipe";
                                recipeElement.appendChild(saveButtonElement);

                                searchResultsContainer.appendChild(recipeElement);
                            });
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error(error);
                    }
                });
            } catch (error) {
                console.error('Error fetching config:', error);
            }
        }

        // Function to extract and save a recipe to the database
        function extractRecipe() {
            var searchResults = document.getElementById('searchResults').children;
            if (searchResults.length > 0) {
                var firstRecipe = searchResults[0];
                var recipeName = firstRecipe.querySelector('h3').innerText;
                var recipeIngredients = firstRecipe.querySelector('p').innerText.replace('Ingredients: ', '');
                var recipeInstructions = firstRecipe.querySelector('a').href;

                var recipe = {
                    name: recipeName,
                    ingredients: recipeIngredients,
                    instructions: recipeInstructions
                };

                $.ajax({
                    url: "/api/recipes",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(recipe),
                    dataType: "json",
                    success: function () {
                        alert("Recipe extracted and saved successfully");
                        window.location.href = "/";  // Redirect to main page
                    },
                    error: function (xhr, status, error) {
                        console.error("Error: " + status + ", Message: " + error);
                    }
                });
            } else {
                alert("No recipes available to extract");
            }
        }

        // Function to save a recipe to the database
        function saveRecipeToDatabase(recipe) {
            var recipeData = {
                name: recipe.label,
                ingredients: recipe.ingredientLines.join(", "),
                instructions: recipe.url
            };

            $.ajax({
                url: "/api/recipes",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(recipeData),
                dataType: "json",
                success: function () {
                    alert("Recipe saved successfully");
                },
                error: function (xhr, status, error) {
                    console.error("Error: " + status + ", Message: " + error);
                }
            });
        }

        // Initial load of recipes from the database
        document.addEventListener('DOMContentLoaded', function () {
            loadRecipes();
            document.getElementById('createUpdateForm').addEventListener('submit', function (event) {
                event.preventDefault(); // Prevent default form submission
                doCreate();
            });
        });