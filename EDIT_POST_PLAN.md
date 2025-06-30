# Edit Post Feature Implementation Plan

## Current State Analysis

### Existing Components:
- **Post.jsx**: Simple component that displays author and body, no click handling
- **PostList.jsx**: Maps over posts and renders Post components
- **EditPost.jsx**: Form component with PUT action, but no data pre-population
- **main.jsx**: Route structure already includes edit-post as child route

### Current Route Structure:
```
/ (RootLayout)
  └── / (Posts with postsLoader)
      ├── create-post (NewPost)
      └── edit-post (EditPost with editPostAction)
```

## Implementation Plan

### Phase 1: Update Route Structure
**Goal**: Modify edit-post route to accept post ID parameter

**Changes needed in main.jsx**:
- Change edit-post route path from `"edit-post"` to `"edit-post/:id"`
- This allows passing the post ID as a URL parameter

### Phase 2: Make Posts Clickable
**Goal**: Enable clicking on posts to navigate to edit route

**Changes needed in Post.jsx**:
- Import `useNavigate` or `Link` from react-router-dom
- Add click handler to the `<li>` element
- Use `navigate(`/edit-post/${props.id}`)` or `<Link to={`edit-post/${props.id}`}>`
- Add cursor pointer styling for better UX

### Phase 3: Create Post Data Loader
**Goal**: Load specific post data for editing

**Changes needed in EditPost.jsx**:
- Create a new `loader` function that:
  - Accepts `params` (containing the post ID)
  - Fetches individual post data: `GET http://localhost:8080/posts/{id}`
  - Returns the post data
- Export the loader function

**Changes needed in main.jsx**:
- Import the loader from EditPost.jsx as `editPostLoader`
- Add loader to the edit-post route configuration

### Phase 4: Pre-populate Edit Form
**Goal**: Display existing post data in the form fields

**Changes needed in EditPost.jsx**:
- Use `useLoaderData()` to get the post data
- Set default values for author and body input fields
- Add hidden input field for post ID (needed for PUT request)
- Update the form to use controlled or uncontrolled components appropriately

### Phase 5: Update Action Function
**Goal**: Ensure the PUT request works correctly with the post ID

**Changes needed in EditPost.jsx action function**:
- Get post ID from `params` instead of formData
- Update the fetch URL to use the correct post ID
- Ensure proper error handling

## Technical Implementation Details

### Route Configuration (main.jsx):
```javascript
{ 
  path: "edit-post/:id", 
  element: <EditPost />, 
  action: editPostAction,
  loader: editPostLoader 
}
```

### Post Click Handling (Post.jsx):
```javascript
import { useNavigate } from "react-router-dom";

// In component:
const navigate = useNavigate();
const handleClick = () => navigate(`edit-post/${props.id}`);

// Add to JSX:
<li className={classes.post} onClick={handleClick} style={{cursor: 'pointer'}}>
```

### Data Loading (EditPost.jsx):
```javascript
export async function loader({ params }) {
  const response = await fetch(`http://localhost:8080/posts/${params.id}`);
  const data = await response.json();
  return data.post || null;
}
```

### Form Pre-population (EditPost.jsx):
```javascript
const post = useLoaderData();

// In form:
<input 
  type="text" 
  id="author" 
  name="author" 
  defaultValue={post?.author || ''} 
  required 
/>
<textarea 
  id="body" 
  name="body" 
  defaultValue={post?.body || ''} 
  required 
/>
<input type="hidden" name="id" value={post?.id} />
```

## Error Handling Considerations

1. **Post Not Found**: Handle case where post ID doesn't exist
2. **Network Errors**: Handle fetch failures gracefully
3. **Loading States**: Show loading indicator while fetching post data
4. **Validation**: Ensure form validation works with pre-populated data

## Testing Checklist

- [ ] Clicking a post navigates to edit-post/{id}
- [ ] Form pre-populates with correct post data
- [ ] Editing and saving updates the correct post
- [ ] Error handling works for invalid post IDs
- [ ] Loading states display correctly
- [ ] Navigation back to posts list works
- [ ] URL reflects the correct post ID

## Files to Modify

1. **src/main.jsx** - Update route configuration
2. **src/components/Post.jsx** - Add click handling
3. **src/routes/EditPost.jsx** - Add loader and update component
4. **src/components/Post.module.css** - Add hover styles (optional)

## Dependencies

- No new dependencies required
- Uses existing react-router-dom functionality
- Backend API should support GET /posts/{id} endpoint 