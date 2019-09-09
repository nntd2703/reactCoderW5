import moment from "moment/moment.js";
import "moment/locale/vi.js";
import { Dimensions } from "react-native";

moment.locale("vi");

const parsingNumberToDateTime = number => {
  let articleDate = moment
    .utc(new Date(1000 * number))
    .utc()
    .format("YYYY-MM-DD HH:mm:ss");
  return moment(articleDate).fromNow();
};

const LIST_CATEGORY = [
  {
    id:1, 
    title: "Công Nghệ",
    key: "cong-nghe",
    name: "congnghe",
    p: 1,
    c: 10
  },{
    id:2, 
    title: "Pháp Luật",
    key: "phap-luat",
    name: "phapluat",
    p: 1,
    c: 10,
  },{
    id:3, 
    title: "Thể Thao",
    key: "the-thao",
    name: "thethao",
    p: 1,
    c: 10
  },{
    id:4, 
    title: "Sách",
    key: "xuat-ban",
    name: "sach",
    p: 1,
    c: 10
  },{
    id:5, 
    title: "Thời Trang",
    key: "thoi-trang",
    name: "thoitrang",
    p: 1,
    c: 10
  }
]

const screenWidthWithPadding = Math.round(Dimensions.get("window").width) - 30;
const screenHeight = Math.round(Dimensions.get("window").height);

export { LIST_CATEGORY, parsingNumberToDateTime, screenHeight, screenWidthWithPadding };
