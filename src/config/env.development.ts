
export default {
    // 服务基本配置
    SERVICE_CONFIG: {
      host: '124.240.78.16',
      // 端口
      port: 8080,
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
