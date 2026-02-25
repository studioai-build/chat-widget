# Chat Widget Integration Guide

This document explains how to integrate and use the `ChatWidget` module in another React/TypeScript codebase.

## 1) Purpose

`ChatWidget` is a floating chat assistant UI module with:

- A launcher button (`MessageCircle`) fixed at bottom-right.
- A popup chat window with message history, typing indicator, and retry/error handling.
- Mobile-specific backdrop + body-scroll locking behavior when open.

The main entry file is:

- `src/chat-widget/chat-widget.tsx`

## 2) Integration Contract (Read First)

To work correctly, **do not copy only one file**. The widget depends on sibling components and shared local types.

You must copy/preserve the full folder:

- `src/chat-widget/`

At minimum, these areas are required:

- `src/chat-widget/chat-widget.tsx`
- `src/chat-widget/components/chat-popup.tsx`
- `src/chat-widget/components/chat-popup-types.ts`
- `src/chat-widget/components/*` (all other files in this folder are used by `chat-popup.tsx`)

## 3) Runtime and Build Assumptions

The code assumes:

- React 18+
- TypeScript
- `lucide-react` available
- Tailwind-style utility classes available in your app
- Theme utility classes `bg-primary`, `text-primary`, `focus:ring-primary`, and `text-textSecondary` exist in your design tokens/theme
- `@` path alias configured to resolve to your `src` directory

## 4) Public Entry Point

Use this component in your page/app shell:

```tsx
import ChatWidget from '@/chat-widget/chat-widget'

export default function AppShell() {
  return <ChatWidget />
}
```

Current implementation mounts `ChatPopup` internally and passes a fixed `agentId` in:

- `src/chat-widget/chat-widget.tsx`

## 5) Data Model (Core Types)

Primary chat types are in:

- `src/chat-widget/components/chat-popup-types.ts`

Key types:

- `Message`
- `ChatSession`
- `ChatPopupProps`

`ChatSession` fields used by UI logic:

- `process_id`
- `messages` (array of `Message`)
- plus status/tracing fields returned by backend

## 6) Behavior Overview

`ChatWidget` state:

- `isOpen`: controls launcher vs popup visibility

`ChatPopup` state:

- `chatSession`: current backend session
- `isLoading`: initial session creation status
- `newMessage`: input model
- `isSending`: message send status
- `error`: connection/send error message
- `optimisticMessages`: temporary local user messages during send
- `showTyping`: typing indicator state

Networking behavior:

- Starts session on first open via `POST /api/v1/chat-agents/start`
- Sends message via `POST /api/v1/chat-agents/chat`
- Uses `chatSession.process_id` for subsequent chat messages

Current endpoints are hardcoded in `chat-popup.tsx`:

- `https://platform.api.simplifyx.app/api/v1/chat-agents/start`
- `https://platform.api.simplifyx.app/api/v1/chat-agents/chat`

## 7) Recommended Best-Practice Integration

For production usage:

- Move API base URL to environment config (avoid hardcoded absolute URLs).
- Pass `agentId` as prop from container/page level instead of in-widget constant.
- Optionally pass pre-created `chatSession` or session bootstrap callback.
- Keep network side effects in a dedicated API client/hook for testability.
- Add request timeout + abort handling for slower mobile networks.
- Validate backend payload shape before storing in `chatSession`.

Suggested extension:

1. Add `agentId` prop to `ChatWidget`.
2. Add optional `apiBaseUrl` (or a typed API client prop).
3. Keep current hardcoded values only as local-dev fallback.
4. Add explicit loading and error boundary states at container level.

## 8) LLM-Friendly Project Structure Summary

Use this as the mental model for assistants/tools:

1. `chat-widget.tsx`: top-level launcher + popup mount.
2. `components/chat-popup.tsx`: state orchestration + API calls.
3. `components/chat-popup-types.ts`: domain/session/message types.
4. `components/chat-messages.tsx`: message list, error, empty state, typing.
5. `components/chat-input.tsx`: input/send UX.
6. `components/chat-popup-header.tsx`: header status + close action.
7. `components/chat-mobile-backdrop.tsx`: mobile-only overlay close behavior.

## 9) Integration Checklist

- [ ] Copied full `src/chat-widget` folder, not only one file
- [ ] Confirmed `@` alias is configured and internal imports resolve (e.g. `@/chat-widget/...`)
- [ ] Installed/available dependency: `lucide-react`
- [ ] Confirmed theme classes exist: `primary` and `textSecondary` tokens
- [ ] Mounted `ChatWidget` from `src/chat-widget/chat-widget.tsx`
- [ ] Externalized `agentId` and API base URL for non-demo usage (recommended)
