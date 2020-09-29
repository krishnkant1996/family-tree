# Technology Used
# Node,React,Mysql

# run backend code    
        cd backend
        cp .env.sample .env.local
        npm i
        export NODE_ENV=LOCAL
        npx sequelize-cli db:migrate
        node app.js

# run frontend code    
    cd frontend
    npm i
    node start    
