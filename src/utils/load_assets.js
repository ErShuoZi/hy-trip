export const getAssetUrl = (originAddress) => {
  // 两个参数:
  // 1.相对路径
  // 2.当前文件路径:import.meta.url
  // URL():如果第一个参数是绝对路径则会忽略第二个值,如果是相对路径,则按照第二个值进行拼接
  // console.log(import.meta.url);
  return new URL(`../assets/img/${originAddress}`, import.meta.url).href;
};