#!/usr/bin/env tsx
import { execSync } from 'child_process';
import { existsSync, copyFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Duramation Setup\n');

const steps = [
  {
    name: 'Install dependencies',
    check: () => existsSync('node_modules'),
    run: () => execSync('pnpm install', { stdio: 'inherit' })
  },
  {
    name: 'Setup environment files',
    check: () => existsSync('apps/frontend/.env') && existsSync('apps/inngest-app/.env'),
    run: () => {
      if (!existsSync('apps/frontend/.env')) {
        copyFileSync('apps/frontend/.env.example', 'apps/frontend/.env');
        console.log('  ✅ Created apps/frontend/.env');
      }
      if (!existsSync('apps/inngest-app/.env')) {
        copyFileSync('apps/inngest-app/.env.example', 'apps/inngest-app/.env');
        console.log('  ✅ Created apps/inngest-app/.env');
      }
      if (!existsSync('packages/db/.env')) {
        copyFileSync('packages/db/.env.example', 'packages/db/.env');
        console.log('  ✅ Created packages/db/.env');
      }
    }
  },
  {
    name: 'Generate Prisma client',
    check: () => existsSync('packages/db/src/generated'),
    run: () => execSync('pnpm db:generate', { cwd: 'packages/db', stdio: 'inherit' })
  },
  {
    name: 'Run database migrations',
    check: () => false, // Always run
    run: () => {
      console.log('  ⚠️  Make sure your DATABASE_URL is set in packages/db/.env');
      console.log('  Press Ctrl+C to cancel, or Enter to continue...');
      execSync('read', { stdio: 'inherit', shell: true });
      execSync('pnpm db:push', { cwd: 'packages/db', stdio: 'inherit' });
    }
  },
  {
    name: 'Build packages',
    check: () => false, // Always run
    run: () => execSync('pnpm build:packages', { stdio: 'inherit' })
  }
];

async function setup() {
  for (const step of steps) {
    console.log(`\n📦 ${step.name}...`);
    
    if (step.check()) {
      console.log('  ✅ Already done, skipping');
      continue;
    }

    try {
      await step.run();
      console.log(`  ✅ ${step.name} complete`);
    } catch (error) {
      console.error(`  ❌ ${step.name} failed`);
      console.error(error);
      process.exit(1);
    }
  }

  console.log('\n✅ Setup complete!\n');
  console.log('📋 Next steps:');
  console.log('1. Configure environment variables in:');
  console.log('   - apps/frontend/.env');
  console.log('   - apps/inngest-app/.env');
  console.log('   - packages/db/.env');
  console.log('2. Start development: pnpm dev');
  console.log('3. Open http://localhost:3000 (frontend)');
  console.log('4. Open http://localhost:3001/api/inngest (Inngest UI)');
  console.log('\n📚 Documentation:');
  console.log('- DEV_PLAN.md - Development guide');
  console.log('- WORKFLOW_GUIDE.md - Quick workflow reference');
  console.log('- README.md - Full documentation');
}

setup().catch(console.error);
