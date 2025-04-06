CREATE TABLE `chatTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `commentTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`authorId` integer NOT NULL,
	`postId` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messageTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`chatId` integer NOT NULL,
	`name` text DEFAULT '',
	`content` text DEFAULT ''
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
CREATE UNIQUE INDEX `userTable_email_unique` ON `userTable` (`email`);--> statement-breakpoint
CREATE TABLE `userToOrganizationTable` (
	`userId` integer NOT NULL,
	`organizationId` integer NOT NULL,
	PRIMARY KEY(`userId`, `organizationId`)
);
