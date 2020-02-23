class CopyrightWebpackPlugin {
  constructor(options) {
    this.options = options;
    console.log(options);
  }
  apply(compiler) {
    // 同步钩子
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('执行了');
    })

    // 异步钩子
    // compilation里包含打包过程的的资源和代码
    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      // assets资源列表对象
      compilation.assets['copyright.txt'] = {
        // 定义资源内容
        source: function() {
          return 'hello plugin';
        },
        // 定义资源的大小
        size: function() {
          return 20;
        }
      };
      cb();  // 不要忘记cb的调用
    })
  }
}

module.exports = CopyrightWebpackPlugin;
