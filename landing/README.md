This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Feedback Feature

The landing page includes a feedback button that appears on all pages. Users can click on this button to open a feedback form modal where they can submit their thoughts, suggestions, or report issues.

### Setup

To enable the feedback feature, you need to configure a Telegram bot to receive the feedback messages:

1. Create a new Telegram bot by talking to [@BotFather](https://t.me/botfather) on Telegram.
2. Get your bot token from BotFather.
3. Create a group or channel where the feedback messages will be sent.
4. Add your bot as an administrator to this group/channel.
5. Find the chat ID of your group/channel (you can use [@username_to_id_bot](https://t.me/username_to_id_bot) or similar to get the chat ID).
6. Copy the `.env.local.example` file to `.env.local` and update the Telegram configuration:

```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### Features

- Mobile-friendly floating feedback button
- Optional email field
- Message with up to 2000 characters
- Real-time form validation
- Success confirmation message
- Error handling

### Implementation Details

The feedback feature consists of the following components:

- `FeedbackButton`: A floating button that appears on all pages
- `FeedbackForm`: The form component used in the modal
- `FeedbackProvider`: A provider component that wraps the application
- API route (`/api/feedback`) that sends messages to Telegram

The feature is enabled by default on all pages through the `FeedbackProvider` in the root layout.
