npm install express sequelize pg cors dotenv bcrypt jsonwebtoken

npm install --save-dev nodemon eslint sequelize-cli prettier


models:
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string,role:string,is_deleted:boolean

npx sequelize-cli model:generate --name Course --attributes title:string,description:text,is_deleted:boolean
npx sequelize-cli model:generate --name Module --attributes title:string,content:text,content_type:string,is_deleted:boolean
npx sequelize-cli model:generate --name CourseModule --attributes order_index:integer
npx sequelize-cli model:generate --name Enrollment --attributes enrolled_at:date,last_accessed_at:date,progress:decimal,status:string
npx sequelize-cli model:generate --name Checkpoint --attributes title:string,type:string,max_score:decimal,submission_type:string,is_deleted:boolean
npx sequelize-cli model:generate --name Submission --attributes submitted_at:date,grade:decimal,feedback:text,submission_link:string
