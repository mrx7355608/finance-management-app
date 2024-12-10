CREATE TABLE records (
	id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	image text NOT NULL,
	bought_price INTEGER NOT NULL,
	sold_price INTEGER DEFAULT 0
);
