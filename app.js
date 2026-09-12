// استفاده از یک سرویس رایگان جایگزین که با سیستم امنیتی HTTPS گیت‌هاب سازگار است
fetch('https://ipapi.co')
  .then(response => {
    // اگر سرور پاسخ درستی نداد، خطا صادر شود
    if (!response.ok) throw new Error('خطا در پاسخ سرور');
    return response.json();
  })
  .then(data => {
    // مخفی کردن متن "در حال دریافت اطلاعات..."
    document.getElementById('loading').style.display = 'none';
    
    // قرار دادن اطلاعات دریافتی در صفحه وب
    document.getElementById('ip').innerText = data.ip || 'نامشخص';
    document.getElementById('country').innerText = data.country_name || 'نامشخص';
    document.getElementById('city').innerText = data.city || 'نامشخص';
    
    // نمایش کارت اطلاعات
    document.getElementById('result').style.display = 'block';
  })
  .catch(error => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-msg').innerText = 'خطا در دریافت اطلاعات موقعیت مکانی.';
    document.getElementById('error-msg').style.display = 'block';
    console.error('جزئیات خطا:', error);
  });
