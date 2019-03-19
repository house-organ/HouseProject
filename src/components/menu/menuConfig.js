const menuList = [
    {
        title:'首页',
        key:'/page/modules/home'
    },
    {
        title:'次页',
        key:'/page/modules/home',
        children:[
            {
                title:'首页1',
                key:'/page/modules/home'
            },
            {
                title:'首页2',
                key:'/page/modules/home'
            }
        ]
    }
];

export default menuList;
