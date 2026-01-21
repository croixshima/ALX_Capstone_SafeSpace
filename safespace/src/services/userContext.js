// User context and preferences management
export const userService = {
  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("safespace_user");
    return user ? JSON.parse(user) : null;
  },

  // Save user data
  saveUser: (userData) => {
    localStorage.setItem("safespace_user", JSON.stringify(userData));
  },

  // Get user preferences
  getUserPreferences: () => {
    const prefs = localStorage.getItem("safespace_preferences");
    return prefs ? JSON.parse(prefs) : { interests: [], viewedTopics: [], learningStyle: "visual" };
  },

  // Save user preferences
  saveUserPreferences: (preferences) => {
    localStorage.setItem("safespace_preferences", JSON.stringify(preferences));
  },

  // Add topic to viewed topics
  addViewedTopic: (topicTitle) => {
    const prefs = userService.getUserPreferences();
    if (!prefs.viewedTopics.includes(topicTitle)) {
      prefs.viewedTopics.push(topicTitle);
      userService.saveUserPreferences(prefs);
    }
  },

  // Update user interests
  updateInterests: (interests) => {
    const prefs = userService.getUserPreferences();
    prefs.interests = interests;
    userService.saveUserPreferences(prefs);
  },

  // Get user learning history
  getViewedTopics: () => {
    return userService.getUserPreferences().viewedTopics || [];
  },

  // Clear all user data
  clearUserData: () => {
    localStorage.removeItem("safespace_user");
    localStorage.removeItem("safespace_preferences");
  }
};

// Chat history management
export const chatService = {
  // Get chat history
  getChatHistory: () => {
    const history = localStorage.getItem("safespace_chat_history");
    return history ? JSON.parse(history) : [];
  },

  // Add message to history
  addMessage: (message, sender = "user") => {
    const history = chatService.getChatHistory();
    history.push({
      id: Date.now(),
      text: message,
      sender,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("safespace_chat_history", JSON.stringify(history));
  },

  // Clear chat history
  clearHistory: () => {
    localStorage.removeItem("safespace_chat_history");
  },

  // Get recent messages (last N)
  getRecentMessages: (limit = 10) => {
    const history = chatService.getChatHistory();
    return history.slice(-limit);
  }
};
