export const parseData = (data) => {
    console.log(`>>>data`, data);
    return {
        info: { title: '思维导图' },
        depth: 0,
        children: [
            {
                info: { title: '自定义节点' }, side: 'left', children: [
                    { info: { title: '支持左右布局' }, side: 'left' },
                    { info: { title: '节点配置更灵活' }, side: 'left' },
                    { info: { title: '扩展更方便' }, side: 'left' }
                ]
            },
            {
                info: { title: '自定义边' }, side: 'right', children: [
                    { info: { title: '实现思路更简单' }, side: 'right' }
                ]
            },
            { info: { title: '自定义交互' }, side: 'right' }
        ]
    }
}
