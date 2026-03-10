# Chat Widget Integration Guide

This document explains how to integrate the `ChatWidget` module in a React + TypeScript app.

## Purpose

`ChatWidget` is a floating chat assistant UI module with:

- A launcher button (`MessageCircle`) fixed at bottom-right.
- A popup chat window with message history, typing indicator, and retry/error handling.
- Mobile-specific backdrop + body-scroll locking behavior when open.
## Main Entry File

`src/chat-widget/ChatWidget.tsx`

## Recommended Use (Minimal Integration)

```tsx
import {ChatWidget} from "./chat-widget/ChatWidget";

function App() {
  return <ChatWidget />;
}
```

## Where To Inject

Place `<ChatWidget />` inside the main content area where you want the chat section to appear (typically below an article, post, or main page content). For layout consistency, keep it within the same container width as the surrounding content.
