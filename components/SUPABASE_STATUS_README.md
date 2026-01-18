# Supabase Status Indicator

A visual debug component that shows the connection status of your Supabase database.

## Features

✅ Shows real-time Supabase connection status  
✅ Indicates if using database or localStorage fallback  
✅ Displays project URL and error messages  
✅ Click to expand for detailed information  
✅ **Easy to enable/disable with a single flag**

## Location

The status indicator appears as a small pill in the **bottom-right corner** of the screen on all pages.

## How to Toggle

Open `components/supabase-status.tsx` and change this line:

```typescript
// Line 10
const SHOW_SUPABASE_STATUS = false // Set to false to hide
```

- **`true`** - Status indicator is visible ✅
- **`false`** - Status indicator is completely hidden ❌

## Status States

### 🟢 Connected (Green)
- **Supabase: Connected**
- Database is configured and working
- Positions are being saved to Supabase

### 🟡 localStorage (Yellow/Amber)
- **Supabase: localStorage**
- Supabase not configured
- Falling back to browser localStorage
- Positions won't sync across devices

### 🔴 Error (Red)
- **Supabase: Error**
- Supabase is configured but connection failed
- Check the expanded view for error details

### ⚪ Checking... (Gray)
- Initial connection test in progress

## Expanded View

Click the status pill to expand and see:

- **Configured**: Whether `.env.local` has valid credentials
- **Connected**: Whether database queries are working
- **Project**: Your Supabase project URL
- **Error**: Detailed error message (if any)
- **Storage**: Current storage mode (Database or localStorage)
- **Refresh Button**: Re-test the connection

## Troubleshooting

### Shows "localStorage" but you have .env.local

1. Check that your `.env.local` variables are correct:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```

2. Make sure they don't have placeholder values like:
   - `your_supabase_project_url_here`
   - `your_supabase_anon_key_here`

3. Restart your dev server:
   ```bash
   pnpm dev
   ```

### Shows "Error" with red indicator

1. Click to expand and check the error message
2. Common issues:
   - Wrong project URL
   - Invalid anon key
   - Database table not created (run migration)
   - Network connectivity issues

3. Click "Refresh Status" to re-test

### Indicator not showing at all

Check that `SHOW_SUPABASE_STATUS = true` in `components/supabase-status.tsx`

## Styling

The component automatically adapts to your app's color scheme using:
- Emerald colors for success
- Amber colors for warnings
- Rose colors for errors
- Transparent backdrop with blur effect

## When to Hide

**Development**: Keep it visible ✅
- Helpful for debugging
- Shows configuration status
- Confirms database connection

**Production**: Hide it ❌
- Set `SHOW_SUPABASE_STATUS = false`
- Users don't need to see backend status
- Cleaner UI

Or better yet, use an environment variable:

```typescript
// In supabase-status.tsx
const SHOW_SUPABASE_STATUS = process.env.NODE_ENV === 'development'
```

This will automatically show in dev and hide in production!
