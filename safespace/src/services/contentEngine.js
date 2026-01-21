// Age-based content engine with personalization logic
export const ageGroups = {
  TEEN: { min: 13, max: 17, label: "Teen", icon: "👧👦" },
  YOUNG_ADULT: { min: 18, max: 21, label: "Young Adult", icon: "👩👨" },
  ADULT: { min: 22, max: 100, label: "Adult", icon: "👩‍🦰👨‍🦰" }
};

export const getAgeGroup = (age) => {
  age = parseInt(age);
  if (age >= ageGroups.TEEN.min && age <= ageGroups.TEEN.max) {
    return "teen";
  } else if (age >= ageGroups.YOUNG_ADULT.min && age <= ageGroups.YOUNG_ADULT.max) {
    return "young";
  } else if (age >= ageGroups.ADULT.min) {
    return "adult";
  }
  return "teen";
};

export const getAgeGroupInfo = (ageGroup) => {
  const mapping = {
    teen: ageGroups.TEEN,
    young: ageGroups.YOUNG_ADULT,
    adult: ageGroups.ADULT
  };
  return mapping[ageGroup] || mapping.teen;
};

// Content personalization engine
export const personalizeContent = (content, userPreferences = {}) => {
  const personalized = { ...content };
  
  // Add recommendation tags based on user interests/concerns
  if (userPreferences.interests && userPreferences.interests.length > 0) {
    personalized.recommendedTopics = personalized.topics
      .filter(topic => 
        userPreferences.interests.some(interest =>
          topic.title.toLowerCase().includes(interest.toLowerCase()) ||
          topic.text.toLowerCase().includes(interest.toLowerCase())
        )
      );
  }

  // Add difficulty level for progressive learning
  personalized.topics = personalized.topics.map((topic, index) => ({
    ...topic,
    difficulty: index < 2 ? "beginner" : "intermediate",
    readTime: Math.ceil(topic.text.split(" ").length / 200) + " min"
  }));

  return personalized;
};

// Topic recommendation engine based on age and past interests
export const getRecommendedTopics = (content, userHistory = []) => {
  if (!userHistory || userHistory.length === 0) {
    return content.topics.slice(0, 2);
  }

  // Recommend topics not yet viewed
  return content.topics
    .filter(topic => !userHistory.includes(topic.title))
    .slice(0, 3);
};

// Personalized response generator for talk feature
export const generatePersonalizedResponse = (message, ageGroup, userProfile = {}) => {
  const responses = {
    teen: {
      empathy: [
        "I hear you, and what you're feeling is valid.",
        "It's okay to feel this way. Many people your age experience similar feelings.",
        "Your emotions matter, and I'm here to listen without judgment.",
        "Thank you for trusting me with this."
      ],
      encouragement: [
        "You're stronger than you think.",
        "This feeling is temporary, and you will get through it.",
        "Reaching out is a sign of strength, not weakness.",
        "You deserve support and kindness."
      ],
      resources: [
        "Remember, you're not alone in this.",
        "Talking to a trusted adult or counselor can help.",
        "Self-care and taking breaks can help you feel better.",
        "Your friends or family might be able to help too."
      ]
    },
    young: {
      empathy: [
        "I understand this is challenging for you.",
        "Your feelings are a natural response to what you're experiencing.",
        "It takes courage to express yourself like this.",
        "I appreciate you sharing this with me."
      ],
      encouragement: [
        "You have the ability to work through this.",
        "Growth often comes from facing difficult emotions.",
        "Remember your past resilience in handling challenges.",
        "This is an opportunity for self-discovery."
      ],
      resources: [
        "Consider speaking with someone you trust about this.",
        "Professional support can provide valuable guidance.",
        "Healthy coping strategies include journaling, exercise, or meditation.",
        "Community and connection are powerful healing tools."
      ]
    },
    adult: {
      empathy: [
        "Your feelings are valid and understandable.",
        "What you're expressing shows self-awareness.",
        "Thank you for being vulnerable enough to share.",
        "I recognize the weight of what you're carrying."
      ],
      encouragement: [
        "You've overcome challenges before; you can do this too.",
        "This is an opportunity for growth and healing.",
        "Trust in your capacity to navigate this.",
        "Your experience will make you stronger."
      ],
      resources: [
        "Professional counseling can provide valuable support.",
        "Building a support network is essential.",
        "Consider practices like mindfulness or therapy.",
        "Remember to prioritize your mental health and wellbeing."
      ]
    }
  };

  const ageResponses = responses[ageGroup] || responses.teen;
  
  // Select response types based on message keywords
  let responseType = "empathy";
  if (message.toLowerCase().includes("can i") || message.toLowerCase().includes("how do") || message.toLowerCase().includes("should i")) {
    responseType = "resources";
  } else if (message.toLowerCase().includes("struggling") || message.toLowerCase().includes("sad") || message.toLowerCase().includes("depressed")) {
    responseType = "encouragement";
  }

  const selectedResponses = ageResponses[responseType];
  const randomResponse = selectedResponses[Math.floor(Math.random() * selectedResponses.length)];
  
  return `${randomResponse}\n\nYou're part of the SafeSpace community, and we're here for you.`;
};
