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
    var rowElement = $('<tr>');
    rowElement.append($('<td>').text(recipe.id));
    rowElement.append($('<td>').text(recipe.name));
    rowElement.append($('<td>').text(recipe.ingredients));
    rowElement.append($('<td>').text(recipe.instructions));
    var updateCell = $('<td>').html('<button onclick="showUpdate(this)">Update</button>');
    var deleteCell = $('<td>').html('<button onclick="doDelete(this.parentNode.parentNode)">Delete</button>');
    rowElement.append(updateCell);
    rowElement.append(deleteCell);
    tableElement.append(rowElement);
}

function clearForm() {
    $('input[name="id"]').val('');
    $('input[name="name"]').val('');
    $('input[name="ingredients"]').val('');
    $('input[name="instructions"]').val('');
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
        success: function(data) {
            displaySearchResults(data);
        },
        error: function(xhr, status, error) {
            console.error("Error: " + status + ", Message: " + error);
        }
    });
}

function displaySearchResults(recipes) {
    var searchResultsDiv = $('#searchResults');
    searchResultsDiv.empty();

    recipes.forEach(function(recipe) {
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
        data:
