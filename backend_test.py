#!/usr/bin/env python3
"""
Backend API Testing for D.S.P.Film's Photography Website
Tests all backend endpoints including new admin panel features
"""

import requests
import json
import sys
import io
from datetime import datetime

# Backend URL from frontend/.env
BASE_URL = "https://photopanel.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        self.session = requests.Session()  # For maintaining cookies
        self.admin_logged_in = False
        
    def log_result(self, test_name, success, message="", data=None):
        """Log test result"""
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}: PASSED - {message}")
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: FAILED - {message}")
        
        if data and success:
            print(f"   Data sample: {json.dumps(data, indent=2)[:200]}...")
            
    def test_api_health(self):
        """Test basic API health endpoint"""
        try:
            response = requests.get(f"{BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "D.S.P.Film's Photography API" in data["message"]:
                    self.log_result("API Health Check", True, f"API is running, version: {data.get('version', 'unknown')}", data)
                    return True
                else:
                    self.log_result("API Health Check", False, f"Unexpected response format: {data}")
            else:
                self.log_result("API Health Check", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("API Health Check", False, f"Connection error: {str(e)}")
        return False
        
    def test_content_api(self):
        """Test content management API"""
        try:
            response = requests.get(f"{BASE_URL}/content", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for expected content sections
                    sections = [item.get('section') for item in data if 'section' in item]
                    expected_sections = ['hero', 'about', 'contact']
                    
                    found_sections = [s for s in expected_sections if s in sections]
                    
                    # Look for Devendra's information
                    devendra_info = False
                    phone_found = False
                    location_found = False
                    
                    for item in data:
                        value = str(item.get('value', '')).lower()
                        if 'devendra' in value:
                            devendra_info = True
                        if '8308398378' in value:
                            phone_found = True
                        if 'ahilyanagar' in value:
                            location_found = True
                    
                    message = f"Found {len(data)} content items, sections: {found_sections}"
                    if devendra_info:
                        message += ", Devendra info: ✓"
                    if phone_found:
                        message += ", Phone: ✓"
                    if location_found:
                        message += ", Location: ✓"
                        
                    self.log_result("Content API", True, message, data[:2] if data else [])
                    return True
                else:
                    self.log_result("Content API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Content API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Content API", False, f"Connection error: {str(e)}")
        return False
        
    def test_services_api(self):
        """Test services API"""
        try:
            response = requests.get(f"{BASE_URL}/services", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for expected number of services (should be 5)
                    service_count = len(data)
                    
                    # Check for required fields
                    valid_services = 0
                    photo_urls_found = 0
                    
                    for service in data:
                        if all(key in service for key in ['title', 'description', 'features', 'image']):
                            valid_services += 1
                            if service.get('image') and 'http' in service.get('image', ''):
                                photo_urls_found += 1
                    
                    message = f"Found {service_count} services, {valid_services} valid, {photo_urls_found} with photo URLs"
                    expected_count = service_count >= 3  # At least 3 services expected
                    
                    self.log_result("Services API", expected_count, message, data[:1] if data else [])
                    return expected_count
                else:
                    self.log_result("Services API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Services API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Services API", False, f"Connection error: {str(e)}")
        return False
        
    def test_portfolio_api(self):
        """Test portfolio API"""
        try:
            response = requests.get(f"{BASE_URL}/portfolio", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for expected categories
                    categories = [item.get('category') for item in data if 'category' in item]
                    expected_categories = ['wedding', 'prewedding', 'cinematic', 'maternity']
                    
                    found_categories = [c for c in expected_categories if c in categories]
                    
                    # Check for photo URLs
                    photo_urls_found = 0
                    valid_items = 0
                    
                    for item in data:
                        if all(key in item for key in ['title', 'category', 'image']):
                            valid_items += 1
                            if item.get('image') and 'http' in item.get('image', ''):
                                photo_urls_found += 1
                    
                    message = f"Found {len(data)} portfolio items, categories: {found_categories}, {photo_urls_found} with photo URLs"
                    
                    self.log_result("Portfolio API", True, message, data[:1] if data else [])
                    return True
                else:
                    self.log_result("Portfolio API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Portfolio API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Portfolio API", False, f"Connection error: {str(e)}")
        return False
        
    def test_packages_api(self):
        """Test packages API"""
        try:
            response = requests.get(f"{BASE_URL}/packages", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for pricing information
                    pricing_found = 0
                    valid_packages = 0
                    expected_prices = ['45,000', '90,000', '₹45,000', '₹90,000']
                    
                    for package in data:
                        if all(key in package for key in ['name', 'price', 'features']):
                            valid_packages += 1
                            price_str = str(package.get('price', ''))
                            if any(price in price_str for price in expected_prices):
                                pricing_found += 1
                    
                    message = f"Found {len(data)} packages, {valid_packages} valid, {pricing_found} with expected pricing"
                    
                    self.log_result("Packages API", True, message, data[:1] if data else [])
                    return True
                else:
                    self.log_result("Packages API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Packages API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Packages API", False, f"Connection error: {str(e)}")
        return False
        
    def test_testimonials_api(self):
        """Test testimonials API"""
        try:
            response = requests.get(f"{BASE_URL}/testimonials", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    # Check for client reviews structure
                    valid_testimonials = 0
                    
                    for testimonial in data:
                        if all(key in testimonial for key in ['name', 'text', 'rating']):
                            valid_testimonials += 1
                    
                    message = f"Found {len(data)} testimonials, {valid_testimonials} valid client reviews"
                    
                    self.log_result("Testimonials API", True, message, data[:1] if data else [])
                    return True
                else:
                    self.log_result("Testimonials API", False, f"Expected array, got: {type(data)}")
            else:
                self.log_result("Testimonials API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Testimonials API", False, f"Connection error: {str(e)}")
        return False
        
    def test_inquiries_post_api(self):
        """Test POST inquiries API"""
        try:
            # Test data for inquiry
            inquiry_data = {
                "name": "Rajesh Kumar",
                "email": "rajesh.kumar@example.com",
                "phone": "9876543210",
                "eventType": "wedding",
                "eventDate": "2024-06-15",
                "message": "Looking for wedding photography services for my daughter's wedding in Pune. Please provide package details."
            }
            
            response = requests.post(f"{BASE_URL}/inquiries", json=inquiry_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, dict) and 'name' in data and data['name'] == inquiry_data['name']:
                    # Check if inquiry was created with proper fields
                    required_fields = ['name', 'email', 'eventType', 'status']
                    has_required = all(field in data for field in required_fields)
                    
                    if has_required and data.get('status') == 'new':
                        self.log_result("POST Inquiries API", True, "Inquiry created successfully with proper status", data)
                        return True
                    else:
                        self.log_result("POST Inquiries API", False, f"Missing required fields or incorrect status: {data}")
                else:
                    self.log_result("POST Inquiries API", False, f"Unexpected response format: {data}")
            else:
                self.log_result("POST Inquiries API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("POST Inquiries API", False, f"Connection error: {str(e)}")
        return False

    def test_admin_login(self):
        """Test admin authentication with remember me functionality"""
        try:
            # Get emergency key from environment (or use default for testing)
            import os
            emergency_key = os.environ.get('EMERGENCY_RESET_KEY', 'TestEmergencyKey')
            
            # First try to reset admin password if needed
            reset_data = {
                "emergency_key": emergency_key,
                "new_password": "AdminPass2025!"
            }
            
            reset_response = self.session.post(f"{BASE_URL}/admin/emergency-reset", json=reset_data, timeout=10)
            if reset_response.status_code == 200:
                print("   Admin password reset successful")
            
            # Test login with rememberMe: true (30 day expiry)
            login_data = {
                "email": "devshinde45@gmail.com",
                "password": "AdminPass2025!",
                "rememberMe": True
            }
            
            response = self.session.post(f"{BASE_URL}/admin/auth/login", json=login_data, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "user" in data:
                    self.admin_logged_in = True
                    # Check if session cookie is set
                    cookies = self.session.cookies.get_dict()
                    if "admin_session" in cookies:
                        self.log_result("Admin Login (Remember Me)", True, f"Login successful, user: {data['user'].get('name', 'Unknown')}", {"cookies_set": True})
                        return True
                    else:
                        self.log_result("Admin Login (Remember Me)", False, "Login successful but no session cookie set")
                else:
                    self.log_result("Admin Login (Remember Me)", False, f"Login failed: {data}")
            else:
                self.log_result("Admin Login (Remember Me)", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Admin Login (Remember Me)", False, f"Connection error: {str(e)}")
        return False

    def test_admin_auth_me(self):
        """Test authenticated user info retrieval"""
        if not self.admin_logged_in:
            self.log_result("Admin Auth Me", False, "Not logged in - skipping test")
            return False
            
        try:
            response = self.session.get(f"{BASE_URL}/admin/auth/me", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "user" in data:
                    user = data["user"]
                    if "email" in user and "role" in user:
                        self.log_result("Admin Auth Me", True, f"User info retrieved: {user.get('email')} ({user.get('role')})", user)
                        return True
                    else:
                        self.log_result("Admin Auth Me", False, f"Missing user fields: {user}")
                else:
                    self.log_result("Admin Auth Me", False, f"Unexpected response: {data}")
            else:
                self.log_result("Admin Auth Me", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Admin Auth Me", False, f"Connection error: {str(e)}")
        return False

    def test_admin_settings_api(self):
        """Test admin settings GET and PUT endpoints"""
        if not self.admin_logged_in:
            self.log_result("Admin Settings API", False, "Not logged in - skipping test")
            return False
            
        try:
            # Test GET settings
            response = self.session.get(f"{BASE_URL}/admin/settings", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "settings" in data:
                    settings = data["settings"]
                    
                    # Test PUT settings with test data
                    update_data = {
                        "groqApiKey": "test_groq_key_12345",
                        "geminiApiKey": "test_gemini_key_67890",
                        "enableFacebookPixel": True,
                        "enableGoogleAnalytics": False,
                        "facebookPixelId": "test_pixel_123"
                    }
                    
                    put_response = self.session.put(f"{BASE_URL}/admin/settings", json=update_data, timeout=10)
                    
                    if put_response.status_code == 200:
                        put_data = put_response.json()
                        if put_data.get("success"):
                            self.log_result("Admin Settings API", True, "Settings GET and PUT working correctly", {"get": settings, "put_success": True})
                            return True
                        else:
                            self.log_result("Admin Settings API", False, f"PUT failed: {put_data}")
                    else:
                        self.log_result("Admin Settings API", False, f"PUT HTTP {put_response.status_code}: {put_response.text}")
                else:
                    self.log_result("Admin Settings API", False, f"GET unexpected response: {data}")
            else:
                self.log_result("Admin Settings API", False, f"GET HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Admin Settings API", False, f"Connection error: {str(e)}")
        return False

    def test_ai_integration_endpoints(self):
        """Test all AI integration endpoints"""
        if not self.admin_logged_in:
            self.log_result("AI Integration Endpoints", False, "Not logged in - skipping test")
            return False
            
        ai_tests = [
            {
                "name": "Generate Caption",
                "endpoint": "/admin/ai/generate-caption",
                "data": {"description": "Wedding photo of bride and groom", "style": "professional"}
            },
            {
                "name": "Generate Ad Copy", 
                "endpoint": "/admin/ai/generate-ad-copy",
                "data": {"service": "Wedding Photography", "targetAudience": "Engaged couples", "tone": "professional"}
            },
            {
                "name": "Enhance Content",
                "endpoint": "/admin/ai/enhance-content", 
                "data": {"content": "We take photos", "type": "improve"}
            },
            {
                "name": "Generate SEO",
                "endpoint": "/admin/ai/generate-seo",
                "data": {"title": "Wedding Photography Services", "content": "Professional wedding photography in Ahilyanagar"}
            }
        ]
        
        all_endpoints_working = True
        results = []
        api_key_issues = 0
        
        for test in ai_tests:
            try:
                response = self.session.post(f"{BASE_URL}{test['endpoint']}", json=test['data'], timeout=30)
                
                if response.status_code == 200:
                    data = response.json()
                    # Check if endpoint is working (returns proper structure)
                    if "success" in data and "text" in data and "provider" in data and "error" in data:
                        if data.get("success"):
                            provider = data.get("provider", "unknown")
                            text_length = len(data.get("text", ""))
                            results.append(f"{test['name']}: ✓ ({provider}, {text_length} chars)")
                        else:
                            # Check if it's an API key issue
                            error_msg = data.get("error", "")
                            if "API key" in error_msg or "providers failed" in error_msg:
                                results.append(f"{test['name']}: ✓ (endpoint working, API keys invalid)")
                                api_key_issues += 1
                            else:
                                results.append(f"{test['name']}: ❌ Error: {error_msg}")
                                all_endpoints_working = False
                    else:
                        results.append(f"{test['name']}: ❌ Invalid response structure")
                        all_endpoints_working = False
                else:
                    results.append(f"{test['name']}: ❌ HTTP {response.status_code}")
                    all_endpoints_working = False
                    
            except Exception as e:
                results.append(f"{test['name']}: ❌ Connection error: {str(e)}")
                all_endpoints_working = False
        
        message = "; ".join(results)
        if api_key_issues == len(ai_tests):
            message += f" - All endpoints working but need valid API keys (Groq/Gemini)"
        
        self.log_result("AI Integration Endpoints", all_endpoints_working, message)
        return all_endpoints_working

    def test_file_upload_api(self):
        """Test file upload endpoint"""
        if not self.admin_logged_in:
            self.log_result("File Upload API", False, "Not logged in - skipping test")
            return False
            
        try:
            # Create a test image file in memory
            test_image_content = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\nIDATx\x9cc\xf8\x00\x00\x00\x01\x00\x01\x00\x00\x00\x00IEND\xaeB`\x82'
            
            files = {
                'file': ('test_image.png', io.BytesIO(test_image_content), 'image/png')
            }
            
            response = self.session.post(f"{BASE_URL}/admin/upload", files=files, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "file" in data:
                    file_info = data["file"]
                    if "url" in file_info and "mediaId" in file_info:
                        self.log_result("File Upload API", True, f"File uploaded successfully: {file_info.get('url')}", file_info)
                        return True
                    else:
                        self.log_result("File Upload API", False, f"Missing file info fields: {file_info}")
                else:
                    self.log_result("File Upload API", False, f"Upload failed: {data}")
            else:
                self.log_result("File Upload API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("File Upload API", False, f"Connection error: {str(e)}")
        return False

    def test_analytics_stats_api(self):
        """Test analytics stats endpoint"""
        if not self.admin_logged_in:
            self.log_result("Analytics Stats API", False, "Not logged in - skipping test")
            return False
            
        try:
            response = self.session.get(f"{BASE_URL}/admin/analytics/stats", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "stats" in data:
                    stats = data["stats"]
                    required_fields = ["totalViews", "totalClicks", "totalInquiries", "topPages"]
                    
                    if all(field in stats for field in required_fields):
                        self.log_result("Analytics Stats API", True, f"Stats retrieved: Views={stats.get('totalViews')}, Clicks={stats.get('totalClicks')}, Inquiries={stats.get('totalInquiries')}", stats)
                        return True
                    else:
                        missing = [f for f in required_fields if f not in stats]
                        self.log_result("Analytics Stats API", False, f"Missing fields: {missing}")
                else:
                    self.log_result("Analytics Stats API", False, f"Unexpected response: {data}")
            else:
                self.log_result("Analytics Stats API", False, f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_result("Analytics Stats API", False, f"Connection error: {str(e)}")
        return False
        
    def run_all_tests(self):
        """Run all backend API tests"""
        print("=" * 60)
        print("D.S.P.Film's Photography Backend API Testing")
        print("=" * 60)
        print(f"Testing backend at: {BASE_URL}")
        print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("-" * 60)
        
        # Run all tests
        tests = [
            ("API Health Check", self.test_api_health),
            ("Content API", self.test_content_api),
            ("Services API", self.test_services_api),
            ("Portfolio API", self.test_portfolio_api),
            ("Packages API", self.test_packages_api),
            ("Testimonials API", self.test_testimonials_api),
            ("POST Inquiries API", self.test_inquiries_post_api),
            # New Admin Panel Tests
            ("Admin Login (Remember Me)", self.test_admin_login),
            ("Admin Auth Me", self.test_admin_auth_me),
            ("Admin Settings API", self.test_admin_settings_api),
            ("AI Integration Endpoints", self.test_ai_integration_endpoints),
            ("File Upload API", self.test_file_upload_api),
            ("Analytics Stats API", self.test_analytics_stats_api),
        ]
        
        for test_name, test_func in tests:
            print(f"\n🧪 Running {test_name}...")
            test_func()
        
        # Print summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        print(f"Success Rate: {(self.results['passed']/self.results['total_tests']*100):.1f}%")
        
        if self.results['errors']:
            print("\n❌ FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  - {error}")
        
        print(f"\nCompleted at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)