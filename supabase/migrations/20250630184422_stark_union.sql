/*
  # Create messaging system tables

  1. New Tables
    - `channels` - Stores messaging channels
    - `channel_members` - Tracks which users belong to which channels
    - `messages` - Stores messages sent in channels
    - `direct_messages` - Stores private messages between users
    - `message_reactions` - Stores reactions to messages
  
  2. Security
    - Enable RLS on all tables
    - Add policies for users to view channels they belong to
    - Add policies for users to send messages in channels they belong to
    - Add policies for admins to manage all messaging data
*/

-- Create channels table
CREATE TABLE IF NOT EXISTS channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('text', 'announcement', 'voice')),
  is_private BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create channel_members table
CREATE TABLE IF NOT EXISTS channel_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(channel_id, user_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'file', 'voice')),
  reply_to UUID REFERENCES messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create message_attachments table
CREATE TABLE IF NOT EXISTS message_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create direct_messages table
CREATE TABLE IF NOT EXISTS direct_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'file', 'voice')),
  reply_to UUID REFERENCES direct_messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create direct_message_attachments table
CREATE TABLE IF NOT EXISTS direct_message_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES direct_messages(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL,
  size INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create message_reactions table
CREATE TABLE IF NOT EXISTS message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  direct_message_id UUID REFERENCES direct_messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT message_reference_check CHECK (
    (message_id IS NOT NULL AND direct_message_id IS NULL) OR
    (message_id IS NULL AND direct_message_id IS NOT NULL)
  ),
  UNIQUE(message_id, direct_message_id, user_id, emoji)
);

-- Enable Row Level Security
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE direct_message_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;

-- Channels policies
CREATE POLICY "Users can view public channels"
  ON channels
  FOR SELECT
  USING (NOT is_private);

CREATE POLICY "Users can view private channels they are members of"
  ON channels
  FOR SELECT
  USING (
    is_private AND
    EXISTS (
      SELECT 1 FROM channel_members
      WHERE channel_members.channel_id = channels.id AND channel_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Educators can create channels"
  ON channels
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND user_type = 'educator'
    )
  );

CREATE POLICY "Admins can manage all channels"
  ON channels
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Channel members policies
CREATE POLICY "Users can view channel members for channels they belong to"
  ON channel_members
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM channel_members AS cm
      WHERE cm.channel_id = channel_members.channel_id AND cm.user_id = auth.uid()
    )
  );

CREATE POLICY "Educators can add members to channels they created"
  ON channel_members
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM channels
      WHERE channels.id = channel_members.channel_id AND channels.created_by = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all channel members"
  ON channel_members
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Messages policies
CREATE POLICY "Users can view messages in channels they belong to"
  ON messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM channel_members
      WHERE channel_members.channel_id = messages.channel_id AND channel_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in channels they belong to"
  ON messages
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM channel_members
      WHERE channel_members.channel_id = messages.channel_id AND channel_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can edit their own messages"
  ON messages
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all messages"
  ON messages
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Message attachments policies
CREATE POLICY "Users can view attachments for messages they can see"
  ON message_attachments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM messages
      JOIN channel_members ON channel_members.channel_id = messages.channel_id
      WHERE messages.id = message_attachments.message_id AND channel_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add attachments to their own messages"
  ON message_attachments
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM messages
      WHERE messages.id = message_attachments.message_id AND messages.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all message attachments"
  ON message_attachments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Direct messages policies
CREATE POLICY "Users can view direct messages they sent or received"
  ON direct_messages
  FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send direct messages"
  ON direct_messages
  FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can edit their own direct messages"
  ON direct_messages
  FOR UPDATE
  USING (auth.uid() = sender_id);

CREATE POLICY "Admins can manage all direct messages"
  ON direct_messages
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Direct message attachments policies
CREATE POLICY "Users can view attachments for direct messages they can see"
  ON direct_message_attachments
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM direct_messages
      WHERE direct_messages.id = direct_message_attachments.message_id AND 
      (direct_messages.sender_id = auth.uid() OR direct_messages.recipient_id = auth.uid())
    )
  );

CREATE POLICY "Users can add attachments to their own direct messages"
  ON direct_message_attachments
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM direct_messages
      WHERE direct_messages.id = direct_message_attachments.message_id AND direct_messages.sender_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all direct message attachments"
  ON direct_message_attachments
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );

-- Message reactions policies
CREATE POLICY "Users can view reactions for messages they can see"
  ON message_reactions
  FOR SELECT
  USING (
    (
      message_id IS NOT NULL AND
      EXISTS (
        SELECT 1 FROM messages
        JOIN channel_members ON channel_members.channel_id = messages.channel_id
        WHERE messages.id = message_reactions.message_id AND channel_members.user_id = auth.uid()
      )
    ) OR (
      direct_message_id IS NOT NULL AND
      EXISTS (
        SELECT 1 FROM direct_messages
        WHERE direct_messages.id = message_reactions.direct_message_id AND 
        (direct_messages.sender_id = auth.uid() OR direct_messages.recipient_id = auth.uid())
      )
    )
  );

CREATE POLICY "Users can add reactions to messages they can see"
  ON message_reactions
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    (
      (
        message_id IS NOT NULL AND
        EXISTS (
          SELECT 1 FROM messages
          JOIN channel_members ON channel_members.channel_id = messages.channel_id
          WHERE messages.id = message_reactions.message_id AND channel_members.user_id = auth.uid()
        )
      ) OR (
        direct_message_id IS NOT NULL AND
        EXISTS (
          SELECT 1 FROM direct_messages
          WHERE direct_messages.id = message_reactions.direct_message_id AND 
          (direct_messages.sender_id = auth.uid() OR direct_messages.recipient_id = auth.uid())
        )
      )
    )
  );

CREATE POLICY "Users can delete their own reactions"
  ON message_reactions
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reactions"
  ON message_reactions
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_profiles
      WHERE id = auth.uid()
    )
  );