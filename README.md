# HalfMind

**Notes that forget, so you don't have to.**

> 🚧 **Under Active Development** — Architecture and core infrastructure are in place. Features are being actively implemented. Expect breaking changes.

HalfMind is a note-taking system where notes you stop engaging with quietly fade — losing visual prominence over time — while notes you revisit stay vivid. Each evening, a recap tells you what stayed alive, what's fading, and what disappeared. An experiment in *temporal relevance*: your notes should reflect how your attention actually works, not how a file system organizes data.

---

## 🏗️ Architecture

Strict layered architecture — each layer has one job, data flows in one direction, no layer reaches past its neighbor.

```mermaid
flowchart LR
    A["Client"] --> B["FastAPI Router"]
    B --> C["Service Layer"]
    C --> D["Security Module"]
    C --> E["SQLAlchemy ORM"]
    E --> F["PostgreSQL"]

    style A fill:#6366f1,color:#fff,stroke:none
    style B fill:#8b5cf6,color:#fff,stroke:none
    style C fill:#a855f7,color:#fff,stroke:none
    style D fill:#f59e0b,color:#fff,stroke:none
    style E fill:#c084fc,color:#fff,stroke:none
    style F fill:#336791,color:#fff,stroke:none
```

| Layer | Responsibility |
|---|---|
| **Router** (`routers/`) | HTTP handling, input validation via Pydantic, delegation to services. Zero business logic. |
| **Service** (`services/`) | All business logic — orchestration, data operations, session lifecycle. |
| **Schema** (`schemas/`) | API contracts. Response schemas exclude sensitive fields by design. |
| **Model** (`models/`) | SQLAlchemy 2.0 `Mapped` models mapping directly to PostgreSQL tables. |
| **Security** (`security/`) | Isolated cryptographic operations — hashing, verification, decoupled from routes. |
| **Database** (`database/`) | Engine config, `DeclarativeBase`, env-driven connection parameters. |

---

## 🛠️ Tech Stack

| | Technology | Why |
|---|---|---|
| ⚙️ | **FastAPI** | Async, auto-generated OpenAPI docs, native Pydantic validation |
| 🗄️ | **PostgreSQL + SQLAlchemy 2.0** | Type-safe ORM (`Mapped`), constraint enforcement, transactional integrity |
| 🔑 | **pwdlib (Argon2id)** | OWASP-recommended, memory-hard password hashing |
| 🎫 | **PyJWT** | JWT-based authentication |
| ⚛️ | **React + TypeScript + Vite** | Type-safe frontend with React Compiler for automatic memoization |

---

## 🔐 Security

- **Argon2id** password hashing via `PasswordHash.recommended()` — isolated in `security/`, swappable without touching business logic
- **Schema-level protection** — response DTOs structurally exclude `password_hash`; the API *cannot* leak it
- **No hardcoded secrets** — all credentials loaded from env vars, `.env` is git-ignored

---

## 🧠 Engineering Decisions

| Decision | Rationale |
|---|---|
| Thin routers, fat services | Business logic is testable without HTTP. Routes can change without touching core logic. |
| Separate schemas from models | Request DTOs ≠ DB models ≠ response DTOs. Prevents accidental field exposure and allows independent evolution. |
| Isolated security module | Hashing algorithm can be swapped in one file. All crypto lives in `security/`. |
| Explicit session management | Service layer owns transaction boundaries via context managers — no hidden state, guaranteed cleanup. |
| `ConfigDict(from_attributes=True)` | ORM objects serialize directly through Pydantic — no manual conversion boilerplate. |

---

## ⚙️ Getting Started

### Backend

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
# Create .env with DATABASE_URL (see below)
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install && npm run dev
```

### Configuration

```env
DATABASE_URL=postgresql+psycopg://user:password@localhost:5432/halfmind
```

> ⚠️ Never commit `.env` files — already git-ignored.

API docs auto-generated at `http://localhost:8000/docs`.

---

## 🌱 Development Workflow

**Feature-branch workflow** — `main` is always stable.

```bash
git checkout -b feature/your-feature
# work, commit with conventional commits (feat:, fix:, refactor:)
# open PR → review → merge
```

---

## 🤝 Contributing

1. Fork → feature branch → follow architectural patterns → PR against `main`
2. **Routers** delegate only. **Services** own logic. **Schemas** separate input from output. **Models** use `Mapped` style.
3. Never put business logic in a router. Never return raw models. Never store plaintext passwords.

---

## 📄 License

MIT License — Copyright © 2026 NeonWest. See [LICENSE](LICENSE).
