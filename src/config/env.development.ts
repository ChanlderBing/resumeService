
export default {
    // 服务基本配置
    SERVICE_CONFIG: {
      host: '10.9.45.73',
      // 端口
      port: 3000,
    },
  
    // 数据库配置
    DATABASE_CONFIG: {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456a.',
      database: 'superresume',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + "/entities/*{.js,.ts}"],
    },
  };