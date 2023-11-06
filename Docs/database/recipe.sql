drop table if exists receipts;
create table receipts (
	id serial4 primary key unique,
	title varchar(50),
	image text,
	video_url text,
	receipt_uid uuid unique,
	ispopular bool,
	created_at date,
	ingredients jsonb,
	sort_desc text
);

drop table if exists "comments";
create table "comments" (
	id serial4 primary key unique,
	recipe_uid uuid,
	user_uid uuid,
	message text
);

DROP TABLE if exists "users";
CREATE TABLE "users" (
    id serial4 primary key unique,
    first_name varchar(100),
    last_name varchar(100),
    "role" varchar(20),
    verified bool,
    phone_number varchar(20),
    email varchar(100) unique,
    user_uid uuid unique,
    "password" varchar(250),
    photo_profile text,
    created_at date,
    update_at date
);

-- adding foreign key comments(recipe_uid) --> receipts(receipt_uid)
ALTER TABLE "comments" 
ADD CONSTRAINT "fk_comments_receipts" 
FOREIGN KEY ("recipe_uid") 
REFERENCES "public"."receipts"("receipt_uid") 
ON DELETE CASCADE ON UPDATE CASCADE;

-- adding foreign key comments(user_uid) --> users(user_uid)
ALTER TABLE "comments" 
ADD CONSTRAINT "fk_comments_users" 
FOREIGN KEY ("user_uid") 
REFERENCES "public"."users"("user_uid") 
ON DELETE CASCADE ON UPDATE CASCADE;

-- Check table list
SELECT table_name FROM information_schema.tables where table_schema = 'public'; 

-- Check records of tables bellow
select * from receipts r ;
select * from "comments" c ;
select * from users u;






















