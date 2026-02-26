# Chat Widget Integration Guide

This document explains how to integrate and use the `ChatWidget` module in another React/TypeScript codebase.

## 1) Purpose

`ChatWidget` is a floating chat assistant UI module with:

- A launcher button (`MessageCircle`) fixed at bottom-right.
- A popup chat window with message history, typing indicator, and retry/error handling.
- Mobile-specific backdrop + body-scroll locking behavior when open.

The main entry file is:

- `src/chat-widget/ChatWidget.tsx`
