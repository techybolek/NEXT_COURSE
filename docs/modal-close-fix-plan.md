# Revised Plan: Fix Modal Remaining Open After Post Creation

## Current State Analysis
1. **NewPost.jsx**
   - Already has a `handleClose` function to navigate to '/'
   - Passes `onClose` to Modal component
   - Passes `onCancel` and `onAddPost` to NewPostInner
   - Missing `navigate` import and initialization
   - Has an unused `handleAddPost` reference

2. **NewPostInner.jsx**
   - Currently not using the passed `onCancel` and `onAddPost` props
   - Form submission works but doesn't trigger modal close
   - Cancel button not connected to close functionality

## Required Changes

1. **Fix NewPost.jsx**
   ```javascript
   - Import useNavigate from react-router-dom
   - Initialize navigate hook
   - Remove unused handleAddPost reference
   ```

2. **Update NewPostInner Component**
   - Accept and use the props properly:
     ```javascript
     function NewPostInner({ onCancel, onAddPost })
     ```
   - Connect Cancel button to onCancel prop
   - Use Form's onSubmit to handle successful submission

3. **Modify the Action Function**
   - Return a structured response object with success status
   - Use react-router's redirect() for navigation after success

## Implementation Steps

1. In NewPost.jsx:
   ```javascript
   - Add useNavigate import
   - Initialize navigate hook
   - Remove handleAddPost reference
   ```

2. In NewPostInner.jsx:
   ```javascript
   - Update props destructuring
   - Connect Cancel button onClick to onCancel
   - Add Form onSubmit handler
   - Return redirect('/') from action on success
   ```

## Expected Result
- When form is submitted successfully:
  - Post is created
  - Action returns redirect
  - Modal closes automatically
- When Cancel is clicked:
  - Modal closes via existing navigation logic
  - No post is created

## Technical Approach
1. Leverage existing Modal closing logic in NewPost.jsx
2. Use React Router's redirect() for post-submission navigation
3. Connect the Cancel button to existing close handler
4. Keep the Form component's built-in action handling

## Benefits of Revised Approach
- Uses existing modal close logic instead of creating new one
- Maintains clear separation of concerns between components
- Leverages React Router's built-in redirect functionality
- Simplifies the implementation by removing redundant navigation logic 