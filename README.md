# exunreg-2023


## Directory Information

- `/app/(sanity)/` - Code for the Sanity Studio frontend
- `/app/(website)/` - Registration platform frontend
- `/components/` - Frontend components
- `/sanity/` - Sanity schema and configurations
- `/util/data/` - Data files
- `/util/hooks/` - Custom hooks for the frontend

## Pages

- `/` - Home page
- `/studio` - Sanity studio (only for admins)
- `/events` - Events description
- `/contact` - Contact details
- `/register` - Event registration form

## Hosting 

- Clone the repo
- Copy the `.env.example` to `.env` and change the content
- Run `pnpm install` and `pnpm run dev` (or `npm` if you prefer that)

## Database Models

(to be added)

## Sanity Schemas

<details>
<summary> Event </summary>

| Field Name | Type | Description |
| ---------- | ---- | ----------- |
| `name` | `string` | Name of the event |
| `classes` | `string` | Classes eligible for the event | 
| `teams` | `number` |  Max. teams per school |
| `participants` | `number` | Max. participants per team
| `independant` | `boolean` | Independant registratins |
| `registrations` | `boolean` | Registrations enabled | 
| `summary` | `string` | Summary of the event for the modals |
| `description` | `string[]` | Description of the event |


</details>

