# Architecture & Data Flow Diagrams

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SafeSpace Frontend                       │
└─────────────────────────────────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
    ┌───▼────┐        ┌───▼────┐      ┌────▼────┐
    │  Pages │        │Services│      │Components
    └────────┘        └────────┘      └─────────┘
        │                 │                 │
        │          ┌──────┴──────┐         │
    ┌───┴──┐       │             │     ┌───┴──────┐
    │Login │  ┌────▼────┐   ┌───▼──┐  │TopicRec  │
    │Signup│  │Content  │   │User  │  │Progress  │
    │Learn │  │Engine   │   │Ctx   │  │AgeGroup  │
    │Talk  │  └─────────┘   └──────┘  └──────────┘
    │Dash  │
    └──────┘
        │
        ▼
    ┌────────────────────────┐
    │  LocalStorage          │
    │  ├─ user              │
    │  ├─ preferences       │
    │  └─ chat_history      │
    └────────────────────────┘
```

## Data Flow: Signup to Personalization

```
        User Signup Form
               │
               ▼
    ┌──────────────────────┐
    │  Profile Created     │
    │  • name              │
    │  • age               │
    │  • email/password    │
    └──────────────────────┘
               │
               ├─────────────────────┐
               │                     │
               ▼                     ▼
    ┌──────────────────┐   ┌──────────────────┐
    │ getAgeGroup()    │   │ saveInterests()  │
    │ • 13-17 → teen   │   │ • User selection │
    │ • 18-21 → young  │   │ • Preferences    │
    │ • 22+ → adult    │   └──────────────────┘
    └──────────────────┘
               │
               ▼
    ┌──────────────────────────┐
    │  Dashboard Loads         │
    │  - Age group content     │
    │  - Interest badges       │
    │  - Stats & progress      │
    └──────────────────────────┘
```

## Content Personalization Engine

```
                    Content Request
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
    ┌────────┐        ┌────────┐       ┌────────┐
    │Teen    │        │Young   │       │Adult   │
    │Content │        │Content │       │Content │
    └────────┘        └────────┘       └────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
              ┌──────────────────────┐
              │ personalizeContent() │
              │ ├─ Add difficulty    │
              │ ├─ Add read time     │
              │ └─ Filter interests  │
              └──────────────────────┘
                          │
                          ▼
              ┌──────────────────────┐
              │ Enriched Content     │
              │ Ready for UI         │
              └──────────────────────┘
```

## Learn Page Interaction Flow

```
    User Opens Learn Page
             │
             ▼
    ┌─────────────────────────────┐
    │ Load age-specific content   │
    │ Load user preferences       │
    │ Load viewed topics          │
    └─────────────────────────────┘
             │
             ├─────────────────┬────────────────┐
             │                 │                │
             ▼                 ▼                ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │Recommendations
    │Widget        │  │Progress      │  │Topic List    │
    │Top 3 Topics  │  │Bar Component │  │Interactive   │
    └──────────────┘  └──────────────┘  └──────────────┘
             │
             ▼
    User Clicks Topic
             │
             ▼
    ┌─────────────────────┐
    │ addViewedTopic()    │◄─ Track viewing
    │ Update progress     │
    │ Show full content   │
    └─────────────────────┘
             │
             ▼
    ┌─────────────────────┐
    │ Back Button Pressed │
    └─────────────────────┘
             │
             ▼
    ┌─────────────────────┐
    │ Progress Updated    │◄─ Bar increases
    │ Recommendations     │◄─ Changed
    │ Refreshed List      │◄─ Checkmarks
    └─────────────────────┘
