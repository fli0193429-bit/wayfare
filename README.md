# Wayfare

Wayfare turns an unstructured travel request into an editable quote and a shareable PayPal Sandbox checkout. The AI drafts the scope, exclusions, and questions for the planner. The planner sets the total and deposit. The server creates a PayPal order for that deposit and displays a receipt after PayPal confirms the capture.

## Run

Requirements: Node.js 22 or newer, an OpenAI API key with access to a model supporting JSON mode, and a PayPal Sandbox REST app. Create a sandbox personal buyer account to exercise checkout. Use sample trip details for the demo.

```sh
cp .env.example .env
# Fill in .env privately. Never add it to Git.
node --env-file=.env server.mjs
```

Open http://localhost:3000. Draft a quote, review the AI output, set a total and a deposit, and open the customer link. Approve the order using the PayPal sandbox buyer account. The receipt shows the completed capture ID. Sandbox orders use test money.

Try this sample brief: “Two adults, four nights in Genoa in late May. We want a quiet hotel, maritime museums, and a day trip by train. Hotel budget €150 per night. We can arrive on either Friday or Saturday.” Enter example planning fees of €240 total and €60 deposit.

The quote link expires after 24 hours. This prototype stores quotes in memory, so restarting the server clears them. Share the link only with the intended tester. The server is designed for local or access-controlled demonstrations. Before hosting for unrestricted public use, add planner authentication, persistent quote storage, and AI rate limits. Test with sample details because the draft endpoint sends the travel brief to the configured AI service.

## Devpost submission notes

**One-line pitch:** Turn a messy travel brief into a quote the customer can review and pay a sandbox deposit on.

**What it does:** Independent travel planners often receive trip requirements as a paragraph of text. Wayfare drafts a scope and exclusions and surfaces the questions that matter before pricing. The planner controls the amount. The customer opens a separate checkout view and uses PayPal Sandbox. Wayfare verifies the capture amount and status on the server before displaying a receipt.

**Built with:** Node.js, HTML and CSS, OpenAI Chat Completions, PayPal JavaScript SDK and Orders v2 API.

**Demo outline (under three minutes):** Paste the Genoa brief and draft the quote. Point out a question the AI surfaced. Edit the scope, set the price and open the customer link. Complete checkout as a sandbox buyer and show the capture receipt. Record this after verifying both configured services. Publish the demo on YouTube and attach the URL and the public source repository to Devpost.
