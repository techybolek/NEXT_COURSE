# Plan: Fix handleAddPost Reference Error

## Current Issue
- Error indicates `handleAddPost` is being referenced but not defined in `NewPost.jsx`
- Looking at the error location (line 31), there's still a reference to `handleAddPost` that wasn't properly removed in our previous changes

## Analysis
1. **In NewPost.jsx**
   ```jsx
   <NewPostInner onCancel={handleClose} onAddPost={handleAddPost} />
   ```
   - The component is still trying to pass `handleAddPost` to `NewPostInner`
   - This prop is no longer needed since we're using React Router's Form action

## Required Changes

1. **In NewPost.jsx**
   - Remove the `onAddPost` prop from `NewPostInner` component usage
   - Keep only the `onCancel` prop which is used for modal closing

2. **In NewPostInner.jsx**
   - Verify that the component is not expecting `onAddPost` prop
   - No changes needed here since we already removed the prop usage

## Implementation Steps

1. Update NewPost.jsx:
   ```jsx
   // From:
   <NewPostInner onCancel={handleClose} onAddPost={handleAddPost} />
   
   // To:
   <NewPostInner onCancel={handleClose} />
   ```

## Expected Result
- Error will be resolved
- Component will continue to function as intended:
  - Cancel button will close modal
  - Form submission will create post and redirect
  - No undefined reference errors

## Technical Notes
- This error occurred because we missed removing the prop passing while cleaning up the component
- The functionality won't be affected since we're using React Router's Form action for post creation 