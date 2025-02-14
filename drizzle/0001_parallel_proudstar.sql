CREATE TABLE `chatTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `messageTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`chatId` integer NOT NULL,
	`name` text DEFAULT '',
	`content` text DEFAULT ''
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_userToOrganizationTable` (
	`userId` integer NOT NULL,
	`organizationId` integer NOT NULL,
	PRIMARY KEY(`userId`, `organizationId`)
);
--> statement-breakpoint
INSERT INTO `__new_userToOrganizationTable`("userId", "organizationId") SELECT "userId", "organizationId" FROM `userToOrganizationTable`;--> statement-breakpoint
DROP TABLE `userToOrganizationTable`;--> statement-breakpoint
ALTER TABLE `__new_userToOrganizationTable` RENAME TO `userToOrganizationTable`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_commentTable` (
	`id` integer PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`authorId` integer NOT NULL,
	`postId` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_commentTable`("id", "text", "authorId", "postId") SELECT "id", "text", "authorId", "postId" FROM `commentTable`;--> statement-breakpoint
DROP TABLE `commentTable`;--> statement-breakpoint
ALTER TABLE `__new_commentTable` RENAME TO `commentTable`;