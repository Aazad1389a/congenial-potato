const apiKey = '1efce5c3fdeb41aa75baa633b88f1726';

// درخواست به سرور ipstack برای آی‌پی فعلی کاربر
fetch(`http://ipstack.com{apiKey}`)
  .then(response => {
    if (!response.ok) throw new Error('خطا در پاسخ سرور');
    return response.json();
  })
  .then(data => {
    document.getElementById('loading').style.display = 'none';
    
    if (data.success === false) {
      document.getElementById('error-msg').innerText = data.error.info;
      document.getElementById('error-msg').style.display = 'block';
    } else {
      document.getElementById('ip').innerText = data.ip || 'نامشخص';
      document.getElementById('country').innerText = data.country_name || 'نامشخص';
      document.getElementById('city').innerText = data.city || 'نامشخص';
      document.getElementById('result').style.display = 'block';
    }
  })
  .catch(error => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-msg').innerText = 'خطا در اتصال. مطمئن شوید آدرس سایت شما با http:// باز شده است، نه https://';
    document.getElementById('error-msg').style.display = 'block';
    console.error(error);
  });
