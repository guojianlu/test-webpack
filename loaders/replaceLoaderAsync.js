// loader就是一个函数，不可以是箭头函数(会改变this的指向)
// loader接收一份源代码，然后对源代码进行处理之后返回
// loader必须有返回，否则会报错

// 获取参数(this.query)
// 如果这个 loader 配置了 options 对象的话，this.query 就指向这个 option 对象。
// 如果 loader 中没有 options，而是以 query 字符串作为参数调用时，this.query 就是一个以 ? 开头的字符串。


// 返回多个信息(this.callback)
//this.callback(
//  err: Error | null,
//  content: string | Buffer,
//  sourceMap?: SourceMap,
//  meta?: any
//);

// loader里面的异步处理(this.async)

module.exports = function(source) {  // source就是源代码
  // return source.replace('world', this.query.name);
  // const result = source.replace('world', this.query.name);
  // this.callback(null, result);

  //callback 就是 this.callback 注意参数的使⽤
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace('world', this.query.name);
    callback(null, result);
  }, 1000);
}

