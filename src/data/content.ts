import { profile } from './profile';

const { name, title, linkedin, email, phone } = profile;

export const FILE_CONTENTS: Record<string, string> = {
  'README.md': `# ${name}

**${title}**

---

I build backend systems using Java and Spring Boot — focusing on reliability, clean APIs, and maintainable code.

Currently working at [Finders](https://finders.pk) in Karachi, where I develop and maintain microservices supporting
user management, messaging, and core business functionality.

## What I work on

\`\`\`
Language     Java
Framework    Spring Boot · Spring
APIs         REST · Async APIs
Auth         JWT · Spring Security
Databases    PostgreSQL · Redis
Gateway      Zuul API Gateway
Monitoring   Grafana · Application Logs
CI/CD        TeamCity
VCS          Git · GitHub
\`\`\`

## Navigate

| File | Description |
|------|-------------|
| [about.md](about.md) | Background and engineering focus |
| [experience.md](experience.md) | Current role at Finders |
| [skills.md](skills.md) | Technical skills by category |
| [education.md](education.md) | Academic background |
| [projects/README.md](projects/README.md) | Future project documentation |
| [contact.md](contact.md) | How to reach me |
| [terminal.md](terminal.md) | Available terminal commands |

---

> Open the **Terminal** panel below and type \`help\` to explore interactively.
`,

  'about.md': `# About

I am a Junior Java Backend Developer based in Karachi, Pakistan, with professional
experience building microservice-based backend systems using Java and Spring Boot.

## Engineering Focus

My day-to-day work revolves around the design and implementation of backend services
that are reliable, maintainable, and performant. I have direct experience working
across the full lifecycle of backend features — from writing and reviewing REST API
endpoints to investigating production issues using Grafana dashboards and application logs.

I am particularly interested in:

- **Service Architecture** — structuring microservices with clean boundaries and
  well-defined communication patterns
- **Security** — implementing JWT-based authentication and authorization correctly
- **Data Layer** — writing efficient PostgreSQL queries and applying Redis caching
  where appropriate
- **Observability** — using Grafana and structured logging to understand system behavior
- **CI/CD** — maintaining build pipelines and resolving build failures systematically

## Background

Backend development is where my attention naturally lands. I find the combination of
systems thinking, data modeling, and API design more engaging than frontend concerns,
and I have oriented my learning and work accordingly.

I work in Agile environments and am comfortable with the full development cycle from
local development through TeamCity builds to deployment.

## Currently

Working as a Junior Java Backend Developer at **Finders** (August 2025 – Present),
contributing to a microservice architecture that handles user management, messaging,
and business-critical backend functionality.

---

> See [experience.md](experience.md) for a detailed breakdown of my current role.
`,

  'experience.md': `# Experience

## Junior Java Backend Developer

**Finders** · Karachi · *August 2025 – Present*

---

### Microservices & Core Backend

- Developed and maintained Spring Boot microservices supporting user management,
  messaging, and core business functionality.
- Developed and enhanced REST API endpoints supporting application features and
  service integrations.
- Worked with asynchronous APIs for improved application performance.
- Configured Zuul API Gateway routes and supported microservice-to-microservice
  communication.

### Data & Caching

- Implemented Redis caching to reduce database load and improve response times.
- Optimized PostgreSQL queries for improved backend performance.

### Security

- Implemented JWT-based authentication and authorization to secure REST APIs and
  manage user access.

### Observability & Debugging

- Used Grafana dashboards, application logs, and debugging tools to investigate
  and resolve backend issues.

### CI/CD & Deployment

- Executed TeamCity builds, diagnosed and resolved build failures, and supported
  deployments within an Agile development environment.

---

## Environment

\`\`\`
Language     Java
Framework    Spring Boot
APIs         REST · Async
Auth         JWT
Gateway      Zuul
Database     PostgreSQL
Cache        Redis
Monitoring   Grafana
CI/CD        TeamCity
Process      Agile
\`\`\`
`,

  'skills.md': `# Skills

## Backend

| Technology | Notes |
|------------|-------|
| Java | Primary language |
| Spring Boot | Service development |
| Spring | Core framework |
| REST APIs | Design and implementation |
| Microservices | Service-oriented architecture |
| JWT | Authentication and authorization |
| Async APIs | Asynchronous service communication |

## Database

| Technology | Notes |
|------------|-------|
| PostgreSQL | Primary relational database |
| SQL | Query writing and optimization |
| Redis | Caching and session management |

## Infrastructure & Development Tools

| Technology | Notes |
|------------|-------|
| Zuul API Gateway | Route configuration and management |
| TeamCity | CI/CD pipeline and build management |
| Grafana | Dashboard monitoring and observability |
| Git | Version control |
| GitHub | Repository management and collaboration |

## Engineering Practices

- Object-Oriented Programming
- API Development & Design
- Authentication & Authorization
- Debugging & Root Cause Analysis
- Performance Optimization
- Microservice Communication Patterns
`,

  'education.md': `# Education

<!-- PLACEHOLDER: Update with your actual degree, institution, graduation year, and any relevant coursework. -->

## Degree

**[Your Degree — e.g. Bachelor of Science in Computer Science]**
*[Institution Name] · [City] · [Start Year] – [End Year]*

---

> This section is intentionally left as a placeholder.
> Update with your actual academic credentials.
`,

  'projects/README.md': `# Projects

Project documentation will be added to this directory.

---

This directory is intentionally structured so new projects can be added without
changing the main portfolio interface.

## Structure

\`\`\`
projects/
├── README.md          ← this file
├── project-name.md    ← add future projects here
└── ...
\`\`\`

## Adding a Project

When a new project is ready to be published, create a Markdown file in this
directory and add a corresponding entry to \`src/data/projects.ts\`.

The portfolio UI will automatically pick up and render new project entries.

---

> *No projects are listed at this time.*
`,

  'contact.md': `# Contact

## Get in Touch

Run the following command in the terminal below:

\`\`\`bash
git contact
\`\`\`

This will print my contact details directly in the terminal.

---

## Contact Details

| | |
|---|---|
| Phone | ${phone} |
| Email | [${email}](mailto:${email}) |
| LinkedIn | [linkedin.com/in/abdulbasitjafri](${linkedin}) |

---

### Download CV

\`\`\`bash
git pull cv
\`\`\`

---

> I am open to backend engineering roles, particularly in Java / Spring Boot / microservices.
`,

  'terminal.md': `# Terminal

The integrated terminal is a simulated portfolio terminal.

It does not execute operating-system commands.

## Available Commands

\`\`\`
help              Show this command list
clear             Clear the terminal
ls                List portfolio files
cat <file>        Display file contents

cat README.md
cat about.md
cat experience.md
cat skills.md
cat education.md
cat contact.md
cat terminal.md

  git pull cv       Download CV / resume
  git contact       Show contact information
\`\`\`

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ↑   | Previous command |
| ↓   | Next command |
| Tab | Autocomplete |
| Ctrl+L | Clear terminal |
| Enter | Execute |

---

> Unknown commands return a helpful error. No system commands are executed.
`,
};
