FROM node:18-alpine

# install postgres and run databse
# RUN apk add postgresql
# RUN mkdir /run/postgresql
# RUN chown postgres:postgres /run/postgresql
# USER postgres
# RUN mkdir /var/lib/postgresql/data
# RUN chmod 0700 /var/lib/postgresql/data
# RUN initdb -D /var/lib/postgresql/data
# RUN pg_ctl start -D /var/lib/postgresql/data
# su postgres -c 'pg_ctl start -D /var/lib/postgresql/data'; 


WORKDIR /validator_dapp
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
RUN chmod +x callApi.sh
RUN chmod 0644 crntab
COPY crntab /etc/crontabs/root
ENV DATABASE_URL="postgres://postgres:postgres@localhost:5432/postgres"
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start && crond"]
