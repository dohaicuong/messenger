# Getting started

## Database
```
docker-compose up -d
```

## Backend
```
yarn

cp .env.example .env

npx prisma migrate dev

yarn dev
```

## Frontend
```
yarn

cp .env.example .env

yarn dev
```

## TODO
- backward pagination for messages
- graphql subscription for ROOM_CREATED