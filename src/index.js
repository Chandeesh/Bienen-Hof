//import fastify & mongoose
const fastify = require('fastify');
const mongoose = require('mongoose');
const contentRangeHook = require('./hooks/contentRangeHooks');
const userRoutes = require('./routes/userManagementRoutes');
const tokenRoutes = require('./routes/tokenRoute');
const bcrypt = require('fastify-bcrypt-plugin');
const fastifyJwt = require('fastify-jwt');

//initialized Fastify App
const app = fastify();

//connected fastify to mongoose
try {
  mongoose.connect('mongodb://localhost:27017/bienen_db');
} catch (e) {
  console.error(e);
}

app.decorateRequest('fastify', null)
app.register(bcrypt, { saltOrRounds: 15 });
app.register(fastifyJwt, { secret: "bienen-hof" });
app.addHook("onRequest", async (request, reply) => {
  request.fastify = app;
  try {
    if (request.raw.url != '/bienen/user/login'
     && request.raw.url != '/bienen/user/refreshtoken' && request.raw.url != '/bienen/user/register' && !request.raw.url.includes('/bienen/user/confirm') ) {
      await request.jwtVerify();
    }
  } catch (err) {
    reply.send(err);
  }
});
app.addHook('preHandler', contentRangeHook);
//noteRoutes(app);
userRoutes(app);
tokenRoutes(app);

//handle root route
app.get('/', (request, reply) => {
  try {
    reply.send("Hello world!");
  } catch (e) {
    console.error(e);
  }
})

//set application listening on port 5000 of localhost
app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running on ${address}`);
});