# Wayfare

Wayfare turns an unstructured travel request into an editable quote and a shareable PayPal Sandbox checkout. A local FLAN-T5 model drafts a summary for the planner. Exclusions and the review checklist are fixed safeguards, not AI-generated facts. The planner sets the total and deposit. The server creates a PayPal order for that deposit and displays a receipt after PayPal confirms the capture.

## Run

Requirements: Node.js 22 or newer, a PayPal Sandbox REST app, and enough disk space for the free local model. No AI API key or paid AI service is required. Create a sandbox personal buyer account to exercise checkout. Use sample trip details for the demo.

```sh
ONNXRUNTIME_NODE_INSTALL_CUDA=skip npm install
cp .env.example .env
# Fill in .env privately. Never add it to Git.
node --env-file=.env server.mjs
```

Open http://localhost:3000. Draft a quote, review the AI output, set a total and a deposit, and open the customer link. Approve the order using the PayPal sandbox buyer account. The receipt shows the completed capture ID. Sandbox orders use test money.

Try this sample brief: “Two adults, four nights in Genoa in late May. We want a quiet hotel, maritime museums, and a day trip by train. Hotel budget €150 per night. We can arrive on either Friday or Saturday.” Enter example planning fees of €240 total and €60 deposit.

The quote link expires after 24 hours. This prototype stores quotes in memory, so restarting the server clears them. Share the link only with the intended tester. The server is designed for local or access-controlled demonstrations. Before hosting for unrestricted public use, add planner authentication, persistent quote storage, and AI rate limits. The first AI draft downloads Xenova/flan-t5-base from Hugging Face. Subsequent inference runs locally on the Node server. Model output can omit or misinterpret details: compare it against the original brief before sharing. The browser sends the brief only to your Wayfare server.

## Devpost submission notes

**One-line pitch:** Turn a messy travel brief into a quote the customer can review and pay a sandbox deposit on.

**What it does:** Independent travel planners often receive trip requirements as a paragraph of text. Wayfare uses a free local model to summarize the brief and presents exclusions and a review checklist before pricing. The planner controls the amount. The customer opens a separate checkout view and uses PayPal Sandbox. Wayfare verifies the capture amount and status on the server before displaying a receipt.

**Built with:** Node.js, HTML and CSS, Transformers.js, quantized FLAN-T5-base, PayPal JavaScript SDK and Orders v2 API.

**Demo outline (under three minutes):** Paste the Genoa brief and draft the quote. Compare the local AI summary with the original brief. Edit the scope, set the price and open the customer link. Complete checkout as a sandbox buyer and show the capture receipt. Record this after verifying local inference and PayPal Sandbox. Publish the demo on YouTube and attach the URL and the public source repository to Devpost.


## Validation status

Local AI inference and server tests are checked separately from payments. PayPal Sandbox end-to-end capture and the final recorded demonstration are still pending; the illustrative preview is not a completed payment demo.
