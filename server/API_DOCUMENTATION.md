# AI-Powered Thumbnail Generator API Documentation

## Overview

The AI-Powered Thumbnail Generator is a RESTful API that allows users to generate custom thumbnails using AI technology. The API supports Google OAuth authentication and provides endpoints for user management and thumbnail generation.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Users authenticate via Google OAuth and receive access and refresh tokens.

### Authentication Flow

1. **Google OAuth Login**: Redirect users to `/auth/google`
2. **Callback**: Google redirects to `/auth/google/callback`
3. **Token Response**: API returns access token in header and refresh token in body
4. **Protected Routes**: Include `Authorization: <access_token>` header

## API Endpoints

### Authentication Endpoints

#### 1. Google OAuth Login

**GET** `/auth/google`

Initiates Google OAuth authentication flow.

**Response:**
- Redirects to Google OAuth consent screen

---

#### 2. Google OAuth Callback

**GET** `/auth/google/callback`

Handles Google OAuth callback and authenticates user.

**Response:**
```json
{
  "success": true,
  "message": "Welcome back John Doe",
  "data": {
    "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Headers:**
```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

#### 3. Get Current User

**GET** `/auth/me`

Returns information about the currently authenticated user.

**Headers:**
```
Authorization: <access_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Success",
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "credits": 5,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

#### 4. Refresh Access Token

**PUT** `/auth/refresh-access-token`

Refreshes the access token using a valid refresh token.

**Request Body:**
```json
{
  "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Headers:**
```
Authorization: <new_access_token>
```

---

#### 5. Logout

**DELETE** `/auth/logout`

Logs out the current user and invalidates refresh token.

**Headers:**
```
Authorization: <access_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout Successful",
  "data": null
}
```

---

### Thumbnail Generation Endpoints

#### 1. Generate Thumbnail

**POST** `/generate`

Generates a custom thumbnail using AI based on uploaded image and user specifications.

**Headers:**
```
Authorization: <access_token>
Content-Type: multipart/form-data
```

**Request Body:**
- **File**: `thumbnail-context` (image file, max 10MB)
- **Data**: JSON string containing generation parameters

**Data Schema:**
```json
{
  "prompt": "Optional additional creative instructions",
  "fontOptions": {
    "mainTitle": "Your Main Title",
    "description": "Your subtitle or description",
    "fontStyle": "modern|bold|handwritten|playful|professional|casual|funny|romantic",
    "fontColor": "black",
    "backgroundColor": "white",
    "fontSize": "very-small|small|medium|large|very-large",
    "fontFamily": "Inter"
  },
  "photoOptions": {
    "backgroundType": "blur-the-uploaded-photo|solid-background|gradient-background|ai-generated-background",
    "someDetailAboutBackground": "Description of desired background"
  },
  "thumbnailElements": {
    "ctaBadge": "Watch Now or Miss"
  },
  "outputPreferences": {
    "thumbnailSize": "1280x720|1920x1080|1080x1080|1080x1350|1080x1920|1200x627|1584x396",
    "downloadFormat": "png|jpg|jpeg|webp",
    "downloadQuality": "low|medium|high"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Image Generated Successfully",
  "data": {
    "inputImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/input.jpg",
    "generatedImage": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/generated.png"
  }
}
```

**Error Responses:**
- `400`: Invalid file or body data
- `401`: Authentication required
- `400`: Failed to generate image or upload

---

## Data Models

### User Model

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  provider: "GOOGLE" | "GITHUB";
  avatar?: string;
  refreshToken?: string;
  credits: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### InputImage Model

```typescript
interface InputImage {
  id: string;
  imageUrl: string;
  userId: string;
  instructions: GenerationInstructions;
}
```

### GeneratedImage Model

```typescript
interface GeneratedImage {
  id: string;
  image: string;
  inputImageId: string;
  userId: string;
  isChildImage: boolean;
  parentImageId?: string;
  createdAt: Date;
  updatedAt: Date;
  followUpRequirement?: string;
}
```

## Error Handling

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

### Common HTTP Status Codes

- `200`: Success
- `400`: Bad Request (validation errors, invalid data)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

- Users start with 5 credits
- Each thumbnail generation consumes 1 credit
- Credits can be increased through admin panel or payment integration

## File Upload Limits

- Maximum file size: 10MB
- Supported formats: Common image formats (PNG, JPG, JPEG, WebP)
- Files are temporarily stored and automatically cleaned up

## AI Services Integration

The API integrates with multiple AI services:

1. **Groq (Llama 3.1 8B)**: Generates optimized prompts for image generation
2. **Google Gemini 2.5 Flash**: Generates the actual thumbnail images
3. **Cloudinary**: Handles image storage and delivery

## Environment Variables

Required environment variables for the API:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://...
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/v1/auth/google/callback
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
GEMINI_API_KEY=your-gemini-api-key
GROQ_API_KEY=your-groq-api-key
```

## CORS Configuration

The API is configured to accept requests from the client URL specified in `CLIENT_URL` environment variable.

## Database

The API uses PostgreSQL with Prisma ORM. Key models include:
- Users (authentication and credits)
- InputImages (uploaded images and instructions)
- GeneratedImages (AI-generated thumbnails)

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Input Validation**: Zod schema validation for all inputs
3. **File Upload Security**: Multer with size limits and type validation
4. **CORS Protection**: Configured CORS policies
5. **Environment Variables**: Sensitive data stored in environment variables

## Example Usage

### Complete Authentication Flow

```javascript
// 1. Redirect user to Google OAuth
window.location.href = 'http://localhost:3000/api/v1/auth/google';

// 2. After callback, extract tokens
const accessToken = response.headers['authorization'];
const refreshToken = response.data['refresh-token'];

// 3. Use access token for protected requests
fetch('http://localhost:3000/api/v1/auth/me', {
  headers: {
    'Authorization': accessToken
  }
});
```

### Generate Thumbnail

```javascript
const formData = new FormData();
formData.append('thumbnail-context', imageFile);
formData.append('data', JSON.stringify({
  fontOptions: {
    mainTitle: "Amazing Video Title",
    description: "Watch this incredible content",
    fontStyle: "bold",
    fontColor: "white",
    backgroundColor: "transparent",
    fontSize: "large",
    fontFamily: "Inter"
  },
  photoOptions: {
    backgroundType: "ai-generated-background",
    someDetailAboutBackground: "Modern tech theme with blue gradients"
  },
  thumbnailElements: {
    ctaBadge: "Watch Now!"
  },
  outputPreferences: {
    thumbnailSize: "1280x720",
    downloadFormat: "png",
    downloadQuality: "high"
  }
}));

fetch('http://localhost:3000/api/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': accessToken
  },
  body: formData
});
```

## Support

For API support and questions, please refer to the project documentation or contact the development team.
