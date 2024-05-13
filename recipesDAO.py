import mysql.connector
from config import config as cfg

class RecipesDAO:
    def __init__(self): 
        self.connection = mysql.connector.connect(
            host=cfg.MYSQL_HOST,
            user=cfg.MYSQL_USER,
            password=cfg.MYSQL_PASSWORD,
            database=cfg.MYSQL_DATABASE
        )
        self.cursor = self.connection.cursor()

    def create_db_table(self):
        sql = "CREATE TABLE IF NOT EXISTS recipes (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), ingredients TEXT, instructions TEXT)"
        self.cursor.execute(sql)
        self.connection.commit()

    def create(self, values):
        sql = "INSERT INTO recipes (name, ingredients, instructions) VALUES (%s, %s, %s)"
        self.cursor.execute(sql, values)
        self.connection.commit()
        self.cursor.execute("SELECT LAST_INSERT_ID()")
        last_insert_id = self.cursor.fetchone()[0]
        return last_insert_id


    def get_all(self):
        sql = "SELECT * FROM recipes ORDER BY id"
        self.cursor.execute(sql)
        results = self.cursor.fetchall()
        returnArray = []
        for result in results:
            returnArray.append(self.convert_to_dictionary(result))
        return returnArray


    def find_by_id(self, id):
        sql = "SELECT * FROM recipes WHERE id = %s"
        self.cursor.execute(sql, (id,))
        result = self.cursor.fetchone()
        if result:
            return self.convert_to_dictionary(result)  # If result found, convert it to a dictionary and return it
        else:
            return None  # If no result found, return None

    def update(self, id, name, ingredients, instructions):
        try:
            sql = "UPDATE recipes SET name = %s, ingredients = %s, instructions = %s WHERE id = %s"
            self.cursor.execute(sql, (name, ingredients, instructions, id))
            self.connection.commit()
            return True  # Indicate successful update
        except Exception as e:
            print(f"Error updating recipe: {e}")
            self.connection.rollback()
            return False  # Indicate update failure


    def delete(self, id):
        sql = "DELETE FROM recipes WHERE id = %s"
        self.cursor.execute(sql, (id,))
        self.connection.commit()

    def convert_to_dictionary(self, result):
        colnames = ['id', 'name', 'ingredients', 'instructions']
        return {colname: value for colname, value in zip(colnames, result)}  # Convert result to dictionary and return it

recipesDAO = RecipesDAO()
