# API Reference: Age-Based Content Engine

## ContentEngine Module (`src/services/contentEngine.js`)

### Constants

#### `ageGroups`
Object containing age group definitions.
```javascript
{
  TEEN: { min: 13, max: 17, label: "Teen", icon: "👧👦" },
  YOUNG_ADULT: { min: 18, max: 21, label: "Young Adult", icon: "👩👨" },
  ADULT: { min: 22, max: 100, label: "Adult", icon: "👩‍🦰👨‍🦰" }
}
```

### Functions

#### `getAgeGroup(age: number): string`
Determines which age group a user belongs to.

**Parameters:**
- `age` (number): User's age

**Returns:**
- `"teen"` | `"young"` | `"adult"`

**Example:**
```javascript
import { getAgeGroup } from "../services/contentEngine";
const group = getAgeGroup(16); // Returns "teen"
```

---

#### `getAgeGroupInfo(ageGroup: string): object`
Gets detailed information about an age group.

**Parameters:**
- `ageGroup` (string): Age group identifier ("teen", "young", "adult")

**Returns:**
```javascript
{
  min: number,
  max: number,
  label: string,
  icon: string
}
```

**Example:**
```javascript
const info = getAgeGroupInfo("teen");
// { min: 13, max: 17, label: "Teen", icon: "👧👦" }
```

---

#### `personalizeContent(content: object, userPreferences?: object): object`
Customizes content based on user preferences.

**Parameters:**
- `content` (object): Content section (teen/young/adult)
- `userPreferences` (object, optional):
  - `interests` (string[]): User's selected interests

**Returns:**
Modified content object with:
- `recommendedTopics`: Filtered topics matching interests
- `topics`: Enhanced with difficulty and readTime

**Example:**
```javascript
const preferences = { interests: ["Relationships", "Mental Health"] };
const personalized = personalizeContent(content.teen, preferences);
```

---

#### `getRecommendedTopics(content: object, userHistory?: string[]): object[]`
Suggests relevant topics based on viewing history.

**Parameters:**
- `content` (object): Content section
- `userHistory` (string[], optional): Array of viewed topic titles

**Returns:**
- Array of topic objects (up to 3)

**Example:**
```javascript
const history = ["What is a crush?"];
const recommended = getRecommendedTopics(content.teen, history);
// Returns next 3 unwatched topics
```

---

#### `generatePersonalizedResponse(message: string, ageGroup: string, userProfile?: object): string`
Creates age-appropriate AI response to user message.

**Parameters:**
- `message` (string): User's input text
- `ageGroup` (string): User's age group ("teen", "young", "adult")
- `userProfile` (object, optional):
  - `name` (string): User's name

**Returns:**
- Personalized response string

**Response Types Selected By:**
- Keywords like "struggling", "sad", "depressed" → empathy
- Keywords like "can i", "how do", "should i" → resources
- Everything else → encouragement

**Example:**
```javascript
const message = "I'm feeling sad about my relationship";
const response = generatePersonalizedResponse(message, "young", { name: "Alex" });
```

---

## UserContext Module (`src/services/userContext.js`)

### `userService` Object

#### Methods

##### `getCurrentUser(): object | null`
Retrieves the current logged-in user.

**Returns:**
```javascript
{
  name: string,
  age: number,
  email: string,
  password: string
}
```

**Example:**
```javascript
import { userService } from "../services/userContext";
const user = userService.getCurrentUser();
```

---

##### `saveUser(userData: object): void`
Saves user profile data.

**Parameters:**
- `userData` (object): User object to save

**Example:**
```javascript
userService.saveUser({
  name: "Alex",
  age: 16,
  email: "alex@example.com",
  password: "secure123"
});
```

---

##### `getUserPreferences(): object`
Gets user preferences and settings.

**Returns:**
```javascript
{
  interests: string[],
  viewedTopics: string[],
  learningStyle: string
}
```

---

##### `saveUserPreferences(preferences: object): void`
Saves user preferences.

**Parameters:**
- `preferences` (object): Preferences object

**Example:**
```javascript
userService.saveUserPreferences({
  interests: ["Relationships", "Mental Health"],
  viewedTopics: ["What is a crush?"],
  learningStyle: "visual"
});
```

---

##### `addViewedTopic(topicTitle: string): void`
Tracks a viewed topic (auto-adds to preferences).

**Parameters:**
- `topicTitle` (string): Title of the topic

**Example:**
```javascript
userService.addViewedTopic("What is a crush?");
```

---

##### `updateInterests(interests: string[]): void`
Updates user's interest list.

**Parameters:**
- `interests` (string[]): Array of interest strings

**Example:**
```javascript
userService.updateInterests(["Relationships", "Self-Confidence"]);
```

---

##### `getViewedTopics(): string[]`
Gets all topics the user has viewed.

**Returns:**
- Array of topic titles

**Example:**
```javascript
const viewed = userService.getViewedTopics();
```

---

##### `clearUserData(): void`
Clears all user data (use on logout).

**Example:**
```javascript
userService.clearUserData();
```

---

### `chatService` Object

#### Methods

##### `getChatHistory(): object[]`
Retrieves all chat messages.

**Returns:**
```javascript
[
  {
    id: number,
    text: string,
    sender: "user" | "safespace",
    timestamp: string (ISO 8601)
  }
]
```

---

##### `addMessage(message: string, sender?: string): void`
Adds a new message to history.

**Parameters:**
- `message` (string): Message text
- `sender` (string): "user" or "safespace" (default: "user")

**Example:**
```javascript
chatService.addMessage("I'm feeling better today", "user");
chatService.addMessage("That's wonderful to hear!", "safespace");
```

---

##### `clearHistory(): void`
Removes all chat history.

**Example:**
```javascript
chatService.clearHistory();
```

---

##### `getRecentMessages(limit?: number): object[]`
Gets the most recent messages.

**Parameters:**
- `limit` (number): Number of messages to return (default: 10)

**Returns:**
- Array of message objects

**Example:**
```javascript
const recent = chatService.getRecentMessages(5);
```

---

## Component Usage

### TopicRecommendation
```javascript
import TopicRecommendation from "../components/TopicRecommendation";

<TopicRecommendation 
  content={sectionContent}
  onSelectTopic={(topic) => handleTopicSelect(topic)}
/>
```

### ProgressTracker
```javascript
import ProgressTracker from "../components/ProgressTracker";

<ProgressTracker totalTopics={section.topics.length} />
```

### AgeGroupBadge
```javascript
import AgeGroupBadge from "../components/AgeGroupBadge";

<AgeGroupBadge ageGroup="teen" />
```

---

## Error Handling

All functions gracefully handle null/undefined:
- `getAgeGroup()` defaults to "teen" if invalid age
- `getAgeGroupInfo()` returns TEEN info as default
- `userService.getCurrentUser()` returns null if no user
- `chatService.getChatHistory()` returns empty array if no history

---

## LocalStorage Keys

- `safespace_user`: User profile data
- `safespace_preferences`: User preferences
- `safespace_chat_history`: Chat messages

All data is stored as JSON strings.
