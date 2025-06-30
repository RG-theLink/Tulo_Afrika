import { StreamChat } from 'stream-chat';

// Stream Chat API key (public, safe for client-side)
const API_KEY = 'x9fc6pcfffpe';

// Initialize client-side Stream Chat instance (without secret)
export const clientChat = StreamChat.getInstance(API_KEY);

// Generate development token (ONLY for development - not for production)
const generateDevToken = (userId: string): string => {
  // This is a development-only approach
  // In production, tokens should be generated server-side with the API secret
  return clientChat.devToken(userId);
};

// Connect user to Stream Chat with token
export const connectUser = async (userId: string, username: string, userType: string) => {
  try {
    // Generate development token (replace with backend call in production)
    const token = generateDevToken(userId);
    
    await clientChat.connectUser(
      {
        id: userId,
        name: username,
        role: userType,
        image: `https://getstream.io/random_svg/?id=${userId}&name=${username}`,
      },
      token
    );
    
    return { success: true, token };
  } catch (error) {
    console.error('Error connecting user to Stream Chat:', error);
    return { success: false, error };
  }
};

// Create or join a channel
export const createOrJoinChannel = async (channelId: string, channelName: string, members: string[] = []) => {
  try {
    const channel = clientChat.channel('messaging', channelId, {
      name: channelName,
      members,
    });
    
    await channel.watch();
    return { success: true, channel };
  } catch (error) {
    console.error('Error creating/joining channel:', error);
    return { success: false, error };
  }
};

// Disconnect user from Stream Chat
export const disconnectUser = async () => {
  try {
    await clientChat.disconnectUser();
    return { success: true };
  } catch (error) {
    console.error('Error disconnecting user:', error);
    return { success: false, error };
  }
};