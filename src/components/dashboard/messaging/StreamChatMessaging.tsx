import React, { useEffect, useState } from 'react';
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  ChannelList,
} from 'stream-chat-react';
import { clientChat, connectUser, disconnectUser } from '../../../lib/streamChat';
import 'stream-chat-react/dist/css/index.css';
import { useAuth } from '../../auth/AuthContext';

interface StreamChatMessagingProps {
  userType: 'student' | 'educator' | 'admin';
}

const StreamChatMessaging: React.FC<StreamChatMessagingProps> = ({ userType }) => {
  const { user } = useAuth();
  const [chatReady, setChatReady] = useState(false);
  const [activeChannel, setActiveChannel] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeChat = async () => {
      if (!user) return;
      
      try {
        // Create a unique user ID based on the user's email or ID
        const userId = user.id.replace(/[^a-zA-Z0-9]/g, '_');
        const username = `${user.name || 'User'} (${userType})`;
        
        // Connect the user to Stream Chat
        const { success, error } = await connectUser(userId, username, userType);
        
        if (!success) {
          throw new Error(error as any);
        }
        
        // Set up filters based on user type
        let filters = {};
        if (userType === 'student') {
          filters = { type: 'messaging', members: { $in: [userId] } };
        } else if (userType === 'educator') {
          filters = { type: 'messaging' };
        } else if (userType === 'admin') {
          filters = { type: 'messaging' };
        }
        
        // Create default channels if needed
        if (userType === 'student') {
          await clientChat.channel('messaging', 'general', {
            name: 'General Discussion',
            members: [userId],
          }).create();
        }
        
        setChatReady(true);
      } catch (err) {
        console.error('Failed to initialize Stream Chat:', err);
        setError('Failed to connect to chat. Please try again later.');
      }
    };
    
    initializeChat();
    
    // Cleanup function
    return () => {
      disconnectUser();
    };
  }, [user, userType]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!chatReady) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const filters = { type: 'messaging', members: { $in: [user?.id.replace(/[^a-zA-Z0-9]/g, '_')] } };
  const sort = { last_message_at: -1 };

  return (
    <div className="h-full flex flex-col">
      <Chat client={clientChat} theme="messaging light">
        <div className="flex h-full">
          <div className="w-80 border-r border-slate-200 bg-white">
            <ChannelList
              filters={filters}
              sort={sort}
              options={{ state: true, watch: true, presence: true }}
              showChannelSearch
              onChannelSelect={(channel) => setActiveChannel(channel)}
            />
          </div>
          <div className="flex-1">
            <Channel>
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
              <Thread />
            </Channel>
          </div>
        </div>
      </Chat>
    </div>
  );
};

export default StreamChatMessaging;