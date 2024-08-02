CREATE TABLE `workouts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`background_color` text NOT NULL,
	`exercises` text,
	`time` text
);
