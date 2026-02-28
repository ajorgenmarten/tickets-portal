FROM node:20-alpine AS build

ARG VITE_BACKEND_URL=http://31.97.9.115:6102
ARG VITE_ORCHESTRATOR_URL=http://31.97.9.115:6101

ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_ORCHESTRATOR_URL=$VITE_ORCHESTRATOR_URL

WORKDIR /home/node/app

RUN corepack enable pnpm

COPY . .

RUN pnpm i --frozen-lockfile

RUN pnpm build

RUN pnpm prune --prod

FROM nginx:alpine

COPY --from=build /home/node/app/dist /usr/share/nginx/html

COPY --from=build /home/node/app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
