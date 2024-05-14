import mysql.connector
from config import config as cfg

class RecipesDAO:
    def __init__(self): 
        self.connection = mysql.connector.connect(
            host=cfg.MYSQL_DATABASE_HOST,
            user=cfg.MYSQL_DATABASE_USER,
            password=cfg.MYSQL_DATABASE_PASSWORD,
            database=cfg.MYSQL_DATABASE_DB
        )
        self.cursor = self.connection.cursor()
        self.create_db_table()

    def create_db_table(self):
        try:
            sql = """CREATE TABLE IF NOT EXISTS recipes (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255),
                        ingredients TEXT,
                        instructions TEXT
                    )"""
            self.cursor.execute(sql)
            self.connection.commit()
        except mysql.connector.Error as e:
            print(f"Error creating table: {e}")

    def create(self, name, ingredients, instructions):
        try:
            sql = "INSERT INTO recipes (name, ingredients, instructions) VALUES (%s, %s, %s)"
            values = (name, ingredients, instructions)
            self.cursor.execute(sql, values)
            self.connection.commit()
            return self.cursor.lastrowid
        except mysql.connector.Error as e:
            print(f"Error creating recipe: {e}")
            return None

    def get_all(self):
        try:
            sql = "SELECT * FROM recipes ORDER BY id"
            self.cursor.execute(sql)
            results = self.cursor.fetchall()
            return [self.convert_to_dictionary(result) for result in results]
        except mysql.connector.Error as e:
            print(f"Error fetching recipes: {e}")
            return []

    def find_by_id(self, id):
        try:
            sql = "SELECT * FROM recipes WHERE id = %s"
            self.cursor.execute(sql, (id,))
            result = self.cursor.fetchone()
            if result:
                return self.convert_to_dictionary(result)
            else:
                return None
        except mysql.connector.Error as e:
            print(f"Error finding recipe: {e}")
            return None

    def update(self, id, name, ingredients, instructions):
        try:
            sql = "UPDATE recipes SET name = %s, ingredients = %s, instructions = %s WHERE id = %s"
            values = (name, ingredients, instructions, id)
            self.cursor.execute(sql, values)
            self.connection.commit()
            return True
        except mysql.connector.Error as e:
            print(f"Error updating recipe: {e}")
            self.connection.rollback()
            return False

    def delete(self, id):
        try:
            sql = "DELETE FROM recipes WHERE id = %s"
            self.cursor.execute(sql, (id,))
            self.connection.commit()
        except mysql.connector.Error as e:
            print(f"Error deleting recipe: {e}")
            self.connection.rollback()

    def convert_to_dictionary(self, result):
        colnames = ['id', 'name', 'ingredients', 'instructions']
        return {colname: value for colname, value in zip(colnames, result)}

    def __del__(self):
        if hasattr(self, 'cursor'):
            self.cursor.close()
        if hasattr(self, 'connection'):
