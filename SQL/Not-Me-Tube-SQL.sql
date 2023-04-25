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
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(20) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [FirebaseUserId] nvarchar(28) NOT NULL,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar(255),
  [UserTypeId] integer NOT NULL,
  [IsActive] bit NOT NULL DEFAULT(1)

  CONSTRAINT [FK_UserProfile_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Playlist] (
	[Id] integer PRIMARY KEY IDENTITY NOT NULL,
	[Name] nvarchar(255) NOT NULL,
	[Description] nvarchar (MAX),
	[UserProfileId] integer NOT NULL,
	[isPublic] bit NOT NULL,

	CONSTRAINT [FK_Playlist_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [Video] (
	[Id] integer PRIMARY KEY IDENTITY NOT NULL,
	[Title] nvarchar(255) NOT NULL,
	[Description] nvarchar(MAX),
	[Url] nvarchar(255) NOT NULL,
	[DateCreated] datetime NOT NULL,
	[UserProfileId] integer NOT NULL,
	[isApproved] bit NOT NULL,

	CONSTRAINT [FK_Video_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [PlaylistVideo] (
	[Id] integer PRIMARY KEY IDENTITY NOT NULL,
	[PlaylistId] integer NOT NULL,
	[VideoId] integer NOT NULL,

	CONSTRAINT [FK_PlaylistVideo_Playlist] FOREIGN KEY ([PlaylistId]) REFERENCES [Playlist] ([Id]),
	CONSTRAINT [FK_PlaylistVideo_Video] FOREIGN KEY ([VideoId]) REFERENCES [Video] ([Id])
)
GO

CREATE TABLE [Comment] (
	[Id] integer PRIMARY KEY IDENTITY NOT NULL,
	[Message] varchar(MAX) NOT NULL,
	[VideoId] integer NOT NULL,
	[UserProfileId] integer NOT NULL,
	[CreateDateTime] datetime NOT NULL,

	CONSTRAINT [FK_Comment_Video] FOREIGN KEY ([VideoId]) REFERENCES [Video] ([Id]),
	CONSTRAINT [FK_Comment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [Reaction] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(50) NOT NULL,
  [ImageLocation] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [VideoReaction] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [VideoId] integer NOT NULL,
  [ReactionId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_VideoReaction_Video] FOREIGN KEY ([VideoId]) REFERENCES [Video] ([Id]),
  CONSTRAINT [FK_VideoReaction_Reaction] FOREIGN KEY ([ReactionId]) REFERENCES [Reaction] ([Id]),
  CONSTRAINT [FK_VideoReaction_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [UserSubscription] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [SubscriberUserProfileId] integer NOT NULL,
  [ProviderUserProfileId] integer NOT NULL,
  [BeginDateTime] datetime NOT NULL,
  [EndDateTime] datetime,

  CONSTRAINT [FK_UserSubscription_UserProfile_Subscriber] FOREIGN KEY ([SubscriberUserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_UserSubscription_UserProfile_Provider] FOREIGN KEY ([ProviderUserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

CREATE TABLE [PlaylistSubscription] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [SubscriberUserProfileId] integer NOT NULL,
  [PlaylistId] integer NOT NULL,
  [BeginDateTime] datetime NOT NULL,
  [EndDateTime] datetime,

  CONSTRAINT [FK_PlaylistSubscription_UserProfile_Subscriber] FOREIGN KEY ([SubscriberUserProfileId]) REFERENCES [UserProfile] ([Id]),
  CONSTRAINT [FK_PlaylistSubscription_Playlist] FOREIGN KEY ([PlaylistId]) REFERENCES [Playlist] ([Id])
)
GO

SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([ID], [Name]) VALUES (1, 'Admin'), (2, 'Client');
SET IDENTITY_INSERT [UserType] OFF
