FROM node:22-alpine as builder
WORKDIR /app
RUN apk add --no-cache git
RUN git clone https://github.com/Parth2710/role-base-app.git .
RUN npm install && npx prisma generate && npm run build


FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000
CMD ["npm", "start"]
