
/**
 ** Đồng bộ: Code sẽ chạy theo thứ tự từ trên xuống dưới.
 ** Bất đồng bộ: Code sẽ không chạy theo thứ tự.
 */

 //Đồng bộ
 console.log(1);
 console.log(2)
 console.log(3)

//Bất đồng bộ. setTimeout,fetch, setInterval
console.log(4)
//setTimeout: hàm có sẵn của trình duyệt, sẽ thực thi callback function sau 1 khoảng thời gian
setTimeout(()=>{
    console.log(5)
},1000)
console.log(6)
