function fillFormWithValues(valuesArray) {
    // 获取所有text类型的input元素
    const textInputs = Array.from($0.querySelectorAll('input[type="text"]'));
    
    // 检查数量是否匹配
    if (textInputs.length !== 56) {
        console.error(`错误: 找到 ${textInputs.length} 个表单元素，但需要56个`);
        return false;
    }
    
    if (valuesArray.length !== 56) {
        console.error(`错误: 提供的数组有 ${valuesArray.length} 个值，但需要56个`);
        return false;
    }
    
    console.log('开始填充56个表单元素...');
    
    // 填充值并触发事件
    textInputs.forEach((input, index) => {
        try {
            // 聚焦元素
            input.focus();
            
            // 设置值
            input.value = valuesArray[index];
            
            // 触发一系列事件
            const eventsToTrigger = [
                'input', 'change', 'blur', 'keydown', 'keyup'
            ];
            
            eventsToTrigger.forEach(eventName => {
                const event = new Event(eventName, {
                    bubbles: true,
                    cancelable: true
                });
                input.dispatchEvent(event);
            });
            
            console.log(`已填充第 ${index + 1} 个表单: ${valuesArray[index]}`);
            
        } catch (e) {
            console.error(`填充第 ${index + 1} 个表单时出错:`, e);
        }
    });
    
    console.log('所有表单元素填充完成');
    return true;
}

// 使用示例:
// 1. 首先定义你的56个值的数组
// const values = [值1, 值2, ..., 值56];
// 2. 然后调用函数
// fillFormWithValues(values);