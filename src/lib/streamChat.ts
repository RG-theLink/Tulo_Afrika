import { StreamChat } from 'stream-chat';

// Stream Chat API key (public, safe for client-side)
const API_KEY = 'x9fc6pcfffpe';

// Initialize client-side Stream Chat instance (without secret)
export const clientChat = StreamChat.getInstance(API_KEY);

// Connect user to Stream Chat with token from backend
export const connectUser = async (userId: string, username: string, userType: string) => {
  try {
    // In a real application, you would fetch the token from your backend
    // For now, we'll create a mock token endpoint or handle this differently
    // const response = await fetch('/api/stream-chat-token', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId })
    // });
    // const { token } = await response.json();
    
    // Temporary: For development, you'll need to implement a backend endpoint
    // that generates the token securely using the API_SECRET
    console.warn('Token generation needs to be implemented on the backend');
    
    // For now, we'll skip the actual connection to prevent the error
    // This should be replaced with proper backend token generation
    return { success: false, error: 'Token generation not implemented' };
    
    // Once you have a backend endpoint, uncomment this:
    // await clientChat.connectUser(
    //   {
    //     id: userId,
    //     name: username,
    //     role: userType,
    //     image: `https://getstream.io/random_svg/?id=${userId}&name=${username}`,
    //   },
    //   token
    // );
    // 
    // return { success: true, token };
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