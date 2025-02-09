import { UserProps, VideoCommentProps, VideoProps } from "@/types/Interfaces";


export const USER_DATA: UserProps[] = [
    {
        image: 'https://f.feridinha.com/rTd4R.png',
        name: 'Spark',
        handler: 'sprk.so',
        bio: 'Welcome to Sparks! Here you can share your videos and watch others. Use #sparks to get featured!',
        did: 'did:plc:abc123',
        followers: 2500,
        following: 300,
        likes: 5000,
        views: 1500,
    },

    // bio max 120 characters
]

export const COMMENT_DATA: VideoCommentProps[] = [];

COMMENT_DATA.push(
    {
        id: 1,
        author: USER_DATA[0],
        content:
          'Que legal! Gostei muito do seu vídeo! Continue assim! 😍',
        likes: 123,
        commentReplies: [],
    },
    {
        id: 2,
        author: USER_DATA[0],
        content: 'Hey! I really liked your video! What do you think of mine? Keep it up! I hope we can collaborate soon! 😊',
        likes: 12,
        commentReplies: [],
      },
      {
        id: 3,
        author: USER_DATA[0],
        content: 'This is a comment!',
        likes: 5,
        commentReplies: [
          COMMENT_DATA[0],
        ],
      },
);

export const VIDEO_DATA: VideoProps[] = [
  {
    id: 'dkOm2iroj3mt747sd4qqnr1',
    videoSource: 'https://video.reelo.app/sample.mp4',
    likes: { amount: 18, onLike: () => console.log('Liked video') },
    creator: USER_DATA[0],
    shares: 8,
    description: {
      content:
        'Our very first video here! What do you think? Use #sparks so we can see your videos! 💙',
      hashtags: {
        content: ['sparksapp', 'firstvideo', 'newapp', 'sparks'],
      },
    },
    comments: [
        COMMENT_DATA[0],
        COMMENT_DATA[1],
        COMMENT_DATA[2],
    ],
    isActive: false,
    duration: 75,
  },
  
];
