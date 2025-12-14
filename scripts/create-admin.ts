/**
 * Emergency Admin Creation Script
 * 
 * Use this script to create an admin if all existing admins are deleted.
 * 
 * Usage:
 *   npx ts-node scripts/create-admin.ts <email> <password> <name>
 * 
 * Example:
 *   npx ts-node scripts/create-admin.ts admin@example.com SecurePass123 "Admin Name"
 */

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

// Create Prisma client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function createAdmin(email: string, password: string, name: string) {
  try {
    // Validate inputs
    if (!email || !password || !name) {
      console.error('Error: Email, password, and name are required');
      console.log('\nUsage: npx ts-node scripts/create-admin.ts <email> <password> <name>');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('Error: Password must be at least 8 characters long');
      process.exit(1);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error('Error: Invalid email format');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      console.error(`Error: User with email ${email} already exists`);
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        name: name.trim(),
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    console.log('\n✅ Admin created successfully!');
    console.log('\nAdmin Details:');
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Name: ${user.name}`);
    console.log(`  Created: ${user.createdAt}`);
    console.log('\nYou can now login with this account at /admin/login\n');
  } catch (error: any) {
    console.error('\n❌ Error creating admin:', error.message);
    if (error.code === 'P2002') {
      console.error('A user with this email already exists');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error('Error: Missing required arguments');
  console.log('\nUsage: npx ts-node scripts/create-admin.ts <email> <password> <name>');
  console.log('\nExample:');
  console.log('  npx ts-node scripts/create-admin.ts admin@example.com SecurePass123 "Admin Name"');
  process.exit(1);
}

const [email, password, name] = args;

createAdmin(email, password, name);

