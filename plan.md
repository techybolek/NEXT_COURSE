# Plan: Add Loading Indicator to NewPost Modal

## Root Cause Analysis
After user clicks "Add Post":
1. POST request completes quickly
2. `redirect('/')` is called
3. Modal remains visible while Posts.jsx loader fetches data (slow GET)
4. User sees no feedback during this 1-2 second delay

## Simple Solution: Loading State in Modal
Add a loading indicator to the NewPost modal after successful POST submission.

### Implementation Steps

#### In NewPost.jsx:
1. **Import useNavigation** from react-router-dom
2. **Detect navigation state** using `navigation.state`
3. **Show loading UI** when navigation is in progress
4. **Keep form disabled** during loading
5. **Display feedback message** like "Creating post..." or "Loading posts..."

### Technical Details:

```jsx
import { useNavigation } from "react-router-dom";

function NewPost() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

  return (
    <Modal>
      {isLoading ? (
        <div className={classes.loading}>
          <p>Loading posts...</p>
          <div className={classes.spinner}></div>
        </div>
      ) : (
        <Form method="post" className={classes.form}>
          {/* existing form content */}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Add Post"}
          </button>
        </Form>
      )}
    </Modal>
  );
}
```

### Benefits:
- **Minimal code changes** - only modify NewPost.jsx
- **No architectural changes** - keep existing route structure
- **Clear user feedback** - user knows their action succeeded
- **Simple implementation** - uses built-in React Router hooks
- **Maintains current behavior** - modal closes when navigation completes

### User Experience Flow:
1. User clicks "Add Post"
2. Button shows "Creating..." (submitting state)
3. POST completes quickly
4. Modal shows "Loading posts..." with spinner (loading state)
5. Modal disappears when Posts loads

## Implementation Priority:
1. Add useNavigation hook (5 minutes)
2. Add loading state UI (10 minutes)
3. Style loading indicator (5 minutes)

## Notes:
- This solution provides immediate feedback without complexity
- Loading state clearly indicates the system is working
- No need to change Posts.jsx or routing structure
- Can be enhanced later with skeleton loading if desired 