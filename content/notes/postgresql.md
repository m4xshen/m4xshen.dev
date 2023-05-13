---
title: "Postgresql"
date: 2023-04-16T21:52:43+08:00
draft: true
---

## Setver Setup

Pre-packaged versions of PostgreSQL will typically create a suitable user account automatically during package installation.

Before you can do anything, you must initialize a database storage area on disk. We call this a database cluster.

After initialization, a database cluster will contain databases named postgres, template0 and template1.

In file system terms, a database cluster is a single directory under which all data will be stored. We call this the data directory or data area.

```bash
sudo -iu postgres initdb -D /var/lib/postgres/data
```

## Database Roles

PostgreSQL manages database access permissions using the concept of roles. A role can be thought of as either a database user, or a group of database users. Database roles are conceptually completely separate from operating system users.

Create a role with SQL command:
```sql
CREATE ROLE name;
```

with shell command:
```bash
createuser name
```

Remove an existing role:
```sql
DROP ROLE name;
```

with shell command:
```bash
dropuser name
```

https://www.tutorialspoint.com/postgresql/index.html
