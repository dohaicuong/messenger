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
- graphql subscription for ROOM_CREATED

## VIDEO CALL FLOW
  user 1
    --> media stream
    --> peer connection
    --> add media stream
    --> offer + user1_ice_candidates

  user 2
    --> media stream
    --> peer connection
    --> add media stream
    --> add offer + user1_ice_candidates
    --> answer + user2_ice_candidates

  user 1
    --> add answer + user2_ice_candidates

  ----> connected --> track event --> add to video