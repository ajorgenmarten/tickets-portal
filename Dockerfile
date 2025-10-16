FROM node:20-alpine AS build

WORKDIR /home/node/app

ARG VITE_BACKEND_URL

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN corepack enable pnpm

COPY . .

RUN pnpm i --frozen-lockfile

RUN VITE_BACKEND_URL=$VITE_BACKEND_URL pnpm build

RUN pnpm prune --prod

FROM nginx:alpine

COPY --from=build /home/node/app/dist /usr/share/nginx/html

COPY --from=build /home/node/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
