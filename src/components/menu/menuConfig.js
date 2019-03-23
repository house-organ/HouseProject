const menuList = [
    {
        title:'首页',
        key:'/page/modules/home'
    },
    {
        title:'一次页',
        key:'/page/modules/homes',
        children:[
            {
                title:'测试222',
                key:'/page/modules/homess'
            },
            {
                title:'测试2333',
                key:'/page/modules/homesss'
            }
        ]
    },
    {
        title:'二次页',
        key:'/page/modules/homes1',
        children:[
            {
                title:'测试222',
                key:'/page/modules/homess1'
            },
            {
                title:'测试2333',
                key:'/page/modules/homesss1'
            }
        ]
    }
];

export default menuList;