```

## Talk Page Response Generation

```
    User Types Message
             │
             ▼
    ┌──────────────────────┐
    │ Message Input        │
    │ Not Empty?           │
    └──────────────────────┘
             │
             ▼
    generatePersonalizedResponse()
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
Analyze     Get Age Group
Keywords    Response Types
    │           │
    │           ├─ Empathy
    │           ├─ Encouragement
    │           └─ Resources
    │
    └─────────┬─────────┘
              │
              ▼
    ┌──────────────────────┐
    │ Select Response      │
    │ by Age Group         │
    │ and Type             │
    └──────────────────────┘
              │
              ▼
    ┌──────────────────────┐
    │ Add to Chat History  │
    │ Store Timestamp      │
    └──────────────────────┘
              │
              ▼
    Display Response
    Update Chat UI
    Clear Input
```

## User Context Management

```
LocalStorage Structure:
┌────────────────────────────────────────────┐
│         SAFESPACE_USER                     │
├────────────────────────────────────────────┤
│ {                                          │
│   name: "Alex",                            │
│   age: 16,                                 │
│   email: "alex@email.com",                 │
│   password: "hashed123"                    │
│ }                                          │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│      SAFESPACE_PREFERENCES                 │
├────────────────────────────────────────────┤
│ {                                          │
│   interests: ["Relationships", "..."],     │
│   viewedTopics: ["What is a crush?", ...],│
│   learningStyle: "visual"                  │
│ }                                          │
└────────────────────────────────────────────┘

┌────────────────────────────────────────────┐
│       SAFESPACE_CHAT_HISTORY               │
├────────────────────────────────────────────┤
│ [                                          │
│   {                                        │
│     id: 1234567890,                        │
│     text: "I'm feeling...",                │
│     sender: "user" | "safespace",          │
│     timestamp: "2026-01-13T10:30:00Z"      │
│   },                                       │
│   ...                                      │
│ ]                                          │
└────────────────────────────────────────────┘
```

## Component Hierarchy

```
┌─────────────────────────────────────────────┐
│            App Router                       │
├─────────────────────────────────────────────┤
│  ├─ /login          ─► Login Page          │
│  ├─ /signup         ─► Signup Page         │
│  │                    + AgeGroupBadge      │
│  ├─ /dashboard      ─► Dashboard           │
│  │                    + AgeGroupBadge      │
│  ├─ /learn          ─► Learn Page          │
│  │                    + AgeGroupBadge      │
│  │                    + TopicRecommendation│
│  │                    + ProgressTracker    │
│  └─ /talk           ─► Talk Page           │
│                       + AgeGroupBadge      │
└─────────────────────────────────────────────┘
```

## Service Integration Pattern

```
React Component
       │
       ├─► import { getAgeGroup }
       │        from contentEngine.js
       │
       ├─► import { userService }
       │        from userContext.js
       │
       └─► import { chatService }
                from userContext.js
            │
            ├─ userService.getCurrentUser()
            ├─ userService.getViewedTopics()
            ├─ userService.addViewedTopic()
            │
            ├─ chatService.addMessage()
            └─ chatService.getChatHistory()
                │
                ▼
            localStorage
```

## Age-Based Response Routing

```
Message Input: "I'm struggling with my emotions"
              │
              ▼
    Keyword Detection
              │
              ├─ "struggling" → Select EMPATHY
              ├─ "emotions" → Additional context
              │
              ▼
    Get User Age Group
              │
        ┌─────┼─────┐
        │     │     │
        ▼     ▼     ▼
    Teen  Young Adult
        │     │     │
        ▼     ▼     ▼
    [Teen    [Young  [Adult
     Empathy  Adult   Empathy
     Responses Empathy Responses
     Array]   Responses
              Array]    Array]
              │     │
              ▼     ▼
         Select Random
         Response
              │
              ▼
         Return to UI
         Add to History
```

## State Management Flow

```
Component State:
  ├─ section (current content)
  ├─ ageGroup (user's age category)
  ├─ expanded/selected items
  ├─ chat message & reply
  └─ user profile

External State (localStorage):
  ├─ User profile
  ├─ Preferences & interests
  ├─ Viewed topics history
  └─ Chat message history

Sync Points:
  ├─ On component mount
  ├─ On topic view
  ├─ On message send
  ├─ On logout
  └─ On page navigation
```
