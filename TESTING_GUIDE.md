# Testing Guide: Age-Based Content Engine & Personalized Features

## Test Scenarios

### 1. Age Group Assignment
**Objective**: Verify correct age group categorization

#### Test Case 1.1: Teen User (13-17)
- Create account with age: **15**
- Expected: Content shows "Understanding Yourself (Ages 15–17)"
- Expected: Topics include crush, emotions, boundaries, confidence
- Expected: Badge shows "👧👦 Teen Content"

#### Test Case 1.2: Young Adult (18-21)
- Create account with age: **19**
- Expected: Content shows "Dating & Emotional Health (Ages 18–21)"
- Expected: Topics include healthy dating, communication, heartbreak
- Expected: Badge shows "👩👨 Young Adult Content"

#### Test Case 1.3: Adult (22+)
- Create account with age: **24**
- Expected: Content shows "Relationships & Emotional Connection (Ages 22–25)"
- Expected: Topics include trust, conflict, emotional safety, growth
- Expected: Badge shows "👩‍🦰👨‍🦰 Adult Content"

---

### 2. Interest Selection
**Objective**: Verify interest tracking and display

#### Test Case 2.1: With Interests
- Signup with interests: ["Relationships", "Mental Health", "Communication"]
- Expected: Dashboard shows 3 interests as green badges
- Expected: Stats card shows "3 Interests"
- Expected: Learn page prioritizes these topics in recommendations

#### Test Case 2.2: Without Interests
- Signup without selecting any interests
- Expected: Dashboard doesn't show interests section
- Expected: Stats card shows "0 Interests"
- Expected: All topics shown equally in recommendations

---

### 3. Learn Page Features
**Objective**: Test interactive learning functionality

#### Test Case 3.1: Topic Interaction
1. Click first topic in list
2. Expected: 
   - Topic expands to full view
   - Back button appears
   - Reading time shown
   - Difficulty level shown
   - Full text displayed

#### Test Case 3.2: Progress Tracking
1. View first topic
2. Return to list
3. Expected:
   - Topic shows ✅ checkmark
   - Progress bar increases
   - "Recent Conversation" section updates

#### Test Case 3.3: Recommendations
1. View 2-3 topics
2. Expected:
   - Recommendation section updates
   - Shows unviewed topics only
   - Displays reading time

#### Test Case 3.4: Progress Bar
1. View all topics in section
2. Expected:
   - Progress bar reaches 100%
   - Text shows "Keep learning! You're making great progress."

---

### 4. Talk Page Features
**Objective**: Test personalized responses

#### Test Case 4.1: Teen User - Emotional Message
**Age**: 15, **Message**: "I'm feeling really sad and alone"
- Expected:
  - Response includes empathy
  - Tone is supportive and validating
  - Mentions "not alone" concept
  - Message stored in chat history

#### Test Case 4.2: Young Adult - Advice Request
**Age**: 19, **Message**: "How do I know if a relationship is healthy?"
- Expected:
  - Response type is "resources"
  - Includes practical guidance
  - Mentions communication
  - Appropriate for early 20s mindset

#### Test Case 4.3: Adult - Problem Statement
**Age**: 25, **Message**: "My partner and I are struggling to communicate"
- Expected:
  - Response is mature and thoughtful
  - Mentions professional support
  - Encourages reflection
  - Professional tone

#### Test Case 4.4: Chat History
1. Send 3+ messages in talk page
2. Expected:
  - All messages appear in "Recent Conversation"
  - User messages appear on right in purple
  - SafeSpace messages appear on left in green
  - Timestamps visible
  - Scrollable if more than 10 messages

---

### 5. Dashboard Features
**Objective**: Verify personalized dashboard display

#### Test Case 5.1: User Greeting
- Login with username "Alex"
- Expected: Header shows "Welcome, Alex! 💙"
- Expected: Age group badge visible

#### Test Case 5.2: Statistics Display
1. Create account
2. View 2 topics
3. Send 4 messages in talk
4. Expected:
   - Topics Learned: 2
   - Conversations: 2 (4 messages ÷ 2)
   - Interests: [count of selected]

#### Test Case 5.3: Navigation
- Click "Explore Learning" button
- Expected: Navigate to /learn page
- Click "Talk to SafeSpace" button
- Expected: Navigate to /talk page
- Click "Log Out" button
- Expected: Navigate to /login with data cleared

---

### 6. Signup Flow
**Objective**: Test account creation with personalization

#### Test Case 6.1: Complete Signup
- Enter: Name, Age, Email, Password
- Select 3 interests
- Expected:
  - Account created
  - Data saved to localStorage
  - Navigate to dashboard
  - Dashboard shows selected interests

