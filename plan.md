# Plan: Fix addPostHandler Data Flow

## Current Problem
- `addPostHandler` is defined in `PostList` component but is not accessible to `NewPost`
- `NewPost` expects to receive `addPostHandler` via `useOutletContext()` from its parent route
- `Posts` component doesn't provide any outlet context, so `NewPost` can't access the handler
- This breaks the ability to add new posts from the modal

## Current Component Hierarchy
```
RootLayout
└── Posts (no context provided)
    ├── PostList (has addPostHandler but doesn't share it)
    └── Outlet → NewPost (expects addPostHandler from context)
```

## Solution: Move State Management Up the Component Tree

### Step 1: Move Posts State and Handler to Posts Component
- Move `posts` state from `PostList` to `Posts` component
- Move `addPostHandler` from `PostList` to `Posts` component
- Move `fetchPosts` logic from `PostList` to `Posts` component

### Step 2: Update Posts Component
- Import `useState` and `useEffect` in `Posts`
- Add posts state and data fetching logic
- Pass posts data down to `PostList` as props
- Provide `addPostHandler` to outlet context using `<Outlet context={{ addPostHandler }} />`

### Step 3: Update PostList Component
- Remove state management (posts, isFetching, addPostHandler)
- Remove useEffect for fetching posts
- Accept posts as props from parent
- Simplify to just render the posts list

### Step 4: Verify NewPost Works
- `NewPost` should now be able to access `addPostHandler` via `useOutletContext()`
- Test that adding posts works and updates the list immediately

## Benefits of This Approach
1. **Single Source of Truth**: Posts state managed in one place (`Posts` component)
2. **Proper Context Flow**: `addPostHandler` accessible to `NewPost` via outlet context
3. **Separation of Concerns**: `PostList` focuses only on rendering, `Posts` handles data management
4. **Maintains Current Routing**: No changes needed to routing structure
5. **Immediate UI Updates**: New posts will appear immediately in the list after creation

## Files to Modify
1. `src/routes/Posts.jsx` - Add state management and context provision
2. `src/components/PostList.jsx` - Remove state management, accept props

## Expected Data Flow After Fix
```
Posts (manages posts state + addPostHandler)
├── PostList (receives posts as props)
└── Outlet context={{ addPostHandler }}
    └── NewPost (receives addPostHandler via useOutletContext)
``` 