# Database Schema Migration Plan for Content Creation Platform

## Overview
Transform Duramation from a general workflow automation platform to a specialized content creation workflow orchestration platform.

## New Models to Add

### 1. ContentProject
Represents a content project or campaign that groups related content pieces.

```prisma
model ContentProject {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name        String
  description String?
  status      ProjectStatus @default(ACTIVE)
  
  // Project metadata
  targetAudience String?
  contentGoals   Json?    // Array of goals
  brandGuidelines Json?   // Brand voice, tone, style
  
  // Scheduling
  startDate   DateTime?
  endDate     DateTime?
  
  // Relations
  contentPieces ContentPiece[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
  @@map("content_projects")
}

enum ProjectStatus {
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}
```

### 2. ContentPiece
Individual content items created through workflows.

```prisma
model ContentPiece {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  projectId   String?
  project     ContentProject? @relation(fields: [projectId], references: [id], onDelete: SetNull)
  
  workflowRunId String?
  workflowRun   WorkflowRun? @relation(fields: [workflowRunId], references: [id], onDelete: SetNull)
  
  // Content details
  title       String
  contentType ContentType
  format      String?      // e.g., "blog", "video", "social-post"
  platform    String?      // e.g., "youtube", "instagram", "blog"
  
  // Content data
  content     String?      // Main content/body
  metadata    Json?        // SEO, tags, categories, etc.
  assets      Json?        // URLs to images, videos, etc.
  
  // Status tracking
  status      ContentStatus @default(DRAFT)
  publishedAt DateTime?
  scheduledFor DateTime?
  
  // Analytics
  views       Int?
  engagement  Json?        // likes, shares, comments, etc.
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
  @@index([projectId])
  @@index([workflowRunId])
  @@index([status])
  @@map("content_pieces")
}

enum ContentType {
  ARTICLE
  VIDEO
  SOCIAL_POST
  EMAIL
  PODCAST
  INFOGRAPHIC
  EBOOK
  WHITEPAPER
  CASE_STUDY
  NEWSLETTER
}

enum ContentStatus {
  DRAFT
  IN_REVIEW
  SCHEDULED
  PUBLISHED
  ARCHIVED
}
```

### 3. ContentTemplate
Reusable content templates for different content types.

```prisma
model ContentTemplate {
  id          String   @id @default(cuid())
  userId      String?
  user        User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name        String
  description String?
  contentType ContentType
  
  // Template structure
  structure   Json     // Sections, placeholders, etc.
  defaultValues Json?  // Default content for placeholders
  
  // Sharing
  isPublic    Boolean  @default(false)
  usageCount  Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
  @@index([contentType])
  @@map("content_templates")
}
```

### 4. ContentCalendar
Editorial calendar for planning and scheduling content.

```prisma
model ContentCalendar {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name        String
  description String?
  
  // Calendar settings
  timezone    String   @default("UTC")
  
  // Relations
  entries     ContentCalendarEntry[]
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
  @@map("content_calendars")
}

model ContentCalendarEntry {
  id          String   @id @default(cuid())
  calendarId  String
  calendar    ContentCalendar @relation(fields: [calendarId], references: [id], onDelete: Cascade)
  
  contentPieceId String?
  contentPiece   ContentPiece? @relation(fields: [contentPieceId], references: [id], onDelete: SetNull)
  
  title       String
  description String?
  scheduledFor DateTime
  
  status      CalendarEntryStatus @default(PLANNED)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([calendarId])
  @@index([scheduledFor])
  @@map("content_calendar_entries")
}

enum CalendarEntryStatus {
  PLANNED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}
```

### 5. ContentAsset
Media assets used in content creation.

```prisma
model ContentAsset {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name        String
  description String?
  assetType   AssetType
  
  // Storage
  url         String
  storageKey  String   // R2/S3 key
  fileSize    Int?     // bytes
  mimeType    String?
  
  // Metadata
  dimensions  Json?    // width, height for images/videos
  duration    Int?     // seconds for video/audio
  tags        String[]
  
  // Usage tracking
  usageCount  Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
  @@index([assetType])
  @@map("content_assets")
}

enum AssetType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
  OTHER
}
```

## Modifications to Existing Models

### User Model
Add content-specific fields:

```prisma
model User {
  // ... existing fields ...
  
  // Content creation preferences
  contentPreferences Json?  // Preferred formats, platforms, etc.
  
  // New relations
  contentProjects    ContentProject[]
  contentPieces      ContentPiece[]
  contentTemplates   ContentTemplate[]
  contentCalendars   ContentCalendar[]
  contentAssets      ContentAsset[]
}
```

### Workflow Model
Add content-specific metadata:

```prisma
model Workflow {
  // ... existing fields ...
  
  // Content workflow specific
  contentType     ContentType?
  outputFormat    String?        // Expected output format
  targetPlatform  String?        // Target publishing platform
}
```

### WorkflowRun Model
Link to content pieces:

```prisma
model WorkflowRun {
  // ... existing fields ...
  
  // Content output
  contentPieces   ContentPiece[]
}
```

### Provider Enum
Add content creation providers:

```prisma
enum Provider {
  // ... existing providers ...
  OPENAI
  ANTHROPIC
  MIDJOURNEY
  ELEVENLABS
  CANVA
  YOUTUBE
  TWITTER
  LINKEDIN
  WORDPRESS
  MEDIUM
  SUBSTACK
}
```

## Migration Steps

### Phase 1: Add New Models (Non-Breaking)
1. Add `ContentProject` model
2. Add `ContentPiece` model
3. Add `ContentTemplate` model
4. Add `ContentCalendar` and `ContentCalendarEntry` models
5. Add `ContentAsset` model
6. Add new enums

### Phase 2: Modify Existing Models (Potentially Breaking)
1. Add optional fields to `User` model
2. Add optional fields to `Workflow` model
3. Add optional fields to `WorkflowRun` model
4. Extend `Provider` enum

### Phase 3: Data Migration (If Needed)
1. Migrate existing workflows to content-focused workflows
2. Create default content projects for existing users
3. Tag existing workflow runs with content types

### Phase 4: Update Application Logic
1. Update workflow templates to output `ContentPiece` records
2. Implement content calendar functionality
3. Add content analytics tracking
4. Update dashboard to show content metrics

## Rollback Plan

If migration needs to be rolled back:
1. All new tables can be dropped without affecting existing functionality
2. New optional fields on existing tables can be ignored
3. Keep backup of database before migration

## Testing Checklist

- [ ] Test new models creation
- [ ] Test relationships between models
- [ ] Test existing workflows still function
- [ ] Test data integrity constraints
- [ ] Performance test with large datasets
- [ ] Test rollback procedure

## Timeline Estimate

- Phase 1: 2-3 days (schema changes + migration)
- Phase 2: 1-2 days (existing model updates)
- Phase 3: 1-2 days (data migration scripts)
- Phase 4: 1-2 weeks (application logic updates)

**Total: 2-3 weeks for complete migration**
