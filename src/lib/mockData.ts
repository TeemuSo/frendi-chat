
import { Conversation, IngestedData } from './types';

export const mockConversations: Conversation[] = [
  {
    id: '1',
    title: 'Project Planning',
    messages: [
      {
        id: '1-1',
        content: 'How should I organize my new web application project?',
        role: 'user',
        timestamp: new Date('2023-07-15T10:30:00')
      },
      {
        id: '1-2',
        content: 'For a new web application, I recommend starting with a clear project structure. Consider using a modern framework like React with a well-defined folder organization. Separate your components, services, utilities, and assets. Implement a state management solution early on, and set up a consistent styling approach.',
        role: 'assistant',
        timestamp: new Date('2023-07-15T10:31:00')
      }
    ],
    lastUpdated: new Date('2023-07-15T10:31:00')
  },
  {
    id: '2',
    title: 'Machine Learning Resources',
    messages: [
      {
        id: '2-1',
        content: 'Can you recommend some resources to learn machine learning?',
        role: 'user',
        timestamp: new Date('2023-07-14T15:45:00')
      },
      {
        id: '2-2',
        content: 'For learning machine learning, I suggest starting with Andrew Ng\'s Machine Learning course on Coursera. For more practical applications, "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow" by Aurélien Géron is excellent. Additionally, Fast.ai offers a top-down practical approach that many find helpful.',
        role: 'assistant',
        timestamp: new Date('2023-07-14T15:46:00')
      }
    ],
    lastUpdated: new Date('2023-07-14T15:46:00')
  },
  {
    id: '3',
    title: 'Cooking Tips',
    messages: [
      {
        id: '3-1',
        content: 'What are some tips for cooking pasta perfectly?',
        role: 'user',
        timestamp: new Date('2023-07-13T18:20:00')
      },
      {
        id: '3-2',
        content: 'For perfect pasta: Use a large pot with plenty of water, add enough salt (the water should taste like seawater), bring to a rolling boil before adding pasta, stir occasionally to prevent sticking, and test a minute before the package suggests for al dente texture. Reserve some pasta water before draining to help sauce adhere to the pasta.',
        role: 'assistant',
        timestamp: new Date('2023-07-13T18:21:00')
      }
    ],
    lastUpdated: new Date('2023-07-13T18:21:00')
  }
];

export const mockIngestedData: IngestedData[] = [
  {
    id: '1',
    title: 'Meeting Notes - Q2 Review',
    content: 'In our Q2 review, we discussed the progress of our main projects. The mobile app is on track for an August release, while the web platform needs additional resources. Customer satisfaction has improved by 12% since implementing the new support system.',
    type: 'text',
    timestamp: new Date('2023-06-30T14:00:00')
  },
  {
    id: '2',
    title: 'Research Paper - AI Ethics',
    content: 'This paper examines the ethical implications of advanced AI systems in decision-making processes. Key areas of concern include transparency, accountability, and potential biases in algorithmic decision-making.',
    type: 'file',
    timestamp: new Date('2023-06-28T09:15:00')
  },
  {
    id: '3',
    title: 'Product Roadmap 2023',
    content: 'Our product roadmap for 2023 focuses on three key areas: enhancing user experience through interface improvements, expanding our data analysis capabilities, and introducing collaborative features for team environments.',
    type: 'file',
    timestamp: new Date('2023-06-25T11:30:00')
  }
];

// Function to create a new empty conversation
export const createNewConversation = (): Conversation => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    title: 'New Conversation',
    messages: [],
    lastUpdated: new Date()
  };
};

// Function to generate a response (mock AI)
export const generateResponse = (message: string): string => {
  // Simple mock responses
  const responses = [
    "I understand your question. Based on the information I have, I'd suggest considering multiple approaches to solve this problem.",
    "That's an interesting point. From what I know, there are several factors to consider in this situation.",
    "Thanks for providing that information. I've analyzed it and can offer some insights based on my knowledge.",
    "I've processed your request. Here's what I can tell you based on the data available to me.",
    "According to the information I have, there are several ways to approach what you're asking about."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
