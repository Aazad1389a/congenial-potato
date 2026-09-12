import os
import requests
from dotenv import load_dotenv

# بارگذاری متغیرهای فایل .env
load_dotenv()

# خواندن کلید API از محیط برنامه به صورت امن
API_KEY = os.getenv("IPSTACK_API_KEY")

def get_ip_location(ip_address="check"):
    """
    دریافت موقعیت جغرافیایی یک آی‌پی از طریق ipstack
    اگر آی‌پی داده نشود، آی‌پی خود شما را بررسی می‌کند
    """
    if not API_KEY:
        print("خطا: کلید API یافت نشد! لطفاً فایل .env را بررسی کنید.")
        return None

    # ساخت آدرس درخواست (پروتکل http برای نسخه رایگان)
    url = f"http://ipstack.com{ip_address}?access_key={API_KEY}"
    
    try:
        response = requests.get(url)
        # بررسی وضعیت پاسخ سرور
        if response.status_code == 200:
            data = response.json()
            
            # بررسی اینکه آیا خود سرویس ipstack خطایی فرستاده یا خیر
            if "success" in data and data["success"] is False:
                print(f"خطای سرویس: {data['error']['info']}")
                return None
                
            return data
        else:
            print(f"خطا در اتصال به سرور: {response.status_code}")
            return None
    except Exception as e:
        print(f"یک خطای غیرمنتظره رخ داد: {e}")
        return None

if __name__ == "__main__":
    print("در حال دریافت اطلاعات موقعیت مکانی...")
    # برای تست آی‌پی خودتان کلمه "check" را بگذارید یا یک آی‌پی مثل "8.8.8.8" وارد کنید
    result = get_ip_location("check") 
    
    if result:
        print("\n--- اطلاعات با موفقیت دریافت شد ---")
        print(f"آی‌پی شناسایی شده: {result.get('ip')}")
        print(f"کشور: {result.get('country_name')} ({result.get('country_code')})")
        print(f"شهر: {result.get('city')}")
        print(f"منطقه/استان: {result.get('region_name')}")
        print(f"مختصات جغرافیایی: Latitude: {result.get('latitude')}, Longitude: {result.get('longitude')}")
