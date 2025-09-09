# Design Document

## Overview

This design addresses the visual and usability issues identified in the Anclora Cortex application. The solution focuses on improving the theme selector positioning, ensuring proper dark mode contrast, standardizing card designs, removing unwanted visual elements, and improving spacing throughout the interface.

## Architecture

The fixes will be implemented through CSS modifications and component updates:

1. **Theme Selector Repositioning**: Adjust positioning and responsive behavior
2. **Dark Mode Contrast Enhancement**: Update CSS variables and color schemes
3. **Card Design Standardization**: Normalize feature card styling
4. **Header Cleanup**: Remove or restyle unwanted elements
5. **Spacing Optimization**: Improve vertical and horizontal spacing

## Components and Interfaces

### Theme Selector Component
- **Current Issue**: Fixed positioning causes overlap with navigation and other elements
- **Solution**: Implement responsive positioning with proper z-index management
- **Changes**:
  - Adjust top/right positioning for different screen sizes
  - Add media queries for mobile responsiveness
  - Ensure proper spacing from navigation elements

### Feature Cards Component
- **Current Issue**: Inconsistent icon presentation (one card has background overlay, others don't)
- **Solution**: Standardize all cards to use consistent icon containers
- **Changes**:
  - Remove background gradient from the problematic card
  - Ensure all icons use the same circular container style
  - Maintain consistent padding and spacing

### Navigation Header
- **Current Issue**: Unwanted yellow/amber box next to application name
- **Solution**: Restyle or remove the beta badge element
- **Changes**:
  - Modify the beta badge styling to be more subtle
  - Ensure proper color scheme integration
  - Maintain brand consistency

### Dark Mode Styling
- **Current Issue**: Some elements lack proper contrast in dark mode
- **Solution**: Enhance CSS variables and add missing dark mode styles
- **Changes**:
  - Review and update all text color variables
  - Ensure interactive elements have proper hover states
  - Add missing dark mode styles for specific components

## Data Models

No data model changes required - this is purely a visual/styling update.

## Error Handling

- Graceful fallbacks for theme switching
- Ensure accessibility standards are maintained
- Validate color contrast ratios meet WCAG guidelines

## Testing Strategy

### Visual Testing
1. **Theme Switching**: Test all theme combinations (light, dark, system)
2. **Responsive Testing**: Verify layouts on mobile, tablet, and desktop
3. **Contrast Testing**: Validate readability in all theme modes
4. **Cross-browser Testing**: Ensure consistency across major browsers

### Accessibility Testing
1. **Color Contrast**: Verify WCAG AA compliance
2. **Focus States**: Ensure all interactive elements have proper focus indicators
3. **Screen Reader**: Test with screen reader software

### Component Testing
1. **Card Consistency**: Verify all feature cards have identical styling
2. **Header Elements**: Confirm clean header appearance
3. **Spacing**: Validate improved spacing in footer and bottom sections

## Implementation Details

### CSS Variable Updates
```css
/* Enhanced dark mode variables */
[data-theme="dark"] {
  --text-primary: #F8FAFC;
  --text-secondary: #E2E8F0;
  --text-tertiary: #CBD5E1;
  /* Additional contrast improvements */
}
```

### Theme Selector Positioning
```css
.theme-selector {
  /* Responsive positioning */
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 1000;
}

@media (max-width: 768px) {
  .theme-selector {
    top: 0.5rem;
    right: 0.5rem;
  }
}
```

### Card Standardization
```css
.feature-card {
  /* Consistent styling for all cards */
  background: var(--bg-card);
  /* Remove any background image overrides */
}

.feature-card .icon-container {
  /* Standardized icon containers */
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: var(--gradient-action);
}
```

### Spacing Improvements
```css
/* Footer and bottom section spacing */
.footer-section {
  padding: 3rem 1rem; /* Increased from current */
}

.footer-content > * + * {
  margin-top: 2rem; /* Add vertical spacing between elements */
}
```

### Beta Badge Styling
```css
.beta-badge {
  /* Subtle, integrated styling */
  background: rgba(var(--anclora-amber-rgb), 0.2);
  color: var(--text-primary);
  border: 1px solid rgba(var(--anclora-amber-rgb), 0.3);
  /* Remove harsh yellow background */
}
```

## Design Decisions and Rationales

1. **Theme Selector Positioning**: Using fixed positioning with responsive adjustments ensures the selector remains accessible without interfering with content flow.

2. **Card Standardization**: Removing the background image from the inconsistent card maintains visual hierarchy while ensuring all cards follow the same pattern.

3. **Dark Mode Contrast**: Enhancing text contrast variables ensures readability without compromising the design aesthetic.

4. **Beta Badge Redesign**: Making the badge more subtle maintains the information while reducing visual noise.

5. **Spacing Enhancement**: Increasing spacing in the footer area improves visual breathing room and reduces the cramped feeling.

## Accessibility Considerations

- All color combinations will meet WCAG AA contrast requirements
- Focus states will remain clearly visible in all themes
- Responsive design ensures usability across all device sizes
- Theme switching will not cause layout shifts or accessibility issues