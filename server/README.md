# AI-Powered Thumbnail Generator - Server

A powerful backend API for generating custom thumbnails using AI technology. This server provides authentication via Google OAuth and thumbnail generation using Google Gemini and Groq AI services.

## 🚀 Features

- **Google OAuth Authentication**: Secure user authentication with JWT tokens
- **AI-Powered Thumbnail Generation**: Uses Google Gemini 2.5 Flash for image generation
- **Smart Prompt Generation**: Leverages Groq (Llama 3.1 8B) for optimized prompts
- **Cloud Storage**: Integrated with Cloudinary for image storage and delivery
- **Credit System**: User credit management for thumbnail generation
- **Multiple Output Formats**: Support for various thumbnail sizes and formats
- **TypeScript**: Fully typed codebase for better development experience
- **Prisma ORM**: Type-safe database operations with PostgreSQL

## 🛠️ Tech Stack

- **Runtime**: Bun (with Node.js compatibility)
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Passport.js with Google OAuth 2.0
- **AI Services**: Google Gemini 2.5 Flash, Groq (Llama 3.1 8B)
- **Cloud Storage**: Cloudinary
- **File Upload**: Multer
- **Validation**: Zod
- **Security**: JWT, CORS

## 📋 Prerequisites

Before running the server, ensure you have:

- [Bun](https://bun.sh/) installed (recommended) or Node.js 18+
- PostgreSQL database
- Google Cloud Console project with OAuth 2.0 credentials
- Cloudinary account
- Google Gemini API key
- Groq API key

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ai-powered-thumbnail-generator/server
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in the required environment variables in `.env`:

   ```env
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/thumbnail_generator"

   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
   JWT_EXPIRES_IN="7d"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key-min-32-chars"
   JWT_REFRESH_EXPIRES_IN="7d"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GOOGLE_REDIRECT_URI="http://localhost:3000/api/v1/auth/google/callback"

   # Client Configuration
   CLIENT_URL="http://localhost:5173"

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
   CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

   # AI Services
   GEMINI_API_KEY="your-google-gemini-api-key"
   GROQ_API_KEY="your-groq-api-key"
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   bunx prisma generate

   # Run database migrations
   bunx prisma migrate dev

   # (Optional) Seed the database
   bunx prisma db seed
   ```

5. **Create required directories**
   ```bash
   mkdir -p temp
   ```

## 🚀 Running the Server

### Development Mode

```bash
# Start the development server with hot reload
bun run dev
# or
npm run dev
```

This will:

- Compile TypeScript files
- Start the server with nodemon for hot reload
- Watch for file changes

### Production Mode

```bash
# Build the project
bun run build
# or
npm run build

# Start the production server
bun start
# or
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your environment variables).

## 📁 Project Structure

```
server/
├── src/
│   ├── constants/          # Application constants
│   │   ├── cors.constant.ts
│   │   └── prompts.constant.ts
│   ├── controllers/        # Route controllers
│   │   ├── auth.controller.ts
│   │   └── generate.controller.ts
│   ├── libs/              # External service integrations
│   │   ├── ai.lib.ts      # AI service configurations
│   │   ├── cloudinary.lib.ts
│   │   └── passport.lib.ts
│   ├── middlewares/       # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── multer.middleware.ts
│   ├── routes/            # API routes
│   │   ├── auth.route.ts
│   │   └── generate.route.ts
│   ├── schemas/           # Zod validation schemas
│   │   ├── auth.schemas.ts
│   │   └── generate.schema.ts
│   ├── services/          # Business logic services
│   │   ├── ai.service.ts
│   │   └── user.service.ts
│   ├── types/             # TypeScript type definitions
│   │   └── global.d.ts
│   ├── utils/             # Utility functions
│   │   ├── async-handler.util.ts
│   │   └── response-handler.util.ts
│   ├── db.ts              # Database connection
│   ├── env.ts             # Environment validation
│   └── index.ts           # Application entry point
├── prisma/
│   ├── migrations/        # Database migrations
│   └── schema.prisma      # Database schema
├── temp/                  # Temporary file storage
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Authentication

- `GET /api/v1/auth/google` - Initiate Google OAuth
- `GET /api/v1/auth/google/callback` - OAuth callback
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/refresh-access-token` - Refresh access token
- `DELETE /api/v1/auth/logout` - Logout user

### Thumbnail Generation

- `POST /api/v1/generate` - Generate thumbnail

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md).

## 🗄️ Database Schema

### User Model

- `id`: Unique identifier
- `name`: User's display name
- `email`: User's email address
- `provider`: Authentication provider (Google/GitHub)
- `avatar`: Profile picture URL
- `refreshToken`: JWT refresh token
- `credits`: Available generation credits
- `createdAt`/`updatedAt`: Timestamps

### InputImage Model

- `id`: Unique identifier
- `imageUrl`: Cloudinary URL of uploaded image
- `userId`: Reference to user
- `instructions`: JSON object with generation parameters

### GeneratedImage Model

- `id`: Unique identifier
- `image`: Cloudinary URL of generated thumbnail
- `inputImageId`: Reference to input image
- `userId`: Reference to user
- `isChildImage`: Whether this is a follow-up generation
- `parentImageId`: Reference to parent image (for follow-ups)
- `followUpRequirement`: Description of follow-up request

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using Zod schemas
- **File Upload Security**: Size limits and type validation
- **CORS Protection**: Configured CORS policies
- **Environment Variables**: Sensitive data stored securely
- **Error Handling**: Centralized error handling middleware

## 🧪 Testing

```bash
# Run tests (if test suite is set up)
bun test
# or
npm test
```

## 📊 Monitoring & Logging

The server includes:

- Console logging for development
- Error tracking and reporting
- Request/response logging
- Database query logging (in development)

## 🚀 Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure production database URL
3. Set up production OAuth credentials
4. Configure production Cloudinary settings
5. Set up production AI service API keys

### Build and Deploy

```bash
# Build the application
bun run build

# Start the production server
bun start
```

### Docker Deployment (Optional)

```dockerfile
FROM oven/bun:1 as base
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["bun", "start"]
```

## 🔧 Configuration

### CORS Configuration

The server is configured to accept requests from the client URL specified in the `CLIENT_URL` environment variable.

### File Upload Configuration

- Maximum file size: 10MB
- Supported formats: Common image formats
- Temporary storage in `temp/` directory
- Automatic cleanup after processing

### AI Service Configuration

- **Groq**: Used for prompt optimization (Llama 3.1 8B)
- **Google Gemini**: Used for image generation (Gemini 2.5 Flash)
- **Cloudinary**: Used for image storage and delivery

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Issues**

   - Verify `DATABASE_URL` is correct
   - Ensure PostgreSQL is running
   - Check database permissions

2. **Authentication Issues**

   - Verify Google OAuth credentials
   - Check redirect URI configuration
   - Ensure JWT secrets are properly set

3. **File Upload Issues**

   - Check `temp/` directory permissions
   - Verify file size limits
   - Ensure proper file format

4. **AI Service Issues**
   - Verify API keys are valid
   - Check API quotas and limits
   - Monitor service status

### Logs

Check the console output for detailed error messages and debugging information.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Check the [API Documentation](./API_DOCUMENTATION.md)
- Review the troubleshooting section
- Open an issue on GitHub
- Contact the development team

## 🔄 Updates

To update dependencies:

```bash
bun update
# or
npm update
```

To update the database schema:

```bash
bunx prisma migrate dev
```

---

**Happy coding! 🎉**
