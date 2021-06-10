Refers
https://www.youtube.com/watch?v=ldGl6L4Vktk
https://github.com/safak/youtube/tree/social-rest-api

NodeJSPackages
npm init -y
npm i express
npm i bcrypt
npm i jsonwebtoken
npm i dotenv
npm i --save-dev nodemon
npm i mongoose
npm i helmet
npm i morgan
npm i swagger-jsdoc
npm i swagger-ui-express

Deploy on Heroku
heroku login
git init
heroku git:remote -a ipeach-social
git add .
git commit -am "make it better"
git push heroku master

***if cannot push heroku with ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to please use

git checkout -b main
git branch -D master
git push heroku main