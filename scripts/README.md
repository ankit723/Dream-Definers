# Admin Creation Scripts

## Emergency Admin Creation

If all admin accounts are deleted or you need to create the first admin, use the emergency script:

```bash
npx ts-node scripts/create-admin.ts <email> <password> <name>
```

### Example

```bash
npx ts-node scripts/create-admin.ts admin@example.com SecurePass123 "Admin Name"
```

### Requirements

- Node.js installed
- `DATABASE_URL` environment variable set
- Database connection available

### What it does

1. Validates email format and password strength
2. Checks if user already exists
3. Hashes the password securely
4. Creates a new admin user in the database
5. Displays the created admin details

### Security Note

This script bypasses normal authentication. Only use it when:
- All existing admins are deleted
- You need to create the first admin
- You have direct access to the server/database

**Never commit admin credentials to version control!**

