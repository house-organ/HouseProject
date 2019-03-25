const menuList = [
    {
        title:'首页',
        key:'/page/modules/home'
    },
    {
        title:'用户中心',
        key:'page/modules/userManage',
        children:[
            {
                title:'用户管理',
                key:'/page/modules/userManage/userManage'
            },
            {
                title:'权限管理',
                key:'/page/modules/userManage/privilegeManage'
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
