import { StreamChat } from 'stream-chat';

// Stream Chat API keys
const API_KEY = 'x9fc6pcfffpe';
const API_SECRET = 'qrruayjdhzuba9mysqwqadbdr2ky3jyvrfp69nnte5uz7dcfe76uhysbfejv34b9';

// Initialize the Stream Chat client
export const serverClient = StreamChat.getInstance(API_KEY, API_SECRET);

// Generate a token for a user
export const generateToken = (userId: string) => {
  return serverClient.createToken(userId);
};

// Initialize client-side Stream Chat instance (without secret)
export const clientChat = StreamChat.getInstance(API_KEY);

// Connect user to Stream Chat
export const connectUser = async (userId: string, username: string, userType: string) => {
  try {
    const token = generateToken(userId);
    
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