CREATE TABLE `profileTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer
);
--> statement-breakpoint
CREATE TABLE `userTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`password` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userTable_email_unique` ON `userTable` (`email`);