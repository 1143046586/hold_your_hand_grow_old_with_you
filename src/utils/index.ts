export function hashFunc(str: string, size: number): number {
  //1.定义hashCode变量
  let hashCode = 0;

  //2.霍纳算法，来计算 hashCode的值
  for (let i = 0; i < str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i); //获取编码
  }
  //3.取余状态
  const index = hashCode % size;

  return index;
}
