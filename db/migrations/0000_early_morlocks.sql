CREATE TABLE `record` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`duration` integer NOT NULL,
	`exercises` text NOT NULL,
	`timers` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workout` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`avatarColor` text NOT NULL,
	`exercises` text NOT NULL,
	`timers` text NOT NULL
);
