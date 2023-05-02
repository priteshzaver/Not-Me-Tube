USE [master]
GO

IF db_id('NotMeTube') IS NOT NULL
BEGIN
	ALTER DATABASE [NotMeTube] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
	DROP DATABASE [NotMeTube]
END
GO

CREATE DATABASE [NotMeTube]
GO

USE [NotMeTube]
GO

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(20) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] dateTime NOT NULL,
  [ImageLocation] nvarchar(255),
  [UserTypeId] int NOT NULL,
  [IsActive] bit NOT NULL DEFAULT(1)
)
GO

CREATE TABLE [Playlist] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(MAX),
  [UserProfileId] int NOT NULL,
  [IsPublic] bit NOT NULL
)
GO

CREATE TABLE [Video] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Description] nvarchar(MAX),
  [YouTubeVideoId] nvarchar(255) NOT NULL,
  [DateCreated] dateTime NOT NULL,
  [UserProfileId] int NOT NULL,
  [IsApproved] bit NOT NULL
)
GO

CREATE TABLE [PlaylistVideo] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PlaylistId] int NOT NULL,
  [VideoId] int NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Message] nvarchar(MAX) NOT NULL,
  [VideoId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [CreateDateTime] dateTime NOT NULL
)
GO

CREATE TABLE [Reaction] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(50) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [VideoReaction] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [VideoId] int NOT NULL,
  [ReactionId] int NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [UserSubscription] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SubscriberUserProfileId] int NOT NULL,
  [ProviderUserProfileId] int NOT NULL,
  [BeginDateTime] dateTime NOT NULL,
  [IsActive] bit NOT NULL
)
GO

CREATE TABLE [PlaylistSubscription] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [SubscriberUserProfileId] int NOT NULL,
  [PlaylistId] int NOT NULL,
  [BeginDateTime] dateTime NOT NULL,
  [IsActive] bit NOT NULL
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [Playlist] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [PlaylistVideo] ADD FOREIGN KEY ([PlaylistId]) REFERENCES [Playlist] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PlaylistVideo] ADD FOREIGN KEY ([VideoId]) REFERENCES [Video] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Video] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([VideoId]) REFERENCES [Video] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [VideoReaction] ADD FOREIGN KEY ([VideoId]) REFERENCES [Video] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [VideoReaction] ADD FOREIGN KEY ([ReactionId]) REFERENCES [Reaction] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [VideoReaction] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserSubscription] ADD FOREIGN KEY ([SubscriberUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserSubscription] ADD FOREIGN KEY ([ProviderUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [PlaylistSubscription] ADD FOREIGN KEY ([SubscriberUserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [PlaylistSubscription] ADD FOREIGN KEY ([PlaylistId]) REFERENCES [Playlist] ([Id]) ON DELETE CASCADE
GO
