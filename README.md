
## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository or copy the folder.
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

- For development (with auto-reload):
  ```bash
  npm run dev
  ```
- For production:
  ```bash
  npm start
  ```

The app will run on `http://localhost:3000` by default.

## Usage

### Web Interface

- **Projects**:  
  Visit `/admin/project` to view, add, update, or delete projects.
- **Skills**:  
  Visit `/admin/skill` to view, add, update, or delete skills.

### API Endpoints

#### Skills

- `GET /api/skills` – List all skills
- `GET /api/skills/:id` – Get a skill by ID
- `POST /api/skills/add` – Add a new skill (`{ name, level }`)
- `PUT /api/skills/update/:id` – Update a skill by ID (`{ name, level }`)
- `DELETE /api/skills/delete/:id` – Delete a skill by ID

#### Projects

- `GET /api/projects` – List all projects
- `GET /api/projects/:id` – Get a project by ID
- `POST /api/projects/add` – Add a new project (`{ title, description, technologies, githubLink, liveLink }`)
- `PUT /api/projects/update/:id` – Update a project by ID
- `DELETE /api/projects/delete/:id` – Delete a project by ID

### Views

- `views/` contains Pug templates for all forms and lists:
  - `projects.pug`, `addProject.pug`, `updateProject.pug`
  - `skills.pug`, `addSkill.pug`, `updateSkill.pug`
  - `layout.pug` for base layout

### Static Files

- CSS styles are in `public/css/styles.css`.

## Dependencies

- express
- pug
- dotenv
- mongoose
- nodemon (dev)

## Environment Variables

- Create a `.env` file if you want to specify a custom `PORT` (default is 3000).

## Author

- _[Abraham Adeniyi]_
