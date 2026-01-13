# Quick Start Guide: Age-Based Content Engine

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- React and React Router already set up
- Modern web browser

### Installation

1. **Ensure all new files are in place:**
   ```
   src/
   ├── services/
   │   ├── contentEngine.js (NEW)
   │   ├── userContext.js (NEW)
   │   └── content.jsx (existing)
   ├── components/
   │   ├── TopicRecommendation.jsx (NEW)
   │   ├── ProgressTracker.jsx (NEW)
   │   └── AgeGroupBadge.jsx (NEW)
   ├── pages/
   │   ├── login.jsx (updated)
   │   ├── signup.jsx (updated)
   │   ├── dashboard.jsx (updated)
   │   ├── learn.jsx (updated)
   │   └── talk.jsx (updated)
   └── App.jsx (no changes needed)
   ```

2. **Run your development server:**
   ```bash
   npm run dev
   ```

---

## 📝 First Test Run

### Step 1: Create an Account
1. Navigate to `/signup`
2. Fill in the form:
   - **Name**: Your name
   - **Age**: Try `16` for teen content
   - **Email**: Any email
   - **Password**: Any password
3. Select some interests (optional but recommended)
4. Click "Create Account"

### Step 2: View Dashboard
- You should see personalized content based on age
- Check stats for Topics, Conversations, Interests
- Notice the age group badge

### Step 3: Explore Learning
1. Click "Explore Learning"
2. You'll see topics specific to your age group
3. Click any topic to read full content
4. Watch the progress bar update
5. See recommendations change

### Step 4: Talk to SafeSpace
1. Click "Talk to SafeSpace"
2. Type a message like: "I'm feeling confused about relationships"
3. Get an age-appropriate response
4. Send more messages to build chat history
5. Scroll up to see recent conversation

### Step 5: Dashboard Stats Update
1. Go back to dashboard
2. Notice stats have updated:
   - Topics Learned: Count of viewed topics
   - Conversations: Count of message pairs
   - Interests: Your selected interests

---

## 🎮 Interactive Features

### Learn Page
- **Click topic card** to expand and read
- **Back button** returns to list
- **Progress bar** shows completion percentage
- **Recommendations** update as you progress
- **Checkmarks** show already-viewed topics

### Talk Page
- **Type your feelings** in textarea
- **Press Enter or click Send** to submit
- **View recent conversations** at top
- **Different responses** based on:
  - Your age group
  - Message keywords
  - Response type (empathy/encouragement/resources)

### Dashboard
- **Stats cards** show your activity
- **Interest badges** display selected topics
- **Color-coded buttons** for different actions
- **Hover effects** provide visual feedback

---

## 🔧 Key APIs to Know

### Get User Info
```javascript
import { userService } from "./src/services/userContext";

const user = userService.getCurrentUser();
console.log(user.age, user.name, user.interests);
```

### Track Topic Viewing
```javascript
import { userService } from "./src/services/userContext";

// Automatically called when topic is viewed
userService.addViewedTopic("What is a crush?");
```

### Generate Response
```javascript
import { generatePersonalizedResponse } from "./src/services/contentEngine";

const response = generatePersonalizedResponse(
  "I'm feeling sad",
  "teen"
);
```

### Get Age Group
```javascript
import { getAgeGroup } from "./src/services/contentEngine";

const group = getAgeGroup(19); // Returns "young"
```

---

## 💡 Customization Tips

