import sqlite3
from config import config as cfg

class RecipesDAO:
    def __init__(self): 
        self.connection = sqlite3.connect(cfg.SQLITE_DATABASE_PATH)
        self.cursor = self.connection.cursor()
        self.create_db_table()

    def create_db_table(self):
        try:
            sql = """CREATE TABLE IF NOT EXISTS recipes (
                        id INTEGER PRIMARY KEY,
                        name VARCHAR(255),
                        ingredients TEXT,
                        instructions TEXT
                    )"""
            self.cursor.execute(sql)
            self.connection.commit()
        except sqlite3.Error as e:
            print(f"Error creating table: {e}")

    def create(self, name, ingredients, instructions):
        try:
            sql = "INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)"
            self.cursor.execute(sql, (name, ingredients, instructions))
            self.connection.commit()
            return self.cursor.lastrowid
        except sqlite3.Error as e:
            print(f"Error creating recipe: {e}")
            return None

    def get_all(self):
        try:
            sql = "SELECT * FROM recipes ORDER BY id"
            self.cursor.execute(sql)
            results = self.cursor.fetchall()
            return [self.convert_to_dictionary(result) for result in results]
        except sqlite3.Error as e:
            print(f"Error fetching recipes: {e}")
            return []

    def find_by_id(self, id):
        try:
            sql = "SELECT * FROM recipes WHERE id = ?"
            self.cursor.execute(sql, (id,))
            result = self.cursor.fetchone()
            if result:
                return self.convert_to_dictionary(result)
            else:
                return None
        except sqlite3.Error as e:
            print(f"Error finding recipe: {e}")
            return None

    def update(self, id, name, ingredients, instructions):
        try:
            sql = "UPDATE recipes SET name = ?, ingredients = ?, instructions = ? WHERE id = ?"
            self.cursor.execute(sql, (name, ingredients, instructions, id))
            self.connection.commit()
            return True
        except sqlite3.Error as e:
            print(f"Error updating recipe: {e}")
            self.connection.rollback()
            return False

    def delete(self, id):
        try:
            sql = "DELETE FROM recipes WHERE id = ?"
            self.cursor.execute(sql, (id,))
            self.connection.commit()
        except sqlite3.Error as e:
            print(f"Error deleting recipe: {e}")
            self.connection.rollback()

    def convert_to_dictionary(self, result):
        colnames = ['id', 'name', 'ingredients', 'instructions']
        return {colname: value for colname, value in zip(colnames, result)}

    def __del__(self):
        self.cursor.close()
        self.connection.close()

recipesDAO = RecipesDAO()