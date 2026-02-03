import logo from './logo.png';
import search_icon from './search_icon_search.png'
import basket from './basket.png'
import header_cover from './header_cover.jpg'
import rating_stars from './rating_stars.png'
import add from './add.png'
import minus from './minus-bold.png'
import windows from './windows.png'
import mac from './macos.png'
import linux from './linux.png'
import android from './安卓.png'
import profile_icon from './profile-icon.png'
import pakage from './包裹.png'
import menu from "./menu.png"

import menu_1 from './menu_1.jpg'
import menu_2 from './menu_2.jpg'
import menu_3 from './menu_3.jpg'
import menu_4 from './menu_4.jpeg'
import menu_5 from './menu_5.jpg'
import menu_6 from './menu_6.jpg'
import menu_7 from './menu_7.jpg'
import menu_8 from './menu_8.png'

import food_1 from './food_1.jpg'
import food_2 from './food_2.jpg'
import food_3 from './food_3.jpg'
import food_4 from './food_4.jpeg'
import food_5 from './food_5.jpg'
import food_6 from './food_6.jpg'
import food_7 from './food_7.jpg'
import food_8 from './food_8.jpg'
import food_9 from './food_9.jpg'
import food_10 from './food_10.jpeg'
import food_11 from './food_11.jpg'
import food_12 from './food_12.jpg'
import food_13 from './food_13.jpg'
import food_14 from './food_14.jpg'
import food_15 from './food_15.jpeg'
import food_16 from './food_16.jpeg'
import food_17 from './food_17.png'
import food_18 from './food_18.jpg'
import food_19 from './food_19.jpg'
import food_20 from './food_20.jpg'
import food_21 from './food_21.jpg'
import food_22 from './food_22.jpg'
import food_23 from  './food_23.png'
import food_24 from './food_24.jpg'
import food_25 from './food_25.jpg'
import food_26 from './food_26.jpeg'
import food_27 from './food_27.jpg'
import food_28 from './food_28.jpg'
import food_29 from './food_29.jpg'
import food_30 from './food_30.jpg'
import food_31 from './food_31.png'
import food_32 from './food_32.jpg'
import food_33 from './food_33.jpg'
import food_34 from './food_34.jpg'
import food_35 from './food_35.jpg'


const menu_list = [
    {
        menu_name:'披萨',
        menu_image:menu_1},
    {
        menu_name:'西餐',
        menu_image:menu_2},
    {
        menu_name:'面食',
        menu_image:menu_3},
    {
        menu_name:'家常菜',
        menu_image:menu_4},
    {
        menu_name:"粥",
        menu_image:menu_5
    },
    {
        menu_name:"寿司",
        menu_image:menu_6
    },
    {
        menu_name:"汉堡",
        menu_image:menu_7
    },
    {
        menu_name:"烧烤",
        menu_image:menu_8
    }
];

