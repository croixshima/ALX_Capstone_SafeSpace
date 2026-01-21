# SafeSpace - Age-Based Content Engine & Personalized Features

## 🎯 Features Added

### 1. **Age-Based Content Engine** (`contentEngine.js`)
- **Age Grouping System**: Automatically categorizes users into three groups:
  - **Teen** (13-17): Age-appropriate emotional guidance
  - **Young Adult** (18-21): Dating and relationship focus
  - **Adult** (22+): Deeper relationship and emotional connection topics

- **Content Personalization**: 
  - Topics include difficulty levels (beginner/intermediate)
  - Estimated reading times for each topic
  - Age-specific language and examples

### 2. **Personalized Learn Page** (`learn.jsx`)
- **Interactive Topic Exploration**:
  - Click to expand and read full topic content
  - Visual progress tracker showing learning completion
  - Recommended topics based on viewing history
  
- **Learning Features**:
  - Track viewed topics with checkmarks
  - Difficulty badges for progressive learning
  - Reading time estimates
  - Expandable topic cards with detailed content

- **User Stats**:
  - Topics completed counter
  - Learning progress bar
  - Personalized recommendations section

### 3. **Enhanced Talk Page** (`talk.jsx`)
- **Age-Appropriate Responses**:
  - Different response types for each age group
  - Responses vary based on message content (empathy, encouragement, resources)
  - Warm, supportive tone tailored to age group

- **Chat History**:
  - Display recent conversations
  - Message timestamps
  - Visual distinction between user and SafeSpace messages
  - Store up to 10 recent messages

- **Resource Tips**:
  - Reminders about emotional validity
  - Encouragement to seek professional help when needed
  - Community support messaging

### 4. **User Context & Preferences Service** (`userContext.js`)
- **User Data Management**:
  - Store user profile information
  - Save and retrieve user preferences
  - Track viewed topics/learning history

- **Chat Service**:
  - Store chat history with timestamps
  - Retrieve recent conversations
  - Message persistence in localStorage

### 5. **Component Library**

#### **TopicRecommendation.jsx**
- Displays recommended topics based on viewing history
- Visual gradient cards
- Click to view full topic content

#### **ProgressTracker.jsx**
- Shows visual progress bar
- Calculates percentage of topics completed
- Motivational messaging

#### **AgeGroupBadge.jsx**
- Visual indicator of age group
- Icon and label display
- Consistent styling across app

### 6. **Enhanced Signup Page** (`signup.jsx`)
- **Interest Selection**:
  - 8 pre-defined interest categories
  - Multi-select toggle buttons
  - Optional but recommended for personalization
  - Interests include: Relationships, Mental Health, Self-Confidence, Communication, Boundaries, Self-Care, Emotions, Friendship

- **Improved UI**:
  - Better form styling
  - Visual feedback on button hover
  - Gradient background for submit button

### 7. **Enhanced Dashboard** (`dashboard.jsx`)
- **Personalized Welcome**:
  - User greeting with name
  - Age group badge display
  - Current stage-appropriate content title

- **Statistics Cards**:
  - Topics Learned counter
  - Conversations counter
  - Interests tracked

- **Interest Display**:
  - Shows selected interests as tagged badges
  - Only displays if interests were selected

- **Improved Navigation**:
  - Gradient buttons with hover effects
  - Quick access to Learn and Talk features
  - Better structured layout

### 8. **Enhanced Login Page** (`login.jsx`)
- **Improved UI/UX**:
  - Full-screen gradient background
  - Centered white card layout
  - Modern input styling
  - Focus states for better UX

- **Better Feedback**:
  - Loading state during login
  - Disabled state for buttons/inputs
  - Error message styling

- **Sign-up Navigation**:
  - Easy link to create new account
  - Visual button with gradient effects

## 🔄 Data Flow

```
Signup → User Profile + Interests → Dashboard
  ↓
  ├→ Learn (age-based content) → Track topics viewed
  ├→ Talk (age-appropriate responses) → Chat history
  └→ Personalization engine uses: Age + Interests + History
```

## 💾 Local Storage Structure

```javascript
{
  "safespace_user": {
    name: "John",
    age: 16,
    email: "john@example.com",
    password: "password123"
  },
  "safespace_preferences": {
    interests: ["Relationships", "Mental Health"],
    viewedTopics: ["What is a crush?", "Why do my emotions feel so intense?"],
    learningStyle: "visual"
  },
  "safespace_chat_history": [
    {
      id: 1234567890,
      text: "I'm feeling overwhelmed",
      sender: "user",
      timestamp: "2026-01-13T10:30:00.000Z"
    }
  ]
}
```

## 🎨 Design Features

- **Gradient Color Scheme**: Purple (#667eea) to darker purple (#764ba2)
- **Accent Colors**: Green (#4caf50) for success states
- **Responsive Grid Layout**: Cards and content adapt to screen size
- **Hover Effects**: Smooth transitions and shadow effects
- **Accessibility**: Clear visual hierarchy and readable fonts

## 🚀 Usage Example

1. **User signs up** with age and interests
2. **Dashboard shows** personalized content based on age group
3. **Learn page displays** age-appropriate topics with progress tracking
4. **Talk page provides** tailored responses based on age group
5. **All interactions** are tracked and used for future personalization

## 📊 Age Group Content

### Teen (13-17)
- Understanding emotions and crushes
- Personal boundaries
- Self-confidence building
- Emotional validation

### Young Adult (18-21)
- Healthy dating patterns
- Communication skills
- Dealing with heartbreak
- Peer pressure and self-respect

### Adult (22+)
- Building trust in relationships
- Conflict resolution
- Emotional safety
- Growing together with partner

## 🔐 Privacy & Safety

- All data stored locally in browser
- No external API calls for personal data
- User can clear data at logout
- Supportive, non-judgmental approach
- Resources for professional help included
