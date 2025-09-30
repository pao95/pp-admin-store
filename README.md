# Prestamos de Consumo

A modern web application for managing financing entities within the system, built with React, TypeScript, and Vite.

## Project Architecture

The project follows the MVP (Model-View-Presenter) architecture pattern, organized in a modular structure:

```
src/
├── components/     # Reusable UI components
├── modules/        # Feature modules (each with its own MVP structure)
├── routes/         # Application routing configuration
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── utils/          # Utility functions
├── constants/      # Application constants
├── styles/         # Global styles and themes
├── assets/         # Static assets
└── config/         # Application configuration
```

### Feature Implementation

Each feature in the application follows the MVP (Model-View-Presenter) architecture pattern, with a clear separation of concerns. Here is an example:

For a practical demonstration of implementing a new feature following this pattern, check out the `new-feature-demonstration` branch.

#### Directory Structure

```
guideFeature/
├── core/                    # Core business logic
│   ├── actions/            # Business actions
│   ├── entities/           # Domain entities
│   ├── gateways/           # Interface definitions for external services
│   ├── presentation/       # Presenter interfaces
│   └── screens/            # Screen interfaces
├── infrastructure/         # Implementation details
│   ├── gateways/          # Gateway implementations
│   └── presentation/      # Presenter implementations
└── screens/               # React components
```

#### Component Interaction Flow

1. **Screen (View)**

   - React component that implements the UI
   - Defines view handlers for user interactions
   - Receives data from the presenter
   - Example:

   ```typescript
   const GuideFeature = () => {
     const viewHandlers = {
       onGetUsersSuccess: (userList) => setUserList(userList),
       onGetUsersError: (error) => handleError(error),
     };
     // ... UI rendering
   };
   ```

2. **Presenter**

   - Coordinates between View and Actions
   - Handles business logic flow
   - Manages state updates through view handlers
   - Example:

   ```typescript
   const UsersPresenter = (viewHandlers, getUsersAction) => ({
     async getUsers() {
       try {
         const users = await getUsersAction.execute();
         viewHandlers.onGetUsersSuccess(users);
       } catch (error) {
         viewHandlers.onGetUsersError(error);
       }
     },
   });
   ```

3. **Actions**

   - Contains business logic
   - Coordinates with Gateways for data operations
   - Example:

   ```typescript
   const GetUsersAction = (usersGateway) => ({
     async execute() {
       return await usersGateway.getUsers();
     },
   });
   ```

4. **Gateways**
   - Handles external service communication
   - Implements data transformation
   - Example:
   ```typescript
   const UsersGateway = (httpClient) => ({
     async getUsers() {
       const response = await httpClient.get(GET_USERS);
       return responseToUser(response.data);
     },
   });
   ```

#### Data Flow

1. User interaction triggers a screen method
2. Screen calls presenter method
3. Presenter executes appropriate action
4. Action uses gateway to fetch/update data
5. Gateway returns data to action
6. Action returns data to presenter
7. Presenter updates screen through view handlers

This architecture ensures:

- Clear separation of concerns
- Testable business logic
- Maintainable code structure
- Scalable feature implementation

Features are organized in the `modules` directory, where each feature has its own directory containing its MVP components.

## Setup and Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd prestamos-de-consumo
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Environment Variables

The application requires the following environment variables:

- `VITE_BASE_URL`: The base URL for API requests

  - Example: `https://api.example.com`
  - Used for configuring the API client

## Dependencies

The project uses several key dependencies:

- React 18
- TypeScript
- Vite
- Mantine UI
- React Router
- Axios
- i18next for internationalization

## Development

The project uses:

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Vitest for testing

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
