#!/usr/bin/env node

/**
 * Script to update API routes to use the new authenticateUser utility
 * Run this script from the project root: node update-auth-script.js
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files that have already been updated
const updatedFiles = [
  'apps/inngest-app/src/app/api/credentials/route.ts',
  'apps/inngest-app/src/app/api/dashboard/metrics/route.ts',
  'apps/inngest-app/src/app/api/workflows/route.ts',
  'apps/inngest-app/src/app/api/dashboard/service-requests/route.ts'
];

// Find all API route files
const apiFiles = glob.sync('apps/inngest-app/src/app/api/**/route.ts');

// Patterns to replace
const patterns = [
  // Pattern 1: const { userId: clerkUserId } = await auth();
  {
    search: /const\s*{\s*userId:\s*clerkUserId\s*}\s*=\s*await\s+auth\(\);\s*if\s*\(\s*!clerkUserId\s*\)\s*{\s*return\s+NextResponse\.json\(\s*{\s*error:\s*["']Unauthorized["']\s*},\s*{\s*status:\s*401\s*}\s*\);\s*}\s*const\s+userId\s*=\s*await\s+getInternalUserId\(\s*clerkUserId\s+as\s+ClerkUserId\s*\);\s*if\s*\(\s*!userId\s*\)\s*{\s*return\s+NextResponse\.json\(\s*{\s*error:\s*["']User not found["']\s*},\s*{\s*status:\s*404\s*}\s*\);\s*}/gs,
    replace: `const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;`
  },
  // Pattern 2: const user = await auth(); (with different variable names)
  {
    search: /const\s+user\s*=\s*await\s+auth\(\);\s*if\s*\(\s*!user\s*\|\|\s*!user\.userId\s*\)\s*{\s*return\s+.*?;\s*}\s*const\s+\w+\s*=\s*await\s+getInternalUserId\(\s*user\.userId\s+as\s+ClerkUserId\s*\);\s*if\s*\(\s*!\w+\s*\)\s*{\s*return\s+.*?;\s*}/gs,
    replace: `const authResult = await authenticateUser();
    
    if (isAuthError(authResult)) {
      return authResult;
    }

    const { userId } = authResult;`
  }
];

// Import patterns to add/update
const importUpdates = [
  {
    // Remove old imports
    search: /import\s*{\s*auth\s*}\s*from\s*["']@clerk\/nextjs\/server["'];\s*/g,
    replace: ''
  },
  {
    search: /import\s*{\s*getInternalUserId\s*}\s*from\s*["'][^"']*["'];\s*/g,
    replace: ''
  },
  {
    search: /import\s*{\s*ClerkUserId[^}]*}\s*from\s*["'][^"']*["'];\s*/g,
    replace: ''
  },
  {
    // Add new import (if not already present)
    search: /(import.*from\s*["']next\/server["'];?\s*)/,
    replace: '$1import { authenticateUser, isAuthError } from "@/lib/utils/auth";\n'
  }
];

console.log('🔄 Starting authentication utility migration...\n');

apiFiles.forEach(filePath => {
  if (updatedFiles.includes(filePath)) {
    console.log(`⏭️  Skipping ${filePath} (already updated)`);
    return;
  }

  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Check if file contains auth patterns
    if (!content.includes('await auth()')) {
      console.log(`⏭️  Skipping ${filePath} (no auth patterns found)`);
      return;
    }

    console.log(`🔧 Processing ${filePath}...`);

    // Apply import updates
    importUpdates.forEach(({ search, replace }) => {
      if (content.match(search)) {
        content = content.replace(search, replace);
        hasChanges = true;
      }
    });

    // Apply pattern replacements
    patterns.forEach(({ search, replace }) => {
      if (content.match(search)) {
        content = content.replace(search, replace);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${filePath}`);
    } else {
      console.log(`⚠️  No patterns matched in ${filePath} - may need manual review`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
});

console.log('\n🎉 Migration complete! Please review the changes and test your API endpoints.');
console.log('\n📝 Manual review may be needed for files with complex auth patterns.');