### Add New Age Group
Edit [src/services/contentEngine.js](src/services/contentEngine.js#L4):
```javascript
export const ageGroups = {
  // ... existing groups
  SENIOR: { min: 65, max: 120, label: "Senior", icon: "👴👵" }
};
```

### Add New Interests
Edit [src/pages/signup.jsx](src/pages/signup.jsx#L25):
```javascript
const availableInterests = [
  // ... existing interests
  "Financial Wellness"
];
```

### Customize Responses
Edit [src/services/contentEngine.js](src/services/contentEngine.js#L41):
```javascript
const responses = {
  teen: {
    empathy: [
      // Add your custom responses here
    ],
    // ...
  }
};
```

### Change Colors
All gradient colors use:
- Primary: `#667eea` (blue-purple)
- Secondary: `#764ba2` (darker purple)
- Success: `#4caf50` (green)

Update in any `.jsx` file's `style` objects.

---

## 🐛 Troubleshooting

### Issue: Data not persisting
**Solution**: Check browser's localStorage is enabled
```javascript
// In browser console
localStorage.setItem("test", "value");
localStorage.getItem("test"); // Should return "value"
```

### Issue: Age group not changing
**Solution**: Clear localStorage and create new account
```javascript
// In browser console
localStorage.clear();
```

### Issue: Responses all the same
**Solution**: Check that different message keywords trigger different responses
- "sad/struggling/depressed" → empathy
- "how/can/should" → resources
- Everything else → encouragement

### Issue: Progress bar stuck
**Solution**: Verify `userService.addViewedTopic()` called when opening topics

---

## 📊 Testing Workflow

1. **Create Teen Account** (age 13-17)
   - Verify teen content loads
   - Test learn and talk pages
   - Note response style

2. **Create Young Adult Account** (age 18-21)
   - Compare content differences
   - Test age-appropriate responses
   - Verify interests work

3. **Create Adult Account** (age 22+)
   - Most mature content
   - Different response type
   - Full feature testing

---

## 📱 Browser DevTools

### Check User Data
```javascript
const user = JSON.parse(localStorage.getItem("safespace_user"));
console.log(user);
```

### Check Preferences
```javascript
const prefs = JSON.parse(localStorage.getItem("safespace_preferences"));
console.log(prefs.interests);
console.log(prefs.viewedTopics);
```

### Check Chat History
```javascript
const history = JSON.parse(localStorage.getItem("safespace_chat_history"));
console.log(history);
```

### Test Age Mapping
```javascript
import { getAgeGroup } from "./src/services/contentEngine";
console.log(getAgeGroup(15)); // "teen"
console.log(getAgeGroup(20)); // "young"
console.log(getAgeGroup(25)); // "adult"
```

---

## 🎯 Feature Checklist

- [ ] Account creation with age and interests
- [ ] Age-appropriate content loading
- [ ] Topic clicking and expansion
- [ ] Progress tracking with visual bar
- [ ] Topic recommendations
- [ ] Chat message sending
- [ ] Age-appropriate responses
- [ ] Chat history display
- [ ] Dashboard stats update
- [ ] Logout clears data
- [ ] Login restores data
- [ ] UI responsive on all screens
- [ ] Hover effects working
- [ ] All buttons functional

---

## 🚢 Deployment Checklist

Before deploying to production:

1. **Test all age groups:**
   - [ ] Teen (13-17)
   - [ ] Young adult (18-21)
   - [ ] Adult (22+)

2. **Test all user flows:**
   - [ ] Signup → Dashboard → Learn → Talk
   - [ ] Logout and login
   - [ ] Data persistence

3. **Performance check:**
   - [ ] Page load < 2 seconds
   - [ ] No console errors
   - [ ] Smooth animations

4. **Browser compatibility:**
   - [ ] Chrome ✓
   - [ ] Firefox ✓
   - [ ] Safari ✓
   - [ ] Edge ✓

5. **Security:**
   - [ ] No sensitive data in console
   - [ ] Password not displayed
   - [ ] XSS prevention

---

## 📚 Next Steps

1. **Add Backend**: Connect to real database instead of localStorage
2. **AI Integration**: Use real NLP for smarter responses
3. **Professional Connections**: Link to counselor matching
4. **Analytics**: Track user engagement and topics
5. **Mobile App**: Convert to React Native
6. **Notifications**: Send wellness reminders
7. **Multimedia**: Add videos and infographics
8. **Accessibility**: Full WCAG compliance
9. **Internationalization**: Multi-language support
10. **Community**: Add peer support forum

---

## 📞 Support

For issues or questions:
1. Check [TESTING_GUIDE.md](TESTING_GUIDE.md)
2. Review [API_REFERENCE.md](API_REFERENCE.md)
3. Check [ARCHITECTURE.md](ARCHITECTURE.md)
4. Consult browser DevTools console
