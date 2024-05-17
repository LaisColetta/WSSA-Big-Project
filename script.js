$(document).ready(function() {
    getAllRecipesAjax();
});

function showCreate() {
    $('#showCreateButton').hide();
    $('#recipeTable').hide();
    $('#createUpdateForm').show();

    $('#createLabel').show();
    $('#updateLabel').hide();

    $('#doCreateButton').show();
    $('#doUpdateButton').hide();
}

function showViewAll() {
    $('#showCreateButton').show();
    $('#recipeTable').show();
    $('#createUpdateForm').hide();
}

function showUpdate(buttonElement) {
    $('#showCreateButton').hide();
    $('#recipeTable').hide();
    $('#createUpdateForm').show();

    $('#createLabel').hide();
    $('#updateLabel').show();

    $('#doCreateButton').hide();
    $('#doUpdateButton').show();

    var rowElement = buttonElement.parentNode.parentNode;
    var recipe = getRecipeFromRow(rowElement);
    populateFormWithRecipe(recipe);
}

function doCreate() {
    var recipe = {
        name: $('input[name="name"]').val(),
        ingredients: $('input[name="ingredients"]').val(),
        instructions: $('input[name="instructions"]').val()
    };
    createRecipeAjax(recipe);
}

function doUpdate() {
    var recipe = {
        id: $('input[name="id"]').val(),
        name: $('input[name="name"]').val(),
        ingredients: $('input[name="ingredients"]').val(),
        instructions: $('input[name="instructions"]').val()
    };
    updateRecipeAjax(recipe);
}

function doDelete(rowElement) {
    var tableElement = $('#recipeTable');
    var index = rowElement.rowIndex;
    var id = rowElement.cells[0].innerText; // Assuming ID is in the first column
    deleteRecipeAjax(id);
    tableElement.deleteRow(index);
}

function addRecipeToTable(recipe) {
    var tableElement = $('#recipeTable');
    var rowElement = tableElement.insertRow(-1);
    rowElement.insertCell(0).innerText = recipe.id;
    rowElement.insertCell(1).innerText = recipe.name;
    rowElement.insertCell(2).innerText = recipe.ingredients;
    rowElement.insertCell(3).innerText = recipe.instructions;
    var updateCell = rowElement.insertCell(4);
    var deleteCell = rowElement.insertCell(5);
    updateCell.html('<button onclick="showUpdate(this)">Update</button>');
    deleteCell.html('<button onclick="doDelete(this.parentNode.parentNode)">Delete</button>');
}

function clearForm() {
    var form = $('#createUpdateForm');
    form.find('input[name="id"]').val('');
    form.find('input[name="name"]').val('');
    form.find('input[name="ingredients"]').val('');
    form.find('input[name="instructions"]').val('');
    showViewAll();
}

function getRecipeFromRow(rowElement) {
    var recipe = {
        id: rowElement.cells[0].innerText,
        name: rowElement.cells[1].innerText,
        ingredients: rowElement.cells[2].innerText,
        instructions: rowElement.cells[3].innerText
    };
    return recipe;
}

function searchOnlineRecipes() {
    var query = $('#searchQuery').val().trim();
    if (!query) {
        alert("Please enter a search query.");
        return;
    }

    $.ajax({
        url: "/api/recipes/search",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ query: query }),
        dataType: "json",
        success: function (data) {
            displaySearchResults(data);
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + ", Message: " + error);
        }
    });
}

function displaySearchResults(recipes) {
    var searchResultsDiv = $('#searchResults');
    searchResultsDiv.html('');

    recipes.forEach(function (recipe) {
        var recipeDiv = $('<div>');
        recipeDiv.html(`
            <p>Name: ${recipe.name}</p>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Instructions: ${recipe.instructions}</p>
            <button onclick="addRecipeToMyRecipes('${recipe.name}', '${recipe.ingredients}', '${recipe.instructions}')">Add to My Recipes</button>
        `);
        searchResultsDiv.append(recipeDiv);
    });
}

function addRecipeToMyRecipes(name, ingredients, instructions) {
    var recipe = {
        name: name,
        ingredients: ingredients,
        instructions: instructions
    };

    $.ajax({
        url: "/api/recipes",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(recipe),
        dataType: "json",
        success: function () {
            alert("Recipe added successfully");
        },
        error: function (xhr, status, error) {
            console.error("Error: " + status + ", Message: " + error);
        }
    });
}