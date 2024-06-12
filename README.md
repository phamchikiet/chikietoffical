# chikietoffical
Product By Chi Kiet
docker build --pull -t bun-express .
docker run -d -p 8080:8080 bun-express
npx bun add drizzle-orm
npx bun add drizzle-orm @planetscale/database
npx bun add -D drizzle-kit
bunx drizzle-kit generate