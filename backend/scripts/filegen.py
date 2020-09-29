import os
import sys

try:
    if not os.path.exists(os.path.join(os.getcwd(), 'api', sys.argv[2])):
        os.makedirs(os.path.join(os.getcwd(), 'api', sys.argv[2]))
        open(os.path.join(os.getcwd(), 'api', sys.argv[2], sys.argv[2]+".model.js"), 'w').close()
        open(os.path.join(os.getcwd(), 'api', sys.argv[2], sys.argv[2]+".validations.js"), 'w').close()
        open(os.path.join(os.getcwd(), 'api', sys.argv[2], sys.argv[2]+".services.js"), 'w').close()
        open(os.path.join(os.getcwd(), 'api', sys.argv[2], sys.argv[2]+".controller.js"), 'w').close()
        open(os.path.join(os.getcwd(), 'api', sys.argv[2], sys.argv[2]+".test.js"), 'w').close()
        open(os.path.join(os.getcwd(), 'api', sys.argv[2], sys.argv[2]+".routes.js"), 'w').close()
        open(os.path.join(os.getcwd(), 'api', sys.argv[2],"index.js"), 'w').close()
except Exception as err:
    print(err)
    print("not creating model files....")

os.system("sequelize migration:create --name {}".format(sys.argv[1]))