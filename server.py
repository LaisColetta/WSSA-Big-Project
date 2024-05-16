from flask import Flask, render_template, request, jsonify, abort, redirect, url_for
from recipesDAO import recipesDAO

app = Flask(__name__)

# Routes for web interface
@app.route('/')
def index():
    print("Accessing index page...")
    return render_template('index.html')

# Routes for REST API
@app.route('/api/recipes', methods=['GET'])
def get_recipes():
    print("Accessing GET /api/recipes...")
    recipes = recipesDAO.get_all()
    return jsonify(recipes)

@app.route('/api/recipes', methods=['POST'])
def create_recipe():
    print("Accessing POST /api/recipes...")
    data = request.json
    print("Received data:", data)
    if not data or 'name' not in data or 'ingredients' not in data or 'instructions' not in data:
        print("Invalid data received.")
        return jsonify({'error': 'Invalid data received'}), 400
    new_recipe_id = recipesDAO.create(data['name'], data['ingredients'], data['instructions'])
    print("New recipe created with ID:", new_recipe_id)
    return jsonify({'message': 'Recipe created successfully', 'recipe_id': new_recipe_id}), 201

@app.route('/api/recipes/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    print("Accessing GET /api/recipes/<int:recipe_id> with recipe ID:", recipe_id)
    recipe = recipesDAO.find_by_id(recipe_id)
    if recipe:
        return jsonify(recipe)
    else:
        abort(404)

@app.route('/api/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    print("Accessing PUT /api/recipes/<int:recipe_id> with recipe ID:", recipe_id)
    data = request.json
    print("Received data:", data)
    if not data or 'name' not in data or 'ingredients' not in data or 'instructions' not in data:
        print("Invalid data received.")
        abort(400)
    recipesDAO.update(recipe_id, data['name'], data['ingredients'], data['instructions'])
    print("Recipe updated successfully.")
    return jsonify({'message': 'Recipe updated successfully'})

@app.route('/api/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    print("Accessing DELETE /api/recipes/<int:recipe_id> with recipe ID:", recipe_id)
    recipesDAO.delete(recipe_id)
    print("Recipe deleted successfully.")
    return jsonify({'message': 'Recipe deleted successfully'})

if __name__ == '__main__':
    app.run(threaded=False)