const food_list = [
    {
        _id:"1",
        name:"榴莲披萨",
        image: food_1,
        price: 65,
        description: "独特的榴莲风味披萨，甜中带点咸味。",
        category:"披萨"
    },
    {
        _id:"2",
        name:"烤肉披萨",
        image: food_2,
        price: 45,
        description: "香嫩的烤肉与美味的芝士完美结合。",
        category:"披萨"
    },
    {
        _id:"3",
        name:"番茄披萨",
        image: food_3,
        price: 35,
        description: "新鲜番茄与香脆饼底的经典搭配。",
        category:"披萨"
    },
    {
        _id:"4",
        name:"鸡肉披萨",
        image: food_4,
        price: 45,
        description: "嫩滑鸡肉与芝士交织，口感丰富。",
        category:"披萨"
    },
    {
        _id:"5",
        name:"法式牛排",
        image: food_5,
        price: 105,
        description: "经典法式风味牛排，肉质鲜嫩多汁。",
        category:"西餐"
    },
    {
        _id:"6",
        name:"烩牛肉",
        image: food_6,
        price: 55,
        description: "慢炖牛肉，汤汁浓郁，肉质软嫩。",
        category:"西餐"
    },
    {
        _id:"7",
        name:"沙拉",
        image: food_7,
        price: 25,
        description: "新鲜蔬菜混合，清爽可口的健康选择。",
        category:"西餐"
    },
    {
        _id:"8",
        name:"蘑菇浓汤",
        image: food_8,
        price: 45,
        description: "浓郁的蘑菇汤，香滑细腻。",
        category:"西餐"
    },
    {
        _id:"9",
        name:"牛肉面",
        image: food_9,
        price: 25,
        description: "经典的牛肉面，肉香扑鼻，汤鲜味美。",
        category:"面食"
    },
    {
        _id:"10",
        name:"杂酱面",
        image: food_10,
        price: 25,
        description: "地道的杂酱面，酱料浓郁，口感十足。",
        category:"面食"
    },
    {
        _id:"11",
        name:"油泼面",
        image: food_11,
        price: 25,
        description: "香辣油泼面，麻辣过瘾，回味无穷。",
        category:"面食"
    },
    {
        _id:"12",
        name:"番茄汤面",
        image: food_12,
        price: 25,
        description: "清新的番茄汤与面条的完美融合，酸爽开胃。",
        category:"面食"
    },
    {
        _id:"13",
        name:"鸡蛋炒面",
        image: food_13,
        price: 25,
        description: "炒得香喷喷的鸡蛋炒面，简洁美味。",
        category:"面食"
    },
    {
        _id:"14",
        name:"牛肉烩面",
        image: food_14,
        price: 35,
        description: "软嫩牛肉与面条交织，汤汁鲜美。",
        category:"面食"
    },
    {
        _id:"15",
        name:"锅包肉",
        image: food_15,
        price: 35,
        description: "外脆内嫩的锅包肉，甜酸口感非常开胃。",
        category:"家常菜"
    },
    {
        _id:"16",
        name:"红烧肉",
        image: food_16,
        price: 35,
        description: "色香味俱全的红烧肉，肥而不腻，味道浓郁。",
        category:"家常菜"
    },
    {
        _id:"17",
        name:"辣椒炒肉",
        image: food_17,
        price: 35,
        description: "香辣炒肉，带有浓烈的辣椒香味。",
        category:"家常菜"
    },
    {
        _id:"18",
        name:"糖醋排骨",
        image: food_18,
        price: 35,
        description: "酸甜可口的糖醋排骨，外酥内嫩。",
        category:"家常菜"
    },
    {
        _id:"19",
        name:"酸菜鱼",
        image: food_19,
        price: 35,
        description: "酸菜与鱼肉的完美结合，汤底酸爽开胃。",
        category:"家常菜"
    },
    {
        _id:"20",
        name:"可乐鸡翅",
        image: food_20,
        price: 35,
        description: "可乐鸡翅，香甜可口，外焦里嫩。",
        category:"家常菜"
    },
    {
        _id:"21",
        name:"黄豆焖猪蹄",
        image: food_21,
        price: 35,
        description: "焖制黄豆与猪蹄，口感浓郁，十分下饭。",
        category:"家常菜"
    },
    {
        _id:"22",
        name:"鸡肉炖蘑菇",
        image: food_22,
        price: 35,
        description: "鸡肉炖蘑菇，肉质鲜嫩，汤汁浓香。",
        category:"家常菜"
    },
    {
        _id:"23",
        name:"皮蛋瘦肉粥",
        image: food_23,
        price: 15,
        description: "传统皮蛋瘦肉粥，清香滑腻，十分温暖。",
        category:"粥"
    },
    {
        _id:"24",
        name:"鱼片粥",
        image: food_24,
        price: 15,
        description: "清淡的鱼片粥，鲜美清爽，滋补养生。",
        category:"粥"
    },
    {
        _id:"25",
        name:"猪杂粥",
        image: food_25,
        price: 15,
        description: "猪杂粥，香浓美味，富有营养。",
        category:"粥"
    },
    {
        _id:"26",
        name:"牛肉粥",
        image: food_26,
        price: 15,
        description: "嫩滑牛肉与米粥的结合，鲜美暖心。",
        category:"粥"
    },
    {
        _id:"27",
        name:"蔬菜寿司",
        image: food_27,
        price: 25,
        description: "新鲜蔬菜包裹的寿司，清新又健康。",
        category:"寿司"
    },
    {
        _id:"28",
        name:"三文鱼寿司",
        image: food_28,
        price: 25,
        description: "新鲜三文鱼配上米饭，极致的日式风味。",
        category:"寿司"
    },
    {
        _id:"29",
        name:"鳗鱼寿司",
        image: food_29,
        price: 25,
        description: "鲜美的鳗鱼与寿司米饭的绝配。",
        category:"寿司"
    },
    {
        _id:"30",
        name:"鸡肉汉堡",
        image: food_30,
        price: 15,
        description: "鸡肉汉堡，香嫩多汁，外焦里嫩。",
        category:"汉堡"
    },
    {
        _id:"31",
        name:"牛肉汉堡",
        image: food_31,
        price: 17,
        description: "牛肉汉堡，鲜美多汁，口感丰富。",
        category:"汉堡"
    },
    {
        _id:"32",
        name:"猪肉汉堡",
        image: food_32,
        price: 15,
        description: "猪肉汉堡，肉香扑鼻，外酥内嫩。",
        category:"汉堡"
    },
    {
        _id:"33",
        name:"牛肉串",
        image: food_33,
        price: 10,
        description: "鲜嫩的牛肉串，香烤至熟，味道十足。",
        category:"烧烤"
    },
    {
        _id:"34",
        name:"羊肉串",
        image: food_34,
        price: 10,
        description: "美味的羊肉串，香气扑鼻，味道浓郁。",
        category:"烧烤"
    },
    {
        _id:"35",
        name:"鸡肉串",
        image: food_35,
        price: 10,
        description: "鸡肉串，嫩滑可口，辣味十足。",
        category:"烧烤"
    },
]



const assets = {
    logo,
    search_icon,
    basket,
    header_cover,
    rating_stars,
    add,
    minus,
    windows,
    mac,
    linux,
    android,
    profile_icon,
    pakage,
    menu
}

export default assets;
export {menu_list, food_list};