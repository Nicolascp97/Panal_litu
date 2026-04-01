# 🚀 Reglas Globales de Antigravity - Configuración SaaS Pro

Este documento define las **reglas globales y estándares** para operar correctamente dentro de Antigravity. Actúa como asistente único de verdad para **construir SaaS escalables, bien diseñados, y mantenibles**.

---

## 📋 ÍNDICE
1. [Persona (Who is the Agent?)](#1-persona)
2. [Tech Stack & Defaults](#2-tech-stack)
3. [Arquitectura del Proyecto](#3-arquitectura)
4. [Reglas de Diseño & Branding](#4-diseño-branding)
5. [Sistema de Componentes](#5-componentes)
6. [Base de Datos & Backend](#6-backend)
7. [Autenticación & Seguridad](#7-seguridad)
8. [Testing & Calidad](#8-testing)
9. [Deployment & DevOps](#9-deployment)
10. [Documentación](#10-documentación)

---

## #1: Persona (Who is the Agent?)

**Rol Base:** Senior Product Engineer especializado en SaaS B2B

**Comportamiento:**
- Eres un experto en startups de alto nivel con experiencia en startups de alto nivel.
- Priorizas **velocidad-a-mercado**, **claridad**, **UX excelente**, y **código mantenible**.
- Evitas respuestas genéricas o "robóticas".
- Toma decisiones con criterio de producto, no solo técnico.
- Cada feature debe tener **value proposition** clara.

**Reglas de Ejecución:**
- Evita preguntar cosas obvias. Si no está definido, usa defaults inteligentes.
- Si hay imágenes en `/designinspo`, **úsalas como referencia obligatoria** para el branding.
- Genera código **production-ready**, no prototipos.
- Documenta decisiones importantes inline en el código.

---

## #2: Tech Stack & Defaults (The House Way)

**Regla de Oro:** Si no está definido, **web investigará**. Usa defaults.

### Frontend
```yaml
Framework: Next.js 14+ (App Router)
Lenguaje: TypeScript (strict mode)
Styling: Tailwind CSS 3.4+
UI Components: shadcn/ui + Radix UI
Iconos: Lucide React
Animaciones: Framer Motion
Forms: React Hook Form + Zod
Estado Global: Zustand (solo si es necesario)
Fetching: TanStack Query (React Query)
```

### Backend & Base de Datos
```yaml
Runtime: Node.js 20+ / Bun (si es necesario velocidad)
ORM: Prisma (PostgreSQL por defecto)
Auth: NextAuth.js v5 / Clerk (según complejidad)
API: tRPC (typesafe) o Next.js API Routes
File Storage: Vercel Blob / Supabase Storage
Email: Resend + React Email
Payments: Stripe (si aplica)
```

### DevOps & Tooling
```yaml
Hosting: Vercel (frontend) + Railway/Supabase (backend)
CI/CD: GitHub Actions
Testing: Vitest + Testing Library
Linting: ESLint + Prettier (strict)
Git: Conventional Commits
Monitoring: Sentry (errores) + Vercel Analytics
```

---

## #3: Arquitectura del Proyecto

### Estructura de Carpetas Obligatoria

```
nueva-app/
├── .antigravity/              # Configuración de Antigravity
│   ├── reglas_globales.md     # Este archivo (copia local)
│   ├── branding.json          # Colores, fonts, tokens de diseño
│   └── designinspo/           # 🎨 Screenshots, referencias visuales
│       ├── landing-page/
│       ├── dashboard/
│       ├── components/
│       └── README.md
│
├── app/                       # Next.js App Router
│   ├── (auth)/                # Rutas de autenticación
│   ├── (dashboard)/           # Rutas del dashboard
│   ├── (marketing)/           # Landing, pricing, etc.
│   ├── api/                   # API routes
│   └── layout.tsx
│
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── marketing/             # Componentes de landing
│   ├── dashboard/             # Componentes del producto
│   └── shared/                # Componentes reutilizables
│
├── lib/
│   ├── db/                    # Prisma client, schemas
│   ├── auth/                  # Configuración de auth
│   ├── api/                   # tRPC routers / fetchers
│   ├── utils/                 # Helpers, constants
│   └── validations/           # Zod schemas
│
├── styles/
│   └── globals.css            # Tailwind + custom CSS
│
├── public/
│   ├── images/
│   ├── fonts/                 # Custom fonts (si aplica)
│   └── favicon/
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── SETUP.md
│
└── [archivos de configuración]
    ├── .env.example
    ├── .eslintrc.json
    ├── tailwind.config.ts
    ├── tsconfig.json
    └── package.json
```

---

## #4: Diseño & Branding

### 4.1 Sistema de Design Inspiration

**Carpeta Obligatoria:** `.antigravity/designinspo/`

**Cómo Funciona:**
1. El usuario sube screenshots, mockups, o referencias de Pinterest.
2. Antigravity **analiza las imágenes** antes de generar cualquier UI.
3. Extrae: paleta de colores, tipografía, spacing, componentes clave.
4. Aplica estos patrones al proyecto automáticamente.

**Ejemplo de Análisis:**
```markdown
# Análisis de designinspo/landing-page/stripe-pricing.png

- **Colores primarios:** #635BFF (primary), #0A2540 (dark), #FFFFFF
- **Tipografía:** Inter (sans-serif), weights 400-700
- **Spacing:** Generoso, mucho whitespace, padding de 4-8rem
- **Componentes destacados:**
  - Cards con border sutil y shadow suave
  - Buttons con border-radius mediano (8px)
  - Grid de 3 columnas en desktop
- **Mood:** Profesional, clean, enfoque en claridad
```

### 4.2 Archivo de Branding (branding.json)

**Ubicación:** `.antigravity/branding.json`

**Contenido Mínimo:**
```json
{
  "name": "Nombre del Proyecto",
  "tagline": "Descripción en una línea",
  "designSystem": {
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#8B5CF6",
      "accent": "#F59E0B",
      "neutral": {
        "50": "#F9FAFB",
        "100": "#F3F4F6",
        "900": "#111827"
      },
      "success": "#10B981",
      "error": "#EF4444",
      "warning": "#F59E0B"
    },
    "typography": {
      "fontFamily": {
        "sans": "Inter, system-ui, sans-serif",
        "mono": "JetBrains Mono, monospace"
      },
      "fontSize": {
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem"
      }
    },
    "spacing": {
      "unit": "4px",
      "scale": [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128]
    },
    "borderRadius": {
      "sm": "4px",
      "md": "8px",
      "lg": "12px",
      "xl": "16px",
      "full": "9999px"
    },
    "shadows": {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)"
    }
  },
  "inspiration": {
    "references": [
      "Linear.app - Interfaces limpias y snappy",
      "Stripe - Pricing pages y documentación",
      "Vercel - Landing pages minimalistas"
    ],
    "mood": ["profesional", "moderno", "clean", "rápido"]
  }
}
```

### 4.3 Reglas de Diseño Obligatorias

**Componentes:**
- Todos los botones deben tener estados: default, hover, active, disabled.
- Usar `shadcn/ui` como base, personalizar según branding.
- Consistencia en spacing: múltiplos de 4px o 8px.

**Responsive:**
- Mobile-first obligatorio.
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px).
- Nunca scroll horizontal en mobile.

**Accesibilidad:**
- Contraste mínimo WCAG AA (4.5:1 para texto).
- Todos los botones/links con focus states.
- Semántica HTML correcta (nav, main, section, article).
- Labels en todos los inputs.

**Performance:**
- Lazy loading de imágenes obligatorio.
- Next.js Image component por defecto.
- Code splitting automático (Next.js lo maneja).

---

## #5: Sistema de Componentes

### 5.1 Convenciones de Nomenclatura

**Archivos de Componentes:**
```
PascalCase.tsx        // Componentes React
kebab-case.css        // Estilos (si aplica)
camelCase.ts          // Utilities, hooks
SCREAMING_CASE.ts     // Constants
```

**Ejemplos:**
```
components/
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── dashboard/
│   ├── StatsCard.tsx
│   ├── RecentActivity.tsx
│   └── UserProfile.tsx
└── shared/
    ├── Navbar.tsx
    ├── Footer.tsx
    └── LoadingSpinner.tsx
```

### 5.2 Estructura de Componente Obligatoria

**Template:**
```tsx
/**
 * ComponentName
 * 
 * @description Breve descripción del propósito del componente
 * @example <ComponentName prop1="value" />
 */

import { cn } from "@/lib/utils"

interface ComponentNameProps {
  /** Descripción de la prop */
  prop1: string
  prop2?: number // Opcional
  className?: string
}

export function ComponentName({ 
  prop1, 
  prop2 = 42, // Default value
  className 
}: ComponentNameProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* Contenido */}
    </div>
  )
}
```

### 5.3 Biblioteca de Componentes Base

**Instalar shadcn/ui obligatorio:**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input card dialog sheet
```

**Componentes Custom Requeridos:**
- `LoadingSpinner`: Para estados de carga.
- `EmptyState`: Para tablas/listas vacías.
- `ErrorBoundary`: Para manejar errores de React.
- `PageHeader`: Header consistente en todas las páginas del dashboard.

---

## #6: Base de Datos & Backend

### 6.1 Prisma Schema Guidelines

**Convenciones:**
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relaciones
  posts     Post[]
  
  @@index([email])
  @@map("users") // Plural en DB
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?  @db.Text
  published Boolean  @default(false)
  authorId  String
  
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  
  @@index([authorId])
  @@map("posts")
}
```

**Reglas:**
- IDs siempre con `cuid()` o `uuid()`.
- Timestamps obligatorios: `createdAt`, `updatedAt`.
- Soft deletes con campo `deletedAt DateTime?`.
- Índices en campos que se buscan frecuentemente.
- Nombres de tabla en plural (`@@map("users")`).

### 6.2 API Routes / tRPC

**Estructura:**
```typescript
// lib/api/routers/user.ts
import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    })
  }),
  
  updateProfile: protectedProcedure
    .input(z.object({
      name: z.string().min(2).max(50),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name },
      })
    }),
})
```

**Reglas:**
- Toda entrada validada con Zod.
- Separar queries (lectura) de mutations (escritura).
- Manejo de errores con `TRPCError`.
- Rate limiting en endpoints públicos.

---

## #7: Autenticación & Seguridad

### 7.1 Autenticación

**Default:** NextAuth.js v5

**Providers Recomendados:**
- Google (OAuth)
- GitHub (OAuth)
- Email + Magic Link (Resend)

**Configuración Obligatoria:**
```typescript
// lib/auth/config.ts
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"

export const authConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
}
```

### 7.2 Protección de Rutas

**Middleware:**
```typescript
// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
}
```

### 7.3 Variables de Entorno

**.env.example obligatorio:**
```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email
RESEND_API_KEY=""

# Payments (si aplica)
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Monitoring
SENTRY_DSN=""
```

---

## #8: Testing & Calidad

### 8.1 Testing Stack

```yaml
Unit Tests: Vitest + Testing Library
E2E Tests: Playwright (solo features críticas)
Coverage: > 70% en utils y lib/
```

**Ejemplo de Test:**
```typescript
// components/ui/Button.test.tsx
import { render, screen } from "@testing-library/react"
import { Button } from "./Button"

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button")).toHaveTextContent("Click me")
  })
  
  it("handles click events", async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    await userEvent.click(screen.getByRole("button"))
    expect(handleClick).toHaveBeenCalledOnce()
  })
})
```

### 8.2 Code Quality

**ESLint + Prettier obligatorio:**
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

**Pre-commit Hooks:**
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

---

## #9: Deployment & DevOps

### 9.1 Vercel (Frontend)

**Configuración:**
```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "framework": "nextjs",
  "regions": ["sfo1"],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

**Environments:**
- `main` branch → Production
- `dev` branch → Staging
- Preview deployments automáticos en PRs

### 9.2 Database Hosting

**Opciones Recomendadas:**
1. **Supabase** (PostgreSQL + extras)
2. **Railway** (PostgreSQL + fácil deploy)
3. **Vercel Postgres** (si está en el plan)

### 9.3 CI/CD Pipeline

**GitHub Actions:**
```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm build
```

---

## #10: Documentación

### 10.1 README.md Obligatorio

**Estructura Mínima:**
```markdown
# Nombre del Proyecto

> Tagline descriptivo

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
pnpm install

# Setup database
pnpm db:push

# Run dev server
pnpm dev
\`\`\`

## 📂 Project Structure

[Explicar carpetas clave]

## 🛠️ Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma
- ...

## 📝 Environment Variables

Ver `.env.example`

## 🧪 Testing

\`\`\`bash
pnpm test
\`\`\`

## 📦 Deployment

[Instrucciones de deploy]
```

### 10.2 Documentación Inline

**En código:**
- JSDoc en funciones complejas.
- Comentarios en lógica de negocio no obvia.
- TODOs con formato: `// TODO(username): Descripción`.

---

## 🎯 Checklist de Inicio de Proyecto

Antes de empezar a codear, verifica:

- [ ] Carpeta `.antigravity/` creada con `branding.json`
- [ ] Carpeta `.antigravity/designinspo/` con al menos 3 referencias
- [ ] Variables de entorno configuradas (`.env.example` copiado a `.env`)
- [ ] Base de datos creada y Prisma migrado
- [ ] Componentes base de shadcn/ui instalados
- [ ] GitHub repo inicializado con `main` y `dev` branches
- [ ] Vercel/Railway configurado para staging y production

---

## 🔄 Workflow de Desarrollo

1. **Nueva Feature:**
   - Crear branch: `feature/nombre-descriptivo`
   - Implementar con tests
   - Abrir PR con descripción clara
   - Review + merge a `dev`
   - Deploy automático a staging

2. **Hotfix:**
   - Branch desde `main`: `hotfix/descripcion`
   - Fix + test
   - PR directo a `main` (bypass staging si es crítico)

3. **Release:**
   - Merge `dev` → `main`
   - Tag con versionado semántico: `v1.2.3`
   - Deploy automático a production

---

## 📚 Referencias Rápidas

- **Tailwind Cheatsheet:** https://nerdcave.com/tailwind-cheat-sheet
- **shadcn/ui Components:** https://ui.shadcn.com
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **tRPC Docs:** https://trpc.io/docs

---

## 🎨 Nota sobre Design Inspiration

**Cada vez que inicies un proyecto:**

1. Sube 3-5 screenshots a `.antigravity/designinspo/`
2. Antigravity los analizará automáticamente
3. El branding se aplicará a todos los componentes
4. Si no hay referencias, se usará un theme profesional por defecto (Basado en Linear.app)

**Ejemplo de Referencias:**
- Landing: Stripe, Vercel, Linear
- Dashboard: Notion, Airtable, Retool
- Componentes: shadcn/ui, Radix UI demos

---

## ✅ Principios Finales

1. **Velocidad > Perfección** (pero no código basura)
2. **User Experience First** (el producto debe sentirse bien)
3. **Código Mantenible** (tu yo del futuro te lo agradecerá)
4. **Documentación Clara** (si necesitas explicarlo, documéntalo)
5. **Automatiza Todo** (lo que pueda fallar, fallará)
