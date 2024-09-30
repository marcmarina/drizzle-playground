CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`body` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);

--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL
);

--> statement-breakpoint
CREATE UNIQUE INDEX `posts_id_unique` ON `posts` (`id`);

--> statement-breakpoint
CREATE UNIQUE INDEX `users_id_unique` ON `users` (`id`);