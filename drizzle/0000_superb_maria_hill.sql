CREATE TABLE `expenses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`item` text NOT NULL,
	`amount_spent` integer NOT NULL,
	`record_id` integer,
	`date` text DEFAULT (CURRENT_DATE),
	FOREIGN KEY (`record_id`) REFERENCES `records`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `record_idx` ON `expenses` (`record_id`);--> statement-breakpoint
CREATE TABLE `records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image` text NOT NULL,
	`bought_price` integer NOT NULL,
	`sold_price` integer DEFAULT 0
);
