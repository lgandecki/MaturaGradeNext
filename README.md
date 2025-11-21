# MaturaGrader AI 🎓

**MaturaGrader** is a Next.js application designed to evaluate Polish high school graduation essays ("Matura") based on
the official CKE "Formuła 2023" criteria.

Beyond its educational utility, this repository serves as a **technical showcase** for building robust, secure, and
cost-effective AI applications using the modern React ecosystem. It demonstrates a multi-layered security pipeline,
type-safe server actions, and intermediate AI gateways for observability and billing control, all powered by the **Bun**
runtime.

## 🌟 Technical Showcase Features

### 1. Type-Safe Server-Client Communication

Built using **Next.js App Router** and **`next-safe-action`**, this project ensures end-to-end type safety.

- Inputs are validated server-side using **Zod** schemas.
- The frontend receives fully typed responses (or errors), eliminating the need for manual API route handlers and
  `res.json()` boilerplate.
- Optimistic UI updates and loading states are handled seamlessly via action hooks.

### 2. Enterprise-Grade AI Infrastructure

Instead of calling AI providers directly, this project utilizes **Cloudflare AI Gateway** to manage traffic to Google's
Gemini models.

- **Unified Billing:** Centralizes costs across multiple providers.
- **Caching:** Reduces latency and costs for repeated queries.
- **Analytics:** Provides detailed insights into token usage and request patterns.
- **Implementation:** See `lib/getCloudflareGatewayGoogleModel.ts`.

### 3. Multi-Layered Defense-in-Depth Security

The application implements a rigorous 4-stage security pipeline to prevent abuse, reduce costs, and ensure service
availability without requiring user login.

#### Layer 1: Vercel Bot Identification

Uses `botid` to identify automated traffic at the edge. Known scrapers and automated tools are rejected immediately
before they consume any application resources.

#### Layer 2: Arcjet Rate Limiting & Bot Protection

Integrated via middleware in `lib/safe-action.ts`, **Arcjet** provides advanced rate limiting (Token Bucket algorithm)
and sophisticated bot detection.

- **IP-based limits:** Prevents single-source flooding.
- **Dynamic Analysis:** Detects suspicious request patterns.

#### Layer 3: Semantic Guardrails (The "Cheap" Check)

Before invoking the expensive grading model, the system runs a lightweight, high-speed verification step (
`actions/helpers/grade-matura.ts`).

- Uses a faster, cheaper model to verify if the input text is actually an essay/exam.
- Rejects nonsense, code, random strings, or unrelated topics (recipes, lyrics) effectively acting as a semantic
  firewall.

#### Layer 4: Structured AI Grading

Only after passing the previous layers is the expensive "Pro" model invoked to perform the complex grading logic,
returning strict JSON data used to render the UI.

## 🛠 Tech Stack

- **Runtime & Manager:** [Bun](https://bun.sh/) ⚡️
- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, [Shadcn UI](https://ui.shadcn.com/)
- **Animations:** Framer Motion
- **Server Actions:** [`next-safe-action`](https://next-safe-action.dev/)
- **AI Integration:** [Vercel AI SDK](https://sdk.vercel.ai/)
- **AI Provider:** Google Gemini (via Cloudflare AI Gateway)
- **Security:**
    - [Arcjet](https://arcjet.com/) (Rate Limiting/Bot Protection)
    - [Vercel BotID](https://vercel.com/docs/botid/) 

## 🚀 Getting Started

### Prerequisites

- **Bun** (v1.0+)
- A Vercel account (for BotID)
- An Arcjet account
- A Cloudflare account (for AI Gateway)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/lgandecki/MaturaGrade.git
   cd MaturaGrade
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file based on the following structure:

   ```env
   # AI Provider Keys
   CLOUDFLARE_TOKEN=your_cloudflare_token
   ACCOUNT_ID=your_cloudflare_account_id
   GATEWAY_ID=your_gateway_id

   # Security Keys
   ARCJET_KEY=your_arcjet_key

   # Rate Limiting Config (Optional)
   ARCJET_RATE_LIMIT_INTERVAL=120
   ARCJET_RATE_LIMIT_CAPACITY=5
   ```

4. **Run Development Server**

   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Key File Structure

* `app/actions/grade-matura-action.ts`: The main entry point for the grading logic, wrapped in `actionClient`.
* `lib/safe-action.ts`: Middleware definition where BotID and Arcjet protection are applied to server actions.
* `lib/arcjet.ts`: Configuration for Arcjet rules (Token Bucket, Bot Detection).
* `app/actions/helpers/grade-matura.ts`: Contains the logic for the two-step AI process (Guardrail check -\> Grading).
* `app/page.tsx`: The main frontend UI featuring the drag-and-drop zone and grading results visualization.

## 👤 Author

**Łukasz Gandecki**

* Twitter: [@lgandecki](https://twitter.com/lgandecki)
* LinkedIn: [Łukasz Gandecki](https://www.linkedin.com/in/lgandecki)
* Website: [lgandecki.net](https://lgandecki.net)

## 📄 License

This project is open source and available under the MIT License.