#### Test Case 6.2: Interest Toggle
- Click interest button multiple times
- Expected:
  - Button toggles on/off visually
  - Border color changes to blue when selected
  - Background turns light purple when selected

---

### 7. Login Flow
**Objective**: Test authentication

#### Test Case 7.1: Successful Login
- Signup with email: test@example.com, password: test123
- Logout
- Login with same credentials
- Expected:
  - Dashboard loads with user data
  - Previous interests/topics restored

#### Test Case 7.2: Failed Login
- Try login with wrong password
- Expected:
  - Error message: "Invalid email or password"
  - Remains on login page
  - Email field retains value

#### Test Case 7.3: New User Link
- Click "Sign Up Here" on login page
- Expected: Navigate to signup page

---

### 8. Data Persistence
**Objective**: Verify localStorage functionality

#### Test Case 8.1: Cross-Session Data
1. Create account, view topics, send messages
2. Refresh page (F5)
3. Login again
4. Expected:
   - All data persists
   - Progress bar shows previous progress
   - Chat history visible

#### Test Case 8.2: Logout Clears Data
1. Logout from dashboard
2. Inspect localStorage
3. Expected:
   - `safespace_user` cleared
   - `safespace_preferences` cleared
   - `safespace_chat_history` cleared

---

### 9. UI/UX Testing
**Objective**: Verify visual design and interactions

#### Test Case 9.1: Responsive Design
- View on different screen sizes (mobile, tablet, desktop)
- Expected:
  - Content remains readable
  - Buttons accessible
  - Cards stack properly on mobile

#### Test Case 9.2: Hover Effects
- Hover over buttons
- Expected:
  - Buttons move up (translateY)
  - Shadow appears
  - Color transitions smoothly

#### Test Case 9.3: Loading States
- Send message in Talk page
- Expected:
  - Button shows "Thinking..."
  - Input disabled during processing
  - Button disabled state styling

---

### 10. Edge Cases
**Objective**: Test boundary conditions

#### Test Case 10.1: Age Boundaries
- Age 13 (minimum teen): Should show teen content
- Age 17 (maximum teen): Should show teen content
- Age 18 (minimum young): Should show young adult content
- Age 21 (maximum young): Should show young adult content
- Age 22 (minimum adult): Should show adult content

#### Test Case 10.2: Empty Input
- Send empty message
- Expected: Nothing sent, button disabled until text entered

#### Test Case 10.3: Long Messages
- Send very long message (1000+ characters)
- Expected: Message displays correctly, doesn't break layout

#### Test Case 10.4: Special Characters
- Send message with emojis, special characters
- Expected: Displays correctly in chat

---

## Manual Test Checklist

```
[ ] Age 15 signup → Teen content loads
[ ] Age 19 signup → Young adult content loads
[ ] Age 24 signup → Adult content loads
[ ] Interest selection → Dashboard shows interests
[ ] Topic clicking → Expands to full view
[ ] Progress bar → Updates with viewed topics
[ ] Chat sending → Message appears in history
[ ] Age-specific responses → Appropriate for age
[ ] Dashboard stats → Accurate counts
[ ] Logout clears data → localStorage empty
[ ] Login persists data → Data returns after refresh
[ ] Responsive design → Works on mobile/tablet
[ ] Button hover effects → Visual feedback works
[ ] Long messages → Don't break layout
[ ] Special characters → Display correctly
[ ] Empty send → Button disabled
```

---

## Browser DevTools Testing

### Check LocalStorage
```javascript
// Open browser console
console.log(JSON.parse(localStorage.getItem("safespace_user")));
console.log(JSON.parse(localStorage.getItem("safespace_preferences")));
console.log(JSON.parse(localStorage.getItem("safespace_chat_history")));
```

### Test Age Mapping
```javascript
import { getAgeGroup } from "./src/services/contentEngine";
console.log(getAgeGroup(15)); // Should return "teen"
console.log(getAgeGroup(19)); // Should return "young"
console.log(getAgeGroup(24)); // Should return "adult"
```

### Test Response Generation
```javascript
import { generatePersonalizedResponse } from "./src/services/contentEngine";
const resp = generatePersonalizedResponse("I'm sad", "teen");
console.log(resp); // Should show teen-appropriate response
```

---

## Performance Testing

- Page load time: Should be < 2 seconds
- Message response time: Should be < 1 second
- Topic switching: Should be instant
- Progress calculation: Should be < 100ms

---

## Accessibility Testing

- [ ] All text readable (WCAG AA contrast)
- [ ] Buttons have proper focus states
- [ ] Form labels present
- [ ] Keyboard navigation works
- [ ] Color not only differentiator
- [ ] Emoji used for context, not sole indicator
