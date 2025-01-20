-- Table: category
CREATE TABLE category (
                          id bigserial NOT NULL,
                          name varchar(50) NOT NULL,
                          CONSTRAINT category_pk PRIMARY KEY (id)
);

-- Table: comment
CREATE TABLE comment (
                         id bigserial NOT NULL,
                         content text NOT NULL,
                         created_at timestamp NOT NULL,
                         user_id int NOT NULL,
                         post_id int NOT NULL,
                         CONSTRAINT comment_pk PRIMARY KEY (id)
);

-- Table: post
CREATE TABLE post (
                      id bigserial NOT NULL,
                      title varchar(200) NOT NULL,
                      content text NOT NULL,
                      image_url varchar(255) NULL,
                      created_at timestamp NOT NULL,
                      updated_at timestamp NOT NULL,
                      user_id int NOT NULL,
                      category_id int,
                      CONSTRAINT post_pk PRIMARY KEY (id)
);

-- Table: role
CREATE TABLE role (
                      id bigserial NOT NULL,
                      name varchar(50) NOT NULL,
                      CONSTRAINT role_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE "user" (
                        id bigserial NOT NULL,
                        username varchar(50) NOT NULL,
                        password varchar(255) NOT NULL,
                        email varchar(100) NOT NULL,
                        role_id int NOT NULL,
                        CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Foreign Keys with Cascading Actions

-- Reference: comment_post (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_post
    FOREIGN KEY (post_id)
        REFERENCES post (id)
        ON DELETE CASCADE
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: comment_user (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_user
    FOREIGN KEY (user_id)
        REFERENCES "user" (id)
        ON DELETE CASCADE
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: post_category (table: post)
ALTER TABLE post ADD CONSTRAINT post_category
    FOREIGN KEY (category_id)
        REFERENCES category (id)
        ON DELETE SET NULL
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: post_user (table: post)
ALTER TABLE post ADD CONSTRAINT post_user
    FOREIGN KEY (user_id)
        REFERENCES "user" (id)
        ON DELETE CASCADE
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;

-- Reference: user_role (table: user)
ALTER TABLE "user" ADD CONSTRAINT user_role
    FOREIGN KEY (role_id)
        REFERENCES role (id)
        ON DELETE SET NULL
        NOT DEFERRABLE
            INITIALLY IMMEDIATE
;