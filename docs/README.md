## ERD for LMS

Table users {
  id int [pk, increment]
  name varchar
  email varchar [unique]
  password varchar
  role varchar  // 'student' or 'admin'
  is_deleted boolean [default: false]
  created_at timestamp
  updated_at timestamp
}

Table courses {
  id int [pk, increment]
  title varchar
  description text
  is_deleted boolean [default: false]
  created_at timestamp
  updated_at timestamp
}

Table modules {
  id int [pk, increment]
  title varchar
  content text
  content_type varchar  // 'video', 'pdf', 'text', etc
  is_deleted boolean [default: false]
  created_at timestamp
  updated_at timestamp
}

Table course_modules {
  course_id int [ref: > courses.id]
  module_id int [ref: > modules.id]
  order_index int
  primary key(course_id, module_id)
}

Table enrollments {
  user_id int [ref: > users.id]
  course_id int [ref: > courses.id]
  enrolled_at timestamp
  last_accessed_at timestamp
  progress decimal  // percentage 0-100
  status varchar // 'active', 'completed', 'dropped'
  primary key(user_id, course_id)
}

Table checkpoints {
  id int [pk, increment]
  title varchar
  type varchar  // 'quiz' or 'mini-project'
  course_id int [ref: > courses.id]
  max_score decimal
  submission_type varchar  // 'text', 'link' (mini project only)
  is_deleted boolean [default: false]
  created_at timestamp
  updated_at timestamp
}

Table submissions {
  user_id int [ref: > users.id]
  checkpoint_id int [ref: > checkpoints.id]
  submitted_at datetime
  grade decimal
  feedback text
  submission_link varchar  // untuk mini project, simpan link GitHub
  primary key(user_id, checkpoint_id)
}

