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
        return self.cursor.lastrowid

    def get_all(self):
        sql = "SELECT * FROM recipes"
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
            return self.convert_to_dictionary(result)
        else:
            return None

    def update(self, values):
        sql = "UPDATE recipes SET name = %s, ingredients = %s, instructions = %s WHERE id = %s"
        self.cursor.execute(sql, values)
        self.connection.commit()

    def delete(self, id):
        sql = "DELETE FROM recipes WHERE id = %s"
        self.cursor.execute(sql, (id,))
        self.connection.commit()

    def convert_to_dictionary(self, result):
        colnames = ['id', 'name', 'ingredients', 'instructions']
        item = {}
        for i, colname in enumerate(colnames):
            item[colname] = result[i]
        return item

recipesDAO = RecipesDAO()
