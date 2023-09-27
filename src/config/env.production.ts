export default {
  // 服务基本配置
  SERVICE_CONFIG: {
    host: '121.41.1.191',
    // 端口
    port: 80,
  },

  // 数据库配置
  DATABASE_CONFIG: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '3927688',
    database: 'superresume',
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + "/entities/*{.js,.ts}"],
  },
};