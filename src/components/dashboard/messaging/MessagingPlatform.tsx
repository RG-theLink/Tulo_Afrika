import React, { useState, useRef, useEffect } from 'react';
import { Hash, Users, Settings, Plus, Search, Send, Smile, Paperclip, Phone, Video, MoreVertical, UserPlus, Volume2, VolumeX, Pin, Star, Reply, Edit3, Trash2, Download, Image, File, Mic, MicOff, PiIcon as EmojiIcon, AtSign, Bold, Italic, Code, Link as LinkIcon } from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'voice';
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  reactions?: Array<{
    emoji: string;
    users: string[];
  }>;
  isEdited?: boolean;
  replyTo?: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'text' | 'voice' | 'announcement';
  description?: string;
  memberCount: number;
  isPrivate: boolean;
  lastMessage?: Message;
  unreadCount: number;
}

interface DirectMessage {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastMessage?: Message;
  unreadCount: number;
}

interface MessagingPlatformProps {
  userType: 'student' | 'educator' | 'admin';
}

const MessagingPlatform = ({ userType }: MessagingPlatformProps) => {
  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [activeTab, setActiveTab] = useState<'channels' | 'dms'>('channels');
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMemberList, setShowMemberList] = useState(true);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [emojiCategory, setEmojiCategory] = useState<string>('smileys');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Comprehensive emoji collection organized by categories
  const emojiCategories = {
    smileys: {
      name: 'Smileys & People',
      icon: '😀',
      emojis: [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
        '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
        '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
        '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
        '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
        '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐',
        '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦',
        '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞',
        '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿',
        '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'
      ]
    },
    animals: {
      name: 'Animals & Nature',
      icon: '🐶',
      emojis: [
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
        '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
        '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
        '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕',
        '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳',
        '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛',
        '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖',
        '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈',
        '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨'
      ]
    },
    food: {
      name: 'Food & Drink',
      icon: '🍎',
      emojis: [
        '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
        '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
        '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔',
        '🍠', '🥐', '🥖', '🍞', '🥨', '🥯', '🧀', '🥚', '🍳', '🧈',
        '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '🌭', '🍔', '🍟',
        '🍕', '🫓', '🥪', '🥙', '🧆', '🌮', '🌯', '🫔', '🥗', '🥘',
        '🫕', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🦪',
        '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧',
        '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫',
        '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🫖'
      ]
    },
    activities: {
      name: 'Activities & Sports',
      icon: '⚽',
      emojis: [
        '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱',
        '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳',
        '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️',
        '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️‍♂️', '🤼‍♀️', '🤼‍♂️', '🤸‍♀️',
        '🤸‍♂️', '⛹️‍♀️', '⛹️‍♂️', '🤺', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️‍♂️', '🏇', '🧘‍♀️',
        '🧘‍♂️', '🏄‍♀️', '🏄‍♂️', '🏊‍♀️', '🏊‍♂️', '🤽‍♀️', '🤽‍♂️', '🚣‍♀️', '🚣‍♂️', '🧗‍♀️',
        '🧗‍♂️', '🚵‍♀️', '🚵‍♂️', '🚴‍♀️', '🚴‍♂️', '🏆', '🥇', '🥈', '🥉', '🏅',
        '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹‍♀️', '🤹‍♂️', '🎭', '🩰',
        '🎨', '🎬', '🎤', '🎧', '🎼', '🎵', '🎶', '🥁', '🪘', '🎹'
      ]
    },
    travel: {
      name: 'Travel & Places',
      icon: '🚗',
      emojis: [
        '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
        '🛻', '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛹', '🛼',
        '🚁', '🛸', '✈️', '🛩️', '🛫', '🛬', '🪂', '💺', '🚀', '🛰️',
        '🚊', '🚝', '🚞', '🚋', '🚃', '🚋', '🚞', '🚝', '🚄', '🚅',
        '🚈', '🚂', '🚆', '🚇', '🚉', '🚊', '🚝', '🚞', '🚋', '🚃',
        '⛵', '🛥️', '🚤', '⛴️', '🛳️', '🚢', '⚓', '⛽', '🚧', '🚨',
        '🚥', '🚦', '🛑', '🚏', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯',
        '🏟️', '🎡', '🎢', '🎠', '⛲', '⛱️', '🏖️', '🏝️', '🏜️', '🌋',
        '⛰️', '🏔️', '🗻', '🏕️', '⛺', '🛖', '🏠', '🏡', '🏘️', '🏚️',
        '🏗️', '🏭', '🏢', '🏬', '🏣', '🏤', '🏥', '🏦', '🏨', '🏪'
      ]
    },
    objects: {
      name: 'Objects & Symbols',
      icon: '⌚',
      emojis: [
        '⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️',
        '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥',
        '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️',
        '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋',
        '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🛢️', '💸', '💵', '💴',
        '💶', '💷', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒️',
        '🛠️', '⛏️', '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨',
        '🪓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '🪦', '⚱️', '🏺',
        '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '🩹', '🩺'
      ]
    },
    symbols: {
      name: 'Symbols & Flags',
      icon: '❤️',
      emojis: [
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
        '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
        '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐',
        '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐',
        '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳',
        '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️',
        '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️',
        '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️',
        '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓',
        '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️'
      ]
    }
  };

  // Mock data based on user type
  const getChannels = (): Channel[] => {
    const baseChannels = [
      {
        id: 'general',
        name: 'general',
        type: 'text' as const,
        description: 'General discussion for everyone',
        memberCount: 156,
        isPrivate: false,
        unreadCount: 3,
        lastMessage: {
          id: '1',
          userId: 'user1',
          username: 'Alex Johnson',
          avatar: '🎓',
          content: 'Hey everyone! Just finished my math assignment 📚',
          timestamp: new Date(Date.now() - 300000),
          type: 'text' as const
        }
      },
      {
        id: 'announcements',
        name: 'announcements',
        type: 'announcement' as const,
        description: 'Important announcements and updates',
        memberCount: 156,
        isPrivate: false,
        unreadCount: 1,
        lastMessage: {
          id: '2',
          userId: 'admin1',
          username: 'School Admin',
          avatar: '🏫',
          content: 'New AI tutoring features are now available!',
          timestamp: new Date(Date.now() - 3600000),
          type: 'text' as const
        }
      }
    ];

    if (userType === 'student') {
      return [
        ...baseChannels,
        {
          id: 'study-groups',
          name: 'study-groups',
          type: 'text' as const,
          description: 'Collaborate with classmates',
          memberCount: 45,
          isPrivate: false,
          unreadCount: 7,
        },
        {
          id: 'homework-help',
          name: 'homework-help',
          type: 'text' as const,
          description: 'Get help with assignments',
          memberCount: 89,
          isPrivate: false,
          unreadCount: 12,
        },
        {
          id: 'math-class',
          name: 'math-class',
          type: 'text' as const,
          description: 'Mathematics class discussions',
          memberCount: 24,
          isPrivate: true,
          unreadCount: 0,
        }
      ];
    } else if (userType === 'educator') {
      return [
        ...baseChannels,
        {
          id: 'faculty-lounge',
          name: 'faculty-lounge',
          type: 'text' as const,
          description: 'Teacher discussions and collaboration',
          memberCount: 23,
          isPrivate: true,
          unreadCount: 5,
        },
        {
          id: 'curriculum-planning',
          name: 'curriculum-planning',
          type: 'text' as const,
          description: 'Plan and discuss curriculum',
          memberCount: 15,
          isPrivate: true,
          unreadCount: 2,
        },
        {
          id: 'grade-10-math',
          name: 'grade-10-math',
          type: 'text' as const,
          description: 'Grade 10 Mathematics class',
          memberCount: 24,
          isPrivate: true,
          unreadCount: 8,
        }
      ];
    } else {
      return [
        ...baseChannels,
        {
          id: 'admin-team',
          name: 'admin-team',
          type: 'text' as const,
          description: 'Administrative team discussions',
          memberCount: 8,
          isPrivate: true,
          unreadCount: 3,
        },
        {
          id: 'reports-analytics',
          name: 'reports-analytics',
          type: 'text' as const,
          description: 'Performance reports and analytics',
          memberCount: 12,
          isPrivate: true,
          unreadCount: 1,
        }
      ];
    }
  };

  const getDirectMessages = (): DirectMessage[] => {
    if (userType === 'student') {
      return [
        {
          id: 'dm1',
          userId: 'teacher1',
          username: 'Dr. Sarah Wilson',
          avatar: '👨‍🏫',
          status: 'online',
          unreadCount: 2,
          lastMessage: {
            id: '3',
            userId: 'teacher1',
            username: 'Dr. Sarah Wilson',
            avatar: '👨‍🏫',
            content: 'Great work on your latest assignment!',
            timestamp: new Date(Date.now() - 1800000),
            type: 'text'
          }
        },
        {
          id: 'dm2',
          userId: 'student2',
          username: 'Emma Davis',
          avatar: '👩‍🎓',
          status: 'away',
          unreadCount: 0,
        },
        {
          id: 'dm3',
          userId: 'student3',
          username: 'Mike Chen',
          avatar: '👨‍🎓',
          status: 'offline',
          unreadCount: 1,
        }
      ];
    } else if (userType === 'educator') {
      return [
        {
          id: 'dm1',
          userId: 'student1',
          username: 'Alex Johnson',
          avatar: '🎓',
          status: 'online',
          unreadCount: 1,
        },
        {
          id: 'dm2',
          userId: 'teacher2',
          username: 'Prof. Martinez',
          avatar: '👨‍🏫',
          status: 'busy',
          unreadCount: 0,
        },
        {
          id: 'dm3',
          userId: 'parent1',
          username: 'Mrs. Johnson',
          avatar: '👩',
          status: 'offline',
          unreadCount: 3,
        }
      ];
    } else {
      return [
        {
          id: 'dm1',
          userId: 'teacher1',
          username: 'Dr. Sarah Wilson',
          avatar: '👨‍🏫',
          status: 'online',
          unreadCount: 0,
        },
        {
          id: 'dm2',
          userId: 'admin2',
          username: 'IT Director',
          avatar: '💻',
          status: 'away',
          unreadCount: 2,
        }
      ];
    }
  };

  const getMessages = (): Message[] => {
    return [
      {
        id: '1',
        userId: 'user1',
        username: 'Alex Johnson',
        avatar: '🎓',
        content: 'Hey everyone! Just finished my math assignment 📚',
        timestamp: new Date(Date.now() - 300000),
        type: 'text',
        reactions: [
          { emoji: '👍', users: ['user2', 'user3'] },
          { emoji: '🎉', users: ['user4'] }
        ]
      },
      {
        id: '2',
        userId: 'user2',
        username: 'Emma Davis',
        avatar: '👩‍🎓',
        content: 'That\'s awesome! How did you find the quadratic equations section?',
        timestamp: new Date(Date.now() - 240000),
        type: 'text'
      },
      {
        id: '3',
        userId: 'teacher1',
        username: 'Dr. Sarah Wilson',
        avatar: '👨‍🏫',
        content: 'Great to see you all engaging with the material! Remember, the quiz is tomorrow.',
        timestamp: new Date(Date.now() - 180000),
        type: 'text',
        reactions: [
          { emoji: '📝', users: ['user1', 'user2', 'user3', 'user4'] }
        ]
      },
      {
        id: '4',
        userId: 'user3',
        username: 'Mike Chen',
        avatar: '👨‍🎓',
        content: 'I uploaded my notes from today\'s lesson',
        timestamp: new Date(Date.now() - 120000),
        type: 'text',
        attachments: [
          {
            id: 'att1',
            name: 'Math_Notes_Chapter_5.pdf',
            url: '#',
            type: 'application/pdf',
            size: 2048576
          }
        ]
      },
      {
        id: '5',
        userId: 'user1',
        username: 'Alex Johnson',
        avatar: '🎓',
        content: 'Thanks Mike! That\'s really helpful 🙏',
        timestamp: new Date(Date.now() - 60000),
        type: 'text',
        replyTo: '4'
      }
    ];
  };

  const channels = getChannels();
  const directMessages = getDirectMessages();
  const messages = getMessages();

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', messageInput);
      setMessageInput('');
      setReplyingTo(null);
      
      // Auto-resize textarea back to original size
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const handleReaction = (messageId: string, emoji: string) => {
    console.log('Adding reaction:', emoji, 'to message:', messageId);
  };

  const handleReply = (message: Message) => {
    setReplyingTo(message);
    textareaRef.current?.focus();
  };

  const handleFileUpload = () => {
    console.log('File upload clicked');
    // Implement file upload logic
  };

  const handleVoiceCall = () => {
    console.log('Voice call initiated');
    // Implement voice call logic
  };

  const handleVideoCall = () => {
    console.log('Video call initiated');
    // Implement video call logic
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
    // Don't close the picker immediately, let users select multiple emojis
    textareaRef.current?.focus();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const currentChannel = channels.find(c => c.id === activeChannel);

  return (
    <div className="flex h-full bg-slate-900">
      {/* Sidebar */}
      <div className="w-80 bg-slate-800 flex flex-col">
        {/* Server Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-semibold text-lg">
              {userType === 'student' && '🎓 Student Hub'}
              {userType === 'educator' && '👨‍🏫 Faculty Hub'}
              {userType === 'admin' && '🏫 Admin Hub'}
            </h2>
            <button 
              onClick={() => console.log('Settings clicked')}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-700 bg-slate-800">
          <button
            onClick={() => setActiveTab('channels')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'channels'
                ? 'text-white bg-slate-700 border-b-2 border-teal-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Hash className="h-4 w-4 inline mr-2" />
            Channels
          </button>
          <button
            onClick={() => setActiveTab('dms')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'dms'
                ? 'text-white bg-slate-700 border-b-2 border-teal-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Messages
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-slate-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-9 pr-4 py-2 bg-slate-700 text-white placeholder-slate-400 rounded-lg border-0 focus:ring-2 focus:ring-teal-500 transition-all"
            />
          </div>
        </div>

        {/* Channel/DM List */}
        <div className="flex-1 overflow-y-auto bg-slate-800">
          {activeTab === 'channels' ? (
            <div className="px-4">
              <div className="flex items-center justify-between py-3 px-2">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
                  Text Channels
                </span>
                <button 
                  onClick={() => console.log('Add channel clicked')}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 transition-all ${
                    activeChannel === channel.id
                      ? 'bg-slate-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {channel.type === 'text' && <Hash className="h-4 w-4" />}
                    {channel.type === 'voice' && <Volume2 className="h-4 w-4" />}
                    {channel.type === 'announcement' && <Pin className="h-4 w-4" />}
                    <span className="text-sm font-medium">{channel.name}</span>
                    {channel.isPrivate && (
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    )}
                  </div>
                  {channel.unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {channel.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4">
              <div className="flex items-center justify-between py-3 px-2">
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
                  Direct Messages
                </span>
                <button 
                  onClick={() => console.log('Add DM clicked')}
                  className="text-slate-400 hover:text-white transition-colors p-1 rounded hover:bg-slate-700"
                >
                  <UserPlus className="h-4 w-4" />
                </button>
              </div>
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  onClick={() => console.log('DM clicked:', dm.username)}
                  className="w-full flex items-center justify-between p-3 rounded-lg mb-1 text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-sm">{dm.avatar}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${
                        dm.status === 'online' ? 'bg-green-500' :
                        dm.status === 'away' ? 'bg-yellow-500' :
                        dm.status === 'busy' ? 'bg-red-500' : 'bg-slate-500'
                      }`}></div>
                    </div>
                    <span className="text-sm font-medium">{dm.username}</span>
                  </div>
                  {dm.unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {dm.unreadCount}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Status */}
        <div className="p-4 border-t border-slate-700 bg-slate-800">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-sm">
                  {userType === 'student' && '🎓'}
                  {userType === 'educator' && '👨‍🏫'}
                  {userType === 'admin' && '🏫'}
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-800"></div>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">
                {userType === 'student' && 'Alex Johnson'}
                {userType === 'educator' && 'Dr. Sarah Wilson'}
                {userType === 'admin' && 'Michael Chen'}
              </div>
              <div className="text-slate-400 text-xs">Online</div>
            </div>
            <div className="flex space-x-1">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-lg transition-colors ${
                  isMuted ? 'text-red-400 bg-red-900/20' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button 
                onClick={() => console.log('User settings clicked')}
                className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-700"
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Hash className="h-6 w-6 text-slate-600" />
              <div>
                <h3 className="font-semibold text-slate-800 text-lg">
                  {currentChannel?.name || 'general'}
                </h3>
                {currentChannel?.description && (
                  <p className="text-sm text-slate-500">{currentChannel.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleVoiceCall}
                className="p-3 text-slate-600 hover:text-white hover:bg-green-500 rounded-lg transition-all"
                title="Start voice call"
              >
                <Phone className="h-5 w-5" />
              </button>
              <button 
                onClick={handleVideoCall}
                className="p-3 text-slate-600 hover:text-white hover:bg-blue-500 rounded-lg transition-all"
                title="Start video call"
              >
                <Video className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowMemberList(!showMemberList)}
                className={`p-3 rounded-lg transition-all ${
                  showMemberList 
                    ? 'text-white bg-teal-500' 
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                }`}
                title="Toggle member list"
              >
                <Users className="h-5 w-5" />
              </button>
              <button 
                onClick={() => console.log('More options clicked')}
                className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((message, index) => {
            const showAvatar = index === 0 || messages[index - 1].userId !== message.userId;
            const isConsecutive = index > 0 && messages[index - 1].userId === message.userId;
            
            return (
              <div key={message.id} className={`group ${isConsecutive ? 'mt-1' : 'mt-6'}`}>
                <div className="flex items-start space-x-4">
                  {showAvatar ? (
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-lg">{message.avatar}</span>
                    </div>
                  ) : (
                    <div className="w-10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    {showAvatar && (
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-slate-800">{message.username}</span>
                        <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                        {message.isEdited && (
                          <span className="text-xs text-slate-400">(edited)</span>
                        )}
                      </div>
                    )}
                    
                    {message.replyTo && (
                      <div className="mb-3 pl-4 border-l-4 border-teal-400 bg-white rounded-r-lg p-3 shadow-sm">
                        <div className="text-xs text-slate-500 mb-1 flex items-center space-x-1">
                          <Reply className="h-3 w-3" />
                          <span>Replying to {messages.find(m => m.id === message.replyTo)?.username}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          {messages.find(m => m.id === message.replyTo)?.content}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-slate-700 leading-relaxed bg-white rounded-lg p-3 shadow-sm">
                      {message.content}
                    </div>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.attachments.map((attachment) => (
                          <div key={attachment.id} className="bg-white rounded-lg p-4 flex items-center space-x-3 max-w-md shadow-sm border border-slate-200">
                            <div className="bg-slate-100 p-3 rounded-lg">
                              {attachment.type.startsWith('image/') ? (
                                <Image className="h-6 w-6 text-slate-600" />
                              ) : (
                                <File className="h-6 w-6 text-slate-600" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-slate-800 truncate">
                                {attachment.name}
                              </div>
                              <div className="text-xs text-slate-500">
                                {formatFileSize(attachment.size)}
                              </div>
                            </div>
                            <button 
                              onClick={() => console.log('Download:', attachment.name)}
                              className="text-slate-600 hover:text-teal-600 transition-colors p-2 rounded-lg hover:bg-slate-100"
                            >
                              <Download className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.reactions.map((reaction, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleReaction(message.id, reaction.emoji)}
                            className="bg-white hover:bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-sm flex items-center space-x-1 transition-all hover:shadow-md"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-xs text-slate-600 font-medium">{reaction.users.length}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Message Actions */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                    <button 
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all shadow-sm"
                      title="Add reaction"
                    >
                      <Smile className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleReply(message)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all shadow-sm"
                      title="Reply"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => console.log('More actions for message:', message.id)}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all shadow-sm"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Typing Indicator */}
        {isTyping && (
          <div className="px-6 py-2 bg-slate-50">
            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Someone is typing...</span>
            </div>
          </div>
        )}

        {/* Reply Preview */}
        {replyingTo && (
          <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm">
                <Reply className="h-4 w-4 text-blue-600" />
                <span className="text-blue-600">Replying to</span>
                <span className="font-medium text-blue-800">{replyingTo.username}</span>
                <span className="text-slate-600 truncate max-w-xs">{replyingTo.content}</span>
              </div>
              <button 
                onClick={() => setReplyingTo(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="p-6 border-t border-slate-200 bg-white">
          <div className="bg-slate-100 rounded-2xl p-4 shadow-inner">
            {/* Formatting Toolbar */}
            <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-slate-200">
              <button 
                onClick={() => console.log('Bold clicked')}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-all"
                title="Bold"
              >
                <Bold className="h-4 w-4" />
              </button>
              <button 
                onClick={() => console.log('Italic clicked')}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-all"
                title="Italic"
              >
                <Italic className="h-4 w-4" />
              </button>
              <button 
                onClick={() => console.log('Code clicked')}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-all"
                title="Code"
              >
                <Code className="h-4 w-4" />
              </button>
              <button 
                onClick={() => console.log('Link clicked')}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-all"
                title="Add link"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
              <button 
                onClick={() => console.log('Mention clicked')}
                className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-all"
                title="Mention someone"
              >
                <AtSign className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-end space-x-3">
              <button 
                onClick={handleFileUpload}
                className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-all"
                title="Attach file"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={messageInput}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message #${currentChannel?.name || 'general'}`}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-slate-800 placeholder-slate-500 transition-all"
                  rows={1}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="p-3 text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-all"
                  title="Add emoji"
                >
                  <Smile className="h-5 w-5" />
                </button>
                <button 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="p-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  title="Send message"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Enhanced Emoji Picker */}
            {showEmojiPicker && (
              <div className="mt-3 bg-white rounded-xl border border-slate-200 shadow-xl max-h-80 overflow-hidden">
                {/* Emoji Category Tabs */}
                <div className="flex border-b border-slate-200 bg-slate-50">
                  {Object.entries(emojiCategories).map(([categoryKey, category]) => (
                    <button
                      key={categoryKey}
                      onClick={() => setEmojiCategory(categoryKey)}
                      className={`flex-1 p-3 text-center transition-all ${
                        emojiCategory === categoryKey
                          ? 'bg-teal-500 text-white'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                      title={category.name}
                    >
                      <span className="text-lg">{category.icon}</span>
                    </button>
                  ))}
                </div>

                {/* Emoji Grid */}
                <div className="p-4 max-h-64 overflow-y-auto">
                  <h4 className="text-sm font-medium text-slate-700 mb-3">
                    {emojiCategories[emojiCategory as keyof typeof emojiCategories].name}
                  </h4>
                  <div className="grid grid-cols-8 gap-2">
                    {emojiCategories[emojiCategory as keyof typeof emojiCategories].emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-xl hover:scale-110 transform duration-150"
                        title={emoji}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Close Button */}
                <div className="p-3 border-t border-slate-200 bg-slate-50 text-center">
                  <button
                    onClick={() => setShowEmojiPicker(false)}
                    className="text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    Close Emoji Picker
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Member List */}
      {showMemberList && (
        <div className="w-64 bg-slate-50 border-l border-slate-200 p-4">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              Members — {currentChannel?.memberCount || 0}
            </h3>
            
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Online — 12
              </div>
              
              {/* Online Members */}
              {[
                { name: 'Dr. Sarah Wilson', avatar: '👨‍🏫', role: 'Teacher', status: 'online' },
                { name: 'Alex Johnson', avatar: '🎓', role: 'Student', status: 'online' },
                { name: 'Emma Davis', avatar: '👩‍🎓', role: 'Student', status: 'online' },
                { name: 'Mike Chen', avatar: '👨‍🎓', role: 'Student', status: 'online' }
              ].map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">{member.avatar}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-50"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-800 truncate">{member.name}</div>
                    <div className="text-xs text-slate-500">{member.role}</div>
                  </div>
                </div>
              ))}
              
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 mt-4">
                Offline — 8
              </div>
              
              {/* Offline Members */}
              {[
                { name: 'Lisa Park', avatar: '👩‍🎓', role: 'Student' },
                { name: 'James Wilson', avatar: '👨‍🎓', role: 'Student' }
              ].map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer opacity-60">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
                      <span className="text-sm">{member.avatar}</span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-slate-400 rounded-full border-2 border-slate-50"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-600 truncate">{member.name}</div>
                    <div className="text-xs text-slate-500">{member.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingPlatform;