# Wayfare

## Elevator pitch
Turn a messy travel brief into a clear service quote and a PayPal Sandbox deposit checkout.

## Inspiration
Independent travel planners receive requests as scattered messages: dates, preferences, budgets and unanswered questions. Before taking a deposit, both sides need a shared understanding of the work being purchased. Wayfare brings that review and the payment step into one small workflow.

## What it does
The AI drafts a service scope, exclusions and clarification questions from a travel brief. The planner reviews and edits the draft and sets the total fee and deposit. A customer link displays the agreed scope and opens PayPal Sandbox checkout. The server fixes the order amount and verifies a completed capture before showing a receipt.

## How we built it
Node.js serves the interface and API. OpenAI Chat Completions produces a structured draft. PayPal JavaScript SDK handles buyer approval, while Orders v2 creation and capture run on the server. Credentials stay outside the source package. The AI does not choose prices or authorize payments.

## Challenges
A natural-language brief must not become an invented promise. The AI is instructed to surface missing information and avoid claims about bookings or supplier availability. Payment amounts are validated as integer cents, and duplicate capture requests share the same in-flight operation.

## What we learned
A useful travel payment flow starts with defining the service. Keeping the planner in control of scope and price makes AI assistance easier to review and the checkout easier to understand.

## Next steps
Add planner authentication, persistent quote storage, rate limits and webhook reconciliation before unrestricted public use. The current prototype is for local or access-controlled demonstrations and uses test money only.

## Validation status — 10 November 2026
- PayPal Sandbox credentials accepted by the OAuth endpoint.
- The application successfully created a sandbox order through its own quote and order endpoints.
- Mock integration checks cover draft parsing, quote validation, amount handling, order mismatch, duplicate capture and receipts.
- Live AI generation and buyer-approved sandbox capture remain unverified.
- Public repository and demonstration video are not published. This file is a draft submission description, not evidence that the entry has been submitted.
