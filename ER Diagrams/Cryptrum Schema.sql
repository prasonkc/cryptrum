CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar(25) UNIQUE NOT NULL,
  "email" varchar(100) UNIQUE,
  "password" varchar(255),
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "oauth_accounts" (
  "id" serial PRIMARY KEY,
  "user_id" integer NOT NULL,
  "provider" varchar NOT NULL,
  "provider_id" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "posts" (
  "id" serial PRIMARY KEY,
  "title" varchar(255),
  "body" text,
  "user_id" integer NOT NULL,
  "status" varchar,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp
);

CREATE TABLE "comments" (
  "id" serial PRIMARY KEY,
  "post_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "content" text NOT NULL,
  "parent_id" integer,
  "created_at" timestamp DEFAULT (now())
);

CREATE UNIQUE INDEX ON "oauth_accounts" ("provider", "provider_id");

COMMENT ON COLUMN "posts"."body" IS 'Content of the post';

ALTER TABLE "posts" ADD CONSTRAINT "user_posts" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD CONSTRAINT "post_comments" FOREIGN KEY ("post_id") REFERENCES "posts" ("id");

ALTER TABLE "comments" ADD CONSTRAINT "comment_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD CONSTRAINT "comment_parent" FOREIGN KEY ("parent_id") REFERENCES "comments" ("id");

ALTER TABLE "oauth_accounts" ADD CONSTRAINT "user_oauths" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
