export const useHapticFeedback = () => {
  const vibrate = (pattern: number | number[]) => {
    // Check if the Vibration API is supported
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const hapticFeedback = {
    // Light tap for hover effects
    light: () => vibrate(10),
    
    // Medium tap for button clicks
    medium: () => vibrate(25),
    
    // Strong tap for important actions
    strong: () => vibrate(50),
    
    // Double tap for special interactions
    double: () => vibrate([25, 50, 25]),
    
    // Success pattern
    success: () => vibrate([50, 100, 50]),
    
    // Error pattern
    error: () => vibrate([100, 50, 100, 50, 100]),
    
    // Timeline progression
    timeline: () => vibrate([15, 30, 15]),
    
    // Scroll milestone
    scroll: () => vibrate(5)
  };

  return hapticFeedback;
};