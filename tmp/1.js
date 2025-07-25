const main = () => {
  if (window.location.pathname !== "/checkout/") return;

  const $ = (selector) => document.querySelector(selector);

  const fieldValues = {
    First_name: "First name *",
    Last_name: "Last name *",
    Company_name: "Company name (optional)",
    Country_Region: "Country/Region *",
    Street_address: "Street address *",
    City: "City (optional)",
    Postal_code: "Postal Code *",
    Phone: "Phone *",
    Email: "Email *",
  };

  const fields = [
    { el: "billing_first_name_field", value: fieldValues.First_name },
    { el: "billing_last_name_field", value: fieldValues.Last_name },
    { el: "billing_company_field", value: fieldValues.Company_name },
    { el: "billing_country_field", value: fieldValues.Country_Region },
    { el: "billing_address_1_field", value: fieldValues.Street_address },
    { el: "billing_city_field", value: fieldValues.City },
    { el: "billing_postcode_field", value: fieldValues.Postal_code },
    { el: "billing_phone_field", value: fieldValues.Phone },
    { el: "billing_email_field", value: fieldValues.Email },
    { el: "shipping_first_name_field", value: fieldValues.First_name },
    { el: "shipping_last_name_field", value: fieldValues.Last_name },
    { el: "shipping_company_field", value: fieldValues.Company_name },
    { el: "shipping_country_field", value: fieldValues.Country_Region },
    { el: "shipping_address_1_field", value: fieldValues.Street_address },
    { el: "shipping_city_field", value: fieldValues.City },
    { el: "shipping_postcode_field", value: fieldValues.Postal_code },
    { el: "shipping_phone_field", value: fieldValues.Phone },
    { el: "shipping_email_field", value: fieldValues.Email },
  ];

  fields.forEach((field) => {
    const el = $(`#${field.el}`);
    if (el && el.children[0]) {
      console.log(`Setting value for ${field.el}: ${field.value}`);
      el.children[0].innerText = field.value;
    }
  });
};

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    main();
  }, 2000);

  setTimeout(() => {
    main();
  }, 60000);
});

document
  .querySelector('[data-funding-source="paypal"]')
  .addEventListener("click", () => {
    setTimeout(() => {
      console.log(1);
    }, 2000);
  });

// 观察错误元素出现
const observeErrorElement = () => {
  // 目标节点（通常是包含错误的容器）
  const targetNode = document.querySelector('.woocommerce'); // 或者更具体的容器如 document.querySelector('.woocommerce')

  // 配置观察选项
  const config = {
    childList: true,
    subtree: true,
  };

  // 创建观察者实例
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes) {
        // 检查新增的节点是否包含错误类
        const errorElement = document.querySelector(".woocommerce-error");
        if (errorElement) {
          // 执行你的操作
          handleWooCommerceError(errorElement);

          // 如果需要只执行一次，可以停止观察
          // observer.disconnect();
        }
      }
    });
  });

  // 开始观察
  observer.observe(targetNode, config);

  // 错误处理函数
  function handleWooCommerceError(errorElement) {
    console.log(errorElement.innerText);
  }
};
observeErrorElement();
