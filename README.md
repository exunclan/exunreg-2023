# exunreg-2023

## Directory Information

- `/app/(sanity)/` - Code for the Sanity Studio frontend
- `/app/(website)/` - Registration platform frontend
- `/app/(dashboard)` - School Dashboard frontend
- `/app/api/` - Backend API
- `/components/` - Frontend components
- `/sanity/` - Sanity schema and configurations
- `/util/data/` - Data files
- `/util/hooks/` - Custom hooks for the frontend

## Pages

- `/` - Home page
- `/studio` - Sanity studio (only for admins)
- `/events` - Events description
- `/contact` - Contact details
- `/dashboard` - Management dashboard
  - `/profile` - Profile editing
  - `/teams` - Team management page
- `/user/`
  - `/signin` - Sign In page
  - `/register` - Registration page
  - `/verify` - Email verification confirmation page
  - `/logout` - User logout route

## Hosting

- Clone the repo
- Copy the `.env.example` to `.env` and change the content
- Run `pnpm install` and `pnpm run dev` (or `npm` if you prefer that)

## Database Models

<details>
<summary> User </summary>

| Field Name             | Type      | Description                         |
| ---------------------- | --------- | ----------------------------------- |
| `_id`                  | `string`  | Internal ID                         |
| `name`                 | `string`  | Name of the school                  |
| `email`                | `string`  | Email of the school                 |
| `emailVerified`        | `boolean` | Email verification                  |
| `password`             | `string`  | Password of the account             |
| `phone`                | `string`  | Contact number                      |
| `teacher`              | `string`  | Teacher Incharge                    |
| `teacherEmail`         | `string`  | Email of teacher incharge           |
| `teacherEmailVerified` | `boolean` | Teacher incharge email verification |
| `principal`            | `string`  | Principal of the school             |
| `address`              | `string`  | Address of the school               |
| `ncr`                  | `boolean` | School in NCR or not                |
| `teams`                | `Object`  | Teams object                        |

</details>

(to be added)

## Sanity Schemas

<details>
<summary> Event </summary>

| Field Name      | Type       | Description                         |
| --------------- | ---------- | ----------------------------------- |
| `name`          | `string`   | Name of the event                   |
| `classes`       | `string`   | Classes eligible for the event      |
| `teams`         | `number`   | Max. teams per school               |
| `participants`  | `number`   | Max. participants per team          |
| `independent`   | `boolean`  | Independent registrations           |
| `registrations` | `boolean`  | Registrations enabled               |
| `summary`       | `string`   | Summary of the event for the modals |
| `description`   | `string[]` | Description of the event            |

</details>
