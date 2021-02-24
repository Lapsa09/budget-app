CREATE TABLE incomes(
    id SERIAL PRIMARY KEY,
    money FLOAT(2) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    income BOOLEAN NOT NULL,
    cathegory text NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);

    -- user_id INT references users(id),