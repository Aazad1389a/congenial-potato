// استفاده از یک سرویس رایگان جایگزین که با HTTPS مشکلی ندارد
fetch(`https://ipapi.co`)
  .then(response => {
    if (!response.ok) throw new Error('خطا در پاسخ سرور');
    return response.json();
  })
  .then(data => {
    document.getElementById('loading').style.display = 'none';
    
    // جایگذاری اطلاعات در صفحه HTML
    document.getElementById('ip').innerText = data.ip || 'نامشخص';
    document.getElementById('country').innerText = data.country_name || 'نامشخص';
    document.getElementById('city').innerText = data.city || 'نامشخص';
    document.getElementById('result').style.display = 'block';
  })
  .catch(error => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error-msg').innerText = 'خطا در دریافت اطلاعات موقعیت مکانی.';
    document.getElementById('error-msg').style.display = 'block';
    console.error(error);
  });
