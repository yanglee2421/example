CREATE TABLE `commentTable` (
	`id` integer NOT NULL,
	`text` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `organizationTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `postTable` (
	`id` integer NOT NULL,
	`title` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `profileTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`userId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `userTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`invitedBy` integer
);
--> statement-breakpoint
CREATE TABLE `userToOrganizationTable` (
	`id` integer NOT NULL,
	PRIMARY KEY(`id`, `id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userTable_email_unique` ON `userTable` (`email`);